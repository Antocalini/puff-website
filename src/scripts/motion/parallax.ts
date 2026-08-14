import { ensureGsap, prefersReducedMotion } from "./setup";

export function initParallaxImages() {
  if (prefersReducedMotion()) return;

  const { gsap } = ensureGsap();
  const containers = document.querySelectorAll<HTMLElement>("[data-parallax-container]");

  containers.forEach((container) => {
    const img = container.querySelector<HTMLElement>("[data-parallax-img]");
    if (!img) return;

    gsap.fromTo(
      img,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      }
    );
  });
}
