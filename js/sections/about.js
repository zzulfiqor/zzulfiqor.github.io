import { ARCHITECTURE_PIPELINE, PROFILE, SKILL_GROUPS } from "../data.js";
import { escapeHtml, findPipelineNodeById } from "../utils.js";
import { renderIcon } from "../ui/icons.js";

function renderPipeline(activeNodeId = ARCHITECTURE_PIPELINE[0]?.id) {
  const tabsEl = document.getElementById("pipeline-tabs");
  const detailEl = document.getElementById("pipeline-detail");
  if (!tabsEl || !detailEl) return;

  const activeNode = findPipelineNodeById(ARCHITECTURE_PIPELINE, activeNodeId);
  if (!activeNode) return;

  tabsEl.innerHTML = ARCHITECTURE_PIPELINE.map(
    (node) => `
      <button
        type="button"
        class="pipeline-step-btn"
        role="tab"
        aria-selected="${node.id === activeNode.id}"
        data-pipeline-id="${escapeHtml(node.id)}"
      >
        <span class="pipeline-step-num">${escapeHtml(node.step)}</span>
        <span>${escapeHtml(node.label)}</span>
      </button>
    `
  ).join("");

  detailEl.innerHTML = `
    <p class="pipeline-detail-meta">${escapeHtml(activeNode.step)} · ${escapeHtml(
    activeNode.tech
  )}</p>
    <p class="pipeline-detail-text">${escapeHtml(activeNode.detail)}</p>
  `;
}

function renderSkillGroups() {
  const skillsGrid = document.getElementById("skills-grid");
  if (!skillsGrid) return;

  skillsGrid.innerHTML = SKILL_GROUPS.map(
    (group) => `
      <article class="skill-group spotlight-card">
        <div class="skill-group-header">
          <span class="skill-group-icon">${renderIcon(group.icon, 16)}</span>
          <h3 class="skill-group-title">${escapeHtml(group.title)}</h3>
        </div>
        <div class="pill-wrap">
          ${group.items
            .map((skill) => `<span class="tech-pill">${escapeHtml(skill)}</span>`)
            .join("")}
        </div>
      </article>
    `
  ).join("");
}

/**
 * Initializes the Bento overview, interactive end-to-end pipeline, and skills matrix.
 */
export function initAboutSection() {
  const summaryEl = document.getElementById("about-summary");
  if (summaryEl) {
    summaryEl.textContent = PROFILE.summary;
  }

  renderPipeline();
  renderSkillGroups();

  document.getElementById("pipeline-tabs")?.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-pipeline-id]");
    if (!tab) return;
    renderPipeline(tab.dataset.pipelineId);
  });
}
