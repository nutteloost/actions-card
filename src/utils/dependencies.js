/**
 * OFFLINE DEPENDENCY LOADING - BUNDLED APPROACH
 *
 * When using Rollup with node-resolve, LitElement is bundled directly.
 * This file exists for compatibility but doesn't actually load anything.
 */

// Import LitElement that will be bundled by Rollup
import { LitElement, html, css } from 'lit';

// Simple fireEvent implementation
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

// Always succeeds since everything is bundled
async function loadDependencies() {
  return true;
}

export { loadDependencies, LitElement, html, css, fireEvent };

export function getDependencies() {
  return { LitElement, html, css, fireEvent };
}
