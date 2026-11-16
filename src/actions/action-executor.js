/**
 * Action Execution Logic
 * Handles the orchestration of action execution including confirmation dialogs,
 * action validation, template processing, and integration with Home Assistant services.
 * Provides the main entry point for all action processing.
 *
 * Templates are pre-processed when hass updates to ensure synchronous execution
 * at action time, which is required for iOS popup blocker compatibility.
 */

import { ACTION_TYPES } from './action-types.js';
import { logDebug } from '../utils/debug.js';
import { objectContainsTemplates, processTemplates } from '../utils/templates.js';
import {
  executeNavigateAction,
  executeToggleAction,
  executeServiceAction,
  executeMoreInfoAction,
  executeAssistAction,
  executeDomEventAction
} from './action-handlers.js';

/**
 * Action Executor Class
 * Manages the execution of different action types with confirmation and template support
 */
export class ActionExecutor {
  constructor(element, hass, config, childCard) {
    this.element = element;
    this.config = config;
    this.childCard = childCard;
    this._lastActionTime = 0;

    // Cache for pre-processed action configs (templates already resolved)
    this._processedConfigs = {};
  }

  /**
   * Pre-process all action configs that contain templates
   * Called when hass updates to ensure URLs are ready when user taps
   * @param {Object} hass - Home Assistant object
   */
  async preProcessTemplates(hass) {
    if (!hass || !this.config) return;

    const actionTypes = [
      'tap_action',
      'hold_action',
      'double_tap_action',
      'swipe_left_action',
      'swipe_right_action',
      'swipe_up_action',
      'swipe_down_action'
    ];

    // Process each action config that has templates
    for (const actionType of actionTypes) {
      const actionConfig = this.config[actionType];
      if (actionConfig && objectContainsTemplates(actionConfig)) {
        try {
          this._processedConfigs[actionType] = await processTemplates(hass, actionConfig);
          logDebug(
            'ACTION',
            `Pre-processed templates for ${actionType}:`,
            this._processedConfigs[actionType]
          );
        } catch (e) {
          logDebug('ERROR', `Failed to pre-process ${actionType}:`, e);
          // Keep original config as fallback
          this._processedConfigs[actionType] = actionConfig;
        }
      } else {
        // No templates, use original config
        this._processedConfigs[actionType] = actionConfig;
      }
    }
  }

  /**
   * Handles different action types (tap, hold, double-tap, swipe)
   * Uses pre-processed configs for synchronous execution (iOS compatibility)
   * @param {string} actionType - Type of action to handle
   */
  handleAction(actionType = 'tap') {
    const actionKey = `${actionType}_action`;

    // Use pre-processed config if available, otherwise fall back to original
    const actionConfig = this._processedConfigs[actionKey] || this.config[actionKey];
    if (!actionConfig || actionConfig.action === 'none') return;

    logDebug('ACTION', `Handling ${actionType} action:`, actionConfig);

    if (actionConfig.confirmation) {
      this._showConfirmationDialog(actionConfig, actionKey);
    } else {
      this._executeActionSync(actionConfig);
    }
  }

  /**
   * Shows confirmation dialog for an action
   * @param {Object} actionConfig - Configuration for the action (already processed)
   * @param {string} actionKey - The action key for re-processing if needed
   * @private
   */
  _showConfirmationDialog(actionConfig, actionKey) {
    let confirmationText = 'Are you sure?';
    let confirmationTitle = undefined;
    let confirmText = 'Confirm';
    let dismissText = 'Cancel';

    if (typeof actionConfig.confirmation === 'object') {
      confirmationText = actionConfig.confirmation.text || confirmationText;
      confirmationTitle = actionConfig.confirmation.title;
      confirmText = actionConfig.confirmation.confirm_text || confirmText;
      dismissText = actionConfig.confirmation.dismiss_text || dismissText;
    } else if (typeof actionConfig.confirmation === 'string') {
      confirmationText = actionConfig.confirmation;
    }

    // Native <dialog>: does not depend on Home Assistant's internal components
    const dialog = document.createElement('dialog');
    dialog.setAttribute('aria-label', confirmationTitle || confirmationText);
    Object.assign(dialog.style, {
      border: 'none',
      borderRadius: 'var(--ha-card-border-radius, 12px)',
      padding: '24px',
      maxWidth: 'min(420px, 90vw)',
      background: 'var(--card-background-color, #fff)',
      color: 'var(--primary-text-color, #000)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      fontFamily: 'var(--paper-font-body1_-_font-family, inherit)'
    });

    if (confirmationTitle) {
      const heading = document.createElement('h2');
      heading.textContent = confirmationTitle;
      heading.style.cssText = 'margin:0 0 12px;font-size:20px;font-weight:500;';
      dialog.appendChild(heading);
    }

    const content = document.createElement('div');
    content.textContent = confirmationText;
    content.style.cssText = 'margin-bottom:24px;white-space:pre-wrap;';
    dialog.appendChild(content);

    const makeButton = (label, primary) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = label;
      btn.setAttribute('aria-label', label);
      btn.style.cssText =
        'cursor:pointer;border:none;background:transparent;padding:10px 16px;font:inherit;' +
        'font-weight:500;text-transform:uppercase;border-radius:8px;' +
        `color:${primary ? 'var(--primary-color)' : 'var(--secondary-text-color)'};`;
      return btn;
    };

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;justify-content:flex-end;gap:8px;';
    const cancelButton = makeButton(dismissText, false);
    const confirmButton = makeButton(confirmText, true);
    actions.append(cancelButton, confirmButton);
    dialog.appendChild(actions);

    const close = () => {
      dialog.close();
      dialog.remove();
    };
    cancelButton.addEventListener('click', close);
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      close();
    });
    confirmButton.addEventListener('click', () => {
      close();
      // Re-fetch processed config in case it was updated
      const currentConfig = this._processedConfigs[actionKey] || actionConfig;
      this._executeActionSync(currentConfig);
    });

    document.body.appendChild(dialog);
    dialog.showModal();
    confirmButton.focus();
  }

  /**
   * Executes the configured action SYNCHRONOUSLY
   * This is critical for iOS popup blocker compatibility - no async/await here!
   * @param {Object} actionConfig - Pre-processed configuration for the action
   * @private
   */
  _executeActionSync(actionConfig) {
    this._lastActionTime = Date.now();
    const hass = this.element.hass;
    if (!hass || !actionConfig.action) return;

    try {
      if (this.element._suppressChildCardEvents) {
        this.element._suppressChildCardEvents(300);
      }

      logDebug('ACTION', 'Executing action (sync):', actionConfig.action);

      switch (actionConfig.action) {
        case ACTION_TYPES.NAVIGATE:
          executeNavigateAction(actionConfig, hass, this.config, this.childCard);
          break;
        case ACTION_TYPES.URL:
          this._executeUrlAction(actionConfig);
          break;
        case ACTION_TYPES.TOGGLE:
          executeToggleAction(actionConfig, hass, this.config, this.childCard);
          break;
        case ACTION_TYPES.CALL_SERVICE:
          executeServiceAction(actionConfig, hass, this.config, this.childCard);
          break;
        case ACTION_TYPES.MORE_INFO:
          executeMoreInfoAction(actionConfig, hass, this.config, this.childCard, this.element);
          break;
        case ACTION_TYPES.ASSIST:
          executeAssistAction(actionConfig, hass, this.config, this.childCard, this.element);
          break;
        case ACTION_TYPES.FIRE_DOM_EVENT:
          executeDomEventAction(actionConfig, hass, this.config, this.childCard, this.element);
          break;
        default:
          logDebug('ACTION', 'Unrecognized action:', actionConfig.action);
      }
    } catch (e) {
      console.error('ActionsCard: Error executing action:', actionConfig.action, e);
    }
  }

  /**
   * Execute URL action
   * @param {Object} actionConfig - Processed action configuration
   * @private
   */
  _executeUrlAction(actionConfig) {
    const url = actionConfig.url_path || '';
    const target = actionConfig.target || '_blank';

    if (!url) {
      logDebug('ACTION', 'URL action called without url_path');
      return;
    }

    // Security: only allow web (http/https), relative and mailto/tel links.
    // Blocks javascript:, data: and similar schemes.
    let parsed;
    try {
      parsed = new URL(url, window.location.href);
    } catch (e) {
      logDebug('ERROR', 'URL action blocked (invalid URL):', url);
      return;
    }
    if (!['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
      console.warn('ActionsCard: URL action blocked (unsupported scheme):', parsed.protocol);
      return;
    }

    logDebug('ACTION', 'Opening URL:', url, { target });

    if (target === '_blank') {
      // noopener/noreferrer stop the new page reaching back into this dashboard
      window.open(parsed.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = parsed.href;
    }
  }

  /**
   * Get the last action execution time
   * @returns {number} Timestamp of last action
   */
  getLastActionTime() {
    return this._lastActionTime;
  }
}
