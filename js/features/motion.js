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
  register(".project-card", 70);
  register(".experience-summary-card", 0);
  register(".timeline-item", 45);
  register(".edu-card", 80);
  register(".cert-card", 140);
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
 * Initializes scroll progress, pointer effects, and IntersectionObserver reveals
 * while respecting reduced-motion preferences.
 */
export function initMotion() {
  if (prefersReducedMotion()) return;

  initScrollProgress();
  initScrollReveals();
  initDecodeLabels();

  if (window.matchMedia("(pointer: fine)").matches) {
    initPortraitParallax();
    initSpotlightHover();
    initMagneticButtons();
  }
}
