import { setNavSurface, type NavSurface } from "./nav-surface";

const COMPACT_AFTER = 64;
const ACC_TRIGGER = 20;
/** Seconds to approach ~63% of remaining distance — same both directions */
const MORPH_TAU = 0.28;
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)");

export function syncSiteHeaderHeight() {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  if (!header) return () => {};

  const apply = () => {
    document.documentElement.style.setProperty(
      "--site-header-h",
      `${header.offsetHeight}px`,
    );
  };

  apply();

  const observer =
    typeof ResizeObserver !== "undefined" ? new ResizeObserver(apply) : null;
  observer?.observe(header);
  window.addEventListener("resize", apply, { passive: true });
  window.addEventListener("orientationchange", apply, { passive: true });

  return () => {
    observer?.disconnect();
    window.removeEventListener("resize", apply);
    window.removeEventListener("orientationchange", apply);
  };
}

export function initSmartNav() {
  const pills = Array.from(
    document.querySelectorAll<HTMLElement>("[data-nav-pill], [data-nav-pill-mobile]"),
  );
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("[data-nav-tone]"),
  );
  const mobileToggle = document.querySelector<HTMLButtonElement>("[data-mobile-nav-toggle]");
  const mobilePanel = document.querySelector<HTMLElement>("[data-mobile-nav-panel]");
  const mobileShell = document.querySelector<HTMLElement>("[data-mobile-nav-shell]");

  let lastY = window.scrollY;
  let targetCompact = false;
  let progress = window.scrollY > COMPACT_AFTER ? 1 : 0;
  let ticking = false;
  let menuOpen = false;
  let acc = 0;
  let morphRaf = 0;
  let lastMorphTs = 0;
  let activeTone: NavSurface = "yellow";

  const applyProgress = (value: number) => {
    const p = Math.min(1, Math.max(0, value));
    progress = p;
    pills.forEach((pill) => {
      pill.style.setProperty("--nav-compact", p.toFixed(4));
      pill.classList.toggle("is-compact", p > 0.92);
      pill.setAttribute("data-compact", p > 0.92 ? "true" : "false");
      const collapse = pill.querySelector<HTMLElement>(".nav-pill-collapse");
      if (collapse) {
        collapse.style.pointerEvents = p > 0.85 ? "none" : "";
      }
    });
  };

  const stopMorph = () => {
    if (morphRaf) {
      cancelAnimationFrame(morphRaf);
      morphRaf = 0;
    }
    lastMorphTs = 0;
  };

  const morphFrame = (ts: number) => {
    if (!lastMorphTs) lastMorphTs = ts;
    const dt = Math.min(0.05, (ts - lastMorphTs) / 1000);
    lastMorphTs = ts;

    const target = targetCompact ? 1 : 0;
    if (REDUCED_MOTION.matches) {
      applyProgress(target);
      stopMorph();
      return;
    }

    const alpha = 1 - Math.exp(-dt / MORPH_TAU);
    const next = progress + (target - progress) * alpha;

    if (Math.abs(target - next) < 0.001) {
      applyProgress(target);
      stopMorph();
      return;
    }

    applyProgress(next);
    morphRaf = requestAnimationFrame(morphFrame);
  };

  const ensureMorph = () => {
    if (!morphRaf) {
      lastMorphTs = 0;
      morphRaf = requestAnimationFrame(morphFrame);
    }
  };

  const setMenuOpen = (open: boolean) => {
    menuOpen = open;
    if (mobileToggle) {
      mobileToggle.setAttribute("aria-expanded", open ? "true" : "false");
      mobileToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    if (mobilePanel) {
      mobilePanel.hidden = !open;
      mobilePanel.classList.toggle("hidden", !open);
    }
    mobileShell?.classList.toggle("is-menu-open", open);
  };

  const setCompact = (next: boolean) => {
    if (next && menuOpen) setMenuOpen(false);
    if (targetCompact === next) {
      ensureMorph();
      return;
    }
    targetCompact = next;
    acc = 0;
    ensureMorph();
  };

  const applyTone = (tone: NavSurface) => {
    if (activeTone === tone) return;
    activeTone = tone;
    setNavSurface(tone);
  };

  const observer =
    sections.length > 0
      ? new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((entry) => entry.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            const top = visible[0]?.target;
            if (!(top instanceof HTMLElement)) return;

            const tone = top.dataset.navTone === "ink" ? "ink" : "yellow";
            applyTone(tone);
          },
          {
            rootMargin: "-12px 0px -88% 0px",
            threshold: [0, 0.25, 0.5, 1],
          },
        )
      : null;

  sections.forEach((section) => observer?.observe(section));

  const onToneSync = (event: Event) => {
    const detail = (event as CustomEvent<{ tone?: NavSurface }>).detail;
    if (detail?.tone === "yellow" || detail?.tone === "ink") {
      applyTone(detail.tone);
    }
  };
  window.addEventListener("puff:nav-tone", onToneSync);

  const onScroll = () => {
    if (pills.length === 0 || ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      ticking = false;

      if (y <= COMPACT_AFTER) {
        acc = 0;
        setCompact(false);
        return;
      }

      if (delta === 0) return;

      if (acc !== 0 && Math.sign(acc) !== Math.sign(delta)) {
        acc = delta;
      } else {
        acc += delta;
      }

      if (acc >= ACC_TRIGGER) {
        setCompact(true);
      } else if (acc <= -ACC_TRIGGER) {
        setCompact(false);
      }
    });
  };

  const initialTone: NavSurface =
    sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 24 && rect.bottom > 24;
    })?.dataset.navTone === "ink"
      ? "ink"
      : sections[0]?.dataset.navTone === "ink"
        ? "ink"
        : "yellow";
  setNavSurface(initialTone);
  activeTone = initialTone;

  targetCompact = window.scrollY > COMPACT_AFTER;
  applyProgress(targetCompact ? 1 : 0);

  window.addEventListener("scroll", onScroll, { passive: true });

  const onToggleClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!menuOpen) setCompact(false);
    setMenuOpen(!menuOpen);
  };
  const closeMobileNav = () => setMenuOpen(false);
  const onDocumentClick = (event: Event) => {
    if (!menuOpen || !mobileShell) return;
    const target = event.target;
    if (target instanceof Node && !mobileShell.contains(target)) {
      closeMobileNav();
    }
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && menuOpen) closeMobileNav();
  };

  mobileToggle?.addEventListener("click", onToggleClick);
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onKeyDown);
  document.querySelectorAll("[data-mobile-nav-link]").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  return () => {
    stopMorph();
    observer?.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("puff:nav-tone", onToneSync);
    mobileToggle?.removeEventListener("click", onToggleClick);
    document.removeEventListener("click", onDocumentClick);
    document.removeEventListener("keydown", onKeyDown);
    document.querySelectorAll("[data-mobile-nav-link]").forEach((link) => {
      link.removeEventListener("click", closeMobileNav);
    });
    pills.forEach((pill) => {
      pill.style.removeProperty("--nav-compact");
    });
  };
}

export function bootSmartNav() {
  let cleanupNav: (() => void) | undefined;
  let cleanupHeaderHeight: (() => void) | undefined;

  const boot = () => {
    cleanupNav?.();
    cleanupHeaderHeight?.();
    cleanupHeaderHeight = syncSiteHeaderHeight();
    cleanupNav = initSmartNav();
  };

  document.addEventListener("astro:page-load", boot);
  document.addEventListener("astro:before-swap", () => {
    cleanupNav?.();
    cleanupHeaderHeight?.();
    cleanupNav = undefined;
    cleanupHeaderHeight = undefined;
  });

  boot();

  return () => {
    cleanupNav?.();
    cleanupHeaderHeight?.();
  };
}
