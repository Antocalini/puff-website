import { setNavSurface, type NavSurface } from "../nav-surface";
import { ensureGsap, prefersReducedMotion } from "./setup";

const INK = "#1a1a1a";
const YELLOW = "#ffd100";

function syncProcessNavTone(section: HTMLElement, tone: NavSurface, active: boolean) {
  section.dataset.navTone = tone;
  if (active) {
    setNavSurface(tone);
    window.dispatchEvent(
      new CustomEvent("puff:nav-tone", { detail: { tone } }),
    );
  }
}

/** Hidden from the bottom up — sticker “press” reveals top → bottom */
const CLIP_HIDDEN = "inset(0% 0% 100% 0%)";
const CLIP_SHOWN = "inset(0% 0% 0% 0%)";

function getActiveStickers() {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const selector = isMobile
    ? "[data-process-sticker-mobile]"
    : "[data-process-sticker-desktop]";
  return document.querySelectorAll<HTMLElement>(selector);
}

function buildTimeline(
  gsap: typeof import("gsap").default,
  section: HTMLElement,
  circle: HTMLElement,
  lines1: HTMLElement[],
  lines2: HTMLElement[],
  stickers: HTMLElement[],
  faces: HTMLElement[],
  overlays: HTMLElement[],
  badges: HTMLElement[],
  options: { pin: boolean; end: string },
) {
  gsap.set(stickers, {
    y: -36,
    autoAlpha: 1,
    force3D: true,
  });
  gsap.set(faces.length ? faces : stickers, {
    clipPath: CLIP_HIDDEN,
    WebkitClipPath: CLIP_HIDDEN,
  });
  gsap.set(overlays, { yPercent: 0 });
  gsap.set(badges, { autoAlpha: 0, scale: 0.4 });

  let processTone: NavSurface = "yellow";

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: options.pin ? "top top" : "top 85%",
      end: options.end,
      scrub: 1,
      pin: options.pin,
      anticipatePin: 1,
      onUpdate: (self) => {
        // After the ink snap label, nav flips to yellow pill on black stage
        const inkAt = tl.labels["ink-bg"] ?? Number.POSITIVE_INFINITY;
        const next: NavSurface = tl.time() >= inkAt ? "ink" : "yellow";
        if (next === processTone) return;
        processTone = next;
        syncProcessNavTone(section, next, self.isActive);
      },
    },
  });

  // Keep colors in-timeline so scrub reverse restores yellow cleanly.
  // Never tween yellow→ink (RGB lerp flashes muddy olive/brown).
  tl.set(section, { backgroundColor: YELLOW })
    .set(circle, { scale: 0, autoAlpha: 1, force3D: true })
    .add(() => {
      processTone = "yellow";
      section.dataset.navTone = "yellow";
    }, 0)

    // 1) Yellow stage
    .to(lines1, {
      y: "0%",
      yPercent: 0,
      ease: "power3.out",
      duration: 0.8,
      stagger: 0.15,
    })
    .to({}, { duration: options.pin ? 0.55 : 0.3 })
    .to(lines1, {
      y: "-120%",
      yPercent: -120,
      ease: "power3.in",
      duration: 0.6,
      stagger: 0.1,
    })

    // 2) Black circle → solid ink
    .to(
      circle,
      {
        scale: options.pin ? 250 : 180,
        ease: "expo.inOut",
        duration: options.pin ? 1.85 : 1.35,
        force3D: true,
      },
      "+=0.05",
    )
    .set(section, { backgroundColor: INK }, "ink-bg")

    // 3) Second copy
    .to(lines2, {
      y: "0%",
      yPercent: 0,
      ease: "power3.out",
      duration: 0.8,
      stagger: 0.15,
    })

    // 4) Real sticker stick: drop in + clip reveal top→bottom + backing peel
    .to(
      stickers,
      {
        y: 0,
        ease: "power3.out",
        duration: options.pin ? 0.9 : 0.7,
        stagger: 0.16,
      },
      "+=0.05",
    )
    .to(
      faces.length ? faces : stickers,
      {
        clipPath: CLIP_SHOWN,
        WebkitClipPath: CLIP_SHOWN,
        ease: "power2.inOut",
        duration: options.pin ? 1.05 : 0.85,
        stagger: 0.16,
      },
      "<",
    )
    .to(
      overlays,
      {
        yPercent: 105,
        ease: "power2.inOut",
        duration: options.pin ? 1.05 : 0.85,
        stagger: 0.16,
      },
      "<0.05",
    )
    .to(
      badges,
      {
        autoAlpha: 1,
        scale: 1,
        ease: "back.out(2)",
        duration: 0.35,
        stagger: 0.16,
      },
      "<0.45",
    )

    // Stay mounted while scrolling forward; reverse scrub undoes the stick
    .to({}, { duration: options.pin ? 1.1 : 0.5 });

  return tl;
}

export function initProcessReveal() {
  const { gsap, ScrollTrigger } = ensureGsap();

  const section = document.querySelector<HTMLElement>("[data-process-section]");
  const circle = document.querySelector<HTMLElement>("[data-process-circle]");
  const lines1 = gsap.utils.toArray<HTMLElement>("[data-process-line-1]");
  const lines2 = gsap.utils.toArray<HTMLElement>("[data-process-line-2]");

  if (!section || !circle || lines1.length === 0 || lines2.length === 0) {
    return () => undefined;
  }

  const cleanups: Array<() => void> = [];

  const runForViewport = () => {
    const stickers = gsap.utils.toArray<HTMLElement>(getActiveStickers());
    const faces = stickers
      .map((sticker) => sticker.querySelector<HTMLElement>("[data-sticker-face]"))
      .filter((el): el is HTMLElement => el !== null);
    const overlays = stickers
      .map((sticker) => sticker.querySelector<HTMLElement>("[data-sticker-overlay]"))
      .filter((el): el is HTMLElement => el !== null);
    const badges = stickers
      .map((sticker) => sticker.querySelector<HTMLElement>("[data-sticker-badge]"))
      .filter((el): el is HTMLElement => el !== null);

    if (prefersReducedMotion()) {
      gsap.set(section, { backgroundColor: INK });
      gsap.set(circle, { autoAlpha: 0, scale: 200 });
      gsap.set(lines1, { display: "none" });
      gsap.set(lines2, { yPercent: 0, y: 0, autoAlpha: 1 });
      gsap.set(stickers, { autoAlpha: 1, y: 0 });
      gsap.set(faces.length ? faces : stickers, {
        clipPath: CLIP_SHOWN,
        WebkitClipPath: CLIP_SHOWN,
      });
      gsap.set(overlays, { yPercent: 105 });
      gsap.set(badges, { autoAlpha: 1, scale: 1 });
      return () => undefined;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const tl = buildTimeline(
      gsap,
      section,
      circle,
      lines1,
      lines2,
      stickers,
      faces,
      overlays,
      badges,
      isMobile
        ? {
            // Same black-circle takeover as desktop — shorter pin for phones
            pin: true,
            end: "+=340%",
          }
        : {
            pin: true,
            end: "+=500%",
          },
    );

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      gsap.set(section, { clearProps: "backgroundColor" });
      gsap.set(circle, { clearProps: "opacity,visibility,transform" });
      gsap.set(stickers, { clearProps: "transform,opacity,visibility" });
      gsap.set(faces, { clearProps: "clipPath" });
    };
  };

  const mm = gsap.matchMedia();
  mm.add("(max-width: 767px)", () => {
    const cleanup = runForViewport();
    if (cleanup) cleanups.push(cleanup);
    return () => cleanup?.();
  });
  mm.add("(min-width: 768px)", () => {
    const cleanup = runForViewport();
    if (cleanup) cleanups.push(cleanup);
    return () => cleanup?.();
  });

  return () => {
    mm.revert();
    cleanups.forEach((cleanup) => cleanup());
  };
}
