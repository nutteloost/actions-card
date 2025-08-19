import { ActionsCard } from './actions-card.js';
import { ActionsCardEditor } from './actions-card-editor.js';

// Version management
export const CARD_VERSION = '1.4.3';

/**
 * Initialize the Actions Card
 */
function initializeActionsCard() {
  // Register card components with custom elements
  if (!customElements.get('actions-card')) {
    customElements.define('actions-card', ActionsCard);
  }

  if (!customElements.get('actions-card-editor')) {
    customElements.define('actions-card-editor', ActionsCardEditor);
  }

  // Set up the card's config element getter
  ActionsCard.getConfigElement = () => document.createElement('actions-card-editor');

  // Register card with Home Assistant
  window.customCards = window.customCards || [];
  if (!window.customCards.some((card) => card.type === 'actions-card')) {
    window.customCards.push({
      type: 'actions-card',
      name: 'Actions Card',
      preview: true,
      description: 'Wraps another card to add tap, hold, and double-tap actions.'
    });
  }

  // Display version information
  console.info(
    `%c ACTIONS-CARD %c v${CARD_VERSION} %c`,
    'color: white; background: #9c27b0; font-weight: 700;',
    'color: #9c27b0; background: white; font-weight: 700;',
    'color: grey; background: white; font-weight: 400;'
  );
}

// Initialize immediately
initializeActionsCard();
