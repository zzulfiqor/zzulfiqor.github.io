import test from "node:test";
import assert from "node:assert/strict";
import {
  escapeHtml,
  filterExperienceHighlights,
  findProjectById,
  findPipelineNodeById,
  validateContactForm,
  buildMailtoHref,
  formatContactDraft,
  resolveActiveSectionId,
} from "../js/utils.js";
import { ARCHITECTURE_PIPELINE, EXPERIENCE, PROJECTS } from "../js/data.js";

test("filterExperienceHighlights returns all items for 'all' and filters specific layers", () => {
  const all = filterExperienceHighlights(EXPERIENCE.highlights, "all");
  assert.equal(all.length, EXPERIENCE.highlights.length);

  const frontend = filterExperienceHighlights(EXPERIENCE.highlights, "frontend");
  assert.ok(frontend.length > 0);
  assert.ok(frontend.every((item) => item.layer === "frontend"));

  const backend = filterExperienceHighlights(EXPERIENCE.highlights, "backend");
  assert.ok(backend.length > 0);
  assert.ok(backend.every((item) => item.layer === "backend"));

  assert.deepEqual(filterExperienceHighlights(null, "all"), []);
});

test("findProjectById finds matching project and returns null for missing id", () => {
  const topKarir = findProjectById(PROJECTS, "topkarir");
  assert.equal(topKarir.title, "TopKarir");
  assert.equal(findProjectById(PROJECTS, "unknown-id"), null);
  assert.equal(findProjectById(PROJECTS, ""), null);
});

test("findPipelineNodeById returns matching node or falls back to first", () => {
  const sqlNode = findPipelineNodeById(ARCHITECTURE_PIPELINE, "sql-reporting");
  assert.equal(sqlNode.label, "SQL Reporting Engine");
  assert.equal(
    findPipelineNodeById(ARCHITECTURE_PIPELINE, "missing").id,
    ARCHITECTURE_PIPELINE[0].id
  );
  assert.equal(findPipelineNodeById([], "sql-reporting"), null);
});

test("validateContactForm catches invalid inputs and passes valid payloads", () => {
  const invalid = validateContactForm({
    name: "A",
    email: "not-an-email",
    message: "short",
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: "  Budi Santoso  ",
    email: "budi@example.com",
    message: "We would like to discuss a Flutter project with you.",
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
  assert.equal(valid.values.name, "Budi Santoso");
});

test("buildMailtoHref builds properly encoded mailto link", () => {
  const href = buildMailtoHref("zzulfiqor@gmail.com", {
    name: "Budi",
    email: "budi@example.com",
    subject: "Flutter Role",
    message: "Hello Ahmad, let's connect.",
  });
  assert.ok(href.startsWith("mailto:zzulfiqor@gmail.com?"));
  assert.ok(href.includes("subject=Flutter%20Role"));
  assert.ok(href.includes("Reply-To%3A%20budi%40example.com"));
});

test("escapeHtml escapes unsafe markup characters", () => {
  assert.equal(
    escapeHtml(`<script>alert("x") & 'y'</script>`),
    "&lt;script&gt;alert(&quot;x&quot;) &amp; &#39;y&#39;&lt;/script&gt;"
  );
  assert.equal(escapeHtml(null), "");
});

test("formatContactDraft applies fallback placeholders and formats body", () => {
  const draft = formatContactDraft("zzulfiqor@gmail.com", {
    name: "",
    email: "",
    subject: "",
    message: "Hello Ahmad",
  });
  assert.ok(draft.includes("To: zzulfiqor@gmail.com"));
  assert.ok(draft.includes("Subject: Portfolio Inquiry"));
  assert.ok(draft.includes("From: (Your Name) ((Your Email))"));
  assert.ok(draft.endsWith("Hello Ahmad"));
});

test("resolveActiveSectionId resolves top, mid-scroll, bottom, and empty sections", () => {
  const sections = [
    { id: "home", top: 0 },
    { id: "about", top: 700 },
    { id: "skills", top: 1350 },
    { id: "projects", top: 2050 },
    { id: "experience", top: 2900 },
    { id: "contact", top: 3800 },
  ];

  assert.equal(resolveActiveSectionId([]), null);
  assert.equal(resolveActiveSectionId(null), null);

  assert.equal(
    resolveActiveSectionId(sections, {
      scrollY: 0,
      viewportHeight: 800,
      documentHeight: 4200,
    }),
    "home"
  );

  assert.equal(
    resolveActiveSectionId(sections, {
      scrollY: 16,
      viewportHeight: 800,
      documentHeight: 4200,
    }),
    "home"
  );

  // readingLine = 1800 + 92 + 200 = 2092 -> >= 2050 ("projects"), < 2900
  assert.equal(
    resolveActiveSectionId(sections, {
      scrollY: 1800,
      viewportHeight: 800,
      documentHeight: 4200,
    }),
    "projects"
  );

  // Near bottom of document activates final short section ("contact")
  assert.equal(
    resolveActiveSectionId(sections, {
      scrollY: 3390,
      viewportHeight: 800,
      documentHeight: 4200,
    }),
    "contact"
  );

  // When navbar omits Home (starts at #about below hero), top of page has no active link
  const withoutHome = sections.slice(1);
  assert.equal(
    resolveActiveSectionId(withoutHome, {
      scrollY: 0,
      viewportHeight: 800,
      documentHeight: 4200,
      offset: 76,
    }),
    null
  );
  assert.equal(
    resolveActiveSectionId(withoutHome, {
      scrollY: 460,
      viewportHeight: 800,
      documentHeight: 4200,
      offset: 76,
    }),
    "about"
  );
});
