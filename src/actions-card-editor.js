/**
 * Actions Card Editor Component
 * Enhanced visual editor for configuring Actions Card instances in Home Assistant.
 * Provides intuitive UI for selecting wrapped cards, configuring actions, and setting up
 * confirmation dialogs. Handles complex card picker integration and configuration management.
 *
 * Key Features:
 * - Interactive card picker for selecting cards to wrap
 * - Configuration UI for all action types and their parameters
 * - Live preview and editing capabilities
 * - Robust event handling to prevent editor conflicts
 * - Support for action confirmation dialogs
 */

import { LitElement, html } from 'lit';
import { logDebug } from './utils/debug.js';
import { getCardDescriptor } from './utils/helpers.js';
import { ACTION_TYPE_OPTIONS } from './actions/action-types.js';
import { getEditorStyles } from './styles/editor-styles.js';
import { CARD_VERSION } from './constants.js';
import { fireEvent, hasConfigOrEntityChanged } from './utils/dependencies.js';

/**
 * Enhanced editor for Actions Card
 *
 * @class ActionsCardEditor
 * @extends {LitElement}
 */
export class ActionsCardEditor extends LitElement {
  /**
   * Define properties for the editor
   * @returns {Object} Properties for the component
   */
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object, state: true },
      lovelace: { type: Object },
      _actionsExpanded: { type: Boolean, state: true },
      _swipeActionsExpanded: { type: Boolean, state: true }
    };
  }

  /**
   * Constructor for the editor
   */
  constructor() {
    super();
    // Generate a unique ID for this editor instance
    this._editorId = `actions-card-editor-${Math.random().toString(36).substring(2, 15)}`;
    this._boundHandleCardPicked = this._handleCardPicked.bind(this);

    // Track if we're in an editor dialog to prevent premature closure
    this._inEditorDialog = false;

    // Track active child editor dialogs
    this._activeChildEditors = new Set();

    // Track if we should show picker after card removal - CARD PICKER FIX
    this._showPickerAfterRemoval = false;

    // Add debouncing for card picker loading
    this._cardPickerLoadingDebounce = null;
    this._cardPickerRetryCount = 0;

    // Initialize expansion panel states - Actions open by default
    this._actionsExpanded = false;
    this._swipeActionsExpanded = false;
  }

  /**
   * Standard HA pattern: Use shouldUpdate to prevent unnecessary re-renders
   */
  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  async connectedCallback() {
    super.connectedCallback();
    logDebug('EDITOR', 'Editor connected to DOM');

    // Ensure card picker is loaded before proceeding
    await this._ensureComponentsLoaded();

    // Call _ensureCardPickerLoaded after a short delay to ensure shadowRoot is ready
    // Use debounced version to prevent multiple calls
    setTimeout(() => this._debouncedEnsureCardPickerLoaded(), 1000);

    // Try to detect if we're in an editor dialog
    let parent = this.parentNode;
    while (parent) {
      if (parent.localName === 'hui-dialog-edit-card') {
        this._inEditorDialog = true;
        parent._hostingActionsCardEditor = true;
        logDebug('EDITOR', "Detected we're inside an editor dialog");
        break;
      }
      parent = parent.parentNode || (parent.getRootNode && parent.getRootNode().host);
    }

    // Setup global handlers to prevent editor dialog closure
    this._setupGlobalHandlers();
  }

  // Add comprehensive component loading
  async _ensureComponentsLoaded() {
    const maxAttempts = 10;
    let attempts = 0;

    // First, try to load via existing cards (more reliable)
    while (!customElements.get('hui-card-picker') && attempts < maxAttempts) {
      await this._loadCustomElements();
      if (!customElements.get('hui-card-picker')) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        attempts++;
      }
    }

    // If still not loaded, try alternative approach
    if (!customElements.get('hui-card-picker')) {
      logDebug('EDITOR', 'Primary loading failed, trying alternative approach');
      await this._tryAlternativeLoading();
    }

    if (!customElements.get('hui-card-picker')) {
      logDebug('EDITOR', 'All loading attempts failed, card picker may not be available');
    } else {
      logDebug('EDITOR', 'Successfully loaded hui-card-picker');
    }
  }

  async _loadCustomElements() {
    if (customElements.get('hui-card-picker')) {
      return; // Already loaded
    }

    try {
      // Try to load through existing Home Assistant mechanisms
      const loadAttempts = [
        () => this._tryLoadViaExistingCards(),
        () => this._forceLoadCardPicker()
      ];

      for (const attempt of loadAttempts) {
        try {
          await attempt();
          if (customElements.get('hui-card-picker')) {
            logDebug('EDITOR', 'Component loaded successfully');
            return;
          }
        } catch (e) {
          // Silent fail and try next method
        }
      }
    } catch (e) {
      logDebug('EDITOR', 'Error in _loadCustomElements:', e);
    }
  }

  async _tryLoadViaExistingCards() {
    const cardTypes = [
      'hui-entities-card',
      'hui-conditional-card',
      'hui-vertical-stack-card',
      'hui-horizontal-stack-card',
      'hui-grid-card',
      'hui-map-card'
    ];

    for (const cardType of cardTypes) {
      try {
        const cardElement = customElements.get(cardType);
        if (cardElement && cardElement.getConfigElement) {
          await cardElement.getConfigElement();
          if (customElements.get('hui-card-picker')) {
            return;
          }
        }
      } catch (e) {
        // Continue to next card type
      }
    }
  }

  async _tryAlternativeLoading() {
    try {
      // Try to access Lovelace directly
      if (window.loadCardHelpers) {
        const helpers = await window.loadCardHelpers();
        if (helpers && customElements.get('hui-card-picker')) {
          return;
        }
      }

      // Try to trigger via temporary element creation
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = '<hui-card-picker></hui-card-picker>';
      document.body.appendChild(tempDiv);
      await new Promise((resolve) => setTimeout(resolve, 100));
      document.body.removeChild(tempDiv);
    } catch (e) {
      logDebug('EDITOR', 'Alternative loading failed:', e);
    }
  }

  async _forceLoadCardPicker() {
    try {
      // Last resort: try to manually define if possible
      if (!customElements.get('hui-card-picker')) {
        // Trigger a UI refresh that might load missing components
        const event = new CustomEvent('hass-refresh', {
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(event);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (e) {
      // Final fallback failed
    }
  }

  _debouncedEnsureCardPickerLoaded() {
    // If we're showing picker after removal, don't debounce - show immediately
    if (this._showPickerAfterRemoval) {
      this._ensureCardPickerLoaded();
      return;
    }

    if (this._cardPickerLoadingDebounce) {
      clearTimeout(this._cardPickerLoadingDebounce);
    }

    this._cardPickerLoadingDebounce = setTimeout(() => {
      this._ensureCardPickerLoaded();
    }, 500); // Increased from 100ms to 500ms
  }

  async _ensureCardPickerLoaded() {
    if (!this.shadowRoot || this._config?.card) return;

    const container = this.shadowRoot.querySelector('#card-picker-container');
    if (!container) {
      this.requestUpdate();
      return;
    }

    // Simplified picker creation without complex retry logic
    let picker = container.querySelector('hui-card-picker');
    if (!picker) {
      picker = document.createElement('hui-card-picker');
      picker.hass = this.hass;
      picker.lovelace = this.lovelace;
      container.appendChild(picker);
    }
  }

  /**
   * Setup global event handlers to prevent dialog closure during editing
   * Creates comprehensive event interception to mark events as processed by this editor,
   * preventing parent dialogs from inappropriately closing during configuration.
   * Handles search inputs, configuration changes, and other editor interactions.
   * @private
   */
  _setupGlobalHandlers() {
    // Create handler to mark our events
    this._globalEventHandler = (e) => {
      // Check if this event is from our editor
      if (e.target && this.shadowRoot && this.shadowRoot.contains(e.target)) {
        // Mark it as processed by actions card editor
        logDebug('EVENT', `Marking ${e.type} event as processed by actions card editor`);
        e._processedByActionsCardEditor = true;

        // For specific events that might cause problems, stop propagation
        if (
          e.type === 'keydown' ||
          e.type === 'input' ||
          e.type === 'change' ||
          e.type === 'config-changed'
        ) {
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        }
      }

      // Special handling for search input events
      if (e.type === 'keydown' || e.type === 'input') {
        const isSearchInput =
          e.target.tagName === 'INPUT' &&
          (e.target.type === 'search' || e.target.placeholder?.includes('Search'));
        if (isSearchInput) {
          // Mark search events specifically
          logDebug('EVENT', `Marking ${e.type} search input event as processed`);
          e._isSearchInput = true;
          e._processedByActionsCardEditor = true;
          // Prevent these events from bubbling to parent editors
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        }
      }
    };

    // Add handlers for various event types
    const eventTypes = ['keydown', 'input', 'change', 'click', 'config-changed'];
    eventTypes.forEach((type) => {
      document.addEventListener(type, this._globalEventHandler, {
        capture: true
      });
    });

    logDebug('EDITOR', 'Global event handlers setup completed');
  }

  /**
   * Cleanup when component is disconnected
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    // Clear any pending debounced calls
    if (this._cardPickerLoadingDebounce) {
      clearTimeout(this._cardPickerLoadingDebounce);
      this._cardPickerLoadingDebounce = null;
    }

    // Reset retry count
    this._cardPickerRetryCount = 0;

    // Clean up global handlers
    if (this._globalEventHandler) {
      const eventTypes = ['keydown', 'input', 'change', 'click', 'config-changed'];
      eventTypes.forEach((type) => {
        document.removeEventListener(type, this._globalEventHandler, {
          capture: true
        });
      });
    }

    // Clean up any open dialogs
    if (this._activeChildEditors) {
      this._activeChildEditors.forEach((dialog) => {
        if (dialog.parentNode) {
          try {
            dialog.parentNode.removeChild(dialog);
          } catch (error) {
            console.warn('Error removing dialog:', error);
          }
        }
      });
      this._activeChildEditors.clear();
    }

    logDebug('EDITOR', 'Editor disconnected from DOM and events cleaned up');
  }

  /**
   * Sets the configuration for the editor
   * @param {Object} config - The configuration object
   */
  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    logDebug('CONFIG', 'Editor setConfig received:', JSON.stringify(config));
    this._config = JSON.parse(JSON.stringify(config));

    if (!this._config.card) {
      setTimeout(() => this._ensureCardPickerLoaded(), 50);
    }
  }

  /**
   * Clean configuration by removing actions with default values
   * @param {Object} config - Configuration to clean
   * @returns {Object} Cleaned configuration
   * @private
   */
  _cleanConfig(config) {
    const cleaned = { ...config };

    // List of action keys to check
    const actionKeys = [
      'tap_action',
      'hold_action',
      'double_tap_action',
      'swipe_left_action',
      'swipe_right_action',
      'swipe_up_action',
      'swipe_down_action'
    ];

    // Remove actions that are set to 'none' or are default values
    actionKeys.forEach((key) => {
      if (cleaned[key]) {
        // Remove if action is 'none' and no other properties
        if (cleaned[key].action === 'none' && Object.keys(cleaned[key]).length === 1) {
          delete cleaned[key];
        }
        // Also remove if it's an empty object
        else if (Object.keys(cleaned[key]).length === 0) {
          delete cleaned[key];
        }
      }
    });

    // Remove prevent_default_dialog if it's false (default value)
    if (cleaned.prevent_default_dialog === false) {
      delete cleaned.prevent_default_dialog;
    }

    return cleaned;
  }

  /**
   * Clean up action configuration by removing properties not relevant to the action type
   * Ensures configuration objects only contain valid properties for their action type,
   * preventing invalid configurations and improving storage efficiency.
   * @param {Object} actionConfig - Current action configuration
   * @param {string} actionType - New action type
   * @param {string} actionOption - The action option being modified (tap_action, hold_action, etc.)
   * @returns {Object} Cleaned action configuration
   * @private
   */
  _cleanActionConfig(actionConfig, actionType, actionOption) {
    // Define which properties are valid for each action type
    const validProperties = {
      none: [],
      navigate: ['navigation_path', 'navigation_replace'],
      url: ['url_path', 'target'],
      toggle: ['entity'],
      'more-info': ['entity'],
      'call-service': ['service', 'service_data'],
      assist: ['pipeline_id', 'start_listening'],
      'fire-dom-event': ['event_type', 'event_data']
    };

    // Properties that are valid for all action types
    const commonProperties = ['action', 'confirmation'];

    // Add hold_time and show_progress for hold actions
    if (actionOption === 'hold_action') {
      commonProperties.push('hold_time', 'show_progress');
    }

    const allowedProperties = [...commonProperties, ...(validProperties[actionType] || [])];

    // Create new config with only allowed properties
    const cleanedConfig = {};
    Object.keys(actionConfig).forEach((key) => {
      if (allowedProperties.includes(key)) {
        cleanedConfig[key] = actionConfig[key];
      }
    });

    return cleanedConfig;
  }

  /**
   * Handles value changes in the editor
   * @param {Event} ev - The change event
   * @private
   */
  _valueChanged(ev) {
    // Mark this event as processed
    ev._processedByActionsCardEditor = true;
    ev.stopPropagation();

    if (!this._config || !ev.target) return;
    const target = ev.target;
    const option = target.configValue || target.getAttribute('data-option');
    const parentOption =
      target.parentElement?.configValue || target.parentElement?.getAttribute('data-option');
    const finalOption = option || parentOption;
    if (!finalOption) return;

    const key = target.configAttribute || target.getAttribute('data-attribute');

    // Handle action updates
    if (option && option.includes('_action')) {
      const actionConfig = { ...(this._config[option] || {}) };

      if (key) {
        // Handle specific property updates
        // Check for ha-switch or checkbox
        if (target.type === 'checkbox' || target.tagName === 'HA-SWITCH') {
          actionConfig[key] = target.checked;
        } else {
          // For entity pickers and other components, prioritize ev.detail.value
          actionConfig[key] = ev.detail?.value ?? target.value ?? '';
        }

        logDebug('CONFIG', `Updating ${option}:`, actionConfig);
        this._config = { ...this._config, [option]: actionConfig };
      } else {
        // Handle action type changes - clean up irrelevant properties
        const newActionType = target.value;
        const cleanedConfig = this._cleanActionConfig(actionConfig, newActionType, option);
        cleanedConfig.action = newActionType;

        logDebug('CONFIG', `Updating ${option} with cleanup:`, cleanedConfig);
        this._config = { ...this._config, [option]: cleanedConfig };
      }
    } else if (option) {
      // Handle regular options
      let value;
      // UPDATED: Check for ha-switch or checkbox
      if (target.type === 'checkbox' || target.tagName === 'HA-SWITCH') {
        value = target.checked;
      } else {
        value = target.value;
      }

      logDebug('CONFIG', `Updating ${option}:`, value);
      this._config = { ...this._config, [option]: value };
    }

    // Fire config changed with special flags to prevent editor closure
    this._fireConfigChangedWithFlags();
  }

  /**
   * Fires the config-changed event with special flags to prevent editor conflicts
   * Uses custom event properties to identify events from this editor and prevent
   * unwanted dialog closure or configuration conflicts with parent editors.
   * Includes direct dialog updating when in editor dialog context.
   * @private
   */
  _fireConfigChangedWithFlags() {
    if (!this._config) return;

    // Clean the config before firing the event
    const cleanedConfig = this._cleanConfig(this._config);

    // Use HA standard event firing
    fireEvent(this, 'config-changed', {
      config: cleanedConfig,
      editorId: this._editorId,
      fromActionCardEditor: true,
      preventDialogClose: true,
      inEditorDialog: this._inEditorDialog
    });

    // If in dialog, dispatch a more controlled event to update the parent config
    if (this._inEditorDialog) {
      let parent = this.parentNode;
      let dialog = null;
      while (parent) {
        if (parent.localName === 'hui-dialog-edit-card') {
          dialog = parent;
          break;
        }
        parent = parent.parentNode || (parent.getRootNode && parent.getRootNode().host);
      }

      if (dialog && typeof dialog._updateConfig === 'function') {
        logDebug('EVENT', 'Directly updating dialog config');
        try {
          dialog._updateConfig(cleanedConfig);
        } catch (e) {
          console.error('Error updating dialog config:', e);
        }
      }
    }
  }

  /**
   * Fires the config-changed event
   * This is the original method, kept for compatibility
   * @private
   */
  _fireConfigChanged() {
    if (!this._config) return;

    // Use HA standard event firing
    fireEvent(this, 'config-changed', {
      config: this._config,
      editorId: this._editorId,
      fromActionCardEditor: true,
      inEditorDialog: this._inEditorDialog,
      preventDialogClose: true
    });

    logDebug('EVENT', 'Firing config-changed event with config:', this._config);
  }

  /**
   * Handles card selection from the picker
   * @param {Event} ev - The selection event
   * @private
   */
  _handleCardPicked(ev) {
    // Mark this event as processed
    if (ev._processedByActionsCardEditor === undefined) {
      ev._processedByActionsCardEditor = true;
    }

    // If this is from our own picker, handle it normally
    if (!ev.detail?.editorId || ev.detail.editorId === this._editorId) {
      const newCardConfig = ev.detail.config;
      logDebug('EDITOR', 'Card picked:', newCardConfig);
      this._config = {
        ...this._config,
        card: newCardConfig
      };

      // Use the safer method to fire config changed
      this._fireConfigChangedWithFlags();
      this.requestUpdate();
    }

    // Stop event propagation to prevent editor issues
    if (ev.stopPropagation) ev.stopPropagation();
  }

  /**
   * Handle expansion panel changes for accordion behavior
   * @param {string} panelName - Name of the panel ('actions' or 'swipe')
   * @param {Event} e - Expanded changed event
   * @private
   */
  _handlePanelExpanded(panelName, e) {
    e.stopPropagation();
    const isExpanded = e.detail.value;

    if (!isExpanded) {
      // Panel is collapsing - just update state
      if (panelName === 'actions') {
        this._actionsExpanded = false;
      } else if (panelName === 'swipe') {
        this._swipeActionsExpanded = false;
      }

      // Remove focus to clear the highlight color
      if (e.target && e.target.blur) {
        e.target.blur();
      }

      return;
    }

    // Panel is expanding - implement accordion behavior
    // Close ALL panels first (like todo-swipe-card does)
    this._actionsExpanded = false;
    this._swipeActionsExpanded = false;

    // Then open the requested one
    if (panelName === 'actions') {
      this._actionsExpanded = true;
    } else if (panelName === 'swipe') {
      this._swipeActionsExpanded = true;
    }

    // Force a complete re-render
    this.requestUpdate();

    // Also schedule another update to ensure panels sync properly
    setTimeout(() => {
      this.requestUpdate();
    }, 10);
  }

  /**
   * Opens the edit dialog for the wrapped card
   * @private
   */
  async _editWrappedCard() {
    if (!this._config?.card) {
      logDebug('ERROR', 'No card to edit');
      return;
    }

    const cardConfig = this._config.card;
    const hass = this.hass;
    const mainApp = document.querySelector('home-assistant');

    if (!hass || !mainApp) {
      logDebug('ERROR', 'Cannot find Home Assistant instance');
      return;
    }

    try {
      await customElements.whenDefined('hui-dialog-edit-card');

      const dialog = document.createElement('hui-dialog-edit-card');
      dialog.hass = hass;

      // Track this dialog for proper lifecycle management
      this._activeChildEditors.add(dialog);

      // Add dialog to body before setting properties
      document.body.appendChild(dialog);

      // Handle dialog cleanup properly
      const handleDialogClose = (_e) => {
        dialog.removeEventListener('dialog-closed', handleDialogClose);

        this._activeChildEditors.delete(dialog);

        if (dialog.parentNode === document.body) {
          try {
            document.body.removeChild(dialog);
          } catch (error) {
            logDebug('EDITOR', 'Dialog already removed or not found:', error);
          }
        }

        // Ensure card picker is visible after edit
        setTimeout(() => this._ensureCardPickerLoaded(), 100);
      };

      dialog.addEventListener('dialog-closed', handleDialogClose);

      // Using saveCardConfig instead of saveConfig
      const dialogParams = {
        cardConfig: cardConfig,
        lovelaceConfig: this.lovelace || mainApp.lovelace,
        saveCardConfig: async (savedCardConfig) => {
          if (!savedCardConfig) return;

          // Update wrapped card
          logDebug('CONFIG', 'Updating wrapped card with saved config:', savedCardConfig);
          this._config = {
            ...this._config,
            card: savedCardConfig
          };

          // Fire regular config changed event
          this._fireConfigChanged();
          this.requestUpdate();
        }
      };

      // Use the dialog.showDialog method
      await dialog.showDialog(dialogParams);
    } catch (err) {
      logDebug('ERROR', 'Error opening edit dialog:', err);

      // Fallback method - IMPORTANT: Also using saveCardConfig here
      fireEvent(this, 'll-show-dialog', {
        dialogTag: 'hui-dialog-edit-card',
        dialogImport: () => import('hui-dialog-edit-card'),
        dialogParams: {
          cardConfig: cardConfig,
          lovelaceConfig: this.lovelace || mainApp.lovelace,
          saveCardConfig: (savedCardConfig) => {
            if (!savedCardConfig) return;

            this._config = {
              ...this._config,
              card: savedCardConfig
            };

            this._fireConfigChanged();
            this.requestUpdate();
          }
        }
      });
    }
  }

  _removeWrappedCard() {
    if (!this._config) return;

    logDebug('EDITOR', 'Removing wrapped card');
    const updatedConfig = { ...this._config };
    delete updatedConfig.card;

    this._config = updatedConfig;

    // Set flag to show picker after removal
    this._showPickerAfterRemoval = true;

    // Clear any pending debounced calls and reset retry count
    if (this._cardPickerLoadingDebounce) {
      clearTimeout(this._cardPickerLoadingDebounce);
      this._cardPickerLoadingDebounce = null;
    }
    this._cardPickerRetryCount = 0;

    this._fireConfigChangedWithFlags();

    // Force a full re-render first
    this.requestUpdate();

    // Then ensure card picker is loaded after the render completes
    this.updateComplete.then(() => {
      setTimeout(() => {
        logDebug('EDITOR', 'Forcing card picker load after card removal');
        this._ensureCardPickerLoaded();
      }, 100);
    });
  }

  // Add method to check if picker should be shown
  _shouldShowCardPicker() {
    // Show picker when no card is configured
    const noCard = !this._config?.card;

    // Show if we're explicitly showing after removal
    const showAfterRemoval = this._showPickerAfterRemoval;

    // Show if we have a config but no card
    const hasConfigButNoCard =
      this._config && Object.keys(this._config).length > 0 && !this._config.card;

    const shouldShow = noCard && (showAfterRemoval || hasConfigButNoCard || !this._config);

    logDebug('EDITOR', 'Should show card picker:', {
      noCard,
      showAfterRemoval,
      hasConfigButNoCard,
      shouldShow
    });

    return shouldShow;
  }

  /**
   * Renders the action type selection dropdown
   * @param {string} actionType - The action type (tap, hold, double_tap)
   * @param {Object} actionConfig - The current action configuration
   * @returns {TemplateResult} The dropdown template
   * @private
   */
  _renderActionTypeDropdown(actionType, actionConfig) {
    const title =
      {
        tap_action: 'Tap Action',
        hold_action: 'Hold Action',
        double_tap_action: 'Double Tap Action'
      }[actionType] || actionType.replace(/_/g, ' ');

    return html`
      <div class="option-row">
        <div class="option-label">${title}</div>
        <ha-select
          .value=${actionConfig.action || 'none'}
          data-option="${actionType}"
          @selected=${this._valueChanged}
          @closed=${(e) => {
            e._processedByActionsCardEditor = true;
            e.stopPropagation();
          }}
        >
          ${ACTION_TYPE_OPTIONS.map(
            (option) => html`
              <mwc-list-item value="${option.value}">${option.label}</mwc-list-item>
            `
          )}
        </ha-select>
      </div>
    `;
  }

  /**
   * Renders the detail configuration for different action types
   * @param {string} actionType - The action type (tap, hold, double_tap)
   * @param {Object} actionConfig - The current action configuration
   * @returns {TemplateResult} The detail configuration template
   * @private
   */
  _renderActionDetails(actionType, actionConfig) {
    if (!actionConfig || actionConfig.action === 'none' || !actionConfig.action) {
      return html``;
    }

    switch (actionConfig.action) {
      case 'navigate':
        return html`
          <div class="config-row">
            <ha-textfield
              label="Navigation Path"
              .value=${actionConfig.navigation_path || ''}
              data-option="${actionType}"
              data-attribute="navigation_path"
              @keydown=${(e) => {
                e._processedByActionsCardEditor = true;
              }}
              @change=${this._valueChanged}
            ></ha-textfield>
          </div>
          <div class="option-row">
            <div class="option-label">Replace history state</div>
            <ha-switch
              .checked=${actionConfig.navigation_replace || false}
              data-option="${actionType}"
              data-attribute="navigation_replace"
              @change=${this._valueChanged}
            ></ha-switch>
          </div>
        `;
      case 'url':
        return html`
          <div class="config-row">
            <ha-textfield
              label="URL"
              .value=${actionConfig.url_path || ''}
              data-option="${actionType}"
              data-attribute="url_path"
              @keydown=${(e) => {
                e._processedByActionsCardEditor = true;
              }}
              @change=${this._valueChanged}
            ></ha-textfield>
          </div>
          <div class="config-row">
            <ha-select
              label="Open in"
              .value=${actionConfig.target || '_blank'}
              data-option="${actionType}"
              data-attribute="target"
              @selected=${this._valueChanged}
              @closed=${(e) => {
                e._processedByActionsCardEditor = true;
                e.stopPropagation();
              }}
            >
              <mwc-list-item value="_blank">New tab</mwc-list-item>
              <mwc-list-item value="_self">Same tab</mwc-list-item>
            </ha-select>
          </div>
        `;
      case 'toggle':
      case 'more-info':
        return html`
          <div class="config-row">
            <ha-entity-picker
              label="Entity"
              .hass=${this.hass}
              .value=${actionConfig.entity || ''}
              data-option="${actionType}"
              data-attribute="entity"
              @value-changed=${this._valueChanged}
              allow-custom-entity
            ></ha-entity-picker>
            <div class="help-text">
              Optional: Leave empty to use the entity from the wrapped card
            </div>
          </div>
        `;
      case 'call-service':
        return html`
          <div class="config-row">
            <ha-textfield
              label="Service"
              .value=${actionConfig.service || ''}
              data-option="${actionType}"
              data-attribute="service"
              @keydown=${(e) => {
                e._processedByActionsCardEditor = true;
              }}
              @change=${this._valueChanged}
              placeholder="domain.service"
            ></ha-textfield>
          </div>
          <div class="config-row">
            <ha-yaml-editor
              label="Service Data"
              .value=${actionConfig.service_data
                ? JSON.stringify(actionConfig.service_data, null, 2)
                : '{}'}
              data-option="${actionType}"
              data-attribute="service_data"
              @value-changed=${(e) => {
                e._processedByActionsCardEditor = true;
                try {
                  const newConfig = { ...this._config };
                  newConfig[actionType] = {
                    ...newConfig[actionType],
                    service_data: JSON.parse(e.detail.value)
                  };
                  this._config = newConfig;
                  this._fireConfigChangedWithFlags();
                } catch (err) {
                  console.error('Invalid service data:', err);
                }
              }}
            ></ha-yaml-editor>
          </div>
        `;
      case 'assist':
        return html`
          <div class="config-row">
            <ha-textfield
              label="Pipeline ID (optional)"
              .value=${actionConfig.pipeline_id || ''}
              data-option="${actionType}"
              data-attribute="pipeline_id"
              @keydown=${(e) => {
                e._processedByActionsCardEditor = true;
              }}
              @change=${this._valueChanged}
              placeholder="last_used"
            ></ha-textfield>
          </div>
          <div class="option-row">
            <div class="option-label">Start listening immediately</div>
            <ha-switch
              .checked=${actionConfig.start_listening || false}
              data-option="${actionType}"
              data-attribute="start_listening"
              @change=${this._valueChanged}
            ></ha-switch>
          </div>
        `;
      case 'fire-dom-event':
        return html`
          <div class="config-row">
            <ha-textfield
              label="Event Type"
              .value=${actionConfig.event_type || ''}
              data-option="${actionType}"
              data-attribute="event_type"
              @keydown=${(e) => {
                e._processedByActionsCardEditor = true;
              }}
              @change=${this._valueChanged}
            ></ha-textfield>
          </div>
          <div class="config-row">
            <ha-yaml-editor
              label="Event Data (optional)"
              .value=${actionConfig.event_data
                ? JSON.stringify(actionConfig.event_data, null, 2)
                : '{}'}
              data-option="${actionType}"
              data-attribute="event_data"
              @value-changed=${(e) => {
                e._processedByActionsCardEditor = true;
                try {
                  const newConfig = { ...this._config };
                  newConfig[actionType] = {
                    ...newConfig[actionType],
                    event_data: JSON.parse(e.detail.value)
                  };
                  this._config = newConfig;
                  this._fireConfigChangedWithFlags();
                } catch (err) {
                  console.error('Invalid event data:', err);
                }
              }}
            ></ha-yaml-editor>
          </div>
        `;
      default:
        return html``;
    }
  }

  /**
   * Render the swipe actions configuration section
   * @returns {TemplateResult} Swipe actions configuration template
   * @private
   */
  _renderSwipeActionsConfiguration() {
    // Use || for safe defaults when rendering
    const swipeLeftAction = this._config.swipe_left_action || { action: 'none' };
    const swipeRightAction = this._config.swipe_right_action || { action: 'none' };
    const swipeUpAction = this._config.swipe_up_action || { action: 'none' };
    const swipeDownAction = this._config.swipe_down_action || { action: 'none' };

    return html`
      <ha-expansion-panel
        .expanded=${this._swipeActionsExpanded}
        @expanded-changed=${(e) => {
          e.stopPropagation();
          this._handlePanelExpanded('swipe', e);
        }}
      >
        <div slot="header" role="heading" aria-level="3">
          <ha-icon icon="mdi:gesture-swipe"></ha-icon>
          Swipe Actions
        </div>

        <div class="section">
          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-left" style="margin-right: 8px;"></ha-icon>
              Swipe Left
            </div>
            ${this._renderActionTypeDropdown('swipe_left_action', swipeLeftAction)}
            ${this._renderActionDetails('swipe_left_action', swipeLeftAction)}
            ${this._renderConfirmationConfig('swipe_left_action', swipeLeftAction)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-right" style="margin-right: 8px;"></ha-icon>
              Swipe Right
            </div>
            ${this._renderActionTypeDropdown('swipe_right_action', swipeRightAction)}
            ${this._renderActionDetails('swipe_right_action', swipeRightAction)}
            ${this._renderConfirmationConfig('swipe_right_action', swipeRightAction)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-up" style="margin-right: 8px;"></ha-icon>
              Swipe Up
            </div>
            ${this._renderActionTypeDropdown('swipe_up_action', swipeUpAction)}
            ${this._renderActionDetails('swipe_up_action', swipeUpAction)}
            ${this._renderConfirmationConfig('swipe_up_action', swipeUpAction)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:arrow-down" style="margin-right: 8px;"></ha-icon>
              Swipe Down
            </div>
            ${this._renderActionTypeDropdown('swipe_down_action', swipeDownAction)}
            ${this._renderActionDetails('swipe_down_action', swipeDownAction)}
            ${this._renderConfirmationConfig('swipe_down_action', swipeDownAction)}
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  /**
   * Renders the confirmation options for an action
   * @param {string} actionType - The action type (tap, hold, double_tap)
   * @param {Object} actionConfig - The current action configuration
   * @returns {TemplateResult} The confirmation configuration template
   * @private
   */
  _renderConfirmationConfig(actionType, actionConfig) {
    if (!actionConfig || actionConfig.action === 'none' || !actionConfig.action) {
      return html``;
    }

    const hasConfirmation = !!actionConfig.confirmation;
    const confirmationConfig =
      typeof actionConfig.confirmation === 'object'
        ? actionConfig.confirmation
        : hasConfirmation
          ? { text: actionConfig.confirmation }
          : {};

    return html`
      <div class="option-row confirmation-row">
        <div class="option-label">Require confirmation</div>
        <ha-switch
          .checked=${hasConfirmation}
          @change=${(e) => {
            e._processedByActionsCardEditor = true;
            const newConfig = { ...this._config };
            newConfig[actionType] = {
              ...newConfig[actionType],
              confirmation: e.target.checked ? { text: 'Are you sure?' } : false
            };
            this._config = newConfig;
            this._fireConfigChangedWithFlags();
            this.requestUpdate();
          }}
        ></ha-switch>
      </div>

      ${hasConfirmation
        ? html`
            <div class="confirmation-config">
              <div class="config-row">
                <ha-textfield
                  label="Confirmation Text"
                  .value=${confirmationConfig.text || 'Are you sure?'}
                  @keydown=${(e) => {
                    e._processedByActionsCardEditor = true;
                  }}
                  @change=${(e) => {
                    e._processedByActionsCardEditor = true;
                    const newConfig = { ...this._config };
                    const newConfirmation =
                      typeof newConfig[actionType].confirmation === 'object'
                        ? { ...newConfig[actionType].confirmation }
                        : {};
                    newConfirmation.text = e.target.value;
                    newConfig[actionType].confirmation = newConfirmation;
                    this._config = newConfig;
                    this._fireConfigChangedWithFlags();
                  }}
                ></ha-textfield>
              </div>
              <div class="config-row">
                <ha-textfield
                  label="Confirmation Title (optional)"
                  .value=${confirmationConfig.title || ''}
                  @keydown=${(e) => {
                    e._processedByActionsCardEditor = true;
                  }}
                  @change=${(e) => {
                    e._processedByActionsCardEditor = true;
                    const newConfig = { ...this._config };
                    const newConfirmation =
                      typeof newConfig[actionType].confirmation === 'object'
                        ? { ...newConfig[actionType].confirmation }
                        : {};
                    newConfirmation.title = e.target.value;
                    newConfig[actionType].confirmation = newConfirmation;
                    this._config = newConfig;
                    this._fireConfigChangedWithFlags();
                  }}
                ></ha-textfield>
              </div>
              <div class="config-row">
                <ha-textfield
                  label="Confirm Button Text"
                  .value=${confirmationConfig.confirm_text || 'Confirm'}
                  @keydown=${(e) => {
                    e._processedByActionsCardEditor = true;
                  }}
                  @change=${(e) => {
                    e._processedByActionsCardEditor = true;
                    const newConfig = { ...this._config };
                    const newConfirmation =
                      typeof newConfig[actionType].confirmation === 'object'
                        ? { ...newConfig[actionType].confirmation }
                        : {};
                    newConfirmation.confirm_text = e.target.value;
                    newConfig[actionType].confirmation = newConfirmation;
                    this._config = newConfig;
                    this._fireConfigChangedWithFlags();
                  }}
                ></ha-textfield>
              </div>
              <div class="config-row">
                <ha-textfield
                  label="Cancel Button Text"
                  .value=${confirmationConfig.dismiss_text || 'Cancel'}
                  @keydown=${(e) => {
                    e._processedByActionsCardEditor = true;
                  }}
                  @change=${(e) => {
                    e._processedByActionsCardEditor = true;
                    const newConfig = { ...this._config };
                    const newConfirmation =
                      typeof newConfig[actionType].confirmation === 'object'
                        ? { ...newConfig[actionType].confirmation }
                        : {};
                    newConfirmation.dismiss_text = e.target.value;
                    newConfig[actionType].confirmation = newConfirmation;
                    this._config = newConfig;
                    this._fireConfigChangedWithFlags();
                  }}
                ></ha-textfield>
              </div>
            </div>
          `
        : ''}
    `;
  }

  /**
   * Renders the hold action timing configuration
   * @param {Object} holdAction - The hold action configuration
   * @returns {TemplateResult} The hold time configuration template
   * @private
   */
  _renderHoldTimeConfig(holdAction) {
    if (!holdAction || holdAction.action === 'none') {
      return html``;
    }

    return html`
      <div class="config-row">
        <ha-textfield
          label="Hold Time (ms)"
          type="number"
          min="100"
          max="2000"
          step="100"
          .value=${holdAction.hold_time || 500}
          data-option="hold_action"
          data-attribute="hold_time"
          @keydown=${(e) => {
            e._processedByActionsCardEditor = true;
          }}
          @change=${this._valueChanged}
          suffix="ms"
        ></ha-textfield>
        <div class="help-text">
          Time in milliseconds to hold before triggering the action (default: 500ms)
        </div>
      </div>

      <!-- Show Progress Option -->
      <div class="option-row">
        <div class="option-label">
          Show Progress Indicator
          <div class="option-description">
            Display visual feedback during hold and fire action on release
          </div>
        </div>
        <ha-switch
          .checked=${holdAction.show_progress || false}
          data-option="hold_action"
          data-attribute="show_progress"
          @change=${this._valueChanged}
        ></ha-switch>
      </div>
    `;
  }

  /**
   * Render the editor UI
   * @returns {TemplateResult} The template to render
   */
  render() {
    if (!this.hass || !this._config) {
      return html`<ha-circular-progress active alt="Loading editor"></ha-circular-progress>`;
    }

    return html`
      <div class="card-config" @keydown=${(e) => (e._processedByActionsCardEditor = true)}>
        ${this._renderInfoPanel()} ${this._renderCardManagement()} ${this._renderCardPicker()}
        ${this._renderGeneralOptions()} ${this._renderActionsConfiguration()}
        ${this._renderSwipeActionsConfiguration()} ${this._renderFooter()}
      </div>
    `;
  }

  /**
   * Render the information panel
   * @returns {TemplateResult} Info panel template
   * @private
   */
  _renderInfoPanel() {
    return html`
      <div class="info-panel">
        <div class="info-icon">i</div>
        <div class="info-text">
          This card wraps another card to add tap, hold, double-tap actions and/or swipe actions.
          First, select a card to wrap below, then configure the actions you want to enable.
        </div>
      </div>
    `;
  }

  /**
   * Render the card management section
   * @returns {TemplateResult} Card management template
   * @private
   */
  _renderCardManagement() {
    const hasCard = !!this._config.card;
    const cardDescriptor = hasCard
      ? getCardDescriptor(this._config.card)
      : { typeName: '', name: '' };

    return html`
      <div class="section">
        <div class="section-header">Wrapped Card</div>

        ${!hasCard
          ? html`
              <div class="no-card">
                <div class="no-card-message">
                  No card selected. Use the card picker below to choose a card to wrap.
                </div>
              </div>
            `
          : html`
              <div class="card-row">
                <div class="card-info">
                  <span class="card-type">${cardDescriptor.typeName}</span>
                  ${cardDescriptor.name
                    ? html`<span class="card-name">(${cardDescriptor.name})</span>`
                    : ''}
                </div>
                <div class="card-actions">
                  <ha-icon-button
                    label="Edit Card"
                    path="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                    @click=${() => this._editWrappedCard()}
                  ></ha-icon-button>
                  <ha-icon-button
                    label="Delete Card"
                    path="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                    @click=${() => this._removeWrappedCard()}
                    style="color: var(--error-color);"
                  ></ha-icon-button>
                </div>
              </div>
            `}
      </div>
    `;
  }

  /**
   * Render the card picker section
   * @returns {TemplateResult} Card picker template
   * @private
   */
  _renderCardPicker() {
    const hasCard = !!this._config.card;

    if (hasCard || !this._shouldShowCardPicker()) {
      return html``;
    }

    return html`
      <div id="card-picker-container">
        <hui-card-picker
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          @config-changed=${this._boundHandleCardPicked}
          label="Pick a card to wrap"
        ></hui-card-picker>
      </div>
    `;
  }

  /**
   * Render the general options section
   * @returns {TemplateResult} General options template
   * @private
   */
  _renderGeneralOptions() {
    return html`
      <div class="section">
        <div class="section-header">General Options</div>

        <div class="option-row">
          <div class="option-label">
            Prevent Default Entity Dialog
            <div class="option-description">
              When enabled, prevents the default entity information dialog from opening
            </div>
          </div>
          <ha-switch
            .checked=${this._config.prevent_default_dialog || false}
            @change=${(e) => {
              e._processedByActionsCardEditor = true;
              const newConfig = { ...this._config };
              newConfig.prevent_default_dialog = e.target.checked;
              this._config = newConfig;
              this._fireConfigChangedWithFlags();
            }}
          ></ha-switch>
        </div>
      </div>
    `;
  }

  /**
   * Render the actions configuration section
   * @returns {TemplateResult} Actions configuration template
   * @private
   */
  _renderActionsConfiguration() {
    // Use || for safe defaults when rendering
    const tapAction = this._config.tap_action || { action: 'none' };
    const holdAction = this._config.hold_action || { action: 'none' };
    const doubleTapAction = this._config.double_tap_action || { action: 'none' };

    return html`
      <ha-expansion-panel
        .expanded=${this._actionsExpanded}
        @expanded-changed=${(e) => {
          e.stopPropagation();
          this._handlePanelExpanded('actions', e);
        }}
      >
        <div slot="header" role="heading" aria-level="3">
          <ha-icon icon="mdi:gesture-tap"></ha-icon>
          Actions
        </div>

        <div class="section">
          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:gesture-tap" style="margin-right: 8px;"></ha-icon>
              Tap Action
            </div>
            ${this._renderActionTypeDropdown('tap_action', tapAction)}
            ${this._renderActionDetails('tap_action', tapAction)}
            ${this._renderConfirmationConfig('tap_action', tapAction)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:gesture-tap-hold" style="margin-right: 8px;"></ha-icon>
              Hold Action
            </div>
            ${this._renderActionTypeDropdown('hold_action', holdAction)}
            ${this._renderActionDetails('hold_action', holdAction)}
            ${this._renderHoldTimeConfig(holdAction)}
            ${this._renderConfirmationConfig('hold_action', holdAction)}
          </div>

          <div class="action-container">
            <div class="section-header">
              <ha-icon icon="mdi:gesture-double-tap" style="margin-right: 8px;"></ha-icon>
              Double Tap Action
            </div>
            ${this._renderActionTypeDropdown('double_tap_action', doubleTapAction)}
            ${this._renderActionDetails('double_tap_action', doubleTapAction)}
            ${this._renderConfirmationConfig('double_tap_action', doubleTapAction)}
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  /**
   * Render the footer with version and GitHub link
   * @returns {TemplateResult} Footer template
   * @private
   */
  _renderFooter() {
    return html`
      <div class="version-display">
        <div class="version-text">Actions Card</div>
        <div class="version-badges">
          <div class="version-badge">v${CARD_VERSION}</div>
          <a
            href="https://github.com/nutteloost/actions-card"
            target="_blank"
            rel="noopener noreferrer"
            class="github-badge"
          >
            <ha-icon icon="mdi:github"></ha-icon>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // Handle expansion state changes
    if (
      changedProperties.has('_actionsExpanded') ||
      changedProperties.has('_swipeActionsExpanded')
    ) {
      // Force the expansion panels to update their state
      const actionPanel = this.shadowRoot?.querySelector('ha-expansion-panel');
      const swipePanel = this.shadowRoot?.querySelectorAll('ha-expansion-panel')[1];

      if (actionPanel && this._actionsExpanded !== undefined) {
        actionPanel.expanded = this._actionsExpanded;
      }
      if (swipePanel && this._swipeActionsExpanded !== undefined) {
        swipePanel.expanded = this._swipeActionsExpanded;
      }
    }

    // Only ensure card picker is loaded when config changes AND no card is configured
    // Use immediate loading if showing picker after removal
    if (changedProperties.has('_config') && !this._config?.card) {
      if (this._showPickerAfterRemoval) {
        // Don't debounce when showing picker after removal
        setTimeout(() => this._ensureCardPickerLoaded(), 50);
      } else {
        this._debouncedEnsureCardPickerLoaded();
      }
    }
  }

  /**
   * Define CSS styles for the editor
   * @returns {CSSResult} CSS styles
   */
  static get styles() {
    return getEditorStyles();
  }
}
