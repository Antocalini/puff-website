import type gsapType from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type GsapBundle = {
  gsap: typeof gsapType;
  ScrollTrigger: typeof ScrollTriggerType;
};

let bundlePromise: Promise<GsapBundle> | null = null;

/** Load GSAP + ScrollTrigger once, on demand. */
export function ensureGsap() {
  if (!bundlePromise) {
    bundlePromise = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapMod, scrollTriggerMod]) => {
        gsapMod.default.registerPlugin(scrollTriggerMod.ScrollTrigger);
        return {
          gsap: gsapMod.default,
          ScrollTrigger: scrollTriggerMod.ScrollTrigger,
        };
      },
    );
  }

  return bundlePromise;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDesktopMedia() {
  return window.matchMedia("(min-width: 768px)").matches;
}
