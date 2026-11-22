import { PROFILE, PROJECTS } from "../data.js";
import { escapeHtml, findProjectById } from "../utils.js";
import { renderIcon } from "../ui/icons.js";
import { openModal } from "../ui/modal.js";

function openProjectModal(projectId, triggerEl) {
  const project = findProjectById(PROJECTS, projectId);
  if (!project) return;

  const metaEl = document.getElementById("modal-project-meta");
  const titleEl = document.getElementById("modal-project-title");
  const summaryEl = document.getElementById("modal-project-summary");
  const detailsEl = document.getElementById("modal-project-details");
  const stackEl = document.getElementById("modal-project-stack");

  if (metaEl) {
    metaEl.textContent = `${project.category.toUpperCase()} · ${project.period} · ${project.role}`;
  }
  if (titleEl) titleEl.textContent = project.title;
  if (summaryEl) summaryEl.textContent = project.shortDescription;
  if (detailsEl) {
    detailsEl.innerHTML = project.details
      .map((line) => `<li>${escapeHtml(line)}</li>`)
      .join("");
  }
  if (stackEl) {
    stackEl.innerHTML = project.stack
      .map((tag) => `<span class="tech-pill">${escapeHtml(tag)}</span>`)
      .join("");
  }

  openModal("project-modal", triggerEl);
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((project, index) => {
    const numberLabel = String(index + 1).padStart(2, "0");
    return `
      <article class="project-card spotlight-card">
        <div class="project-body">
          <div class="project-card-top">
            <span class="project-index">${numberLabel}</span>
            <span class="project-category-pill">${escapeHtml(project.category)}</span>
          </div>
          <p class="project-meta">${escapeHtml(project.period)} · ${escapeHtml(
      project.role
    )}</p>
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <p class="project-desc">${escapeHtml(project.shortDescription)}</p>
          <div class="pill-wrap">
            ${project.stack
              .map((tag) => `<span class="tech-pill">${escapeHtml(tag)}</span>`)
              .join("")}
          </div>
          <div class="project-footer">
            <button
              type="button"
              class="project-detail-btn"
              data-project-id="${escapeHtml(project.id)}"
            >
              <span>View Details</span>
              ${renderIcon("arrowRight", 15)}
            </button>
            <a
              class="icon-link-btn"
              href="${escapeHtml(PROFILE.githubUrl)}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Ahmad's GitHub profile"
            >
              ${renderIcon("github", 16)}
            </a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/**
 * Initializes the selected projects archive and detail modal triggers.
 */
export function initProjectsSection() {
  renderProjects();

  document.getElementById("projects-grid")?.addEventListener("click", (event) => {
    const detailBtn = event.target.closest("[data-project-id]");
    if (!detailBtn) return;
    openProjectModal(detailBtn.dataset.projectId, detailBtn);
  });
}
