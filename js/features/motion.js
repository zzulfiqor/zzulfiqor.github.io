import { prefersReducedMotion } from "../ui/toast.js";

const clamp01 = (value) => Math.min(1, Math.max(0, value));

/** Scroll-linked motion: page progress bar, hero exit depth, experience timeline fill. */
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  const hero = document.getElementById("home");
  const heroVisual = hero?.querySelector(".hero-visual");
  const timeline = document.getElementById("exp-highlights-list");

  let ticking = false;
  const updateProgress = () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? clamp01(window.scrollY / scrollable) : 0;
    if (progressBar) progressBar.style.transform = `scaleX(${ratio})`;

    if (hero && heroVisual) {
      const exit = clamp01(window.scrollY / hero.offsetHeight);
      heroVisual.style.setProperty("--exit", exit.toFixed(3));
    }

    if (timeline) {
      // The line "arrives" at 60% of the viewport height; nodes above it are lit.
      const line = window.innerHeight * 0.6;
      const rect = timeline.getBoundingClientRect();
      timeline.style.setProperty(
        "--tl",
        clamp01((line - rect.top) / rect.height).toFixed(3)
      );
      timeline.querySelectorAll(".timeline-node").forEach((node) => {
        const box = node.getBoundingClientRect();
        node.classList.toggle("is-lit", box.top + box.height / 2 < line);
      });
    }
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateProgress);
    },
    { passive: true }
  );

  // Layer-tab filtering re-renders the timeline; re-light nodes without waiting for a scroll.
  if (timeline) new MutationObserver(updateProgress).observe(timeline, { childList: true });

  updateProgress();
}

function initPortraitParallax() {
  const portraitStage = document.getElementById("portrait-stage");
  if (!portraitStage) return;

  let rafId = null;
  portraitStage.addEventListener("pointermove", (event) => {
    const rect = portraitStage.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      portraitStage.style.setProperty("--px", `${(nx * 14).toFixed(1)}px`);
      portraitStage.style.setProperty("--py", `${(ny * 10).toFixed(1)}px`);
    });
  });

  portraitStage.addEventListener("pointerleave", () => {
    portraitStage.style.setProperty("--px", "0px");
    portraitStage.style.setProperty("--py", "0px");
  });
}

function initSpotlightHover() {
  document.addEventListener("pointermove", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const card = target.closest(".spotlight-card");
    if (!(card instanceof HTMLElement)) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${(event.clientX - rect.left).toFixed(0)}px`);
    card.style.setProperty("--my", `${(event.clientY - rect.top).toFixed(0)}px`);
    if (card.classList.contains("project-card")) {
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-y", `${(nx * 7).toFixed(2)}deg`);
      card.style.setProperty("--tilt-x", `${(ny * -7).toFixed(2)}deg`);
    }
  });

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

/** Primary CTAs lean toward the pointer, then spring back on leave. */
function initMagneticButtons() {
  document.querySelectorAll("[data-magnetic]").forEach((btn) => {
    btn.addEventListener("pointermove", (event) => {
      const rect = btn.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      btn.style.setProperty("--mag-x", `${(dx * 0.22).toFixed(1)}px`);
      btn.style.setProperty("--mag-y", `${(dy * 0.32).toFixed(1)}px`);
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.setProperty("--mag-x", "0px");
      btn.style.setProperty("--mag-y", "0px");
    });
  });
}

const DECODE_GLYPHS = "01<>/{}[]=+_;:#";

/**
 * Mono eyebrow labels "decode" from code glyphs the first time they scroll in.
 * Screen readers get the real text via .sr-only; the animated copy is aria-hidden.
 */
function decodeText(el) {
  const text = el.textContent.trim();
  if (!text) return;
  const real = document.createElement("span");
  real.className = "sr-only";
  real.textContent = text;
  const shown = document.createElement("span");
  shown.setAttribute("aria-hidden", "true");
  el.replaceChildren(real, shown);

  const duration = 650;
  const start = performance.now();
  const frame = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const settled = Math.floor(progress * text.length);
    let out = text.slice(0, settled);
    for (let i = settled; i < text.length; i += 1) {
      out += text[i] === " " ? " " : DECODE_GLYPHS[(Math.random() * DECODE_GLYPHS.length) | 0];
    }
    shown.textContent = out;
    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = text;
  };
  requestAnimationFrame(frame);
}

function initDecodeLabels() {
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        decodeText(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("main .eyebrow-mono").forEach((el) => observer.observe(el));
}

function initScrollReveals() {
  if (!("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("motion-enabled");

  const revealTargets = [];
  const register = (selector, staggerMs = 0) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add("reveal");
      if (staggerMs > 0 && el instanceof HTMLElement) {
        el.style.setProperty("--reveal-delay", `${index * staggerMs}ms`);
      }
      revealTargets.push(el);
    });
  };

  register(".section-header-row, .section-subhead", 0);
  register(".highlights-bar", 0);
  register(".bento-card", 80);
  register(".skill-group", 55);
  register(".project-card", 0);
  register(".experience-summary-card", 0);
  register(".timeline-item", 45);
  register(".edu-card", 80);
  register(".cert-card", 140);
  register(".writing-item", 60);
  register(".contact-banner", 0);

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");
        observer.unobserve(el);
        // Drop the reveal transition once done so hover transitions aren't slowed/delayed by it.
        el.addEventListener("transitionend", function settle(event) {
          if (event.target !== el || event.propertyName !== "opacity") return;
          el.classList.replace("reveal", "revealed");
          el.classList.remove("is-visible");
          el.removeEventListener("transitionend", settle);
        });
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
}

/**
 * Projects timeline: the section pins while normal vertical scrolling slides the
 * track sideways. Below MIN_PIN_HEIGHT the frame cannot fit, so it stays a swipeable row.
 */
const MIN_PIN_HEIGHT = 620;

function initProjectTimeline() {
  const section = document.getElementById("projects");
  const pin = document.getElementById("projects-pin");
  const viewport = document.getElementById("projects-viewport");
  const track = document.getElementById("projects-grid");
  if (!section || !pin || !viewport || !track) return;

  let distance = 0;
  let ticking = false;

  const update = () => {
    ticking = false;
    if (!section.classList.contains("is-pinned")) return;
    const travelled = distance > 0 ? clamp01(-pin.getBoundingClientRect().top / distance) * distance : 0;
    track.style.setProperty("--tx", `${(-travelled).toFixed(1)}px`);
    section.classList.toggle("is-travelling", travelled > 24);

    // Rail fill leads at 62% of the window, sweeping to the far edge as travel completes.
    const progress = distance > 0 ? travelled / distance : 1;
    const reach = travelled + viewport.clientWidth * (0.62 + 0.38 * progress);
    track.style.setProperty("--fill", `${reach.toFixed(0)}px`);
    track.querySelectorAll(".tl-dot").forEach((dot) => {
      const x = dot.parentElement.offsetLeft + dot.offsetLeft;
      dot.classList.toggle("is-lit", x < reach);
    });
  };

  const measure = () => {
    const pinned = window.innerHeight >= MIN_PIN_HEIGHT;
    section.classList.toggle("is-pinned", pinned);
    distance = pinned ? Math.max(0, track.scrollWidth - viewport.clientWidth) : 0;
    pin.style.height = pinned ? `${window.innerHeight + distance}px` : "";
    if (!pinned) {
      track.style.removeProperty("--tx");
      track.style.removeProperty("--fill");
      track.querySelectorAll(".tl-dot.is-lit").forEach((dot) => dot.classList.remove("is-lit"));
    }
    update();
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", measure);
  new ResizeObserver(measure).observe(track);

  // The viewport clips with overflow:hidden; focus would otherwise scroll it sideways.
  viewport.addEventListener("scroll", () => {
    if (section.classList.contains("is-pinned")) viewport.scrollLeft = 0;
  });

  // Keyboard users: bring a focused card into view by scrolling the page to its spot.
  track.addEventListener("focusin", (event) => {
    if (!section.classList.contains("is-pinned") || distance === 0) return;
    const item = event.target.closest("li");
    if (!item) return;
    const box = item.getBoundingClientRect();
    if (box.left >= 0 && box.right <= viewport.clientWidth) return;
    const progress = clamp01((item.offsetLeft - viewport.clientWidth * 0.15) / distance);
    // Next frame: the browser's own focus scrolling runs after focusin and would undo ours.
    requestAnimationFrame(() => {
      viewport.scrollLeft = 0;
      const pinTop = pin.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: pinTop + progress * distance, behavior: "instant" });
    });
  });

  measure();
}

/**
 * Initializes scroll progress, pointer effects, and IntersectionObserver reveals
 * while respecting reduced-motion preferences.
 */
export function initMotion() {
  if (prefersReducedMotion()) return;

  initScrollProgress();
  initProjectTimeline();
  initScrollReveals();
  initDecodeLabels();

  if (window.matchMedia("(pointer: fine)").matches) {
    initPortraitParallax();
    initSpotlightHover();
    initMagneticButtons();
  }
}
