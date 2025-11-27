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

    const dialog = document.createElement('ha-dialog');
    dialog.heading = confirmationTitle || '';
    dialog.open = true;

    const content = document.createElement('div');
    content.innerText = confirmationText;
    dialog.appendChild(content);

    const primaryButton = document.createElement('mwc-button');
    primaryButton.slot = 'primaryAction';
    primaryButton.label = confirmText;
    primaryButton.style.color = 'var(--primary-color)';
    primaryButton.setAttribute('aria-label', confirmText);

    primaryButton.addEventListener('click', () => {
      dialog.parentNode.removeChild(dialog);
      // Re-fetch processed config in case it was updated
      const currentConfig = this._processedConfigs[actionKey] || actionConfig;
      this._executeActionSync(currentConfig);
    });

    const secondaryButton = document.createElement('mwc-button');
    secondaryButton.slot = 'secondaryAction';
    secondaryButton.label = dismissText;
    secondaryButton.setAttribute('aria-label', dismissText);

    secondaryButton.addEventListener('click', () => {
      dialog.parentNode.removeChild(dialog);
    });

    dialog.appendChild(primaryButton);
    dialog.appendChild(secondaryButton);

    document.body.appendChild(dialog);
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

    logDebug('ACTION', 'Opening URL:', url, { target });

    if (target === '_blank') {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
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
