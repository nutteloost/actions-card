/**
 * Individual Action Handlers
 * Contains the implementation for each specific action type supported by Actions Card.
 * Each handler is responsible for executing one type of action (navigate, toggle, etc.)
 * with proper error handling and parameter validation.
 */

import { getDependencies } from '../utils/dependencies.js';
import { logDebug } from '../utils/debug.js';
import { getEntityId } from '../utils/helpers.js';

/**
 * Executes a navigate action
 * @param {Object} actionConfig - Configuration for the navigate action
 * @param {Object} _hass - Home Assistant object (unused)
 * @param {Object} _config - Card configuration (unused)
 * @param {Object} _childCard - Child card element (unused)
 */
export function executeNavigateAction(actionConfig, _hass, _config, _childCard) {
  const { fireEvent } = getDependencies();
  const path = actionConfig.navigation_path || '';
  const replace = actionConfig.navigation_replace === true;
  if (path) {
    // Only navigate if path is defined
    logDebug('ACTION', 'Navigating to:', path, { replace });
    if (replace) {
      window.history.replaceState(null, '', path);
    } else {
      window.history.pushState(null, '', path);
    }
    fireEvent(window, 'location-changed', { replace });
  } else {
    logDebug('ACTION', 'Navigate action called without navigation_path');
  }
}

/**
 * Executes a URL action
 * @param {Object} actionConfig - Configuration for the URL action
 * @param {Object} _hass - Home Assistant object (unused)
 * @param {Object} _config - Card configuration (unused)
 * @param {Object} _childCard - Child card element (unused)
 */
export function executeUrlAction(actionConfig, _hass, _config, _childCard) {
  const url = actionConfig.url_path || '';
  if (url) {
    // Only open if url is defined
    logDebug('ACTION', 'Opening URL:', url, {
      target: actionConfig.target || '_blank'
    });
    window.open(url, actionConfig.target || '_blank'); // Allow specifying target
  } else {
    logDebug('ACTION', 'URL action called without url_path');
  }
}

/**
 * Executes a toggle action
 * @param {Object} actionConfig - Configuration for the toggle action
 * @param {Object} hass - Home Assistant object
 * @param {Object} config - Card configuration
 * @param {Object} childCard - Child card element
 */
export function executeToggleAction(actionConfig, hass, config, childCard) {
  const toggleEntity = getEntityId(actionConfig, config, childCard);
  if (toggleEntity) {
    logDebug('ACTION', 'Toggling entity:', toggleEntity);
    hass.callService('homeassistant', 'toggle', { entity_id: toggleEntity });
  } else {
    logDebug('ACTION', 'Toggle action called without a valid entity_id');
  }
}

/**
 * Executes a service call action
 * @param {Object} actionConfig - Configuration for the service call action
 * @param {Object} hass - Home Assistant object
 * @param {Object} config - Card configuration
 * @param {Object} childCard - Child card element
 */
export function executeServiceAction(actionConfig, hass, _config, _childCard) {
  if (!actionConfig.service) {
    logDebug('ACTION', 'Call-service action called without service defined');
    return;
  }
  const [domain, service] = actionConfig.service.split('.', 2);
  if (!domain || !service) {
    logDebug('ACTION', 'Invalid service format:', actionConfig.service);
    return;
  }
  // Use service_data or data for compatibility
  const serviceData = actionConfig.service_data || actionConfig.data || {};
  // Target handling
  const target =
    actionConfig.target || (serviceData.entity_id ? { entity_id: serviceData.entity_id } : {});
  // Remove entity_id from serviceData if it's in target
  if (target.entity_id && serviceData.entity_id) delete serviceData.entity_id;

  logDebug('ACTION', 'Calling service:', `${domain}.${service}`, {
    serviceData,
    target
  });
  hass.callService(domain, service, serviceData, target);
}

/**
 * Executes a more-info action
 * @param {Object} actionConfig - Configuration for the more-info action
 * @param {Object} hass - Home Assistant object
 * @param {Object} config - Card configuration
 * @param {Object} childCard - Child card element
 * @param {Object} element - Element to fire event from
 */
export function executeMoreInfoAction(actionConfig, hass, config, childCard, element) {
  const { fireEvent } = getDependencies();
  const entityId = getEntityId(actionConfig, config, childCard);
  logDebug('ACTION', 'Executing more-info action for entity:', entityId);
  logDebug('ACTION', 'Action config:', actionConfig);

  if (entityId) {
    logDebug('ACTION', 'Showing more-info for entity:', entityId);
    fireEvent(element, 'hass-more-info', { entityId });
  } else {
    logDebug('ACTION', 'More-info action called without a valid entity_id');
  }
}

/**
 * Executes an assist action
 * @param {Object} actionConfig - Configuration for the assist action
 * @param {Object} hass - Home Assistant object
 * @param {Object} config - Card configuration
 * @param {Object} childCard - Child card element
 * @param {Object} element - Element to fire event from
 */
export function executeAssistAction(actionConfig, hass, config, childCard, element) {
  const { fireEvent } = getDependencies();
  logDebug('ACTION', 'Executing assist action', {
    pipeline_id: actionConfig.pipeline_id || 'last_used',
    start_listening: actionConfig.start_listening === true
  });
  fireEvent(element, 'assist', {
    pipeline_id: actionConfig.pipeline_id || 'last_used',
    start_listening: actionConfig.start_listening === true
  });
}

/**
 * Executes a DOM event action
 * @param {Object} actionConfig - Configuration for the DOM event action
 * @param {Object} hass - Home Assistant object
 * @param {Object} config - Card configuration
 * @param {Object} childCard - Child card element
 * @param {Object} element - Element to fire event from
 */
export function executeDomEventAction(actionConfig, hass, config, childCard, element) {
  const { fireEvent } = getDependencies();
  // Special handling for Browser Mod compatibility
  if (actionConfig.event_type === 'browser_mod' && actionConfig.event_data) {
    logDebug('ACTION', 'Firing Browser Mod compatible event:', actionConfig.event_data);
    // Browser Mod expects 'll-custom' events with browser_mod in detail
    fireEvent(element, 'll-custom', { browser_mod: actionConfig.event_data });
    return;
  }

  // Standard fire-dom-event handling
  if (actionConfig.event_type) {
    logDebug(
      'ACTION',
      'Firing DOM event:',
      actionConfig.event_type,
      actionConfig.event_data || null
    );
    fireEvent(element, actionConfig.event_type, actionConfig.event_data || null);
  } else {
    logDebug('ACTION', 'Fire-dom-event action called without event_type');
  }
}
