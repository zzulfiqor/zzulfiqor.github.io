/**
 * Escapes HTML special characters to prevent markup injection in template strings.
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Filters experience highlight items by architectural layer.
 * Returns all items when layer is "all" or omitted.
 * @param {Array<{layer: string, text: string}>} highlights
 * @param {string} [layer]
 * @returns {Array<{layer: string, text: string}>}
 */
export function filterExperienceHighlights(highlights, layer) {
  if (!Array.isArray(highlights)) return [];
  if (!layer || layer === "all") return highlights;
  return highlights.filter((item) => item.layer === layer);
}

/**
 * Finds a project by its unique ID.
 * @param {Array<{id: string}>} projects
 * @param {string} id
 * @returns {object|null}
 */
export function findProjectById(projects, id) {
  if (!Array.isArray(projects) || !id) return null;
  return projects.find((project) => project.id === id) || null;
}

/**
 * Finds an architecture pipeline node by ID, falling back to the first node.
 * @param {Array<{id: string}>} nodes
 * @param {string} id
 * @returns {object|null}
 */
export function findPipelineNodeById(nodes, id) {
  if (!Array.isArray(nodes) || nodes.length === 0) return null;
  return nodes.find((node) => node.id === id) || nodes[0];
}

/**
 * Validates contact form fields and returns normalized values and field errors.
 * @param {{name?: string, email?: string, message?: string}} input
 */
export function validateContactForm({ name, email, message }) {
  const errors = {};
  const trimmedName = (name || "").trim();
  const trimmedEmail = (email || "").trim();
  const trimmedMessage = (message || "").trim();

  if (trimmedName.length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (trimmedMessage.length < 10) {
    errors.message = "Please write a brief message (at least 10 characters).";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values: {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    },
  };
}

/**
 * Builds a properly encoded mailto URI for opening the user's email client.
 * @param {string} recipientEmail
 * @param {{name: string, email: string, subject?: string, message: string}} payload
 * @returns {string}
 */
export function buildMailtoHref(recipientEmail, { name, email, subject, message }) {
  const cleanSubject = (subject || "").trim() || `Portfolio Inquiry from ${name}`;
  const bodyLines = [
    "Hi Ahmad,",
    "",
    message,
    "",
    "---",
    `From: ${name}`,
    `Reply-To: ${email}`,
  ];
  const params = new URLSearchParams({
    subject: cleanSubject,
    body: bodyLines.join("\n"),
  });
  return `mailto:${recipientEmail}?${params.toString().replace(/\+/g, "%20")}`;
}

/**
 * Formats a plain-text clipboard draft from contact form fields.
 * @param {string} recipientEmail
 * @param {{name?: string, email?: string, subject?: string, message?: string}} payload
 * @returns {string}
 */
export function formatContactDraft(recipientEmail, { name, email, subject, message }) {
  const safeName = (name || "").trim() || "(Your Name)";
  const safeEmail = (email || "").trim() || "(Your Email)";
  const safeSubject = (subject || "").trim() || "Portfolio Inquiry";
  const safeMessage = (message || "").trim();
  return `To: ${recipientEmail}\nSubject: ${safeSubject}\nFrom: ${safeName} (${safeEmail})\n\n${safeMessage}`;
}

/**
 * Resolves which section ID is active based on current scroll position and section offsets.
 * @param {Array<{id: string, top: number}>} sections
 * @param {{scrollY?: number, viewportHeight?: number, documentHeight?: number, offset?: number}} [viewport]
 * @returns {string|null}
 */
export function resolveActiveSectionId(
  sections,
  { scrollY = 0, viewportHeight = 800, documentHeight = 0, offset = 92 } = {}
) {
  if (!Array.isArray(sections) || sections.length === 0) return null;
  if (scrollY <= 16) return sections[0].id;
  if (documentHeight > 0 && scrollY + viewportHeight >= documentHeight - 24) {
    return sections[sections.length - 1].id;
  }

  const readingLine = scrollY + offset + viewportHeight * 0.25;
  let activeId = sections[0].id;
  for (const section of sections) {
    if (section.top <= readingLine) {
      activeId = section.id;
    } else {
      break;
    }
  }
  return activeId;
}
