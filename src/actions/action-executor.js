/**
 * Action Execution Logic
 * Handles the orchestration of action execution including confirmation dialogs,
 * action validation, and integration with Home Assistant services.
 * Provides the main entry point for all action processing.
 */

import { ACTION_TYPES } from './action-types.js';
import { logDebug } from '../utils/debug.js';
import {
  executeNavigateAction,
  executeUrlAction,
  executeToggleAction,
  executeServiceAction,
  executeMoreInfoAction,
  executeAssistAction,
  executeDomEventAction
} from './action-handlers.js';

/**
 * Action Executor Class
 * Manages the execution of different action types with confirmation support
 */
export class ActionExecutor {
  constructor(element, hass, config, childCard) {
    this.element = element;
    this.config = config;
    this.childCard = childCard;
    this._lastActionTime = 0;
  }

  /**
   * Handles different action types (tap, hold, double-tap, swipe)
   * @param {string} actionType - Type of action to handle ('tap', 'hold', 'double_tap', 'swipe_left', 'swipe_right', 'swipe_up', 'swipe_down')
   */
  handleAction(actionType = 'tap') {
    const actionConfig = this.config[`${actionType}_action`];
    if (!actionConfig || actionConfig.action === 'none') return;

    logDebug('ACTION', `Handling ${actionType} action:`, actionConfig);

    if (actionConfig.confirmation) {
      this._showConfirmationDialog(actionConfig);
    } else {
      this._executeAction(actionConfig);
    }
  }

  /**
   * Shows confirmation dialog for an action
   * @param {Object} actionConfig - Configuration for the action
   * @private
   */
  _showConfirmationDialog(actionConfig) {
    let confirmationText = 'Are you sure?';
    let confirmationTitle = undefined;
    let confirmText = 'Confirm';
    let dismissText = 'Cancel';

    // Handle both string and object confirmation formats
    if (typeof actionConfig.confirmation === 'object') {
      confirmationText = actionConfig.confirmation.text || confirmationText;
      confirmationTitle = actionConfig.confirmation.title;
      confirmText = actionConfig.confirmation.confirm_text || confirmText;
      dismissText = actionConfig.confirmation.dismiss_text || dismissText;
    } else if (typeof actionConfig.confirmation === 'string') {
      confirmationText = actionConfig.confirmation;
    }

    // Create dialog element
    const dialog = document.createElement('ha-dialog');
    dialog.heading = confirmationTitle || '';
    dialog.open = true;

    // Create content container
    const content = document.createElement('div');
    content.innerText = confirmationText;
    dialog.appendChild(content);

    // Create confirm button with direct click handler
    const primaryButton = document.createElement('mwc-button');
    primaryButton.slot = 'primaryAction';
    primaryButton.label = confirmText;
    primaryButton.style.color = 'var(--primary-color)';
    primaryButton.setAttribute('aria-label', confirmText);

    // Add direct click event to the confirm button
    primaryButton.addEventListener('click', () => {
      dialog.parentNode.removeChild(dialog);
      this._executeAction(actionConfig);
    });

    // Create cancel button with direct click handler
    const secondaryButton = document.createElement('mwc-button');
    secondaryButton.slot = 'secondaryAction';
    secondaryButton.label = dismissText;
    secondaryButton.setAttribute('aria-label', dismissText);

    // Add direct click event to the cancel button
    secondaryButton.addEventListener('click', () => {
      dialog.parentNode.removeChild(dialog);
    });

    // Append buttons to dialog
    dialog.appendChild(primaryButton);
    dialog.appendChild(secondaryButton);

    // Add dialog to document
    document.body.appendChild(dialog);
  }

  /**
   * Executes the configured action
   * @param {Object} actionConfig - Configuration for the action to execute
   * @private
   */
  _executeAction(actionConfig) {
    this._lastActionTime = Date.now();
    const hass = this.element.hass;
    if (!hass || !actionConfig.action) return;

    try {
      logDebug('ACTION', 'Executing action:', actionConfig.action);
      switch (actionConfig.action) {
        case ACTION_TYPES.NAVIGATE:
          executeNavigateAction(actionConfig, hass, this.config, this.childCard);
          break;
        case ACTION_TYPES.URL:
          executeUrlAction(actionConfig, hass, this.config, this.childCard);
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
   * Get the last action execution time
   * @returns {number} Timestamp of last action
   */
  getLastActionTime() {
    return this._lastActionTime;
  }
}
