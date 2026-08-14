import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins once for the whole site. */
export function ensureGsap() {
  if (registered) return { gsap, ScrollTrigger };
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDesktopMedia() {
  return window.matchMedia("(min-width: 768px)").matches;
}
