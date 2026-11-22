import { prefersReducedMotion } from "./toast.js";

const MODAL_EXIT_FALLBACK_MS = 240;

let lastFocusedBeforeModal = null;

/**
 * Opens an accessible modal dialog and moves focus to its close control.
 * @param {string} modalId
 * @param {HTMLElement|null} [triggerEl]
 */
export function openModal(modalId, triggerEl = null) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  lastFocusedBeforeModal = triggerEl || document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    modal.setAttribute("data-state", "open");
  });

  const closeBtn = modal.querySelector("[data-close-modal]");
  if (closeBtn instanceof HTMLElement) closeBtn.focus();
}

/**
 * Closes an open modal dialog and restores focus to the triggering element.
 * @param {HTMLElement} modal
 */
export function closeModal(modal) {
  if (!modal || modal.hidden) return;

  modal.removeAttribute("data-state");
  document.body.style.overflow = "";

  const finalizeClose = () => {
    modal.hidden = true;
    if (
      lastFocusedBeforeModal &&
      typeof lastFocusedBeforeModal.focus === "function"
    ) {
      lastFocusedBeforeModal.focus();
    }
  };

  if (prefersReducedMotion()) {
    finalizeClose();
    return;
  }

  let finished = false;
  const onEnd = () => {
    if (finished) return;
    finished = true;
    modal.removeEventListener("transitionend", onEnd);
    finalizeClose();
  };

  modal.addEventListener("transitionend", onEnd, { once: true });
  setTimeout(onEnd, MODAL_EXIT_FALLBACK_MS);
}

/**
 * Binds backdrop click and Escape-key dismissal across all modals.
 */
export function initModalListeners() {
  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (event) => {
      if (
        event.target === backdrop ||
        event.target.closest("[data-close-modal]")
      ) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document
      .querySelectorAll(".modal-backdrop:not([hidden])")
      .forEach((modal) => closeModal(modal));
  });
}
