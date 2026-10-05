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
  stage1: HTMLElement | null,
  lines1: HTMLElement[],
  lines2: HTMLElement[],
  hint: HTMLElement | null,
  deckMaskInner: HTMLElement | null,
  sticker1: HTMLElement | null,
  stickers: HTMLElement[],
  faces: HTMLElement[],
  overlays: HTMLElement[],
  badges: HTMLElement[],
  options: { pin: boolean; end: string },
) {
  const deckCards = Array.from(section.querySelectorAll<HTMLElement>("[data-deck-card]"));

  // Stage 1 initial state (completely hidden before scroll entry, NO pre-leak)
  gsap.set(lines1, {
    yPercent: 125,
    force3D: true,
  });

  if (sticker1) {
    gsap.set(sticker1, {
      yPercent: 125,
      autoAlpha: 0,
      force3D: true,
    });
  }

  if (hint) {
    gsap.set(hint, {
      yPercent: 125,
      force3D: true,
    });
  }

  if (deckMaskInner) {
    gsap.set(deckMaskInner, {
      yPercent: 115,
      autoAlpha: 1,
      force3D: true,
    });
  }

  if (deckCards.length) {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      // Mobile: cards are already fanned out and OPEN from the start
      gsap.set(deckCards, {
        x: (_i, el) => parseFloat(el.dataset.spreadX || "0") * 0.42,
        y: (_i, el) => parseFloat(el.dataset.spreadY || "0") * 0.5,
        rotation: (_i, el) => parseFloat(el.dataset.spreadRot || "0") * 0.85,
        autoAlpha: 1,
        scale: 1,
        force3D: true,
      });
    } else {
      // Desktop: starts stacked, fans out in arc
      gsap.set(deckCards, {
        x: (_i, el) => parseFloat(el.dataset.stackX || "0"),
        y: (_i, el) => parseFloat(el.dataset.stackY || "0"),
        rotation: (_i, el) => parseFloat(el.dataset.stackRot || "0"),
        autoAlpha: 1,
        scale: 1,
        force3D: true,
      });
    }
  }

  if (stage1) {
    gsap.set(stage1, {
      autoAlpha: 1,
      y: 0,
      force3D: true,
    });
  }

  // Stage 2 initial state
  gsap.set(lines2, {
    yPercent: 120,
    force3D: true,
  });

  gsap.set(stickers, {
    y: -36,
    autoAlpha: 0,
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

    // 1) Yellow stage - Title & Sticker enter through bottom mask
    .to(lines1, {
      yPercent: 0,
      ease: "power3.out",
      duration: 0.9,
      stagger: 0.08,
    });

  if (sticker1) {
    tl.to(
      sticker1,
      {
        yPercent: 0,
        autoAlpha: 1,
        ease: "power3.out",
        duration: 0.9,
      },
      "<"
    );
  }

  if (deckMaskInner) {
    // Deck rises simultaneously through bottom mask
    tl.to(
      deckMaskInner,
      {
        yPercent: 0,
        ease: "power3.out",
        duration: 0.9,
      },
      "<",
    );
  }

  if (deckCards.length) {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) {
      // Desktop only: fan out into arc during scroll
      tl.to(
        deckCards,
        {
          x: (_i, el) => parseFloat(el.dataset.spreadX || "0"),
          y: (_i, el) => parseFloat(el.dataset.spreadY || "0"),
          rotation: (_i, el) => parseFloat(el.dataset.spreadRot || "0"),
          ease: "power3.out",
          duration: 0.95,
          stagger: 0.04,
        },
        "<0.1",
      );
    }
  }

  if (hint) {
    tl.to(
      hint,
      {
        yPercent: 0,
        ease: "power3.out",
        duration: 0.7,
      },
      "<0.2",
    );
  }

  // Hold for interaction / reading
  tl.to({}, { duration: options.pin ? 0.75 : 0.4 })

    // 1b) SMOOTH MASK EXIT: All stage 1 elements slide up through their masks cleanly
    .to(lines1, {
      yPercent: -130,
      ease: "power3.in",
      duration: 0.65,
      stagger: 0.05,
    });

  if (sticker1) {
    tl.to(
      sticker1,
      {
        yPercent: -130,
        autoAlpha: 0,
        ease: "power3.in",
        duration: 0.65,
      },
      "<"
    );
  }

  if (deckMaskInner) {
    tl.to(
      deckMaskInner,
      {
        yPercent: -125,
        ease: "power3.in",
        duration: 0.65,
      },
      "<",
    );
  }

  if (hint) {
    tl.to(
      hint,
      {
        yPercent: -130,
        ease: "power3.in",
        duration: 0.55,
      },
      "<",
    );
  }

  if (deckCards.length) {
    tl.to(
      deckCards,
      {
        autoAlpha: 0,
        duration: 0.45,
        ease: "power2.in",
      },
      "<0.15",
    );
  }



  if (stage1) {
    tl.to(
      stage1,
      {
        autoAlpha: 0,
        duration: 0.1,
      },
      ">",
    );
  }

  // 2) Black circle → solid ink
  tl.to(
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

  // 3) Second copy enters through mask
  .to(lines2, {
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
      autoAlpha: 1,
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
  const stage1 = document.querySelector<HTMLElement>("[data-process-stage-1]");
  const lines1 = gsap.utils.toArray<HTMLElement>("[data-process-line-1]");
  const lines2 = gsap.utils.toArray<HTMLElement>("[data-process-line-2]");
  const hint = document.querySelector<HTMLElement>("[data-benefits-hint]");
  const deckMaskInner = document.querySelector<HTMLElement>("[data-deck-mask-inner]");
  const sticker1 = document.querySelector<HTMLElement>("[data-process-sticker-1]");

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
      if (stage1) gsap.set(stage1, { display: "none" });
      gsap.set(lines1, { display: "none" });
      if (hint) gsap.set(hint, { display: "none" });
      if (deckMaskInner) gsap.set(deckMaskInner, { display: "none" });
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
      stage1,
      lines1,
      lines2,
      hint,
      deckMaskInner,
      sticker1,
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
      if (stage1) gsap.set(stage1, { clearProps: "all" });
      gsap.set(lines1, { clearProps: "all" });
      if (sticker1) gsap.set(sticker1, { clearProps: "all" });
      gsap.set(lines2, { clearProps: "all" });
      if (hint) gsap.set(hint, { clearProps: "all" });
      if (deckMaskInner) gsap.set(deckMaskInner, { clearProps: "all" });
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
