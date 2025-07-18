/**
 * Debug Utilities
 * Provides enhanced debugging and logging functionality for Actions Card development.
 * Includes categorized logging and conditional debug output controls.
 */

// Debug configuration - set to false for production
const DEBUG = true;

/**
 * Enhanced debugging function that categorizes log messages
 * @param {string} category - Category of the log message (EDITOR, EVENT, CONFIG, ACTION, ERROR, INIT)
 * @param {...any} args - Arguments to log
 */
const logDebug = (category, ...args) => {
  if (!DEBUG) return;

  const categoryColors = {
    EDITOR: "color: #4caf50; font-weight: bold",
    EVENT: "color: #2196f3; font-weight: bold",
    CONFIG: "color: #ff9800; font-weight: bold",
    ACTION: "color: #9c27b0; font-weight: bold",
    ERROR: "color: #f44336; font-weight: bold",
    INIT: "color: #795548; font-weight: bold",
    DEFAULT: "color: #607d8b; font-weight: bold",
  };

  const style = categoryColors[category] || categoryColors.DEFAULT;
  console.debug(`%cActionsCard [${category}]:`, style, ...args);
};

export { DEBUG, logDebug };
