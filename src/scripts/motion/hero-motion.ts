import { ensureGsap, prefersReducedMotion, isDesktopMedia } from "./setup";

interface HeroMotionInstance {
  kill: () => void;
}

let currentInstance: HeroMotionInstance | null = null;

export function initHeroMotion(): HeroMotionInstance | null {
  if (currentInstance) {
    currentInstance.kill();
    currentInstance = null;
  }

  const heroSection = document.querySelector<HTMLElement>("[data-hero-section]");
  if (!heroSection) return null;

  if (prefersReducedMotion()) {
    return null;
  }

  const { gsap } = ensureGsap();

  // Targets (only visible lines for the active viewport breakpoint)
  const titleLines = Array.from(heroSection.querySelectorAll<HTMLElement>("[data-hero-title-line]")).filter(
    (el) => el.offsetParent !== null
  );
  const bodyText = heroSection.querySelector<HTMLElement>("[data-hero-body]");
  const ctaBtn = heroSection.querySelector<HTMLElement>("[data-hero-cta]");
  const morphWrap = heroSection.querySelector<HTMLElement>("[data-hero-morph-wrap]");
  const stickers = Array.from(heroSection.querySelectorAll<HTMLElement>("[data-hero-sticker]"));
  const stickerInners = Array.from(heroSection.querySelectorAll<HTMLElement>("[data-hero-sticker-inner]"));

  if (!titleLines.length) return null;

  const cleanups: (() => void)[] = [];

  // Set initial states for clean, smooth entrance
  gsap.set(titleLines, { yPercent: 100, opacity: 0 });
  if (bodyText) gsap.set(bodyText, { y: 22, opacity: 0 });
  if (ctaBtn) gsap.set(ctaBtn, { scale: 0.94, y: 16, opacity: 0 });
  if (morphWrap) gsap.set(morphWrap, { y: 16, opacity: 0 });
  if (stickerInners.length) {
    gsap.set(stickerInners, {
      scale: 0.75,
      rotation: (i) => [-8, 7, -6][i] ?? 5,
      opacity: 0,
      transformOrigin: "center center",
    });
  }

  const startTimeline = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        setupContinuousMotion();
      },
    });

    // 1. Kinetic headline reveal (Split lines rising with silky power3 ease)
    tl.to(
      titleLines,
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out",
      },
      0
    );

    // 2. Stickers glide in with smooth, cushioned settle (no cartoon bounce)
    if (stickerInners.length) {
      tl.to(
        stickerInners,
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.06,
          ease: "power3.out",
        },
        0.06
      );
    }

    // 3. Body text smooth reveal
    if (bodyText) {
      tl.to(
        bodyText,
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
        },
        0.12
      );
    }

    // 4. CTA button smooth snap
    if (ctaBtn) {
      tl.to(
        ctaBtn,
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        0.16
      );
    }

    // 5. Morph client proof bar
    if (morphWrap) {
      tl.to(
        morphWrap,
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
        },
        0.2
      );
    }
  };

  const setupContinuousMotion = () => {
    // 1. Subtle, organic idle floating for each sticker inner using sine curves
    const idleTweens: gsap.core.Tween[] = [];
    stickerInners.forEach((inner, i) => {
      const floatY = [8, 11, 9][i] ?? 10;
      const rot = [2.2, -2.8, 2.5][i] ?? 2;
      const dur = [4.2, 5.0, 4.6][i] ?? 4.5;

      const tween = gsap.to(inner, {
        y: `+=${floatY}`,
        rotation: `+=${rot}`,
        duration: dur,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.35,
      });
      idleTweens.push(tween);
    });

    cleanups.push(() => {
      idleTweens.forEach((t) => t.kill());
    });

    // 2. High-performance Mouse Parallax using gsap.quickTo
    if (isDesktopMedia() && stickers.length) {
      const quickSetters = stickers.map((sticker, i) => {
        // Depth factors: Cloud (back) = 16, Work (mid) = 28, Number 1 (front) = 40
        const factor = [28, 16, 40][i] ?? 24;
        return {
          xTo: gsap.quickTo(sticker, "x", { duration: 0.75, ease: "power2.out" }),
          yTo: gsap.quickTo(sticker, "y", { duration: 0.75, ease: "power2.out" }),
          factor,
        };
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
        const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

        quickSetters.forEach(({ xTo, yTo, factor }) => {
          xTo(normX * factor);
          yTo(normY * factor);
        });
      };

      const handleMouseLeave = () => {
        quickSetters.forEach(({ xTo, yTo }) => {
          xTo(0);
          yTo(0);
        });
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

      cleanups.push(() => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      });
    }

    // 3. ScrollTrigger Exit Parallax (stickers float outward & upward as user scrolls)
    const scrollTweens: gsap.core.Tween[] = [];
    const centerCluster = heroSection.querySelector<HTMLElement>(".hero-shell > div:first-child");

    if (centerCluster) {
      scrollTweens.push(
        gsap.to(centerCluster, {
          y: 70,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        })
      );
    }

    stickers.forEach((sticker, i) => {
      const yOut = [-75, -50, -100][i] ?? -60;
      const xOut = [-35, 40, -45][i] ?? -20;
      const rotOut = [-16, 20, -28][i] ?? 10;

      scrollTweens.push(
        gsap.to(sticker, {
          yPercent: yOut,
          xPercent: xOut,
          rotation: rotOut,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        })
      );
    });

    cleanups.push(() => {
      scrollTweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    });
  };

  // Preloader synchronization
  const preloader = document.getElementById("puff-preloader");
  const isPreloaderVisible =
    preloader &&
    preloader.style.display !== "none" &&
    getComputedStyle(preloader).display !== "none";

  if (isPreloaderVisible) {
    let triggered = false;
    const triggerStart = () => {
      if (triggered) return;
      triggered = true;
      document.removeEventListener("preloader:reveal", triggerStart);
      document.removeEventListener("preloader:complete", triggerStart);
      startTimeline();
    };
    document.addEventListener("preloader:reveal", triggerStart);
    document.addEventListener("preloader:complete", triggerStart);
    cleanups.push(() => {
      document.removeEventListener("preloader:reveal", triggerStart);
      document.removeEventListener("preloader:complete", triggerStart);
    });
  } else {
    requestAnimationFrame(() => {
      startTimeline();
    });
  }

  const instance: HeroMotionInstance = {
    kill: () => {
      cleanups.forEach((fn) => fn());
    },
  };

  currentInstance = instance;
  return instance;
}
