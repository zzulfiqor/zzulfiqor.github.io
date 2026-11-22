const TOAST_DURATION_MS = 2600;
const TOAST_EXIT_MS = 220;

let toastTimer = null;

/**
 * Checks whether the user prefers reduced motion.
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Displays a transient accessible status toast at the bottom-right corner.
 * @param {string} message
 */
export function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;

  requestAnimationFrame(() => {
    toast.setAttribute("data-state", "open");
  });

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.removeAttribute("data-state");
    if (prefersReducedMotion()) {
      toast.hidden = true;
      return;
    }
    setTimeout(() => {
      if (!toast.hasAttribute("data-state")) {
        toast.hidden = true;
      }
    }, TOAST_EXIT_MS);
  }, TOAST_DURATION_MS);
}
