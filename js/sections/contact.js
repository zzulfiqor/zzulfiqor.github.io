import { PROFILE } from "../data.js";
import {
  buildMailtoHref,
  formatContactDraft,
  validateContactForm,
} from "../utils.js";
import { showToast } from "../ui/toast.js";

function readContactPayload(form) {
  const formData = new FormData(form);
  return {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    subject: String(formData.get("subject") || ""),
    message: String(formData.get("message") || ""),
  };
}

function showValidationErrors(errors) {
  ["name", "email", "message"].forEach((field) => {
    const errorEl = document.getElementById(`error-${field}`);
    if (errorEl) errorEl.textContent = errors[field] || "";
  });
}

/**
 * Initializes contact clipboard shortcuts and the interactive email composer.
 */
export function initContactSection() {
  const toggleBtn = document.getElementById("toggle-message-form-btn");
  const closeBtn = document.getElementById("close-message-form-btn");
  const panel = document.getElementById("contact-form-panel");
  const form = document.getElementById("contact-form");
  const copyDraftBtn = document.getElementById("copy-draft-btn");
  const feedbackEl = document.getElementById("form-feedback");

  const setPanelOpen = (open) => {
    if (!panel || !toggleBtn) return;
    panel.hidden = !open;
    toggleBtn.setAttribute("aria-expanded", String(open));
    if (open) {
      document.getElementById("sender-name")?.focus();
    }
  };

  toggleBtn?.addEventListener("click", () => {
    setPanelOpen(panel?.hidden ?? true);
  });

  closeBtn?.addEventListener("click", () => {
    setPanelOpen(false);
    toggleBtn?.focus();
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = readContactPayload(form);
    const result = validateContactForm(payload);
    showValidationErrors(result.errors);

    if (!result.isValid) {
      const firstInvalid = Object.keys(result.errors)[0];
      document.getElementById(`sender-${firstInvalid}`)?.focus();
      return;
    }

    window.location.href = buildMailtoHref(PROFILE.email, {
      ...result.values,
      subject: payload.subject,
    });

    if (feedbackEl) {
      feedbackEl.hidden = false;
      feedbackEl.textContent = `Opening your email client addressed to ${PROFILE.email}. If no email app opens, use "Copy Message Text" or email ${PROFILE.email} directly.`;
    }
  });

  copyDraftBtn?.addEventListener("click", async () => {
    if (!form) return;
    const payload = readContactPayload(form);

    if (payload.message.trim().length < 2) {
      showToast("Write a message first before copying.");
      document.getElementById("sender-message")?.focus();
      return;
    }

    const draft = formatContactDraft(PROFILE.email, payload);
    try {
      await navigator.clipboard.writeText(draft);
      showToast("Message text copied to clipboard.");
    } catch {
      showToast(`Copy unavailable — send directly to ${PROFILE.email}.`);
    }
  });

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy");
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        showToast(`Copied ${value}`);
      } catch {
        showToast(`Copy unavailable: ${value}`);
      }
    });
  });
}
