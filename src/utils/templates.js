/**
 * Template Utilities
 * Provides support for Jinja2 templates and JavaScript templates in action configurations.
 * Enables dynamic values based on Home Assistant state.
 *
 * Jinja2 Templates:
 * - Syntax: {{ }} or {% %}
 * - Rendered via Home Assistant's render_template WebSocket API (async)
 * - Access to HA backend state
 *
 * JavaScript Templates:
 * - Syntax: [[[ ]]]
 * - Evaluated client-side in browser (sync)
 * - Access to frontend state including user info (hass.user)
 */

import { logDebug } from './debug.js';

/**
 * Check if a string contains Jinja2 template syntax
 * @param {string} value - Value to check
 * @returns {boolean} True if contains Jinja2 template syntax
 */
export function containsJinjaTemplate(value) {
  if (typeof value !== 'string') return false;
  return value.includes('{{') || value.includes('{%');
}

/**
 * Check if a string contains JavaScript template syntax [[[...]]]
 * @param {string} value - Value to check
 * @returns {boolean} True if contains JS template syntax
 */
export function containsJsTemplate(value) {
  if (typeof value !== 'string') return false;
  return /\[{3}[\s\S]*\]{3}/.test(value);
}

/**
 * Check if a string contains any template syntax (Jinja2 or JavaScript)
 * @param {string} value - Value to check
 * @returns {boolean} True if contains template syntax
 */
export function containsTemplate(value) {
  if (typeof value !== 'string') return false;
  return containsJinjaTemplate(value) || containsJsTemplate(value);
}

/**
 * Evaluate a JavaScript template [[[ ... ]]]
 * Executes the code inside the brackets with access to HA context
 *
 * Available variables in template:
 * - states: Home Assistant states object
 * - user: Current user info (id, name, is_admin, etc.)
 * - hass: Full Home Assistant object
 * - entity: Entity state object (if provided)
 *
 * @param {Object} hass - Home Assistant object
 * @param {string} template - Template string with [[[ ... ]]] syntax
 * @param {Object|null} entity - Optional entity state object
 * @returns {*} Result of template evaluation
 */
export function evalJsTemplate(hass, template, entity = null) {
  if (!containsJsTemplate(template)) {
    return template;
  }

  // Extract code from [[[ ... ]]]
  const trimmed = template.trim();
  const match = trimmed.match(/^\[{3}([\s\S]*)\]{3}$/);

  if (!match) {
    return template;
  }

  const code = match[1];

  try {
    /* eslint-disable no-new-func */
    const result = new Function('states', 'entity', 'user', 'hass', `'use strict'; ${code}`)(
      hass.states,
      entity,
      hass.user,
      hass
    );
    /* eslint-enable no-new-func */

    logDebug('ACTION', 'JS Template evaluated:', template.substring(0, 50) + '...', '->', result);
    return result;
  } catch (e) {
    const templatePreview =
      template.length <= 100 ? template.trim() : `${template.trim().substring(0, 98)}...`;
    logDebug('ERROR', `JS Template error in '${templatePreview}':`, e.message);
    console.error('ActionsCard JS Template Error:', e);
    return template; // Return original on error
  }
}

/**
 * Render a Jinja2 template using Home Assistant's WebSocket API
 * @param {Object} hass - Home Assistant object
 * @param {string} template - Template string to render
 * @param {number} [timeout=5000] - Timeout in milliseconds
 * @returns {Promise<string>} Rendered template result
 */
export async function renderTemplate(hass, template, timeout = 5000) {
  if (!containsJinjaTemplate(template)) {
    return template;
  }

  if (!hass || !hass.connection) {
    logDebug('ERROR', 'Cannot render template: no hass connection');
    return template;
  }

  try {
    return await new Promise((resolve, _reject) => {
      let unsubscribe = null;
      let resolved = false;

      const timeoutId = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          if (unsubscribe) {
            try {
              unsubscribe();
            } catch (e) {
              // Ignore unsubscribe errors
            }
          }
          logDebug('ERROR', 'Template rendering timed out:', template);
          resolve(template);
        }
      }, timeout);

      hass.connection
        .subscribeMessage(
          (msg) => {
            if (!resolved) {
              resolved = true;
              clearTimeout(timeoutId);
              if (unsubscribe) {
                try {
                  unsubscribe();
                } catch (e) {
                  // Ignore unsubscribe errors
                }
              }
              if (msg.result !== undefined) {
                logDebug('ACTION', 'Template rendered:', template, '->', msg.result);
                resolve(msg.result);
              } else {
                resolve(template);
              }
            }
          },
          {
            type: 'render_template',
            template: template,
            timeout: Math.ceil(timeout / 1000)
          }
        )
        .then((unsub) => {
          unsubscribe = unsub;
          if (resolved && unsubscribe) {
            try {
              unsubscribe();
            } catch (e) {
              // Ignore
            }
          }
        })
        .catch((err) => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeoutId);
            logDebug('ERROR', 'Template subscription failed:', err);
            resolve(template);
          }
        });
    });
  } catch (e) {
    logDebug('ERROR', 'Template rendering failed:', e);
    return template;
  }
}

/**
 * Check if an object contains any template strings (recursive)
 * Checks for both Jinja2 and JavaScript templates
 * @param {*} obj - Value to check
 * @returns {boolean} True if templates found
 */
export function objectContainsTemplates(obj) {
  if (typeof obj === 'string') {
    return containsTemplate(obj);
  }

  if (Array.isArray(obj)) {
    return obj.some((item) => objectContainsTemplates(item));
  }

  if (obj && typeof obj === 'object') {
    return Object.values(obj).some((value) => objectContainsTemplates(value));
  }

  return false;
}

/**
 * Process all template values in any value recursively
 * Handles strings, arrays, and objects
 * Supports both Jinja2 (async) and JavaScript (sync) templates
 *
 * @param {Object} hass - Home Assistant object
 * @param {*} value - Value to process
 * @param {Object|null} entity - Optional entity state for JS templates
 * @returns {Promise<*>} Value with all templates resolved
 */
export async function processTemplates(hass, value, entity = null) {
  // Handle strings - check template type and render appropriately
  if (typeof value === 'string') {
    // Check for JS template first (synchronous evaluation)
    if (containsJsTemplate(value)) {
      return evalJsTemplate(hass, value, entity);
    }
    // Then check for Jinja2 template (async evaluation)
    if (containsJinjaTemplate(value)) {
      return renderTemplate(hass, value);
    }
    return value;
  }

  // Handle arrays - process each item
  if (Array.isArray(value)) {
    const results = await Promise.all(value.map((item) => processTemplates(hass, item, entity)));
    return results;
  }

  // Handle objects - process each property
  if (value && typeof value === 'object') {
    const result = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = await processTemplates(hass, val, entity);
    }
    return result;
  }

  // Return other types as-is (numbers, booleans, null, undefined)
  return value;
}
