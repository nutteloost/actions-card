/**
 * Action Execution Logic
 * Handles the orchestration of action execution including confirmation dialogs,
 * action validation, template processing, and integration with Home Assistant services.
 * Provides the main entry point for all action processing.
 */

import { ACTION_TYPES } from './action-types.js';
import { logDebug } from '../utils/debug.js';
import { objectContainsTemplates, processTemplates } from '../utils/templates.js';
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
 * Manages the execution of different action types with confirmation and template support
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
   * @param {string} actionType - Type of action to handle
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
  async _showConfirmationDialog(actionConfig) {
    const hass = this.element.hass;

    // Process templates in confirmation text if present
    let confirmationText = 'Are you sure?';
    let confirmationTitle = undefined;
    let confirmText = 'Confirm';
    let dismissText = 'Cancel';

    if (typeof actionConfig.confirmation === 'object') {
      confirmationText = actionConfig.confirmation.text || confirmationText;
      confirmationTitle = actionConfig.confirmation.title;
      confirmText = actionConfig.confirmation.confirm_text || confirmText;
      dismissText = actionConfig.confirmation.dismiss_text || dismissText;

      // Process templates in confirmation strings
      if (objectContainsTemplates(actionConfig.confirmation)) {
        const processed = await processTemplates(hass, actionConfig.confirmation);
        confirmationText = processed.text || confirmationText;
        confirmationTitle = processed.title || confirmationTitle;
        confirmText = processed.confirm_text || confirmText;
        dismissText = processed.dismiss_text || dismissText;
      }
    } else if (typeof actionConfig.confirmation === 'string') {
      confirmationText = actionConfig.confirmation;
      if (objectContainsTemplates(confirmationText)) {
        confirmationText = await processTemplates(hass, confirmationText);
      }
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
  async _executeAction(actionConfig) {
    this._lastActionTime = Date.now();
    const hass = this.element.hass;
    if (!hass || !actionConfig.action) return;

    try {
      // CRITICAL: Suppress child card events BEFORE executing any action
      if (this.element._suppressChildCardEvents) {
        this.element._suppressChildCardEvents(300);
      }

      // Process templates if the config contains any
      let processedConfig = actionConfig;
      if (objectContainsTemplates(actionConfig)) {
        logDebug('ACTION', 'Processing templates in action config');
        processedConfig = await processTemplates(hass, actionConfig);
        logDebug('ACTION', 'Processed config:', processedConfig);
      }

      logDebug('ACTION', 'Executing action:', processedConfig.action);

      switch (processedConfig.action) {
        case ACTION_TYPES.NAVIGATE:
          executeNavigateAction(processedConfig, hass, this.config, this.childCard);
          break;
        case ACTION_TYPES.URL:
          executeUrlAction(processedConfig, hass, this.config, this.childCard);
          break;
        case ACTION_TYPES.TOGGLE:
          executeToggleAction(processedConfig, hass, this.config, this.childCard);
          break;
        case ACTION_TYPES.CALL_SERVICE:
          executeServiceAction(processedConfig, hass, this.config, this.childCard);
          break;
        case ACTION_TYPES.MORE_INFO:
          executeMoreInfoAction(processedConfig, hass, this.config, this.childCard, this.element);
          break;
        case ACTION_TYPES.ASSIST:
          executeAssistAction(processedConfig, hass, this.config, this.childCard, this.element);
          break;
        case ACTION_TYPES.FIRE_DOM_EVENT:
          executeDomEventAction(processedConfig, hass, this.config, this.childCard, this.element);
          break;
        default:
          logDebug('ACTION', 'Unrecognized action:', processedConfig.action);
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
