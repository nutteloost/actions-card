/**
 * General Helper Functions
 * Utility functions used across the Actions Card for entity handling,
 * card configuration processing, and Home Assistant integration.
 * Provides consistent interfaces for common operations.
 */

import { logDebug } from './debug.js';

/**
 * Get entity ID from configuration or fallback to wrapped card entity
 * @param {Object} actionConfig - Action configuration
 * @param {Object} cardConfig - Card configuration
 * @param {Object} childCard - Child card element
 * @returns {string|null} Entity ID
 */
function getEntityId(actionConfig, cardConfig, childCard) {
  return (
    actionConfig.entity ||
    actionConfig.entity_id ||
    cardConfig.entity ||
    (childCard && childCard.config ? childCard.config.entity : null)
  );
}

/**
 * Gets a descriptive name for a card configuration
 * @param {Object} cardConfig - The card configuration
 * @returns {Object} An object with type name and card name
 */
function getCardDescriptor(cardConfig) {
  if (!cardConfig?.type) return { typeName: 'Unknown', name: '' };
  const type = cardConfig.type.startsWith('custom:')
    ? cardConfig.type.substring(7)
    : cardConfig.type;
  const typeName = type
    .split(/[-_]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
  const name = cardConfig.title || cardConfig.name || '';
  return { typeName, name };
}

/**
 * Load card helpers asynchronously
 * @returns {Promise<Object|null>} Card helpers or null if failed
 */
async function loadCardHelpers() {
  if (!window.loadCardHelpers) {
    return null;
  }

  try {
    return await window.loadCardHelpers();
  } catch (e) {
    logDebug('ERROR', 'Failed to load card helpers:', e);
    return null;
  }
}

export { getEntityId, getCardDescriptor, loadCardHelpers };
