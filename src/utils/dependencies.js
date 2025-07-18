import { logDebug } from "./debug.js";

/**
 * Dependency Loading Utilities
 * Handles dynamic loading of external dependencies with fallback support
 */

let LitElement, html, css, fireEvent;

/**
 * Dynamically load dependencies with fallback for offline support
 * @returns {Promise<boolean>} True if dependencies loaded successfully
 */
async function loadDependencies() {
  try {
    // Try multiple CDN sources for better reliability
    const cdnSources = [
      "https://cdn.jsdelivr.net/npm/lit-element@2.4.0/+esm",
      "https://unpkg.com/lit-element@2.4.0/lit-element.js?module",
      "https://cdn.skypack.dev/lit-element@2.4.0",
    ];

    const helperSources = [
      "https://cdn.jsdelivr.net/npm/custom-card-helpers@^1/+esm",
      "https://unpkg.com/custom-card-helpers@^1?module",
    ];

    // Try to load lit-element
    let litLoaded = false;
    for (const source of cdnSources) {
      try {
        const module = await import(source);
        LitElement = module.LitElement;
        html = module.html;
        css = module.css;
        litLoaded = true;
        break;
      } catch (e) {
        logDebug("INIT", `Failed to load from ${source}:`, e);
      }
    }

    if (!litLoaded) {
      throw new Error("Could not load lit-element from any CDN source");
    }

    // Try to load custom-card-helpers
    let helpersLoaded = false;
    for (const source of helperSources) {
      try {
        const module = await import(source);
        fireEvent = module.fireEvent;
        helpersLoaded = true;
        break;
      } catch (e) {
        logDebug("INIT", `Failed to load helpers from ${source}:`, e);
      }
    }

    if (!helpersLoaded) {
      // Fallback fireEvent implementation
      fireEvent = function (node, type, detail, options) {
        options = options || {};
        detail = detail === null || detail === undefined ? {} : detail;
        const event = new Event(type, {
          bubbles: options.bubbles === undefined ? true : options.bubbles,
          cancelable: Boolean(options.cancelable),
          composed: options.composed === undefined ? true : options.composed,
        });
        event.detail = detail;
        node.dispatchEvent(event);
        return event;
      };
    }

    return true;
  } catch (error) {
    logDebug("ERROR", "Failed to load dependencies:", error);
    return false;
  }
}

export { loadDependencies, LitElement, html, css, fireEvent };

/**
 * Get the loaded dependencies (must be called after loadDependencies)
 * @returns {Object} Object containing loaded dependencies
 */
export function getDependencies() {
  return {
    LitElement,
    html,
    css,
    fireEvent,
  };
}
