/**
 * OFFLINE DEPENDENCY LOADING - BUNDLED APPROACH WITH HA HELPERS
 *
 * When using Rollup with node-resolve, LitElement is bundled directly.
 * This file provides both bundled dependencies and Home Assistant helpers integration.
 */

// Import LitElement that will be bundled by Rollup
import { LitElement, html, css } from 'lit';

// Fallback implementations for HA helpers
const fireEvent = (node, type, detail = {}, options = {}) => {
  const event = new CustomEvent(type, {
    detail,
    bubbles: options.bubbles !== false,
    cancelable: Boolean(options.cancelable),
    composed: options.composed !== false
  });
  node.dispatchEvent(event);
  return event;
};

const hasConfigOrEntityChanged = (element, changedProps) => {
  if (changedProps.has('config') || changedProps.has('_config')) return true;

  const oldHass = changedProps.get('hass');
  if (!oldHass || oldHass !== element.hass) return true;

  return false;
};

const hasAction = (config) => {
  return config && config.action && config.action !== 'none';
};

const handleAction = (element, hass, config, action) => {
  // Basic action handling fallback
  const actionConfig = config[`${action}_action`];
  if (element._actionExecutor && hasAction(actionConfig)) {
    element._actionExecutor.handleAction(action);
  }
};

const computeCardSize = (element) => {
  if (element && typeof element.getCardSize === 'function') {
    try {
      return element.getCardSize();
    } catch (e) {
      console.warn('Error getting card size:', e);
    }
  }
  return 1;
};

const loadCardHelpers = async () => {
  return window.loadCardHelpers?.() || null;
};

// Always succeeds since everything is bundled or has fallbacks
async function loadDependencies() {
  return true;
}

export {
  loadDependencies,
  LitElement,
  html,
  css,
  fireEvent,
  hasConfigOrEntityChanged,
  hasAction,
  handleAction,
  computeCardSize,
  loadCardHelpers
};

export function getDependencies() {
  return {
    LitElement,
    html,
    css,
    fireEvent,
    hasConfigOrEntityChanged,
    hasAction,
    handleAction,
    computeCardSize,
    loadCardHelpers
  };
}
