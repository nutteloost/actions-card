/**
 * Template Utilities
 * Provides support for Jinja2 templates in action configurations.
 * Enables dynamic values based on Home Assistant state.
 *
 * Templates are rendered via Home Assistant's render_template WebSocket API.
 * Any string containing {{ or {% will be processed as a template.
 */

import { logDebug } from './debug.js';

/**
 * Check if a string contains Jinja2 template syntax
 * @param {string} value - Value to check
 * @returns {boolean} True if contains template syntax
 */
export function containsTemplate(value) {
  if (typeof value !== 'string') return false;
  return value.includes('{{') || value.includes('{%');
}

/**
 * Render a Jinja2 template using Home Assistant's WebSocket API
 * @param {Object} hass - Home Assistant object
 * @param {string} template - Template string to render
 * @param {number} [timeout=5000] - Timeout in milliseconds
 * @returns {Promise<string>} Rendered template result
 */
export async function renderTemplate(hass, template, timeout = 5000) {
  if (!containsTemplate(template)) {
    return template;
  }

  if (!hass || !hass.connection) {
    logDebug('ERROR', 'Cannot render template: no hass connection');
    return template;
  }

  try {
    return await new Promise((resolve, reject) => {
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
 * @param {Object} hass - Home Assistant object
 * @param {*} value - Value to process
 * @returns {Promise<*>} Value with all templates resolved
 */
export async function processTemplates(hass, value) {
  // Handle strings - render if template
  if (typeof value === 'string') {
    if (containsTemplate(value)) {
      return renderTemplate(hass, value);
    }
    return value;
  }

  // Handle arrays - process each item
  if (Array.isArray(value)) {
    const results = await Promise.all(value.map((item) => processTemplates(hass, item)));
    return results;
  }

  // Handle objects - process each property
  if (value && typeof value === 'object') {
    const result = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = await processTemplates(hass, val);
    }
    return result;
  }

  // Return other types as-is (numbers, booleans, null, undefined)
  return value;
}
