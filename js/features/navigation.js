import { prefersReducedMotion } from "../ui/toast.js";
import { resolveActiveSectionId } from "../utils.js";

const DRAWER_EXIT_FALLBACK_MS = 170;
const SCROLL_ELEVATION_THRESHOLD_PX = 16;
const HEADER_OFFSET_PX = 76;

/**
 * Initializes the sticky header scroll state, desktop sliding underline bar,
 * reversible mobile navigation drawer, and unified section scroll-spy.
 */
export function initNavigation() {
  const header = document.getElementById("top");
  const menuBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-nav-drawer");
  const primaryNav = document.querySelector(".primary-nav");
  const activeBar = document.getElementById("nav-active-bar");

  const desktopLinks = Array.from(
    document.querySelectorAll(".primary-nav .nav-link")
  );
  const mobileLinks = Array.from(
    document.querySelectorAll(".mobile-drawer .mobile-nav-link")
  );
  const allNavLinks = [...desktopLinks, ...mobileLinks];

  let isDrawerOpen = false;
  let closeTimer = null;
  let onCloseEnd = null;
  let activeSectionId;

  const clearPendingClose = () => {
    clearTimeout(closeTimer);
    closeTimer = null;
    if (drawer && onCloseEnd) {
      drawer.removeEventListener("transitionend", onCloseEnd);
      onCloseEnd = null;
    }
  };

  const syncMenuButton = (isOpen) => {
    if (!menuBtn) return;
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  };

  const openDrawer = () => {
    if (!drawer || !menuBtn || isDrawerOpen) return;
    clearPendingClose();
    isDrawerOpen = true;
    drawer.hidden = false;
    // Commit hidden -> visible layout before setting data-state so CSS transitions play.
    void drawer.offsetHeight;
    syncMenuButton(true);
    drawer.setAttribute("data-state", "open");
  };

  const closeDrawer = ({ restoreFocus = false } = {}) => {
    if (!drawer || !menuBtn || !isDrawerOpen) return;
    isDrawerOpen = false;
    clearPendingClose();
    drawer.removeAttribute("data-state");
    syncMenuButton(false);

    if (restoreFocus && typeof menuBtn.focus === "function") {
      menuBtn.focus();
    }

    const finalizeHide = () => {
      clearPendingClose();
      if (!isDrawerOpen) {
        drawer.hidden = true;
      }
    };

    if (prefersReducedMotion()) {
      finalizeHide();
      return;
    }

    onCloseEnd = (event) => {
      if (event.target !== drawer || event.propertyName !== "opacity") return;
      finalizeHide();
    };
    drawer.addEventListener("transitionend", onCloseEnd);
    closeTimer = setTimeout(finalizeHide, DRAWER_EXIT_FALLBACK_MS);
  };

  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", () => {
      if (isDrawerOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    drawer.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("a") || target.closest("#mobile-open-cv-btn")) {
        closeDrawer({ restoreFocus: false });
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !isDrawerOpen) return;
      if (document.querySelector(".modal-backdrop:not([hidden])")) return;
      closeDrawer({ restoreFocus: true });
    });

    document.addEventListener("click", (event) => {
      if (!isDrawerOpen || !header) return;
      if (event.target instanceof Node && !header.contains(event.target)) {
        closeDrawer({ restoreFocus: false });
      }
    });
  }

  const positionActiveBar = () => {
    if (!activeBar || !primaryNav) return;
    if (primaryNav.offsetParent === null) {
      activeBar.classList.remove("is-ready");
      return;
    }

    const activeLink = desktopLinks.find(
      (link) => link.getAttribute("aria-current") === "page"
    );
    if (!activeLink) {
      activeBar.classList.remove("is-ready");
      return;
    }

    const navRect = primaryNav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    if (navRect.width === 0 || linkRect.width === 0) return;

    const styles = getComputedStyle(activeLink);
    const horizontalPad =
      (parseFloat(styles.paddingLeft) || 0) +
      (parseFloat(styles.paddingRight) || 0);
    const barWidth = Math.max(16, linkRect.width - horizontalPad);
    const barLeft =
      linkRect.left - navRect.left + (linkRect.width - barWidth) / 2;

    activeBar.style.transform = `translate3d(${barLeft.toFixed(
      1
    )}px, 0, 0) scaleX(${(barWidth / 100).toFixed(4)})`;
    activeBar.classList.add("is-ready");
  };

  const setActiveSection = (nextId) => {
    if (nextId === activeSectionId) return;
    activeSectionId = nextId;
    const activeHref = nextId ? `#${nextId}` : null;
    allNavLinks.forEach((link) => {
      if (activeHref && link.getAttribute("href") === activeHref) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    positionActiveBar();
  };

  const sectionElements = desktopLinks
    .map((link) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return null;
      const el = document.querySelector(href);
      return el ? { id: href.slice(1), el } : null;
    })
    .filter(Boolean);

  const syncScrollState = () => {
    if (header) {
      header.classList.toggle(
        "is-scrolled",
        window.scrollY > SCROLL_ELEVATION_THRESHOLD_PX
      );
    }

    if (sectionElements.length === 0) return;

    const measured = sectionElements.map(({ id, el }) => ({
      id,
      top: el.getBoundingClientRect().top + window.scrollY,
    }));

    const nextId = resolveActiveSectionId(measured, {
      scrollY: window.scrollY,
      viewportHeight: window.innerHeight,
      documentHeight: document.documentElement.scrollHeight,
      offset: HEADER_OFFSET_PX,
    });

    setActiveSection(nextId);
  };

  let scrollTicking = false;
  const requestScrollSync = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      scrollTicking = false;
      syncScrollState();
    });
  };

  window.addEventListener("scroll", requestScrollSync, { passive: true });
  window.addEventListener("resize", () => {
    requestScrollSync();
    positionActiveBar();
  });
  window.addEventListener("hashchange", requestScrollSync);

  const desktopQuery = window.matchMedia("(min-width: 900px)");
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) closeDrawer({ restoreFocus: false });
    positionActiveBar();
  });

  document.fonts?.ready?.then(() => {
    positionActiveBar();
  });

  syncScrollState();
}
