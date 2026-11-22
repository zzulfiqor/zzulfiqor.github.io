import { HIGHLIGHTS } from "../data.js";
import { escapeHtml } from "../utils.js";
import { renderIcon } from "../ui/icons.js";

/**
 * Renders the four-column factual career highlights strip below the hero.
 */
export function initHeroHighlights() {
  const container = document.getElementById("highlights-bar");
  if (!container) return;

  container.innerHTML = HIGHLIGHTS.map(
    (item) => `
      <div class="highlight-item">
        <span class="highlight-icon">${renderIcon(item.icon, 20)}</span>
        <div>
          <div class="highlight-value">${escapeHtml(item.value)}</div>
          <div class="highlight-label">${escapeHtml(item.label)}</div>
        </div>
      </div>
    `
  ).join("");
}
