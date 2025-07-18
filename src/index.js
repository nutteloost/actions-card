import { loadDependencies } from "./utils/dependencies.js";
import { createActionsCard } from "./actions-card.js";
import { createActionsCardEditor } from "./actions-card-editor.js";
import { logDebug } from "./utils/debug.js";

// Version management
export const CARD_VERSION = "1.4.0";

/**
 * Initialize the Actions Card
 * Load dependencies and register components
 */
async function initializeActionsCard() {
  // Load dependencies first
  const dependenciesLoaded = await loadDependencies();

  if (!dependenciesLoaded) {
    // Create error element if dependencies failed to load
    customElements.define(
      "actions-card",
      class extends HTMLElement {
        setConfig() {
          throw new Error(
            "Actions Card: Failed to load required dependencies. Please check your internet connection or consider using a bundled version for offline support.",
          );
        }
      },
    );
    return;
  }

  // Create the card classes after dependencies are loaded
  const ActionsCard = createActionsCard();
  const ActionsCardEditor = createActionsCardEditor();

  // Register card components with custom elements
  customElements.define("actions-card", ActionsCard);
  customElements.define("actions-card-editor", ActionsCardEditor);

  // Set up the card's config element getter
  ActionsCard.getConfigElement = () =>
    document.createElement("actions-card-editor");

  // Register card with Home Assistant
  window.customCards = window.customCards || [];
  if (!window.customCards.some((card) => card.type === "actions-card")) {
    window.customCards.push({
      type: "actions-card",
      name: "Actions Card",
      preview: true, // Indicate that a preview is available
      description:
        "Wraps another card to add tap, hold, and double-tap actions.",
    });
  }

  // Display version information
  console.info(
    `%c ACTIONS-CARD %c v${CARD_VERSION} %c`,
    "color: white; background: #9c27b0; font-weight: 700;",
    "color: #9c27b0; background: white; font-weight: 700;",
    "color: grey; background: white; font-weight: 400;",
  );
}

// Initialize the card
initializeActionsCard().catch((error) => {
  logDebug("ERROR", "Failed to initialize:", error);
});
