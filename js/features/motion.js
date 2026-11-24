import { prefersReducedMotion } from "../ui/toast.js";

function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  let ticking = false;
  const updateProgress = () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const ratio =
      scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    progressBar.style.transform = `scaleX(${ratio})`;
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
  });
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

  if (window.matchMedia("(pointer: fine)").matches) {
    initPortraitParallax();
    initSpotlightHover();
  }
}
