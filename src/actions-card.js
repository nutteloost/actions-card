/**
 * Actions Card - Main Component
 * A custom Home Assistant card that wraps another card and adds configurable
 * tap, hold, and double-tap actions. Supports various action types including
 * navigation, service calls, entity toggles, and more.
 *
 * Key Features:
 * - Wraps any existing card while preserving functionality
 * - Configurable tap, hold, and double-tap actions
 * - Action confirmation dialogs
 * - Prevention of default entity dialogs
 * - Robust error handling and fallback support
 */

import { LitElement, html } from 'lit';
import { logDebug } from './utils/debug.js';
import { loadCardHelpers } from './utils/helpers.js';
import { ActionExecutor } from './actions/action-executor.js';
import { getCardStyles } from './styles/card-styles.js';
import { UI_CONSTANTS } from './actions/action-types.js';

// Simple fireEvent implementation
const fireEvent = (node, type, detail = {}) => {
  const event = new CustomEvent(type, {
    detail,
    bubbles: true,
    composed: true
  });
  node.dispatchEvent(event);
};

/**
 * Actions Card - A custom card that wraps another card and adds tap, hold, and double tap actions
 *
 * @class ActionsCard
 * @extends {LitElement}
 */
export class ActionsCard extends LitElement {
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
    this._childCardClickHandler = null; // Track the click handler

    // Initialize card helpers
    this._cardHelpers = null;

    // Initialize action executor
    this._actionExecutor = null;
  }

  /**
   * Load card helpers asynchronously
   * @private
   */
  async _loadCardHelpers() {
    if (!this._cardHelpers) {
      try {
        this._cardHelpers = await loadCardHelpers();
        logDebug('INIT', 'Card helpers loaded successfully');
      } catch (e) {
        logDebug('ERROR', 'Failed to load card helpers:', e);
      }
    }
  }

  /**
   * Set configuration for the card
   * @param {Object} config - Configuration object
   */
  setConfig(config) {
    logDebug('CONFIG', 'setConfig received:', JSON.stringify(config));

    // Store the raw config
    this.config = config;

    // Initialize prevent_default_dialog if not set
    if (this.config.prevent_default_dialog === undefined) {
      this.config.prevent_default_dialog = false;
    }

    // Initialize action executor with current config and child card
    this._actionExecutor = new ActionExecutor(this, null, this.config, this._childCard);

    // Only attempt to create the card element if a card config exists
    if (config && config.card) {
      // Check if the card config itself actually changed to avoid unnecessary rebuilds
      if (
        !this._childCard ||
        JSON.stringify(this._currentCardConfig) !== JSON.stringify(config.card)
      ) {
        this._currentCardConfig = JSON.parse(JSON.stringify(config.card)); // Store a copy
        // Make this async since we're now using card helpers
        this._createCardElement(config.card).catch((e) => {
          logDebug('ERROR', 'Error in async card creation:', e);
        });
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
  async _createCardElement(cardConfig) {
    if (!cardConfig) {
      this._childCard = null;
      this.requestUpdate();
      return;
    }

    try {
      const actualCardConfig = Array.isArray(cardConfig) ? cardConfig[0] : cardConfig;
      const cardType = actualCardConfig.type;

      if (!cardType) {
        throw new Error('Card configuration requires a `type`.');
      }

      // Extract card_mod styles before creating the card
      this._extractedCardModStyles = this._extractCardModStyles(actualCardConfig);

      const isCustomCard = cardType.startsWith('custom:');

      if (isCustomCard) {
        logDebug('INIT', `Creating custom card directly: ${cardType}`);
        await this._createCardElementDirect(actualCardConfig);
        return;
      }

      // Try card helpers first for standard HA cards
      const element = await this._tryCreateWithCardHelpers(actualCardConfig);
      if (element) {
        await this._finalizeCardElement(element, cardType);
      } else {
        await this._createCardElementDirect(actualCardConfig);
      }
    } catch (e) {
      logDebug('ERROR', 'Error creating child card element:', e, cardConfig);
      this._createErrorCard(e.message, cardConfig);
    }

    this.requestUpdate();
  }

  /**
   * Extract card_mod styles to apply them immediately
   * @param {Object} cardConfig - Card configuration
   * @returns {Object} Extracted styles
   * @private
   */
  _extractCardModStyles(cardConfig) {
    if (!cardConfig.card_mod?.style) return null;

    const styleString = cardConfig.card_mod.style;
    const styles = {};

    // Extract height from card_mod style
    const heightMatch = styleString.match(/height:\s*([^;!]+)/i);
    if (heightMatch) {
      styles.height = heightMatch[1].trim();
    }

    return Object.keys(styles).length > 0 ? styles : null;
  }

  /**
   * Attempt to create card element using card helpers
   * @param {Object} cardConfig - Card configuration
   * @returns {Promise<HTMLElement|null>} Created element or null if failed
   * @private
   */
  async _tryCreateWithCardHelpers(cardConfig) {
    try {
      if (!this._cardHelpers) {
        await this._loadCardHelpers();
      }

      if (this._cardHelpers) {
        logDebug('INIT', `Creating card using helpers: ${cardConfig.type}`);
        return await this._cardHelpers.createCardElement(cardConfig);
      }
    } catch (helperError) {
      logDebug(
        'INIT',
        `Card helpers failed for ${cardConfig.type}, falling back to direct method:`,
        helperError
      );
    }
    return null;
  }

  /**
   * Finalize card element setup after creation
   * @param {HTMLElement} element - Created card element
   * @param {string} cardType - Type of card created
   * @private
   */
  async _finalizeCardElement(element, cardType) {
    if (this.hass) {
      element.hass = this.hass;
    }

    this._childCard = element;
    logDebug('INIT', 'Child card created/updated using card helpers:', cardType);

    if (this._actionExecutor) {
      this._actionExecutor.childCard = this._childCard;
    }

    await this._applyDialogPrevention();

    // Force card_mod re-scan after child card creation
    setTimeout(() => {
      if (window.cardmod) {
        window.cardmod.process_card?.(this._childCard);
      }
      this.dispatchEvent(
        new CustomEvent('card-mod-refresh', {
          bubbles: true,
          composed: true
        })
      );
    }, 100);
  }

  /**
   * Apply dialog prevention after card is ready
   * @private
   */
  async _applyDialogPrevention() {
    await this.updateComplete;

    setTimeout(() => {
      if (this.config && this.config.prevent_default_dialog) {
        this._preventDefaultDialogs();
      }
    }, UI_CONSTANTS.DIALOG_PREVENTION_DELAY);
  }

  /**
   * Create card element using direct DOM method (for custom cards and fallback)
   * @param {Object} cardConfig - Configuration for the child card
   * @param {number} retryCount - Current retry attempt (for preventing infinite loops)
   * @private
   */
  async _createCardElementDirect(cardConfig, retryCount = 0) {
    const cardType = cardConfig.type;

    // Prevent infinite retries
    if (retryCount > UI_CONSTANTS.MAX_CARD_CREATION_RETRIES) {
      logDebug('ERROR', `Failed to create card element after 10 retries: ${cardType}`);
      this._createErrorCard(`Failed to create card: ${cardType}`, cardConfig);
      return;
    }

    const elementTag = cardType.startsWith('custom:')
      ? cardType.substring(7)
      : `hui-${cardType}-card`;

    // Create the element directly
    const element = document.createElement(elementTag);

    // Check if the element has setConfig before proceeding (with retry logic)
    if (typeof element.setConfig !== 'function') {
      if (retryCount < 5) {
        // Limit retries to 5 for setConfig
        logDebug(
          'INIT',
          `Element ${elementTag} created but setConfig not available, retry ${retryCount + 1}/5`
        );
        setTimeout(
          () => this._createCardElementDirect(cardConfig, retryCount + 1),
          UI_CONSTANTS.CARD_CREATION_RETRY_DELAY
        );
        return;
      } else {
        logDebug('ERROR', `Element ${elementTag} does not have setConfig method after 5 retries`);
        this._createErrorCard(`Card type ${cardType} is not available`, cardConfig);
        return;
      }
    }

    try {
      // Set config and hass
      element.setConfig(cardConfig);
      if (this.hass) {
        element.hass = this.hass; // <-- Fixed: this.hass instead of hass
      }

      // Update the internal state
      this._childCard = element;
      logDebug('INIT', 'Child card created/updated directly:', elementTag);

      // Update action executor with new child card
      if (this._actionExecutor) {
        this._actionExecutor.childCard = this._childCard;
      }

      // Apply dialog prevention AFTER child card is ready
      await this.updateComplete;

      // Add a small delay to ensure child card is fully initialized
      setTimeout(() => {
        if (this.config && this.config.prevent_default_dialog) {
          this._preventDefaultDialogs();
        }

        // Force card_mod re-scan after child card creation
        if (window.cardmod) {
          window.cardmod.process_card?.(this._childCard);
        }
        this.dispatchEvent(
          new CustomEvent('card-mod-refresh', {
            bubbles: true,
            composed: true
          })
        );
      }, 50);
    } catch (error) {
      logDebug('ERROR', `Error setting up card element: ${cardType}`, error);
      this._createErrorCard(`Error setting up card: ${error.message}`, cardConfig);
    }
  }

  /**
   * Creates an error card
   * @param {string} errorMessage - The error message to display
   * @param {Object} origConfig - The original configuration
   * @private
   */
  _createErrorCard(errorMessage, origConfig) {
    try {
      const errorCard = document.createElement('hui-error-card');
      errorCard.setConfig({
        type: 'error',
        error: errorMessage,
        origConfig: origConfig
      });
      if (this.hass) {
        errorCard.hass = this.hass;
      }
      this._childCard = errorCard;
    } catch (e) {
      // Last resort fallback
      const errorCard = document.createElement('div');
      errorCard.innerHTML = `<ha-alert alert-type="error">Error: ${errorMessage}</ha-alert>`;
      this._childCard = errorCard;
    }

    // Update action executor with new child card
    if (this._actionExecutor) {
      this._actionExecutor.childCard = this._childCard;
    }

    this.requestUpdate();
  }

  /**
   * Handle click events (in addition to pointer events)
   * @param {Event} ev - Click event
   * @private
   */
  _onClick(ev) {
    // Only prevent default when explicitly configured to do so
    if (this.config.prevent_default_dialog) {
      logDebug('EVENT', 'Preventing default click behavior');
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  /**
   * Enhanced method to prevent default dialogs from the wrapped card
   * Sets up comprehensive event interception to block click, tap, and hass-more-info events
   * that would normally trigger entity information dialogs. Uses capture phase event handling
   * and applies to both the main element and any nested interactive elements.
   * @private
   */
  _preventDefaultDialogs() {
    if (!this._childCard || !this.config.prevent_default_dialog) return;

    // Clean up any existing handler first
    this._cleanupDefaultDialogPrevention();

    // Create a more comprehensive event handler
    this._childCardClickHandler = (ev) => {
      logDebug('EVENT', 'Intercepting child card event:', ev.type);

      // Prevent all default behaviors that might show dialogs
      if (ev.type === 'hass-more-info' || ev.type === 'click' || ev.type === 'tap') {
        logDebug('EVENT', 'Preventing default dialog/action for:', ev.type);
        ev.stopPropagation();
        ev.preventDefault();
        ev.stopImmediatePropagation();
      }
    };

    // Apply handlers more comprehensively
    const setupPrevention = () => {
      if (this._childCard) {
        // Handle multiple event types that could trigger dialogs
        const eventTypes = ['hass-more-info', 'click', 'tap'];

        eventTypes.forEach((eventType) => {
          // Add to main element
          this._childCard.addEventListener(eventType, this._childCardClickHandler, {
            capture: true,
            passive: false
          });

          // Add to shadow root if available
          if (this._childCard.shadowRoot) {
            this._childCard.shadowRoot.addEventListener(eventType, this._childCardClickHandler, {
              capture: true,
              passive: false
            });
          }
        });

        // Also handle nested interactive elements
        const interactiveElements = this._childCard.querySelectorAll('*');
        interactiveElements.forEach((element) => {
          eventTypes.forEach((eventType) => {
            element.addEventListener(eventType, this._childCardClickHandler, {
              capture: true,
              passive: false
            });
          });
        });
      }

      logDebug('INIT', 'Enhanced event prevention setup completed');
    };

    // Set up prevention with retries for timing issues
    const trySetup = (attempts = 0) => {
      if (attempts > 5) {
        logDebug('INIT', 'Max attempts reached for dialog prevention setup');
        return;
      }

      try {
        setupPrevention();
      } catch (e) {
        logDebug('INIT', `Dialog prevention setup attempt ${attempts + 1} failed, retrying...`);
        setTimeout(() => trySetup(attempts + 1), 100);
      }
    };

    // Initial setup
    trySetup();

    // Also retry after a longer delay to catch late-loading elements
    setTimeout(() => trySetup(), 500);
  }

  /**
   * Enhanced cleanup for default dialog prevention
   * @private
   */
  _cleanupDefaultDialogPrevention() {
    if (this._childCard && this._childCardClickHandler) {
      const eventTypes = ['hass-more-info', 'click', 'tap'];

      eventTypes.forEach((eventType) => {
        this._childCard.removeEventListener(eventType, this._childCardClickHandler, true);

        if (this._childCard.shadowRoot) {
          this._childCard.shadowRoot.removeEventListener(
            eventType,
            this._childCardClickHandler,
            true
          );
        }
      });

      // Clean up nested elements
      try {
        const interactiveElements = this._childCard.querySelectorAll('*');
        interactiveElements.forEach((element) => {
          eventTypes.forEach((eventType) => {
            element.removeEventListener(eventType, this._childCardClickHandler, true);
          });
        });
      } catch (e) {
        // Ignore cleanup errors
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
        logDebug('ERROR', 'Error setting hass on child card:', e);
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
   * Get the hass object
   * @returns {Object} Home Assistant object
   */
  get hass() {
    return this._hass;
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
        logDebug('ACTION', 'Could not get card size from child', e);
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

    // Only call _preventDefaultDialogs if the child card has actually changed
    if (
      changedProperties.has('_childCard') &&
      this._childCard &&
      this.config &&
      this.config.prevent_default_dialog
    ) {
      // Add a small delay to ensure child card is fully rendered
      setTimeout(() => {
        this._preventDefaultDialogs();
      }, 100);
    }

    // Update action executor when things change
    if (changedProperties.has('config') || changedProperties.has('_childCard')) {
      if (this._actionExecutor) {
        this._actionExecutor.config = this.config;
        this._actionExecutor.childCard = this._childCard;
      }
    }
  }

  /**
   * Lifecycle method when component is connected to DOM
   */
  connectedCallback() {
    super.connectedCallback();

    // Ensure card helpers are loaded when connected
    if (!this._cardHelpers) {
      this._loadCardHelpers();
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
    if (this._actionExecutor) {
      this._actionExecutor.handleAction(actionType);
    }
  }

  /**
   * Reset the internal state for action handling
   * Clears all pending timeouts and resets click/hold tracking variables to prevent
   * stale state from interfering with subsequent interactions. Critical for preventing
   * action conflicts between nested actions-cards.
   * @param {Event} ev - Event that triggered the reset (optional)
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
    const interactiveTags = [
      'INPUT',
      'BUTTON',
      'SELECT',
      'TEXTAREA',
      'A',
      'HA-SLIDER',
      'HA-SWITCH',
      'PAPER-SLIDER',
      'PAPER-BUTTON',
      'MWC-BUTTON'
    ];
    let targetElement = ev.target;
    while (targetElement && targetElement !== this) {
      if (
        interactiveTags.includes(targetElement.tagName) ||
        targetElement.hasAttribute('actions-card-interactive')
      ) {
        // Don't handle pointer down if on an interactive element
        logDebug('ACTION', 'Pointer down ignored (interactive element):', targetElement.tagName);
        return;
      }
      targetElement = targetElement.parentElement || targetElement.getRootNode().host;
    }

    if (ev.button !== 0 && ev.pointerType === 'mouse') {
      logDebug('ACTION', 'Pointer down ignored (not primary button)');
      return; // Only main mouse button
    }

    ev.stopPropagation();
    this._startX = ev.clientX; // Store start position for drag detection
    this._startY = ev.clientY;

    clearTimeout(this._holdTimeout); // Clear previous timer
    this._holdTriggered = false; // Reset hold flag

    if (this.config.hold_action && this.config.hold_action.action !== 'none') {
      logDebug('ACTION', 'Starting hold timer');
      this._holdTimeout = window.setTimeout(() => {
        // Check if pointer moved significantly (drag/scroll) before triggering hold
        if (Math.abs(ev.clientX - this._startX) < 10 && Math.abs(ev.clientY - this._startY) < 10) {
          this._holdTriggered = true;
          this._handleAction('hold');
          // Reset click count after hold is triggered to prevent tap action
          this._clickCount = 0;
        } else {
          logDebug('ACTION', 'Hold canceled (moved too much)');
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
      logDebug('ACTION', 'Pointer up ignored (not primary button)');
      return;
    }

    ev.stopPropagation();

    // Only prevent default behavior if explicitly configured to do so
    if (this.config.prevent_default_dialog) {
      ev.preventDefault();
    }

    // Significant movement cancels tap/double-tap
    const moved =
      Math.abs(ev.clientX - this._startX) > 10 || Math.abs(ev.clientY - this._startY) > 10;

    clearTimeout(this._holdTimeout); // Always clear hold timeout on pointer up

    if (this._holdTriggered || moved) {
      // If hold was already triggered or pointer moved significantly, reset everything
      logDebug('ACTION', 'Tap canceled (hold already triggered or moved too much)');
      this._resetState();
      return;
    }

    // It's a potential tap or double tap
    this._clickCount++;
    logDebug('ACTION', `Click count: ${this._clickCount}`);

    // Only suppress child card events when explicitly preventing default dialogs
    if (this.config.prevent_default_dialog) {
      this._suppressChildCardEvents(300);
    }

    if (this.config.double_tap_action && this.config.double_tap_action.action !== 'none') {
      // If double_tap is configured, wait for a potential second tap
      if (this._clickCount === 1) {
        logDebug('ACTION', 'Waiting for potential second tap');
        this._clickTimeout = window.setTimeout(() => {
          // Double-check that we haven't processed a double-tap in the meantime
          if (this._clickCount === 1 && !this._holdTriggered) {
            logDebug('ACTION', 'Single tap confirmed (after double-tap timeout)');

            // Only handle custom tap action if it's not 'none'
            if (this.config.tap_action?.action !== 'none') {
              this._handleAction('tap');
            }
          }
          this._resetState(); // Reset after action or timeout
        }, 250); // Standard double-click timeout
      } else if (this._clickCount === 2) {
        logDebug('ACTION', 'Double tap detected');
        clearTimeout(this._clickTimeout); // Cancel the single tap timeout
        this._clickTimeout = null; // Explicitly set to null to ensure it's cleared
        this._handleAction('double_tap');
        this._resetState(); // Reset after double tap action
      }
    } else {
      // If double_tap is not configured, any click is a single tap
      logDebug('ACTION', 'Single tap (double tap not configured)');

      // Only handle custom tap action if it's not 'none'
      if (this.config.tap_action?.action !== 'none') {
        this._handleAction('tap');
      }
      this._resetState(); // Reset after tap action
    }
  }

  /**
   * Temporarily suppresses events on the child card to prevent conflicts during action execution
   * This prevents the child card from responding to events that might interfere with our custom actions.
   * Events are suppressed for a short duration and then automatically restored.
   * @param {number} duration - Duration in milliseconds to suppress events
   * @private
   */
  _suppressChildCardEvents(duration) {
    if (!this._childCard) return;

    const suppressHandler = (e) => {
      logDebug('EVENT', 'Suppressing child card event:', e.type);
      e.stopPropagation();
      e.preventDefault();
    };

    // Add event listeners to suppress various events
    const eventTypes = ['click', 'tap', 'hass-more-info'];
    eventTypes.forEach((eventType) => {
      this._childCard.addEventListener(eventType, suppressHandler, {
        capture: true
      });

      // Also try shadow root if available
      if (this._childCard.shadowRoot) {
        this._childCard.shadowRoot.addEventListener(eventType, suppressHandler, { capture: true });
      }
    });

    // Remove suppression after duration
    setTimeout(() => {
      eventTypes.forEach((eventType) => {
        this._childCard.removeEventListener(eventType, suppressHandler, {
          capture: true
        });

        if (this._childCard.shadowRoot) {
          this._childCard.shadowRoot.removeEventListener(eventType, suppressHandler, {
            capture: true
          });
        }
      });
    }, duration);
  }

  /**
   * Handle edit button click in preview mode
   * @param {Event} e - Click event
   * @private
   */
  _handleEditClick(e) {
    e.stopPropagation();
    logDebug('EDITOR', 'Edit button clicked, firing show-edit-card event');
    fireEvent(this, 'show-edit-card', { element: this });
  }

  /**
   * Render the card UI
   * @returns {TemplateResult} HTML template
   */
  render() {
    // If no child card is configured or created, show the preview
    if (!this._childCard) {
      logDebug('INIT', 'Rendering preview container');
      return html`
        <div class="preview-container">
          <div class="preview-icon-container">
            <ha-icon icon="mdi:gesture-tap-hold"></ha-icon>
          </div>
          <div class="preview-text-container">
            <div class="preview-title">Actions Card</div>
            <div class="preview-description">
              Wrap another card to add tap, hold, or double tap actions. Configure the card to wrap
              below.
            </div>
          </div>
          <div class="preview-actions">
            <ha-button raised @click=${this._handleEditClick} aria-label="Edit Card">
              Edit Card
            </ha-button>
          </div>
        </div>
      `;
    }

    // Otherwise, render the wrapper and the child card
    const hasActions =
      this.config.tap_action?.action !== 'none' ||
      this.config.hold_action?.action !== 'none' ||
      this.config.double_tap_action?.action !== 'none';

    const wrapperStyle = `cursor: ${hasActions ? 'pointer' : 'default'}; display: block;`;

    return html`
      <div
        @pointerdown="${this._onPointerDown}"
        @pointerup="${this._onPointerUp}"
        @pointercancel="${this._resetState}"
        @click="${this._onClick}"
        @contextmenu="${(e) => {
          if (this.config.hold_action) e.preventDefault();
        }}"
        style="${wrapperStyle}"
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
    return getCardStyles();
  }
}
