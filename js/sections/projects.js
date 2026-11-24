import { EXPERIENCE, PROFILE, PROJECTS } from "../data.js";
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

const yearOf = (period) => period.match(/\d{4}/)?.[0] ?? "";

function renderProjectCard(project, number) {
  return `
    <article class="project-card spotlight-card">
      <div class="project-body">
        <div class="project-card-top">
          <span class="project-index">${number}</span>
          <span class="project-category-pill">${escapeHtml(project.category)}</span>
        </div>
        <p class="project-meta">${escapeHtml(project.role)}</p>
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
}

function renderPhase(number, year, label) {
  return `
    <li class="tl-phase">
      <span class="tl-phase-year" aria-hidden="true">${escapeHtml(year)}</span>
      <span class="tl-phase-label">Phase ${String(number).padStart(2, "0")} · ${escapeHtml(label)}</span>
      <span class="tl-stem" aria-hidden="true"></span>
      <span class="tl-dot tl-dot--phase" aria-hidden="true"></span>
      <span class="tl-date" aria-hidden="true"></span>
    </li>
  `;
}

/** Projects as a left-to-right chronological timeline, grouped into yearly phases, ending at the current role. */
function renderProjects() {
  const track = document.getElementById("projects-grid");
  if (!track) return;

  // PROJECTS is stored newest-first; the timeline reads oldest to newest.
  const chronological = [...PROJECTS].reverse();
  let currentYear = "";
  let phase = 0;
  const items = chronological.map((project, index) => {
    const year = yearOf(project.period);
    let html = "";
    if (year !== currentYear) {
      currentYear = year;
      phase += 1;
      html += renderPhase(phase, year, year);
    }
    const tall = index % 2 === 1 ? " tl-entry--tall" : "";
    html += `
      <li class="tl-entry${tall}">
        ${renderProjectCard(project, String(index + 1).padStart(2, "0"))}
        <span class="tl-stem" aria-hidden="true"></span>
        <span class="tl-dot" aria-hidden="true"></span>
        <span class="tl-date">${escapeHtml(project.period)}</span>
      </li>`;
    return html;
  });

  const nowYear = yearOf(EXPERIENCE.period);
  items.push(renderPhase(phase + 1, nowYear, `${nowYear} to now`));
  items.push(`
    <li class="tl-entry tl-entry--now">
      <article class="project-card tl-now-card">
        <div class="project-body">
          <div class="project-card-top">
            <span class="tl-now-badge"><span class="status-dot" aria-hidden="true"></span>Now</span>
          </div>
          <p class="project-meta">${escapeHtml(EXPERIENCE.company)}</p>
          <h3 class="project-title">${escapeHtml(EXPERIENCE.role)}</h3>
          <p class="project-desc">
            Building reusable Flutter Web frameworks, Spring Boot services, and SQL reporting workflows.
          </p>
          <div class="project-footer">
            <a class="project-detail-btn" href="#experience">
              <span>See Experience</span>
              ${renderIcon("arrowRight", 15)}
            </a>
          </div>
        </div>
      </article>
      <span class="tl-stem" aria-hidden="true"></span>
      <span class="tl-dot tl-dot--now" aria-hidden="true"></span>
      <span class="tl-date">${escapeHtml(EXPERIENCE.period)}</span>
    </li>`);

  track.innerHTML = items.join("");
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
