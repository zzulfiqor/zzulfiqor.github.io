/**
 * Initializes the mobile navigation drawer and active section scroll tracking.
 */
export function initNavigation() {
  const menuBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-nav-drawer");

  if (menuBtn && drawer) {
    const syncMenuButton = (isOpen) => {
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    };

    menuBtn.addEventListener("click", () => {
      const nextOpen = drawer.hidden;
      drawer.hidden = !nextOpen;
      syncMenuButton(nextOpen);
    });

    drawer.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      drawer.hidden = true;
      syncMenuButton(false);
    });
  }

  const navLinks = Array.from(document.querySelectorAll(".primary-nav .nav-link"));
  const sections = navLinks
    .map((link) => {
      const href = link.getAttribute("href");
      return href ? document.querySelector(href) : null;
    })
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeHref = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === activeHref) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}
