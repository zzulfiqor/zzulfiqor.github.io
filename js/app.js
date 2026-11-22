import { initHeroHighlights } from "./sections/hero.js";
import { initAboutSection } from "./sections/about.js";
import { initProjectsSection } from "./sections/projects.js";
import { initExperienceSection } from "./sections/experience.js";
import { initContactSection } from "./sections/contact.js";
import { initModalListeners } from "./ui/modal.js";
import { initNavigation } from "./features/navigation.js";
import { initMotion } from "./features/motion.js";

function bootstrap() {
  initHeroHighlights();
  initAboutSection();
  initProjectsSection();
  initExperienceSection();
  initContactSection();
  initModalListeners();
  initNavigation();
  initMotion();
}

bootstrap();
