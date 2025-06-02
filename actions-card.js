/**
 * Actions Card for Home Assistant
 * 
 * A custom card that wraps another card and adds tap, hold, and double tap actions.
 * Allows adding interactive behaviors to any other card type.
 * 
 * @author Martijn Oost (nutteloost)
 * @version 1.1.5
 * @license MIT
 * @see {@link https://github.com/nutteloost/actions-card}
 * 
 * Installation:
 * 1. Install HACS: https://hacs.xyz
 * 2. Add this repo as a custom repository in HACS: https://github.com/nutteloost/actions-card
 * 3. Install the card via HACS
 * 4. Add the card to your dashboard
 */

import { LitElement, html, css } from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';
// Import fireEvent helper
import { fireEvent } from "https://unpkg.com/custom-card-helpers@^1?module";

// Version management
const CARD_VERSION = "1.1.5";

// Debug configuration - set to false for production
const DEBUG = false;

/**
 * Enhanced debugging function that categorizes log messages
 * @param {string} category - Category of the log message
 * @param {...any} args - Arguments to log
 */
const logDebug = (category, ...args) => {
    if (!DEBUG) return;
    const categoryColors = {
        'EDITOR': 'color: #4caf50; font-weight: bold',
        'EVENT': 'color: #2196f3; font-weight: bold',
        'CONFIG': 'color: #ff9800; font-weight: bold',
        'ACTION': 'color: #9c27b0; font-weight: bold',
        'ERROR': 'color: #f44336; font-weight: bold',
        'INIT': 'color: #795548; font-weight: bold',
        'DEFAULT': 'color: #607d8b; font-weight: bold'
    };
    
    const style = categoryColors[category] || categoryColors.DEFAULT;
    console.debug(`%cActionsCard [${category}]:`, style, ...args);
};

/**
 * Actions Card - A custom card that wraps another card and adds tap, hold, and double tap actions
 * 
 * @class ActionsCard
 * @extends {LitElement}
 */
class ActionsCard extends LitElement {
  /**
   * Define properties for the card
   * @returns {Object} Properties for the component
   */
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _childCard: { type: Object, state: true } // Mark as state so changes trigger render
    };
  }

  /**
   * Return a configuration element for the visual editor
   * @returns {HTMLElement} Configuration element for the visual editor
   */
  static getConfigElement() {
    return document.createElement('actions-card-editor');
  }

  /**
   * Return stub configuration for the visual editor preview
   * @returns {Object} Stub configuration
   */
  static getStubConfig() {
    // Keep the stub config simple, the preview handles the initial state
    return {
      card: null, // Start with no card defined for the preview state
      tap_action: { action: 'none' },
      hold_action: { action: 'none' },
      double_tap_action: { action: 'none' },
      prevent_default_dialog: false
    };
  }

  /**
   * Constructor for the Actions Card
   */
  constructor() {
    super();
    this._holdTimeout = null;
    this._clickTimeout = null;
    this._holdTriggered = false;
    this._clickCount = 0;
    this._lastActionTime = 0;
    this._childCard = null; // Initialize as null
    this.config = {}; // Initialize config
    this._triedPreload = false; // Track preloading attempts
    this._childCardClickHandler = null; // Track the click handler
  }

  /**
   * Set configuration for the card
   * @param {Object} config - Configuration object
   */
  setConfig(config) {
    logDebug("CONFIG", "setConfig received:", JSON.stringify(config));
    
    // Store the raw config
    this.config = config;

    // Initialize prevent_default_dialog if not set
    if (this.config.prevent_default_dialog === undefined) {
        this.config.prevent_default_dialog = false;
    }

    // Only attempt to create the card element if a card config exists
    if (config && config.card) {
        // Check if the card config itself actually changed to avoid unnecessary rebuilds
        if (!this._childCard || JSON.stringify(this._currentCardConfig) !== JSON.stringify(config.card)) {
            this._currentCardConfig = JSON.parse(JSON.stringify(config.card)); // Store a copy
            this._createCardElement(config.card);
        }
    } else {
        // If no card config, ensure _childCard is null to show preview
        this._childCard = null;
        this._currentCardConfig = null;
        this.requestUpdate(); // Ensure render is called
    }
  }

  /**
   * Create the child card element based on the provided configuration
   * @param {Object} cardConfig - Configuration for the child card
   * @private
   */
  _createCardElement(cardConfig) {
    if (!cardConfig) {
        this._childCard = null;
        this.requestUpdate();
        return;
    }

    try {
        // Handle both array and object formats for the card config
        const actualCardConfig = Array.isArray(cardConfig) ? cardConfig[0] : cardConfig;
        const cardType = actualCardConfig.type;

        if (!cardType) {
            throw new Error('Card configuration requires a `type`.');
        }

        const isEnergyCard = cardType.includes('energy');
        const elementTag = cardType.startsWith('custom:')
            ? cardType.substring(7)
            : `hui-${cardType}-card`;

        // For energy cards, take a different approach
        if (isEnergyCard) {
            logDebug("INIT", `Creating energy card: ${elementTag}`);
            this._createEnergyCard(elementTag, actualCardConfig);
            return;
        }

        // Create the element
        const element = document.createElement(elementTag);

        // Check if the element has setConfig before proceeding
        if (typeof element.setConfig !== 'function') {
            logDebug("INIT", `Element ${elementTag} created but setConfig not available, will retry in 100ms`);
            setTimeout(() => this._createCardElement(cardConfig), 100);
            return;
        }

        // Set config and hass
        element.setConfig(actualCardConfig);
        if (this.hass) {
            element.hass = this.hass;
        }

        // Update the internal state
        this._childCard = element;
        logDebug("INIT", "Child card created/updated:", elementTag);

    } catch (e) {
        console.error("ActionsCard: Error creating child card element:", e, cardConfig);
        // Create an error card instead
        const errorCard = document.createElement('hui-error-card');
        errorCard.setConfig({
            type: 'error',
            error: e.message,
            origConfig: cardConfig,
        });
        if (this.hass) {
            errorCard.hass = this.hass;
        }
        this._childCard = errorCard;
    }
    
    // Trigger a re-render
    this.requestUpdate();
  }

  /**
   * Special handling for energy cards that need more time to initialize
   * @param {string} elementTag - The tag name of the element to create
   * @param {Object} config - The card configuration
   * @private
   */
  _createEnergyCard(elementTag, config) {
    logDebug("INIT", `Starting specialized energy card creation: ${elementTag}`);
    
    // First, try to ensure the element is defined
    const checkElementDefined = () => {
        if (customElements.get(elementTag)) {
            createElementWithRetry();
        } else {
            logDebug("INIT", `Energy element ${elementTag} not defined yet, waiting...`);
            setTimeout(checkElementDefined, 200);
        }
    };
    
    // Then, create the element with retry logic
    const createElementWithRetry = () => {
        try {
            const element = document.createElement(elementTag);
            
            // Test if the element has the required methods
            if (typeof element.setConfig !== 'function') {
                logDebug("INIT", `Element ${elementTag} created but setConfig not available yet`);
                setTimeout(createElementWithRetry, 200);
                return;
            }
            
            // Make sure Lovelace is loaded
            if (!window.customCards && !window.loadCardHelpers && typeof element.getCardSize !== 'function') {
                logDebug("INIT", "Waiting for Lovelace helpers to be available");
                setTimeout(createElementWithRetry, 300);
                return;
            }
            
            // Proceed with configuration
            try {
                element.setConfig(config);
                
                if (this.hass) {
                    element.hass = this.hass;
                }
                
                // Update internal state
                this._childCard = element;
                logDebug("INIT", `Energy card ${elementTag} successfully created and configured`);
                this.requestUpdate();
                
            } catch (configError) {
                console.error(`ActionsCard: Error configuring ${elementTag}:`, configError);
                this._createErrorCard(`Failed to configure ${elementTag}: ${configError.message}`, config);
            }
            
        } catch (creationError) {
            console.error(`ActionsCard: Error creating ${elementTag}:`, creationError);
            this._createErrorCard(`Failed to create ${elementTag}: ${creationError.message}`, config);
        }
    };
    
    // Try to force load energy components if not already loaded
    this._preloadEnergyComponents();
    
    // Start the element creation process
    checkElementDefined();
  }

  /**
   * Creates an error card
   * @param {string} errorMessage - The error message to display
   * @param {Object} origConfig - The original configuration
   * @private
   */
  _createErrorCard(errorMessage, origConfig) {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
        type: 'error',
        error: errorMessage,
        origConfig: origConfig,
    });
    if (this.hass) {
        errorCard.hass = this.hass;
    }
    this._childCard = errorCard;
    this.requestUpdate();
  }

  /**
   * Try to preload the energy components
   * @private
   */
  _preloadEnergyComponents() {
    // Check if we've already tried to preload
    if (this._triedPreload) return;
    this._triedPreload = true;
    
    logDebug("INIT", "Attempting to preload energy components");
    
    // These are the energy card components we want to ensure are loaded
    const energyComponents = [
        'hui-energy-distribution-card',
        'hui-energy-solar-graph-card',
        'hui-energy-usage-graph-card',
        'hui-energy-date-selection-card'
    ];
    
    // Try to load the components via dynamic import if possible
    if (window.loadCardHelpers) {
        window.loadCardHelpers().then(helpers => {
            if (helpers && helpers.createCardElement) {
                logDebug("INIT", "Using loadCardHelpers to preload energy components");
                
                // Create a temporary div to hold the elements
                const tempDiv = document.createElement('div');
                tempDiv.style.display = 'none';
                document.body.appendChild(tempDiv);
                
                // Try to create each energy component
                energyComponents.forEach(tag => {
                    try {
                        const cardType = tag.replace('hui-', '').replace('-card', '');
                        helpers.createCardElement({type: cardType}).then(el => {
                            tempDiv.appendChild(el);
                            logDebug("INIT", `Preloaded ${tag} successfully`);
                        }).catch(e => {
                            logDebug("INIT", `Error preloading ${tag}: ${e.message}`);
                        });
                    } catch (e) {
                        logDebug("INIT", `Error creating ${tag} with helpers: ${e.message}`);
                    }
                });
                
                // Remove the temporary div after a delay
                setTimeout(() => {
                    if (tempDiv.parentNode) {
                        document.body.removeChild(tempDiv);
                    }
                }, 2000);
            }
        }).catch(e => {
            logDebug("INIT", "Error loading card helpers:", e);
        });
    } else {
        logDebug("INIT", "loadCardHelpers not available, using fallback method");
        
        // Fallback: try to force register the components directly
        energyComponents.forEach(tag => {
            if (!customElements.get(tag)) {
                logDebug("INIT", `Attempting to load ${tag} directly`);
                
                // Try to create the element anyway - this might trigger lazy loading
                try {
                    const tempElement = document.createElement(tag);
                    // Just create it to force registration, don't need to keep it
                } catch (e) {
                    logDebug("INIT", `Error creating ${tag}: ${e.message}`);
                }
            }
        });
    }
  }

  /**
   * Set up event listeners to prevent default dialog behavior
   * @private
   */
  _preventDefaultDialogs() {
    if (!this._childCard || !this.config.prevent_default_dialog) return;

    // Clean up any existing handler first
    this._cleanupDefaultDialogPrevention();

    // Capture hass-more-info events from child card
    this._childCardClickHandler = (ev) => {
        if (ev.type === 'hass-more-info') {
            logDebug("EVENT", "Preventing default hass-more-info dialog");
            ev.stopPropagation();
            ev.preventDefault();
        }
    };
    
    // Apply handlers to the child card and its shadow root if available
    this._childCard.addEventListener('hass-more-info', this._childCardClickHandler, true);
    
    // Try to get to internal DOM elements if possible
    if (this._childCard.shadowRoot) {
        this._childCard.shadowRoot.addEventListener('hass-more-info', this._childCardClickHandler, true);
    }

    logDebug("INIT", "Set up event listeners to prevent default dialog behavior");
  }

  /**
   * Clean up event listeners for default dialog prevention
   * @private
   */
  _cleanupDefaultDialogPrevention() {
    if (this._childCard && this._childCardClickHandler) {
        this._childCard.removeEventListener('hass-more-info', this._childCardClickHandler, true);
        if (this._childCard.shadowRoot) {
            this._childCard.shadowRoot.removeEventListener('hass-more-info', this._childCardClickHandler, true);
        }
        this._childCardClickHandler = null;
    }
  }

  /**
   * Update hass object and propagate to child card
   * @param {Object} hass - Home Assistant object
   */
  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;

    if (this._childCard && this._childCard.hass !== hass) {
      try {
        this._childCard.hass = hass;
      } catch (e) {
         console.error("ActionsCard: Error setting hass on child card:", e);
         // If setting hass fails, might need to recreate the card
         if (this.config && this.config.card) {
             this._createCardElement(this.config.card);
         }
      }
    }

    // Request update if hass object itself changed, even if references inside are the same
    if (oldHass !== hass) {
        this.requestUpdate();
    }
  }

  /**
   * Return the card size for proper layout
   * @returns {number} Card size
   */
  getCardSize() {
    // If showing preview, return a moderate size
    if (!this._childCard) {
        return 3;
    }
    // Otherwise, delegate to the child card if possible
    if (this._childCard && typeof this._childCard.getCardSize === 'function') {
        try {
            return this._childCard.getCardSize();
        } catch (e) {
            console.warn("ActionsCard: Could not get card size from child", e);
            return 1; // Fallback size
        }
    }
    return 1; // Default size
  }

  /**
   * Lifecycle method when component is updated
   * @param {Map} changedProperties - Map of changed properties
   */
  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('config') && this.config && this.config.prevent_default_dialog) {
        // Apply prevention of default dialogs when config changes
        this._preventDefaultDialogs();
    }
  }

  /**
   * Lifecycle method when component is connected to DOM
   */
  connectedCallback() {
    super.connectedCallback();
    if (this.config && this.config.prevent_default_dialog) {
        this._preventDefaultDialogs();
    }
  }

  /**
   * Lifecycle method when component is disconnected from DOM
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupDefaultDialogPrevention();
  }

  /**
   * Handles different action types (tap, hold, double-tap) 
   * @param {string} actionType - Type of action to handle ('tap', 'hold', 'double_tap')
   * @private
   */
  _handleAction(actionType = 'tap') {
    const actionConfig = this.config[`${actionType}_action`];
    if (!actionConfig || actionConfig.action === 'none') return;
    
    logDebug("ACTION", `Handling ${actionType} action:`, actionConfig);
  
    if (actionConfig.confirmation) {
      let confirmationText = 'Are you sure?';
      let confirmationTitle = undefined;
      let confirmText = "Confirm";
      let dismissText = "Cancel";
      
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
    } else {
      this._executeAction(actionConfig);
    }
  }

  /**
   * Executes the configured action
   * @param {Object} actionConfig - Configuration for the action to execute
   * @private
   */
  _executeAction(actionConfig) {
    this._lastActionTime = Date.now();
    if (!this._hass || !actionConfig.action) return;

    try {
      logDebug("ACTION", "Executing action:", actionConfig.action);
      switch (actionConfig.action) {
        case 'navigate':
          this._executeNavigateAction(actionConfig);
          break;
        case 'url':
          this._executeUrlAction(actionConfig);
          break;
        case 'toggle':
          this._executeToggleAction(actionConfig);
          break;
        case 'call-service': // Changed from 'perform-action' to match HA standard
          this._executeServiceAction(actionConfig);
          break;
        case 'more-info':
          this._executeMoreInfoAction(actionConfig);
          break;
        case 'assist':
          this._executeAssistAction(actionConfig);
          break;
        case 'fire-dom-event': // Added for more flexibility
          this._executeDomEventAction(actionConfig);
          break;
        default:
          console.warn("ActionsCard: Unrecognized action:", actionConfig.action);
      }
    } catch (e) {
      console.error("ActionsCard: Error executing action:", actionConfig.action, e);
    }
  }

  /**
   * Executes a navigate action
   * @param {Object} actionConfig - Configuration for the navigate action
   * @private
   */
  _executeNavigateAction(actionConfig) {
    const path = actionConfig.navigation_path || '';
    const replace = actionConfig.navigation_replace === true;
    if (path) { // Only navigate if path is defined
      logDebug("ACTION", "Navigating to:", path, {replace});
      if (replace) {
        window.history.replaceState(null, "", path);
      } else {
        window.history.pushState(null, "", path);
      }
      fireEvent(window, 'location-changed', { replace });
    } else {
      console.warn("ActionsCard: Navigate action called without navigation_path");
    }
  }

  /**
   * Executes a URL action
   * @param {Object} actionConfig - Configuration for the URL action
   * @private
   */
  _executeUrlAction(actionConfig) {
    const url = actionConfig.url_path || '';
    if (url) { // Only open if url is defined
      logDebug("ACTION", "Opening URL:", url, {target: actionConfig.target || '_blank'});
      window.open(url, actionConfig.target || '_blank'); // Allow specifying target
    } else {
      console.warn("ActionsCard: URL action called without url_path");
    }
  }

  /**
   * Executes a toggle action
   * @param {Object} actionConfig - Configuration for the toggle action
   * @private
   */
  _executeToggleAction(actionConfig) {
    const toggleEntity = this._getEntityId(actionConfig);
    if (toggleEntity) {
      logDebug("ACTION", "Toggling entity:", toggleEntity);
      this._hass.callService('homeassistant', 'toggle', { entity_id: toggleEntity });
    } else {
      console.warn("ActionsCard: Toggle action called without a valid entity_id");
    }
  }

  /**
   * Executes a service call action
   * @param {Object} actionConfig - Configuration for the service call action
   * @private
   */
  _executeServiceAction(actionConfig) {
    if (!actionConfig.service) {
      console.warn("ActionsCard: Call-service action called without service defined");
      return;
    }
    const [domain, service] = actionConfig.service.split('.', 2);
    if (!domain || !service) {
      console.warn("ActionsCard: Invalid service format:", actionConfig.service);
      return;
    }
    // Use service_data or data for compatibility
    const serviceData = actionConfig.service_data || actionConfig.data || {};
    // Target handling
    const target = actionConfig.target || (serviceData.entity_id ? { entity_id: serviceData.entity_id } : {});
    // Remove entity_id from serviceData if it's in target
    if (target.entity_id && serviceData.entity_id) delete serviceData.entity_id;

    logDebug("ACTION", "Calling service:", `${domain}.${service}`, {serviceData, target});
    this._hass.callService(domain, service, serviceData, target);
  }

  /**
   * Executes a more-info action
   * @param {Object} actionConfig - Configuration for the more-info action
   * @private
   */
  _executeMoreInfoAction(actionConfig) {
    const entityId = this._getEntityId(actionConfig);
    if (entityId) {
      logDebug("ACTION", "Showing more-info for entity:", entityId);
      fireEvent(this, 'hass-more-info', { entityId });
    } else {
      console.warn("ActionsCard: More-info action called without a valid entity_id");
    }
  }

  /**
   * Executes an assist action
   * @param {Object} actionConfig - Configuration for the assist action
   * @private
   */
  _executeAssistAction(actionConfig) {
    logDebug("ACTION", "Executing assist action", {
      pipeline_id: actionConfig.pipeline_id || 'last_used',
      start_listening: actionConfig.start_listening === true
    });
    fireEvent(this, "assist", {
      pipeline_id: actionConfig.pipeline_id || 'last_used',
      start_listening: actionConfig.start_listening === true,
    });
  }

  /**
   * Executes a DOM event action
   * @param {Object} actionConfig - Configuration for the DOM event action
   * @private
   */
  _executeDomEventAction(actionConfig) {
    if (actionConfig.event_type) {
      logDebug("ACTION", "Firing DOM event:", actionConfig.event_type, actionConfig.event_data || null);
      fireEvent(this, actionConfig.event_type, actionConfig.event_data || null);
    } else {
      console.warn("ActionsCard: Fire-dom-event action called without event_type");
    }
  }

  /**
   * Get entity ID from configuration or fallback to wrapped card entity
   * @param {Object} actionConfig - Action configuration
   * @returns {string|null} Entity ID
   * @private
   */
  _getEntityId(actionConfig) {
    return actionConfig.entity || actionConfig.entity_id || this.config.entity || (this._childCard && this._childCard.config ? this._childCard.config.entity : null);
  }

  /**
   * Reset the internal state for action handling
   * @param {Event} ev - Event that triggered the reset
   * @private
   */
  _resetState(ev) {
    // Prevent nested actions-cards from clearing each other's state if event bubbles
    if (ev) ev.stopPropagation();

    clearTimeout(this._holdTimeout);
    clearTimeout(this._clickTimeout);
    this._holdTimeout = null;
    this._clickTimeout = null;
    this._holdTriggered = false;
    this._clickCount = 0;
  }

  /**
   * Handle pointer down event for action handling
   * @param {Event} ev - Pointer down event
   * @private
   */
  _onPointerDown(ev) {
    // Allow interaction with elements inside the child card (e.g., sliders, buttons)
    // Check if the event target is an interactive element or inside one.
    const interactiveTags = ['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA', 'A', 'HA-SLIDER', 'HA-SWITCH', 'PAPER-SLIDER', 'PAPER-BUTTON', 'MWC-BUTTON'];
    let targetElement = ev.target;
    while (targetElement && targetElement !== this) {
        if (interactiveTags.includes(targetElement.tagName) || targetElement.hasAttribute('actions-card-interactive')) {
            // Don't handle pointer down if on an interactive element
            logDebug("ACTION", "Pointer down ignored (interactive element):", targetElement.tagName);
            return;
        }
        targetElement = targetElement.parentElement || targetElement.getRootNode().host;
    }

    if (ev.button !== 0 && ev.pointerType === 'mouse') {
        logDebug("ACTION", "Pointer down ignored (not primary button)");
        return; // Only main mouse button
    }

    ev.stopPropagation();
    this._startX = ev.clientX; // Store start position for drag detection
    this._startY = ev.clientY;

    clearTimeout(this._holdTimeout); // Clear previous timer
    this._holdTriggered = false; // Reset hold flag

    if (this.config.hold_action && this.config.hold_action.action !== 'none') {
      logDebug("ACTION", "Starting hold timer");
      this._holdTimeout = window.setTimeout(() => {
        // Check if pointer moved significantly (drag/scroll) before triggering hold
        if (Math.abs(ev.clientX - this._startX) < 10 && Math.abs(ev.clientY - this._startY) < 10) {
            this._holdTriggered = true;
            this._handleAction('hold');
            // Reset click count after hold is triggered to prevent tap action
            this._clickCount = 0;
        } else {
            logDebug("ACTION", "Hold canceled (moved too much)");
            this._resetState(); // Reset if moved too much
        }
      }, this.config.hold_action.hold_time || 500); // Configurable hold time
    }
  }

  /**
   * Handle pointer up event for action handling
   * @param {Event} ev - Pointer up event
   * @private
   */
  _onPointerUp(ev) {
    if (ev.button !== 0 && ev.pointerType === 'mouse') {
        logDebug("ACTION", "Pointer up ignored (not primary button)");
        return;
    }
    
    ev.stopPropagation();

    // Significant movement cancels tap/double-tap
    const moved = Math.abs(ev.clientX - this._startX) > 10 || Math.abs(ev.clientY - this._startY) > 10;

    clearTimeout(this._holdTimeout); // Always clear hold timeout on pointer up

    if (this._holdTriggered || moved) {
        // If hold was already triggered or pointer moved significantly, reset everything
        logDebug("ACTION", "Tap canceled (hold already triggered or moved too much)");
        this._resetState();
        return;
    }

    // It's a potential tap or double tap
    this._clickCount++;
    logDebug("ACTION", `Click count: ${this._clickCount}`);

    if (this.config.double_tap_action && this.config.double_tap_action.action !== 'none') {
      // If double_tap is configured, wait for a potential second tap
      if (this._clickCount === 1) {
        logDebug("ACTION", "Waiting for potential second tap");
        this._clickTimeout = window.setTimeout(() => {
          // If timeout expires and it was only one click, perform tap action
          if (this._clickCount === 1) {
            logDebug("ACTION", "Single tap confirmed");
            this._handleAction('tap');
          }
          this._resetState(); // Reset after action or timeout
        }, 250); // Standard double-click timeout
      } else if (this._clickCount === 2) {
        logDebug("ACTION", "Double tap detected");
        clearTimeout(this._clickTimeout); // Cancel the single tap timeout
        this._handleAction('double_tap');
        this._resetState(); // Reset after double tap action
      }
    } else {
      // If double_tap is not configured, any click is a single tap
      logDebug("ACTION", "Single tap (double tap not configured)");
      this._handleAction('tap');
      this._resetState(); // Reset after tap action
    }
  }

  /**
   * Handle edit button click in preview mode
   * @param {Event} e - Click event
   * @private
   */
  _handleEditClick(e) {
      e.stopPropagation();
      logDebug("EDITOR", "Edit button clicked, firing show-edit-card event");
      fireEvent(this, 'show-edit-card', { element: this });
  }

  /**
   * Render the card UI
   * @returns {TemplateResult} HTML template
   */
  render() {
    // If no child card is configured or created, show the preview
    if (!this._childCard) {
      logDebug("INIT", "Rendering preview container");
      return html`
        <div class="preview-container">
            <div class="preview-icon-container">
                <ha-icon icon="mdi:gesture-tap-hold"></ha-icon>
            </div>
            <div class="preview-text-container">
                <div class="preview-title">Actions Card</div>
                <div class="preview-description">
                    Wrap another card to add tap, hold, or double tap actions. Configure the card to wrap below.
                </div>
            </div>
            <div class="preview-actions">
                <ha-button raised @click=${this._handleEditClick}
                          aria-label="Edit Card">
                    Edit Card
                </ha-button>
            </div>
        </div>
      `;
    }

    // Otherwise, render the wrapper and the child card
    const hasActions = this.config.tap_action?.action !== 'none' || 
                       this.config.hold_action?.action !== 'none' || 
                       this.config.double_tap_action?.action !== 'none';
    
    return html`
      <div
        @pointerdown="${this._onPointerDown}"
        @pointerup="${this._onPointerUp}"
        @pointercancel="${this._resetState}"
        @contextmenu="${(e) => { if (this.config.hold_action) e.preventDefault(); }}"
        style="cursor: ${hasActions ? 'pointer' : 'default'}; display: block; height: 100%;"
        aria-label="${hasActions ? 'Interactive card with actions' : ''}"
        role="${hasActions ? 'button' : ''}"
        ?prevent-default-dialog="${this.config.prevent_default_dialog}"
      >
        ${this._childCard}
      </div>
    `;
  }

  /**
   * Define CSS styles for the card
   * @returns {CSSResult} CSS styles
   */
  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%; /* Ensure host takes up space */
      }
      .preview-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 16px;
        box-sizing: border-box;
        height: 100%; /* Make preview fill space */
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: var(--ha-card-border-radius, 12px);
      }
      .preview-icon-container {
         margin-bottom: 16px;
      }
      .preview-icon-container ha-icon {
        color: var(--info-color, #4a90e2); /* Blue color */
        font-size: 48px; /* Large icon */
        width: 48px;
        height: 48px;
      }
       .preview-text-container {
         margin-bottom: 16px;
      }
      .preview-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
        color: var(--primary-text-color);
      }
      .preview-description {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-bottom: 16px;
        max-width: 300px; /* Prevent overly wide text */
        line-height: 1.4;
      }
       .preview-actions ha-button {
         /* Standard HA button styling */
       }
    `;
  }
}

/**
 * Enhanced editor for Actions Card
 * 
 * @class ActionsCardEditor
 * @extends {LitElement}
 */
class ActionsCardEditor extends LitElement {
    /**
     * Define properties for the editor
     * @returns {Object} Properties for the component
     */
    static get properties() {
        return {
            hass: { type: Object },
            _config: { type: Object, state: true },
            lovelace: { type: Object }
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
    }

    async connectedCallback() {
        super.connectedCallback();
        logDebug("EDITOR", "Editor connected to DOM");
        
        // CARD PICKER FIX: Ensure card picker is loaded before proceeding
        await this._ensureComponentsLoaded();
        
        // Call _ensureCardPickerLoaded after a short delay to ensure shadowRoot is ready
        setTimeout(() => this._ensureCardPickerLoaded(), 50);
        
        // Try to detect if we're in an editor dialog
        let parent = this.parentNode;
        while (parent) {
            if (parent.localName === 'hui-dialog-edit-card') {
                this._inEditorDialog = true;
                parent._hostingActionsCardEditor = true;
                logDebug("EDITOR", "Detected we're inside an editor dialog");
                break;
            }
            parent = parent.parentNode || (parent.getRootNode && parent.getRootNode().host);
        }
        
        // Setup global handlers to prevent editor dialog closure
        this._setupGlobalHandlers();
    }

    // CARD PICKER FIX: Add comprehensive component loading
    async _ensureComponentsLoaded() {
        const maxAttempts = 10;
        let attempts = 0;
        
        // First, try to load via existing cards (more reliable)
        while (!customElements.get("hui-card-picker") && attempts < maxAttempts) {
            await this._loadCustomElements();
            if (!customElements.get("hui-card-picker")) {
                await new Promise(resolve => setTimeout(resolve, 200));
                attempts++;
            }
        }
        
        // If still not loaded, try alternative approach
        if (!customElements.get("hui-card-picker")) {
            logDebug("EDITOR", "Primary loading failed, trying alternative approach");
            await this._tryAlternativeLoading();
        }
        
        if (!customElements.get("hui-card-picker")) {
            logDebug("EDITOR", "All loading attempts failed, card picker may not be available");
        } else {
            logDebug("EDITOR", "Successfully loaded hui-card-picker");
        }
    }
    
    async _loadCustomElements() {
        if (customElements.get("hui-card-picker")) {
            return; // Already loaded
        }
        
        try {
            // Try to load through known working card editors
            const loadAttempts = [
                () => import('/hacsfiles/ha-card-helpers/ha-card-helpers.js').catch(() => null),
                () => this._tryLoadViaExistingCards(),
                () => this._forceLoadCardPicker()
            ];
    
            for (const attempt of loadAttempts) {
                try {
                    await attempt();
                    if (customElements.get("hui-card-picker")) {
                        logDebug("EDITOR", "Component loaded successfully");
                        return;
                    }
                } catch (e) {
                    // Silent fail and try next method
                }
            }
        } catch (e) {
            logDebug("EDITOR", "Error in _loadCustomElements:", e);
        }
    }
    
    async _tryLoadViaExistingCards() {
        const cardTypes = [
            'hui-entities-card', 'hui-conditional-card', 'hui-vertical-stack-card', 
            'hui-horizontal-stack-card', 'hui-grid-card', 'hui-map-card'
        ];
        
        for (const cardType of cardTypes) {
            try {
                const cardElement = customElements.get(cardType);
                if (cardElement && cardElement.getConfigElement) {
                    await cardElement.getConfigElement();
                    if (customElements.get("hui-card-picker")) {
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
                if (helpers && customElements.get("hui-card-picker")) {
                    return;
                }
            }
            
            // Try to trigger via temporary element creation
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = '<hui-card-picker></hui-card-picker>';
            document.body.appendChild(tempDiv);
            await new Promise(resolve => setTimeout(resolve, 100));
            document.body.removeChild(tempDiv);
        } catch (e) {
            logDebug("EDITOR", "Alternative loading failed:", e);
        }
    }
    
    async _forceLoadCardPicker() {
        try {
            // Last resort: try to manually define if possible
            if (!customElements.get("hui-card-picker")) {
                // Trigger a UI refresh that might load missing components
                const event = new CustomEvent('hass-refresh', { bubbles: true, composed: true });
                this.dispatchEvent(event);
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        } catch (e) {
            // Final fallback failed
        }
    }

    // CARD PICKER FIX: Enhanced card picker loading method from v1.1.4
    _ensureCardPickerLoaded() {
        if (!this.shadowRoot) {
            logDebug("EDITOR", "_ensureCardPickerLoaded: No shadowRoot, retrying...");
            setTimeout(() => this._ensureCardPickerLoaded(), 100);
            return;
        }
        
        // Don't load picker if we already have a card configured
        if (this._config?.card && !this._showPickerAfterRemoval) {
            logDebug("EDITOR", "Card already configured, skipping picker load");
            return;
        }
        
        logDebug("EDITOR", "_ensureCardPickerLoaded called");
    
        const container = this.shadowRoot.querySelector('#card-picker-container');
        if (!container) {
            logDebug("EDITOR", "Card picker container not found in render, requesting update");
            this.requestUpdate();
            return;
        }
        
        container.style.display = 'block';
    
        if (!container.hasAttribute('event-barrier-applied')) {
            container.setAttribute('event-barrier-applied', 'true');
            
            // Add comprehensive event handling
            container.addEventListener('config-changed', (e) => {
                logDebug("EVENT", "Card picked in container:", e.detail?.config?.type);
                e._processedByActionsCardEditor = true;
                
                if (e.detail?.config) {
                    e.stopPropagation();
                    this._handleCardPicked({
                        detail: {
                            config: e.detail.config,
                            editorId: this._editorId
                        },
                        stopPropagation: () => {}
                    });
                }
            }, { capture: true });
            
            logDebug("EDITOR", "Applied event handling to card picker container");
        }
        
        let picker = container.querySelector('hui-card-picker');
        if (!picker) {
            logDebug("EDITOR", "Creating new hui-card-picker element");
            picker = document.createElement('hui-card-picker');
            picker.hass = this.hass;
            picker.lovelace = this.lovelace;
            picker.addEventListener('config-changed', this._boundHandleCardPicked);
            container.appendChild(picker);
        }
        
        // Ensure picker is visible and has content
        picker.style.display = 'block';
        
        if (picker.requestUpdate) {
            picker.requestUpdate();
        }
        
        // Verify picker has loaded properly
        setTimeout(() => {
            const hasContent = picker.shadowRoot?.querySelector('.cards-container, .card-grid, hui-card') || 
                              picker.querySelector('.cards-container, .card-grid, hui-card');
            if (!hasContent) {
                logDebug("EDITOR", "Card picker still appears empty, forcing another refresh");
                if (picker.requestUpdate) {
                    picker.requestUpdate();
                }
            } else {
                logDebug("EDITOR", "Card picker loaded successfully with content");
            }
        }, 200);
    }
    
    /**
     * Setup global event handlers to prevent dialog closure
     * @private
     */
    _setupGlobalHandlers() {
        // Create handler to mark our events
        this._globalEventHandler = (e) => {
            // Check if this event is from our editor
            if (e.target && this.shadowRoot && this.shadowRoot.contains(e.target)) {
                // Mark it as processed by actions card editor
                logDebug("EVENT", `Marking ${e.type} event as processed by actions card editor`);
                e._processedByActionsCardEditor = true;
                
                // For specific events that might cause problems, stop propagation
                if (e.type === 'keydown' || e.type === 'input' || e.type === 'change' || e.type === 'config-changed') {
                    e.stopPropagation();
                    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                }
            }
            
            // Special handling for search input events
            if (e.type === 'keydown' || e.type === 'input') {
                const isSearchInput = e.target.tagName === 'INPUT' && 
                               (e.target.type === 'search' || e.target.placeholder?.includes('Search'));
                if (isSearchInput) {
                    // Mark search events specifically
                    logDebug("EVENT", `Marking ${e.type} search input event as processed`);
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
        eventTypes.forEach(type => {
            document.addEventListener(type, this._globalEventHandler, { capture: true });
        });
        
        logDebug("EDITOR", "Global event handlers setup completed");
    }
    
    /**
     * Cleanup when component is disconnected
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        
        // Clean up global handlers
        if (this._globalEventHandler) {
            const eventTypes = ['keydown', 'input', 'change', 'click', 'config-changed'];
            eventTypes.forEach(type => {
                document.removeEventListener(type, this._globalEventHandler, { capture: true });
            });
        }
        
        // Clean up any open dialogs
        if (this._activeChildEditors) {
          this._activeChildEditors.forEach(dialog => {
            if (dialog.parentNode) {
              try {
                dialog.parentNode.removeChild(dialog);
              } catch (error) {
                console.warn("Error removing dialog:", error);
              }
            }
          });
          this._activeChildEditors.clear();
        }
        
        logDebug("EDITOR", "Editor disconnected from DOM and events cleaned up");
    }

    /**
     * Sets the configuration for the editor
     * @param {Object} config - The configuration object
     */
    setConfig(config) {
        if (!config) {
            throw new Error("Invalid configuration");
        }
        logDebug("CONFIG", "Editor setConfig received:", JSON.stringify(config));
        this._config = JSON.parse(JSON.stringify(config));
        
        // Initialize default values if not set
        if (!this._config.tap_action) {
            this._config.tap_action = { action: 'none' };
        }
        
        if (!this._config.hold_action) {
            this._config.hold_action = { action: 'none' };
        }
        
        if (!this._config.double_tap_action) {
            this._config.double_tap_action = { action: 'none' };
        }

        // Initialize prevent_default_dialog if not set
        if (this._config.prevent_default_dialog === undefined) {
            this._config.prevent_default_dialog = false;
        }
        
        // Ensure card picker is loaded after config is set
        setTimeout(() => this._ensureCardPickerLoaded(), 50);
        setTimeout(() => this._ensureCardPickerLoaded(), 200);
        setTimeout(() => this._ensureCardPickerLoaded(), 500);
    }

    /**
     * Handles value changes in the editor
     * @param {Event} ev - The change event
     * @private
     */
    _valueChanged(ev) {
        // Mark this event as processed
        ev._processedByActionsCardEditor = true;
        ev.stopPropagation(); // Prevent event bubbling
        
        if (!this._config || !ev.target) return;
        const target = ev.target;
        const option = target.configValue || target.getAttribute('data-option');
        const parentOption = target.parentElement?.configValue || target.parentElement?.getAttribute('data-option');
        const finalOption = option || parentOption;
        if (!finalOption) return;
        
        const key = target.configAttribute || target.getAttribute('data-attribute');

        // Handle action updates
        if (option && option.includes('_action')) {
            const actionConfig = {...(this._config[option] || {})};
            
            if (key) {
                if (target.type === 'checkbox') {
                    actionConfig[key] = target.checked;
                } else {
                    // ENTITY PICKER FIX: For entity pickers and other components, prioritize ev.detail.value
                    actionConfig[key] = ev.detail?.value ?? target.value ?? '';
                }
            } else {
                // Handle action type selector
                actionConfig.action = target.value;
            }
            
            logDebug("CONFIG", `Updating ${option}:`, actionConfig);
            this._config = {...this._config, [option]: actionConfig};
        } else if (option) {
            // Handle regular options
            let value;
            if (target.type === 'checkbox') {
                value = target.checked;
            } else {
                value = target.value;
            }
            
            logDebug("CONFIG", `Updating ${option}:`, value);
            this._config = {...this._config, [option]: value};
        }
        
        // Fire config changed with special flags to prevent editor closure
        this._fireConfigChangedWithFlags();
    }

    /**
     * Fires the config-changed event with special flags
     * @private
     */
    _fireConfigChangedWithFlags() {
        if (!this._config) return;
        
        // Create a custom event with the editor ID and flags
        const event = new CustomEvent('config-changed', {
            detail: { 
                config: this._config,
                editorId: this._editorId,
                fromActionCardEditor: true,
                preventDialogClose: true, // Add flag to prevent dialog closure
                inEditorDialog: this._inEditorDialog
            },
            bubbles: false // Set to false to prevent automatic bubbling
        });
        
        // Add property to event object to mark it
        event._processedByActionsCardEditor = true;
        
        logDebug("EVENT", "Firing config-changed event with special flags");
        this.dispatchEvent(event);
        
        // If in dialog, dispatch a more controlled event to update the parent config
        if (this._inEditorDialog) {
            // Find the dialog
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
                logDebug("EVENT", "Directly updating dialog config");
                try {
                    dialog._updateConfig(this._config);
                } catch (e) {
                    console.error("Error updating dialog config:", e);
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
        
        // Create a custom event with the editor ID
        const event = new CustomEvent('config-changed', {
            detail: { 
                config: this._config,
                editorId: this._editorId,
                fromActionCardEditor: true,
                inEditorDialog: this._inEditorDialog,
                preventDialogClose: true
            },
            bubbles: true,    // Allow it to bubble for proper handling
            composed: true    // Cross shadow DOM boundary
        });
        
        // Add property to event object to mark it
        event._processedByActionsCardEditor = true;
        
        logDebug("EVENT", "Firing config-changed event with config:", this._config);
        this.dispatchEvent(event);
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
            logDebug("EDITOR", "Card picked:", newCardConfig);
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
     * Opens the edit dialog for the wrapped card
     * @private
     */
    async _editWrappedCard() {
      if (!this._config?.card) {
          console.error("ActionsCardEditor: No card to edit");
          return;
      }
    
      const cardConfig = this._config.card;
      const hass = this.hass;
      const mainApp = document.querySelector('home-assistant');
      
      if (!hass || !mainApp) {
          console.error("ActionsCardEditor: Cannot find Home Assistant instance");
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
          const handleDialogClose = (e) => {
              dialog.removeEventListener('dialog-closed', handleDialogClose);
              
              this._activeChildEditors.delete(dialog);
              
              if (dialog.parentNode === document.body) {
                  try {
                      document.body.removeChild(dialog);
                  } catch (error) {
                      console.warn("Dialog already removed or not found:", error);
                  }
              }
              
              // Ensure card picker is visible after edit
              setTimeout(() => this._ensureCardPickerLoaded(), 100);
          };
          
          dialog.addEventListener('dialog-closed', handleDialogClose);
          
          // IMPORTANT: Using saveCardConfig instead of saveConfig
          const dialogParams = {
              cardConfig: cardConfig,
              lovelaceConfig: this.lovelace || mainApp.lovelace,
              saveCardConfig: async (savedCardConfig) => {
                  if (!savedCardConfig) return;
                  
                  // Update wrapped card
                  logDebug("CONFIG", "Updating wrapped card with saved config:", savedCardConfig);
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
          console.error("ActionsCardEditor: Error opening edit dialog:", err);
          
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

    // CARD PICKER FIX: Enhanced remove method from v1.1.4
    _removeWrappedCard() {
        if (!this._config) return;
        
        logDebug("EDITOR", "Removing wrapped card");
        const updatedConfig = {...this._config};
        delete updatedConfig.card;
        
        this._config = updatedConfig;
        
        // Set flag to show picker after removal
        this._showPickerAfterRemoval = true;
        
        this._fireConfigChangedWithFlags();
        this.requestUpdate();
        
        // Ensure card picker appears after removal with staggered attempts
        setTimeout(() => {
            this._ensureCardPickerLoaded();
            this._showPickerAfterRemoval = false; // Reset flag after showing
        }, 100);
        
        setTimeout(() => this._ensureCardPickerLoaded(), 300);
        setTimeout(() => this._ensureCardPickerLoaded(), 600);
    }

    // CARD PICKER FIX: Add method to check if picker should be shown
    _shouldShowCardPicker() {
        // Only show card picker when:
        // 1. No card is currently configured
        // 2. Editor is in a state where card selection is expected
        return !this._config?.card && (
            // Show during initial setup
            !this._config || 
            // Show after card removal
            this._showPickerAfterRemoval ||
            // Show if config exists but has no card
            (this._config && Object.keys(this._config).length > 0)
        );
    }

    /**
     * Gets a descriptive name for a card configuration
     * @param {Object} cardConfig - The card configuration
     * @returns {Object} An object with type name and card name
     * @private
     */
    _getCardDescriptor(cardConfig) {
        if (!cardConfig?.type) return { typeName: 'Unknown', name: '' };
        let type = cardConfig.type.startsWith('custom:') ? cardConfig.type.substring(7) : cardConfig.type;
        const typeName = type.split(/[-_]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
        const name = cardConfig.title || cardConfig.name || '';
        return { typeName, name };
    }

    /**
     * Renders the action type selection dropdown
     * @param {string} actionType - The action type (tap, hold, double_tap)
     * @param {Object} actionConfig - The current action configuration
     * @returns {TemplateResult} The dropdown template
     * @private
     */
    _renderActionTypeDropdown(actionType, actionConfig) {
        const title = {
            tap_action: 'Tap Action',
            hold_action: 'Hold Action',
            double_tap_action: 'Double Tap Action'
        }[actionType] || actionType.replace(/_/g, ' ');
        
        return html`
            <div class="action-row">
                <div class="action-label">${title}</div>
                <ha-select
                    label="Action"
                    .value=${actionConfig.action || 'none'}
                    data-option="${actionType}"
                    @selected=${this._valueChanged}
                    @closed=${(e) => {
                        e._processedByActionsCardEditor = true;
                        e.stopPropagation();
                    }}
                >
                    <mwc-list-item value="none">None</mwc-list-item>
                    <mwc-list-item value="toggle">Toggle</mwc-list-item>
                    <mwc-list-item value="navigate">Navigate</mwc-list-item>
                    <mwc-list-item value="url">URL</mwc-list-item>
                    <mwc-list-item value="call-service">Call Service</mwc-list-item>
                    <mwc-list-item value="more-info">More Info</mwc-list-item>
                    <mwc-list-item value="assist">Assist</mwc-list-item>
                    <mwc-list-item value="fire-dom-event">Fire DOM Event</mwc-list-item>
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
                            .value=${actionConfig.service_data ? JSON.stringify(actionConfig.service_data, null, 2) : '{}'}
                            data-option="${actionType}"
                            data-attribute="service_data"
                            @value-changed=${(e) => {
                                e._processedByActionsCardEditor = true;
                                try {
                                    const newConfig = {...this._config};
                                    newConfig[actionType] = {
                                        ...newConfig[actionType],
                                        service_data: JSON.parse(e.detail.value)
                                    };
                                    this._config = newConfig;
                                    this._fireConfigChangedWithFlags();
                                } catch (err) {
                                    console.error("Invalid service data:", err);
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
                            .value=${actionConfig.event_data ? JSON.stringify(actionConfig.event_data, null, 2) : '{}'}
                            data-option="${actionType}"
                            data-attribute="event_data"
                            @value-changed=${(e) => {
                                e._processedByActionsCardEditor = true;
                                try {
                                    const newConfig = {...this._config};
                                    newConfig[actionType] = {
                                        ...newConfig[actionType],
                                        event_data: JSON.parse(e.detail.value)
                                    };
                                    this._config = newConfig;
                                    this._fireConfigChangedWithFlags();
                                } catch (err) {
                                    console.error("Invalid event data:", err);
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
        const confirmationConfig = typeof actionConfig.confirmation === 'object' 
            ? actionConfig.confirmation 
            : (hasConfirmation ? { text: actionConfig.confirmation } : {});

        return html`
            <div class="option-row confirmation-row">
                <div class="option-label">Require confirmation</div>
                <ha-switch
                    .checked=${hasConfirmation}
                    @change=${(e) => {
                        e._processedByActionsCardEditor = true;
                        const newConfig = {...this._config};
                        newConfig[actionType] = {
                            ...newConfig[actionType],
                            confirmation: e.target.checked ? { text: "Are you sure?" } : false
                        };
                        this._config = newConfig;
                        this._fireConfigChangedWithFlags();
                        this.requestUpdate();
                    }}
                ></ha-switch>
            </div>
            
            ${hasConfirmation ? html`
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
                                const newConfig = {...this._config};
                                const newConfirmation = typeof newConfig[actionType].confirmation === 'object'
                                    ? {...newConfig[actionType].confirmation}
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
                                const newConfig = {...this._config};
                                const newConfirmation = typeof newConfig[actionType].confirmation === 'object'
                                    ? {...newConfig[actionType].confirmation}
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
                                const newConfig = {...this._config};
                                const newConfirmation = typeof newConfig[actionType].confirmation === 'object'
                                    ? {...newConfig[actionType].confirmation}
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
                                const newConfig = {...this._config};
                                const newConfirmation = typeof newConfig[actionType].confirmation === 'object'
                                    ? {...newConfig[actionType].confirmation}
                                    : {};
                                newConfirmation.dismiss_text = e.target.value;
                                newConfig[actionType].confirmation = newConfirmation;
                                this._config = newConfig;
                                this._fireConfigChangedWithFlags();
                            }}
                        ></ha-textfield>
                    </div>
                </div>
            ` : ''}
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

        const hasCard = !!this._config.card;
        const cardDescriptor = hasCard ? this._getCardDescriptor(this._config.card) : { typeName: '', name: '' };
        
        const tapAction = this._config.tap_action || { action: 'none' };
        const holdAction = this._config.hold_action || { action: 'none' };
        const doubleTapAction = this._config.double_tap_action || { action: 'none' };

        // Force card picker to load regardless of state
        setTimeout(() => this._ensureCardPickerLoaded(), 10);

        return html`
            <div class="card-config" @keydown=${(e) => e._processedByActionsCardEditor = true}>
                <!-- Information Panel -->
                <div class="info-panel">
                    <div class="info-icon">i</div>
                    <div class="info-text">
                        This card wraps another card to add tap, hold, and double-tap actions.
                        First, select a card to wrap below, then configure the actions you want to enable.
                    </div>
                </div>
                
                <!-- Card Management -->
                <div class="section wrapped-card-section">
                    <div class="section-header">Wrapped Card</div>
                    
                    ${!hasCard ? html`
                        <div class="no-card">
                            <div class="no-card-message">No card selected. Use the card picker below to choose a card to wrap.</div>
                        </div>
                    ` : html`
                        <div class="card-row">
                            <div class="card-info">
                                <span class="card-type">${cardDescriptor.typeName}</span>
                                ${cardDescriptor.name ? html`<span class="card-name">(${cardDescriptor.name})</span>` : ''}
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
                
                <!-- Card Picker (ENHANCED - only show when no card AND we should show it) -->
                ${!hasCard && this._shouldShowCardPicker() ? html`
                    <div id="card-picker-container">
                        <hui-card-picker
                            .hass=${this.hass}
                            .lovelace=${this.lovelace}
                            @config-changed=${this._boundHandleCardPicked}
                            label="Pick a card to wrap"
                        ></hui-card-picker>
                    </div>
                ` : ''}

                <!-- General Options -->
                <div class="section options-section">
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
                                const newConfig = {...this._config};
                                newConfig.prevent_default_dialog = e.target.checked;
                                this._config = newConfig;
                                this._fireConfigChangedWithFlags();
                            }}
                        ></ha-switch>
                    </div>
                </div>
                
                <!-- Actions Configuration -->
                <div class="section actions-section">
                    <div class="section-header">Actions</div>
                    
                    <!-- Tap Action -->
                    <div class="action-container">
                        ${this._renderActionTypeDropdown('tap_action', tapAction)}
                        ${this._renderActionDetails('tap_action', tapAction)}
                        ${this._renderConfirmationConfig('tap_action', tapAction)}
                    </div>
                    
                    <!-- Hold Action -->
                    <div class="action-container">
                        ${this._renderActionTypeDropdown('hold_action', holdAction)}
                        ${this._renderActionDetails('hold_action', holdAction)}
                        ${this._renderHoldTimeConfig(holdAction)}
                        ${this._renderConfirmationConfig('hold_action', holdAction)}
                    </div>
                    
                    <!-- Double Tap Action -->
                    <div class="action-container">
                        ${this._renderActionTypeDropdown('double_tap_action', doubleTapAction)}
                        ${this._renderActionDetails('double_tap_action', doubleTapAction)}
                        ${this._renderConfirmationConfig('double_tap_action', doubleTapAction)}
                    </div>
                </div>
                
                <!-- Version display -->
                <div class="version-display">
                    <div class="version-text">Actions Card</div>
                    <div class="version-badge">v${CARD_VERSION}</div>
                </div>
            </div>
        `;
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        
        // Ensure card picker is loaded after any render update
        if (changedProperties.has('_config')) {
            setTimeout(() => this._ensureCardPickerLoaded(), 50);
            setTimeout(() => this._ensureCardPickerLoaded(), 200);
        }
    }

    /**
     * Define CSS styles for the editor
     * @returns {CSSResult} CSS styles
     */
    static get styles() {
        return css`
            .card-config {
                /* Let HA handle padding */
            }
            
            .info-panel {
                display: flex;
                align-items: flex-start;
                padding: 12px;
                margin: 8px 0 24px 0;
                background-color: var(--primary-background-color);
                border-radius: 8px;
                border: 1px solid var(--divider-color);
            }
            
            .info-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: var(--info-color, #4a90e2);
                color: white;
                margin-right: 12px;
                flex-shrink: 0;
            }
            
            .info-text {
                flex-grow: 1;
                color: var(--primary-text-color);
                font-size: 14px;
            }
            
            .section {
                margin-bottom: 20px;
                padding-bottom: 16px;
                border-bottom: 1px solid var(--divider-color);
            }
            
            .section:last-of-type {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }
            
            .section-header {
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 8px;
                color: var(--primary-text-color);
                padding-bottom: 4px;
            }
            
            .option-row, .action-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 0;
                min-height: 40px;
            }
            
            .option-label, .action-label {
                flex: 1;
                margin-right: 12px;
                font-size: 14px;
                color: var(--primary-text-color);
            }
            
            .option-description {
                font-size: 12px;
                color: var(--secondary-text-color);
                margin-top: 2px;
            }
            
            .help-text {
                color: var(--secondary-text-color);
                font-size: 12px;
                padding: 0 4px;
                margin-top: 4px;
                margin-bottom: 12px;
            }
            
            .no-card {
                text-align: center;
                color: var(--secondary-text-color);
                padding: 16px;
                border: 1px dashed var(--divider-color);
                border-radius: var(--ha-card-border-radius, 4px);
                margin-bottom: 16px;
            }
            
            .card-row {
                display: flex;
                align-items: center;
                padding: 8px;
                border: 1px solid var(--divider-color);
                border-radius: var(--ha-card-border-radius, 4px);
                margin-bottom: 8px;
                background: var(--secondary-background-color);
            }
            
            .card-info {
                flex-grow: 1;
                display: flex;
                align-items: center;
                margin-right: 8px;
                overflow: hidden;
            }
            
            .card-type {
                font-size: 14px;
                color: var(--primary-text-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .card-name {
                font-size: 12px;
                color: var(--secondary-text-color);
                margin-left: 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .card-actions {
                display: flex;
                align-items: center;
                flex-shrink: 0;
            }
            
            .card-actions ha-icon-button {
                --mdc-icon-button-size: 36px;
                color: var(--secondary-text-color);
            }
            
            .card-actions ha-icon-button:hover {
                color: var(--primary-text-color);
            }
            
            #card-picker-container {
                display: block;
                margin-top: 16px;
                margin-bottom: 20px;
                padding-top: 16px;
                border-top: none;
            }
            
            .version-display {
                margin-top: 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid var(--divider-color);
                padding-top: 16px;
            }
            
            .version-text {
                color: var(--secondary-text-color);
                font-size: 14px;
                font-weight: 500;
            }
            
            .version-badge {
                background-color: var(--primary-color);
                color: var(--text-primary-color);
                border-radius: 16px;
                padding: 4px 12px;
                font-size: 14px;
                font-weight: 500;
                margin-left: auto;
            }
            
            ha-textfield, ha-select, ha-entity-picker {
                width: 100%;
                display: block;
                margin-bottom: 8px;
            }
            
            ha-switch {
                margin-left: 8px;
            }
            
            .config-row {
                margin-top: 8px;
                margin-bottom: 12px;
            }
            
            .action-container {
                background-color: var(--secondary-background-color);
                border-radius: var(--ha-card-border-radius, 4px);
                padding: 12px;
                margin-bottom: 16px;
            }
            
            .confirmation-row {
                margin-top: 8px;
                padding-top: 8px;
                border-top: 1px dashed var(--divider-color);
            }
            
            .confirmation-config {
                margin-top: 8px;
                margin-left: 16px;
                padding-left: 8px;
                border-left: 2px solid var(--divider-color);
            }
            
            .wrapped-card-section {
                margin-bottom: 0;
            }
        `;
    }
}

// Register card components
customElements.define('actions-card', ActionsCard);
customElements.define('actions-card-editor', ActionsCardEditor);

// Register card with HA
window.customCards = window.customCards || [];
if (!window.customCards.some(card => card.type === 'actions-card')) {
    window.customCards.push({
        type: 'actions-card',
        name: 'Actions Card',
        preview: true, // Indicate that a preview is available
        description: 'Wraps another card to add tap, hold, and double-tap actions.',
    });
}

// Display version information
console.info(
    `%c ACTIONS-CARD %c v${CARD_VERSION} %c`,
    "color: white; background: #9c27b0; font-weight: 700;",
    "color: #9c27b0; background: white; font-weight: 700;",
    "color: grey; background: white; font-weight: 400;"
);
