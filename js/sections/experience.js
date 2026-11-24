import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
} from "../data.js";
import { escapeHtml, filterExperienceHighlights } from "../utils.js";
import { openModal } from "../ui/modal.js";

const LAYER_LABELS = {
  frontend: "Flutter Web & UI/UX",
  backend: "Spring Boot & SQL",
  infra: "Docker & Nginx",
};

function renderExperience(activeLayer = "all") {
  const tabsContainer = document.getElementById("exp-layer-tabs");
  const listContainer = document.getElementById("exp-highlights-list");
  if (!tabsContainer || !listContainer) return;

  tabsContainer.innerHTML = EXPERIENCE.layers
    .map(
      (layer) => `
        <button
          type="button"
          class="layer-tab"
          role="tab"
          aria-selected="${layer.id === activeLayer}"
          data-layer="${escapeHtml(layer.id)}"
        >
          ${escapeHtml(layer.label)}
        </button>
      `
    )
    .join("");

  const items = filterExperienceHighlights(EXPERIENCE.highlights, activeLayer);
  listContainer.innerHTML = items
    .map(
      (item, index) => `
        <li class="timeline-item">
          <span class="timeline-node" aria-hidden="true">${String(
            index + 1
          ).padStart(2, "0")}</span>
          <div class="timeline-card spotlight-card">
            <span class="timeline-layer-badge">${escapeHtml(
              LAYER_LABELS[item.layer] || "Engineering"
            )}</span>
            <p class="timeline-text">${escapeHtml(item.text)}</p>
          </div>
        </li>
      `
    )
    .join("");
}

function renderCvSheet() {
  const courseworkEl = document.getElementById("coursework-list");
  if (courseworkEl) {
    courseworkEl.innerHTML = EDUCATION.coursework
      .map((course) => `<span class="tech-pill">${escapeHtml(course)}</span>`)
      .join("");
  }

  const cvSheet = document.getElementById("cv-sheet-content");
  if (!cvSheet) return;

  cvSheet.innerHTML = `
    <div class="cv-sheet-header">
      <h4>${escapeHtml(PROFILE.fullName.toUpperCase())}</h4>
      <p class="cv-sheet-role">${escapeHtml(PROFILE.role)}</p>
      <p class="cv-sheet-contact">
        ${escapeHtml(PROFILE.location)} | ${escapeHtml(
    PROFILE.phoneDisplay
  )} | ${escapeHtml(PROFILE.email)} | ${escapeHtml(PROFILE.githubDisplay)}
      </p>
    </div>

    <h3>Professional Summary</h3>
    <p>${escapeHtml(PROFILE.summary)}</p>

    <h3>Technical Skills</h3>
    <ul>
      ${SKILL_GROUPS.map(
        (group) =>
          `<li><strong>${escapeHtml(group.title)}:</strong> ${group.items
            .map(escapeHtml)
            .join(", ")}</li>`
      ).join("")}
    </ul>

    <h3>Professional Experience</h3>
    <p><strong>${escapeHtml(EXPERIENCE.role)} | ${escapeHtml(
    EXPERIENCE.company
  )}</strong> (${escapeHtml(EXPERIENCE.period)})</p>
    <ul>
      ${EXPERIENCE.highlights
        .map((h) => `<li>${escapeHtml(h.text)}</li>`)
        .join("")}
    </ul>

    <h3>Selected Projects</h3>
    <ul>
      ${PROJECTS.map(
        (p) =>
          `<li><strong>${escapeHtml(p.role)} | ${escapeHtml(
            p.title
          )}</strong> (${escapeHtml(p.period)}): ${p.details
            .map(escapeHtml)
            .join(" ")}</li>`
      ).join("")}
    </ul>

    <h3>Education</h3>
    <p>
      <strong>${escapeHtml(EDUCATION.degree)} | ${escapeHtml(
    EDUCATION.institution
  )}</strong>
      (${escapeHtml(EDUCATION.period)} | ${escapeHtml(EDUCATION.location)})<br />
      GPA: ${escapeHtml(EDUCATION.gpa)}<br />
      Relevant coursework: ${EDUCATION.coursework.map(escapeHtml).join(", ")}.
    </p>

    <h3>Certification</h3>
    <ul>
      ${CERTIFICATIONS.map(
        (c) =>
          `<li>${escapeHtml(c.issuer)} - ${escapeHtml(c.title)}, ${escapeHtml(
            c.year
          )}</li>`
      ).join("")}
    </ul>
  `;
}

/**
 * Initializes the sticky experience timeline, education card, and printable CV triggers.
 */
export function initExperienceSection() {
  renderExperience("all");
  renderCvSheet();

  document.getElementById("exp-layer-tabs")?.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-layer]");
    if (!tab) return;
    renderExperience(tab.dataset.layer);
  });

  ["open-cv-btn", "about-cv-btn", "mobile-open-cv-btn"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", (event) => {
      openModal("cv-modal", event.currentTarget);
    });
  });

  document.getElementById("print-cv-btn")?.addEventListener("click", () => {
    window.print();
  });
}
