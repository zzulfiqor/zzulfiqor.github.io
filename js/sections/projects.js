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
  const linkEl = document.getElementById("modal-project-link");
  const linkLabelEl = document.getElementById("modal-project-link-label");
  if (linkEl && linkLabelEl) {
    linkEl.href = project.link?.href ?? PROFILE.githubUrl;
    linkLabelEl.textContent = project.link?.label ?? "Visit GitHub Profile";
  }

  openModal("project-modal", triggerEl);
}

function renderProjectLink(project) {
  // A project's own destination (store page, repo) wins over the generic GitHub profile.
  const link = project.link ?? {
    href: PROFILE.githubUrl,
    label: "Open Ahmad's GitHub profile",
    icon: "github",
  };
  return `
    <a
      class="icon-link-btn"
      href="${escapeHtml(link.href)}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${escapeHtml(link.label)}"
      title="${escapeHtml(link.label)}"
    >
      ${renderIcon(link.icon, 16)}
    </a>`;
}

function renderProjectCard(project, number) {
  const meta = project.client ? `${project.role} · ${project.client}` : project.role;
  return `
    <article class="project-card spotlight-card">
      <div class="project-body">
        <div class="project-card-top">
          <span class="project-index">${number}</span>
          <span class="project-category-pill">${escapeHtml(project.category)}</span>
        </div>
        <p class="project-meta">${escapeHtml(meta)}</p>
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
          ${renderProjectLink(project)}
        </div>
      </div>
    </article>
  `;
}

function renderRoleCard() {
  return `
    <article class="project-card tl-now-card">
      <div class="project-body">
        <div class="project-card-top">
          <span class="tl-now-badge"><span class="status-dot" aria-hidden="true"></span>Current role</span>
        </div>
        <p class="project-meta">${escapeHtml(EXPERIENCE.company)}</p>
        <h3 class="project-title">${escapeHtml(EXPERIENCE.role)}</h3>
        <p class="project-desc">
          Redeveloping reporting software with Flutter Web, a reusable internal Flutter Web framework, and Spring Boot services.
        </p>
        <div class="project-footer">
          <a class="project-detail-btn" href="#experience">
            <span>See Experience</span>
            ${renderIcon("arrowRight", 15)}
          </a>
        </div>
      </div>
    </article>`;
}

function renderPhase(number, year) {
  return `
    <li class="tl-phase">
      <span class="tl-phase-year" aria-hidden="true">${escapeHtml(year)}</span>
      <span class="tl-phase-label">Phase ${String(number).padStart(2, "0")} · ${escapeHtml(year)}</span>
      <span class="tl-stem" aria-hidden="true"></span>
      <span class="tl-dot tl-dot--phase" aria-hidden="true"></span>
      <span class="tl-date" aria-hidden="true"></span>
    </li>
  `;
}

/** Projects and the current role as a left-to-right timeline, grouped into yearly phases. */
function renderProjects() {
  const track = document.getElementById("projects-grid");
  if (!track) return;

  const entries = [
    ...PROJECTS.map((project) => ({ start: project.start, project })),
    { start: EXPERIENCE.start, role: true },
  ].sort((a, b) => a.start.localeCompare(b.start));

  let currentYear = "";
  let phase = 0;
  let number = 0;
  const items = entries.map((entry, index) => {
    const year = entry.start.slice(0, 4);
    let html = "";
    if (year !== currentYear) {
      currentYear = year;
      phase += 1;
      html += renderPhase(phase, year);
    }
    const tall = index % 2 === 1 ? " tl-entry--tall" : "";
    if (entry.role) {
      html += `
        <li class="tl-entry tl-entry--now${tall}">
          ${renderRoleCard()}
          <span class="tl-stem" aria-hidden="true"></span>
          <span class="tl-dot tl-dot--now" aria-hidden="true"></span>
          <span class="tl-date">${escapeHtml(EXPERIENCE.period)}</span>
        </li>`;
      return html;
    }
    number += 1;
    html += `
      <li class="tl-entry${tall}">
        ${renderProjectCard(entry.project, String(number).padStart(2, "0"))}
        <span class="tl-stem" aria-hidden="true"></span>
        <span class="tl-dot" aria-hidden="true"></span>
        <span class="tl-date">${escapeHtml(entry.project.period)}</span>
      </li>`;
    return html;
  });

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
