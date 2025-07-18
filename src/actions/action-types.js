/**
 * Action Type Definitions
 * Defines all supported action types, configurations, and timing constants
 */

/**
 * Supported action types
 */
export const ACTION_TYPES = {
  NONE: "none",
  NAVIGATE: "navigate",
  URL: "url",
  TOGGLE: "toggle",
  CALL_SERVICE: "call-service",
  MORE_INFO: "more-info",
  ASSIST: "assist",
  FIRE_DOM_EVENT: "fire-dom-event",
};

/**
 * Default action configuration
 */
export const DEFAULT_ACTION = {
  action: ACTION_TYPES.NONE,
};

/**
 * Action type metadata for editor
 */
export const ACTION_TYPE_OPTIONS = [
  { value: ACTION_TYPES.NONE, label: "None" },
  { value: ACTION_TYPES.TOGGLE, label: "Toggle" },
  { value: ACTION_TYPES.NAVIGATE, label: "Navigate" },
  { value: ACTION_TYPES.URL, label: "URL" },
  { value: ACTION_TYPES.CALL_SERVICE, label: "Call Service" },
  { value: ACTION_TYPES.MORE_INFO, label: "More Info" },
  { value: ACTION_TYPES.ASSIST, label: "Assist" },
  { value: ACTION_TYPES.FIRE_DOM_EVENT, label: "Fire DOM Event" },
];

/**
 * Interactive element tags that should not trigger actions
 */
export const INTERACTIVE_TAGS = [
  "INPUT",
  "BUTTON",
  "SELECT",
  "TEXTAREA",
  "A",
  "HA-SLIDER",
  "HA-SWITCH",
  "PAPER-SLIDER",
  "PAPER-BUTTON",
  "MWC-BUTTON",
];

/**
 * Default timing configurations
 */
export const DEFAULT_TIMINGS = {
  HOLD_TIME: 500,
  DOUBLE_TAP_TIMEOUT: 250,
  MOVEMENT_THRESHOLD: 10,
};

/**
 * UI and component constants
 */
export const UI_CONSTANTS = {
  CARD_PICKER_RETRY_DELAY: 100,
  EVENT_SUPPRESSION_DURATION: 300,
  DIALOG_PREVENTION_DELAY: 50,
  CARD_CREATION_RETRY_DELAY: 100,
  MAX_CARD_CREATION_RETRIES: 10,
  PICKER_UPDATE_DELAY: 50,
  CONFIRMATION_DIALOG_CLEANUP_DELAY: 100,
};
