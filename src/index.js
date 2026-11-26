import { ActionsCard } from './actions-card.js';
import { ActionsCardEditor } from './actions-card-editor.js';
import { CARD_VERSION } from './constants.js';

// Standard HA pattern: Define elements immediately at module level
if (!customElements.get('actions-card-fixed')) {
  customElements.define('actions-card-fixed', ActionsCard);
}

if (!customElements.get('actions-card-fixed-editor')) {
  customElements.define('actions-card-fixed-editor', ActionsCardEditor);
}

// Set up the card's config element getter
ActionsCard.getConfigElement = () => document.createElement('actions-card-fixed-editor');

// Register card with Home Assistant
window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === 'actions-card-fixed')) {
  window.customCards.push({
    type: 'actions-card-fixed',
    name: 'Actions Card (Fixed)',
    preview: true,
    description: 'Wraps another card to add tap, hold, and double-tap actions.',
    documentationURL: 'https://github.com/I-am-Joel/actions-card-fixed'
  });
}

// Display version information
console.info(
  `%c ACTIONS-CARD-FIXED %c v${CARD_VERSION} %c`,
  'color: white; background: #9c27b0; font-weight: 700;',
  'color: #9c27b0; background: white; font-weight: 700;',
  'color: grey; background: white; font-weight: 400;'
);

// Export for potential external use
export { CARD_VERSION };
