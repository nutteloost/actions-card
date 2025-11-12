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
import { hasConfigOrEntityChanged, computeCardSize, fireEvent } from './utils/dependencies.js';

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
    this._childCard = null;
    this.config = {};
    this._childCardClickHandler = null;
    this._cardHelpers = null;
    this._actionExecutor = null;
    this._currentCardConfig = null;
    this._cardModConfig = null;

    // Add swipe tracking
    this._swipeStartTime = 0;
    this._swipeInProgress = false;
    this._isWindowTracked = false;
    this._processingPointerUp = false;
    this._isClickBlocked = false; // Block clicks after swipe
    this._clickBlockTimer = null; // Timer for click blocking

    // Bound handlers for window-level listeners
    this._boundOnPointerMove = this._onPointerMove.bind(this);
    this._boundOnPointerUp = this._onPointerUp.bind(this);
    this._boundPreventClick = this._preventClick.bind(this); // Bound click preventer

    // Progress indicator state
    this._holdProgressElement = null;
    this._holdCompleted = false;
    this._holdStartX = 0;
    this._holdStartY = 0;
    this._cancelDistance = 50; // pixels to move before canceling
    this._holdWithProgressCanceled = false; // Track if hold-with-progress was canceled
  }

  /**
   * Standard HA pattern: Use shouldUpdate to prevent unnecessary re-renders
   */
  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  /**
   * Standard HA pattern: Use willUpdate for pre-update calculations
   */
  willUpdate(changedProps) {
    super.willUpdate(changedProps);

    // Update action executor when config or child card changes
    if (changedProps.has('config') || changedProps.has('_childCard')) {
      if (this._actionExecutor) {
        this._actionExecutor.config = this.config;
        this._actionExecutor.childCard = this._childCard;
      }
    }

    // Handle hass changes for child card
    if (changedProps.has('hass') && this._childCard && this._childCard.hass !== this.hass) {
      try {
        this._childCard.hass = this.hass;
      } catch (e) {
        logDebug('ERROR', 'Error setting hass on child card:', e);
        // Recreate card if hass assignment fails
        if (this.config?.card) {
          this._createCardElement(this.config.card);
        }
      }
    }
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

    this.config = config;

    // ADD THIS: Store card-mod configuration
    if (config.card_mod) {
      logDebug('CARD_MOD', 'Card-mod configuration detected', config.card_mod);
      this._cardModConfig = JSON.parse(JSON.stringify(config.card_mod));
    } else {
      this._cardModConfig = null;
    }

    this._actionExecutor = new ActionExecutor(this, null, this.config, this._childCard);

    if (config && config.card) {
      if (
        !this._childCard ||
        JSON.stringify(this._currentCardConfig) !== JSON.stringify(config.card)
      ) {
        this._currentCardConfig = JSON.parse(JSON.stringify(config.card));
        this._createCardElement(config.card).catch((e) => {
          logDebug('ERROR', 'Error in async card creation:', e);
        });
      }
    } else {
      this._childCard = null;
      this._currentCardConfig = null;
      this.requestUpdate();
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
      this._triggerCardModRefresh();
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
        element.hass = this.hass;
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
        this._triggerCardModRefresh();
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
   * Prevents click events from reaching child card after swipe
   * @param {Event} e - Click event to prevent
   * @private
   */
  _preventClick(e) {
    if (this._isClickBlocked || this._swipeInProgress) {
      logDebug('ACTION', 'Click prevented after swipe gesture');
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
  }

  /**
   * Blocks clicks for a specified duration
   * @param {number} duration - Duration to block clicks in milliseconds
   * @private
   */
  _blockClicksTemporarily(duration = 300) {
    this._isClickBlocked = true;

    if (this._clickBlockTimer) {
      clearTimeout(this._clickBlockTimer);
    }

    this._clickBlockTimer = setTimeout(() => {
      this._isClickBlocked = false;
      this._clickBlockTimer = null;
      logDebug('ACTION', 'Click blocking period ended');
    }, duration);

    logDebug('ACTION', `Blocking clicks for ${duration}ms`);
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

    // Use HA helper if available
    if (typeof computeCardSize === 'function') {
      return computeCardSize(this._childCard);
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

    // Apply card-mod styles when config changes
    if (changedProperties.has('config') && this._cardModConfig) {
      this._applyCardModStyles();
    }

    // Handle child card DOM insertion/removal
    if (changedProperties.has('_childCard')) {
      const wrapper = this.shadowRoot?.querySelector('.card-wrapper');
      if (wrapper) {
        // Remove old child card if it exists
        const oldCard = wrapper.querySelector(':scope > *');
        if (oldCard && oldCard !== this._childCard) {
          wrapper.removeChild(oldCard);
        }

        // Add new child card if it exists and isn't already in the wrapper
        if (this._childCard && !wrapper.contains(this._childCard)) {
          wrapper.appendChild(this._childCard);
        }
      }
    }

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

    // Apply card-mod styles when connected to DOM
    if (this._cardModConfig) {
      this._applyCardModStyles();
    }
  }

  /**
   * Lifecycle method when component is disconnected from DOM
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupDefaultDialogPrevention();

    // Clean up progress indicator
    this._hideHoldProgress();

    // Clean up window listeners
    window.removeEventListener('pointermove', this._boundOnPointerMove);
    window.removeEventListener('pointerup', this._boundOnPointerUp);

    // Clean up click block timer
    if (this._clickBlockTimer) {
      clearTimeout(this._clickBlockTimer);
      this._clickBlockTimer = null;
    }
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
    if (ev) ev.stopPropagation();

    // Clean up window-level listeners
    if (this._isWindowTracked) {
      window.removeEventListener('pointermove', this._boundOnPointerMove);
      window.removeEventListener('pointerup', this._boundOnPointerUp);
      this._isWindowTracked = false;
    }

    clearTimeout(this._holdTimeout);
    clearTimeout(this._clickTimeout);
    this._holdTimeout = null;
    this._clickTimeout = null;
    this._holdTriggered = false;
    this._clickCount = 0;
    this._swipeInProgress = false;
    this._swipeStartTime = 0;
    this._pointerType = null;
    this._processingPointerUp = false;
    // Clean up hold progress
    this._hideHoldProgress();
    this._holdCompleted = false;
    this._holdStartX = 0;
    this._holdStartY = 0;
    this._holdWithProgressCanceled = false;

    // Note: Don't clear _isClickBlocked here - let the timer handle it
  }

  /**
   * Create and show the hold progress indicator with circular ring
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {
   * number} duration - Hold duration in ms
   * @private
   */
  _showHoldProgress(x, y, duration) {
    // Remove any existing indicator
    this._hideHoldProgress();

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const size = isTouchDevice
      ? UI_CONSTANTS.PROGRESS_INDICATOR_SIZE_TOUCH
      : UI_CONSTANTS.PROGRESS_INDICATOR_SIZE;

    // Read CSS variables from the card element
    const computedStyle = getComputedStyle(this);

    // Progress color
    const progressColor =
      computedStyle.getPropertyValue('--actions-card-hold-progress-color').trim() ||
      computedStyle.getPropertyValue('--primary-color').trim() ||
      '#03a9f4';

    // Inactive color (defaults to progress color if not set)
    const inactiveColor =
      computedStyle.getPropertyValue('--actions-card-hold-progress-inactive-color').trim() ||
      progressColor;

    // Opacities
    const inactiveOpacity =
      computedStyle.getPropertyValue('--actions-card-hold-progress-inactive-opacity').trim() ||
      '0.2';
    const progressOpacity =
      computedStyle.getPropertyValue('--actions-card-hold-progress-opacity').trim() || '1';

    // Width
    const progressWidth =
      parseInt(computedStyle.getPropertyValue('--actions-card-hold-progress-width').trim()) || 4;

    const radius = size / 2 - progressWidth / 2;
    const circumference = 2 * Math.PI * radius;

    // Create container element
    this._holdProgressElement = document.createElement('div');
    this._holdProgressElement.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 99999;
    `;

    // Create SVG using innerHTML with computed values
    this._holdProgressElement.innerHTML = `
      <svg width="${size}" height="${size}" style="display: block;">
        <!-- Inactive circle -->
        <circle
          cx="${size / 2}"
          cy="${size / 2}"
          r="${radius}"
          fill="none"
          stroke="${inactiveColor}"
          stroke-width="${progressWidth}"
          opacity="${inactiveOpacity}"
        />
        <!-- Progress circle -->
        <circle
          cx="${size / 2}"
          cy="${size / 2}"
          r="${radius}"
          fill="none"
          stroke="${progressColor}"
          stroke-width="${progressWidth}"
          stroke-linecap="round"
          opacity="${progressOpacity}"
          transform="rotate(-90 ${size / 2} ${size / 2})"
          style="
            stroke-dasharray: ${circumference};
            stroke-dashoffset: ${circumference};
            transition: stroke-dashoffset ${duration}ms linear;
          "
        />
      </svg>
    `;

    document.body.appendChild(this._holdProgressElement);

    // Trigger animation on next frame to ensure CSS transition works
    const progressCircle = this._holdProgressElement.querySelector('circle:last-child');
    requestAnimationFrame(() => {
      progressCircle.style.strokeDashoffset = '0';
    });

    logDebug(
      'ACTION',
      'Hold progress indicator shown - color:',
      progressColor,
      'inactive:',
      inactiveColor,
      'width:',
      progressWidth,
      'inactive opacity:',
      inactiveOpacity,
      'progress opacity:',
      progressOpacity
    );
  }

  /**
   * Apply card-mod styles to the component
   * @private
   */
  _applyCardModStyles() {
    if (!this._cardModConfig || !this._cardModConfig.style) {
      return;
    }

    logDebug('CARD_MOD', 'Applying card-mod styles to actions-card');

    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) {
      logDebug('ERROR', 'No shadow root available for card-mod');
      return;
    }

    // Create or update card-mod style element
    let styleElement = shadowRoot.querySelector('#actions-card-mod-styles');

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'actions-card-mod-styles';
      shadowRoot.appendChild(styleElement);
    }

    styleElement.textContent = this._cardModConfig.style;
    logDebug('CARD_MOD', 'Card-mod styles applied successfully');
  }

  /**
   * Hide and remove the hold progress indicator
   * @private
   */
  _hideHoldProgress() {
    if (this._holdProgressElement) {
      this._holdProgressElement.remove();
      this._holdProgressElement = null;
    }
  }

  /**
   * Check if pointer has moved beyond cancel distance
   * @param {number} currentX - Current X coordinate
   * @param {number} currentY - Current Y coordinate
   * @returns {boolean} True if moved too far
   * @private
   */
  _hasMovedTooFar(currentX, currentY) {
    const deltaX = currentX - this._holdStartX;
    const deltaY = currentY - this._holdStartY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance > this._cancelDistance;
  }

  /**
   * Handle pointer down event for action handling
   * @param {Event} ev - Pointer down event
   * @private
   */
  _onPointerDown(ev) {
    // Allow interaction with elements inside the child card (e.g., sliders, buttons)
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
        logDebug('ACTION', 'Pointer down ignored (interactive element):', targetElement.tagName);
        return;
      }
      targetElement = targetElement.parentElement || targetElement.getRootNode().host;
    }

    if (ev.button !== 0 && ev.pointerType === 'mouse') {
      logDebug('ACTION', 'Pointer down ignored (not primary button)');
      return;
    }

    ev.stopPropagation();
    this._startX = ev.clientX;
    this._startY = ev.clientY;
    this._swipeStartTime = Date.now();
    this._swipeInProgress = false;
    this._pointerType = ev.pointerType;

    // Track hold start position for progress indicator
    this._holdStartX = ev.clientX;
    this._holdStartY = ev.clientY;
    this._holdCompleted = false;
    this._holdWithProgressCanceled = false; // Reset cancel flag

    clearTimeout(this._holdTimeout);
    this._holdTriggered = false;

    // Attach window-level listeners for mouse to track movement outside element
    if (ev.pointerType === 'mouse') {
      logDebug('ACTION', 'Attaching pointermove/pointerup listeners to window');
      this._isWindowTracked = true;
      window.addEventListener('pointermove', this._boundOnPointerMove);
      window.addEventListener('pointerup', this._boundOnPointerUp);
    } else {
      this._isWindowTracked = false;
    }

    if (this.config.hold_action && this.config.hold_action.action !== 'none') {
      logDebug('ACTION', 'Starting hold timer');
      const holdTime = this.config.hold_action.hold_time || 500;
      const showProgress = this.config.hold_action.show_progress || false;

      // Show progress indicator if enabled
      if (showProgress) {
        this._showHoldProgress(ev.clientX, ev.clientY, holdTime);
      }

      this._holdTimeout = window.setTimeout(() => {
        if (Math.abs(ev.clientX - this._startX) < 10 && Math.abs(ev.clientY - this._startY) < 10) {
          if (showProgress) {
            // Fire on release mode: mark as completed but don't fire yet
            this._holdCompleted = true;
            logDebug('ACTION', 'Hold completed, waiting for release');
          } else {
            // Immediate fire mode: existing behavior
            this._holdTriggered = true;
            this._handleAction('hold');
            this._clickCount = 0;
          }
        } else {
          logDebug('ACTION', 'Hold canceled (moved too much)');
          this._hideHoldProgress();
          this._resetState();
        }
      }, holdTime);
    }
  }

  /**
   * Handle pointer up event for action handling
   * @param {Event} ev - Pointer up event
   * @private
   */
  _onPointerUp(ev) {
    // Prevent double-processing if both window and element handlers fire
    if (this._processingPointerUp) {
      logDebug('ACTION', 'Pointer up already being processed, ignoring duplicate');
      return;
    }

    // If this is element-level pointerup during a window-tracked gesture, ignore it
    if (this._isWindowTracked && ev.currentTarget !== window) {
      logDebug('ACTION', 'Element-level pointer up ignored (window-tracked gesture)');
      return;
    }

    if (ev.button !== 0 && ev.pointerType === 'mouse') {
      logDebug('ACTION', 'Pointer up ignored (not primary button)');
      return;
    }

    // Set processing lock
    this._processingPointerUp = true;

    // Remove window-level listeners if they were added
    if (this._pointerType === 'mouse' && this._isWindowTracked) {
      logDebug('ACTION', 'Removing pointermove/pointerup listeners from window');
      window.removeEventListener('pointermove', this._boundOnPointerMove);
      window.removeEventListener('pointerup', this._boundOnPointerUp);
      this._isWindowTracked = false;
    }

    ev.stopPropagation();

    if (this.config.prevent_default_dialog) {
      ev.preventDefault();
    }

    const deltaX = ev.clientX - this._startX;
    const deltaY = ev.clientY - this._startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Hide progress indicator
    this._hideHoldProgress();

    clearTimeout(this._holdTimeout);

    // If hold-with-progress was in progress (completed or canceled), don't process as tap
    if (
      this.config.hold_action?.show_progress &&
      (this._holdCompleted || this._holdWithProgressCanceled)
    ) {
      if (this._holdCompleted && !this._hasMovedTooFar(ev.clientX, ev.clientY)) {
        logDebug('ACTION', 'Hold action fired on release');
        this._handleAction('hold');
      } else if (this._holdWithProgressCanceled || this._hasMovedTooFar(ev.clientX, ev.clientY)) {
        logDebug('ACTION', 'Hold action canceled - released outside bounds');
        // Suppress child card events when hold is canceled
        this._suppressChildCardEvents(300);
      }
      this._resetState();
      // Clear processing lock after reset
      setTimeout(() => {
        this._processingPointerUp = false;
      }, 10);
      return;
    }

    if (this._holdTriggered) {
      logDebug('ACTION', 'Tap/swipe canceled (hold already triggered)');
      this._resetState();
      return;
    }

    // Check for swipe first (takes precedence over tap if movement is significant)
    const swipeDirection = this._detectSwipe(
      this._startX,
      this._startY,
      ev.clientX,
      ev.clientY,
      this._swipeStartTime,
      ev.target
    );

    if (swipeDirection) {
      const swipeActionKey = `swipe_${swipeDirection}_action`;
      if (this.config[swipeActionKey] && this.config[swipeActionKey].action !== 'none') {
        logDebug('ACTION', `Swipe detected: ${swipeDirection}`);
        this._swipeInProgress = true;

        // Stop event propagation immediately to prevent child card from responding
        ev.stopImmediatePropagation();

        // Block clicks BEFORE handling the action
        this._blockClicksTemporarily(300);

        // Always suppress child card events during swipe, regardless of prevent_default_dialog setting
        // This prevents the child card from opening its own dialogs
        this._suppressChildCardEvents(300);

        // Now execute the configured swipe action
        this._handleAction(`swipe_${swipeDirection}`);

        this._resetState();
        return;
      }
    }

    // If no swipe or swipe not configured, check for tap/double-tap
    const moved = distance > 10;

    if (moved && !swipeDirection) {
      logDebug('ACTION', 'Movement detected but no swipe action configured');
      this._resetState();
      return;
    }

    if (moved) {
      this._resetState();
      return;
    }

    // It's a potential tap or double tap
    this._clickCount++;
    logDebug('ACTION', `Click count: ${this._clickCount}`);

    if (this.config.prevent_default_dialog) {
      this._suppressChildCardEvents(300);
    }

    if (this.config.double_tap_action && this.config.double_tap_action.action !== 'none') {
      if (this._clickCount === 1) {
        logDebug('ACTION', 'Waiting for potential second tap');
        this._clickTimeout = window.setTimeout(() => {
          if (this._clickCount === 1 && !this._holdTriggered) {
            logDebug('ACTION', 'Single tap confirmed (after double-tap timeout)');
            if (this.config.tap_action?.action !== 'none') {
              this._handleAction('tap');
            }
          }
          this._resetState();
        }, 250); // Standard 250ms timeout for double-tap
      } else if (this._clickCount === 2) {
        logDebug('ACTION', 'Double tap detected');
        clearTimeout(this._clickTimeout); // This is the crucial line that was missing/incorrect.
        this._clickTimeout = null;
        this._handleAction('double_tap');
        this._resetState();
      }
    } else {
      // If double-tap is not configured, any click is a single tap
      logDebug('ACTION', 'Single tap (double tap not configured)');
      if (this.config.tap_action?.action !== 'none') {
        this._handleAction('tap');
      }
      this._resetState();
    }

    // Clear the processing lock after a very short delay
    setTimeout(() => {
      this._processingPointerUp = false;
    }, 10);
  }

  /**
   * Handle pointer move event (only called for window-level mouse tracking)
   * @param {Event} ev - Pointer move event
   * @private
   */
  _onPointerMove(ev) {
    // Cancel hold if moved too much
    const deltaX = ev.clientX - this._startX;
    const deltaY = ev.clientY - this._startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > 10 && this._holdTimeout) {
      clearTimeout(this._holdTimeout);
      this._holdTimeout = null;
      this._hideHoldProgress();
      // Suppress child card events when hold is canceled
      this._suppressChildCardEvents(300);
      logDebug('ACTION', 'Hold canceled during move');
    }

    // Check if moved outside cancel bounds during hold progress
    if (this._holdProgressElement && this._hasMovedTooFar(ev.clientX, ev.clientY)) {
      clearTimeout(this._holdTimeout);
      this._holdTimeout = null;
      this._holdCompleted = false;
      this._holdWithProgressCanceled = true;
      this._hideHoldProgress();
      // Suppress child card events when hold is canceled
      this._suppressChildCardEvents(300);
      logDebug('ACTION', 'Hold canceled - moved outside bounds');
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
   * Trigger card-mod to process the child card
   * @private
   */
  _triggerCardModRefresh() {
    if (window.cardmod) {
      window.cardmod.process_card?.(this._childCard);
    }
    this.dispatchEvent(
      new CustomEvent('card-mod-refresh', {
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Detect swipe direction from pointer movement
   * @param {number} startX - Starting X coordinate
   * @param {number} startY - Starting Y coordinate
   * @param {number} endX - Ending X coordinate
   * @param {number} endY - Ending Y coordinate
   * @param {number} startTime - Swipe start timestamp
   * @param {HTMLElement} target - Event target for scrollable check
   * @returns {string|null} Swipe direction or null
   * @private
   */
  _detectSwipe(startX, startY, endX, endY, startTime, target) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const duration = Date.now() - startTime;

    // Check if swipe meets minimum distance
    if (distance < 20) {
      logDebug('ACTION', 'Movement too short for swipe:', distance);
      return null;
    }

    // Check if swipe completed within maximum duration
    if (duration > 1000) {
      logDebug('ACTION', 'Movement too slow for swipe:', duration);
      return null;
    }

    // Check if target element or ancestor is scrollable
    const scrollableInfo = this._isScrollableElement(target);

    // Determine direction based on dominant axis
    if (absX > absY) {
      // Horizontal swipe
      if (scrollableInfo.horizontal) {
        logDebug('ACTION', 'Horizontal swipe blocked by scrollable element');
        return null;
      }
      return deltaX > 0 ? 'right' : 'left';
    } else {
      // Vertical swipe
      if (scrollableInfo.vertical) {
        logDebug('ACTION', 'Vertical swipe blocked by scrollable element');
        return null;
      }
      return deltaY > 0 ? 'down' : 'up';
    }
  }

  /**
   * Check if element or ancestor is scrollable
   * @param {HTMLElement} element - Element to check
   * @returns {Object} Object with horizontal and vertical scrollable flags
   * @private
   */
  _isScrollableElement(element) {
    let current = element;
    const result = { horizontal: false, vertical: false };

    while (current && current !== this) {
      const style = window.getComputedStyle(current);
      const overflowX = style.overflowX;
      const overflowY = style.overflowY;

      // Check for horizontal scrolling
      if (
        (overflowX === 'scroll' || overflowX === 'auto') &&
        current.scrollWidth > current.clientWidth
      ) {
        result.horizontal = true;
      }

      // Check for vertical scrolling
      if (
        (overflowY === 'scroll' || overflowY === 'auto') &&
        current.scrollHeight > current.clientHeight
      ) {
        result.vertical = true;
      }

      current = current.parentElement || current.getRootNode()?.host;
    }

    return result;
  }

  /**
   * Render the card UI
   * @returns {TemplateResult} HTML template
   */
  render() {
    if (!this.hass) {
      return html``;
    }

    if (!this.config || !this.config.card) {
      return html`
        <div class="card-config-missing">
          <div class="preview-container">
            <div class="preview-icon">
              <ha-icon icon="mdi:gesture-tap"></ha-icon>
            </div>
            <div class="preview-text">
              <div class="preview-title">Actions Card</div>
              <div class="preview-description">Configure the card to wrap below.</div>
            </div>
            <div class="preview-actions">
              <ha-button raised @click=${this._handleEditClick} aria-label="Edit Card">
                Edit Card
              </ha-button>
            </div>
          </div>
        </div>
      `;
    }

    this.style.height = '100%';

    const hasActions =
      this.config.tap_action?.action !== 'none' ||
      this.config.hold_action?.action !== 'none' ||
      this.config.double_tap_action?.action !== 'none' ||
      this.config.swipe_left_action?.action !== 'none' ||
      this.config.swipe_right_action?.action !== 'none' ||
      this.config.swipe_up_action?.action !== 'none' ||
      this.config.swipe_down_action?.action !== 'none';

    const wrapperStyle = `cursor: ${hasActions ? 'pointer' : 'default'}; display: block; height: 100%;`;

    return html`
      <div
        class="card-wrapper"
        @pointerdown="${this._onPointerDown}"
        @pointerup="${this._onPointerUp}"
        @pointercancel="${this._resetState}"
        @click="${this._boundPreventClick}"
        @contextmenu="${(e) => {
          if (this.config.hold_action) e.preventDefault();
        }}"
        style="${wrapperStyle}"
        aria-label="${hasActions ? 'Interactive card with actions' : ''}"
        role="${hasActions ? 'button' : ''}"
        ?prevent-default-dialog="${this.config.prevent_default_dialog}"
      ></div>
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
