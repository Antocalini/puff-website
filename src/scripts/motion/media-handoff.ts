import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import { ensureGsap, prefersReducedMotion } from "./setup";

const RADIUS = "1.25rem";

/** First portion of the scrub is the flight; the rest holds the settled card. */
const FLIGHT_END_DESKTOP = 0.55;
const FLIGHT_END_MOBILE = 0.68;
/** Keep hero dimensions until this point — only position moves first. */
const SIZE_FLIGHT_START_DESKTOP = 0.35;
/** Mobile starts smaller — grow earlier so the card reaches full size while scrolling. */
const SIZE_FLIGHT_START_MOBILE = 0.12;
/** Hysteresis so park/unpark don't thrash at the flight boundary. */
const PARK_IN = 0.999;
const PARK_OUT = 0.97;

type Rect = { left: number; top: number; width: number; height: number };

/**
 * Media starts mounted in the hero ([data-media-origin] > [data-hero-media]).
 * On scroll it flies into [data-media-target] and becomes the second section.
 */
export function initMediaHandoff() {
  const { gsap, ScrollTrigger } = ensureGsap();

  const media = document.querySelector<HTMLElement>("[data-hero-media]");
  const origin = document.querySelector<HTMLElement>("[data-media-origin]");
  const section = document.querySelector<HTMLElement>("[data-media-expand]");
  const target = document.querySelector<HTMLElement>("[data-media-target]");
  if (!media || !origin || !section || !target) return () => undefined;

  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
  const flightEnd = () => (isMobile() ? FLIGHT_END_MOBILE : FLIGHT_END_DESKTOP);
  const sizeFlightStart = () =>
    isMobile() ? SIZE_FLIGHT_START_MOBILE : SIZE_FLIGHT_START_DESKTOP;

  let flying = false;
  let parked = false;
  let lockedFrom: Rect | null = null;
  let lockedTo: Rect | null = null;
  let lastProgress = 0;
  let scrollDirection: "forward" | "reverse" = "forward";
  const triggers: ScrollTriggerType[] = [];
  const stage = section.querySelector<HTMLElement>("[data-media-expand-stage]");

  const fillStyles = (): Partial<CSSStyleDeclaration> => ({
    display: "block",
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    transform: "none",
    borderRadius: RADIUS,
    maxWidth: "none",
    margin: "0",
    boxSizing: "border-box",
    pointerEvents: "none",
  });

  const read = (el: HTMLElement): Rect => {
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  };

  /** height / width from computed aspect-ratio (supports 9/16 mobile, 16/9 desktop). */
  const targetHeightRatio = (): number => {
    const ratio = getComputedStyle(target).aspectRatio;
    if (ratio && ratio !== "auto") {
      const parts = ratio.split("/").map((part) => Number.parseFloat(part.trim()));
      if (parts.length === 2 && parts[0] > 0 && parts[1] > 0) {
        return parts[1] / parts[0];
      }
    }
    return isMobile() ? 16 / 9 : 10 / 16;
  };

  /** Live hero slot (shell keeps space while media is in flight). */
  const readOriginLive = (): Rect => {
    const shell = origin.querySelector<HTMLElement>("[data-media-origin-shell]");
    const slot = read(shell ?? origin);
    return {
      left: slot.left,
      top: slot.top,
      width: slot.width > 8 ? slot.width : media.offsetWidth,
      height: slot.height > 8 ? slot.height : media.offsetHeight,
    };
  };

  /** Hero scrolls away during the handoff — lock the media's real box once (forward). */
  const lockOriginRect = () => {
    if (lockedFrom) return lockedFrom;
    lockedFrom = readOriginLive();
    return lockedFrom;
  };

  /**
   * Target slot moves with the section until sticky pins.
   * Compute the settled (viewport-centered) rect instead of reading live DOM.
   */
  const computeSettledTarget = (): Rect => {
    const live = read(target);
    const width = live.width > 8 ? live.width : origin.offsetWidth;
    const height = live.height > 8 ? live.height : width * targetHeightRatio();

    if (!stage || width < 8) return live;

    const stageStyle = getComputedStyle(stage);
    const padTop = Number.parseFloat(stageStyle.paddingTop) || 0;
    const padBottom = Number.parseFloat(stageStyle.paddingBottom) || 0;
    const contentHeight = stage.clientHeight - padTop - padBottom;

    const container = target.closest<HTMLElement>(".max-w-content");
    const containerRect = container?.getBoundingClientRect();
    const left = containerRect
      ? containerRect.left + (containerRect.width - width) / 2
      : (window.innerWidth - width) / 2;
    const top = padTop + (contentHeight - height) / 2;

    return { left, top, width, height };
  };

  const lockTargetRect = (): Rect => {
    if (lockedTo) return lockedTo;
    lockedTo = computeSettledTarget();
    return lockedTo;
  };

  /** Live target slot — tracks sticky section while scrolling back. */
  const readTargetLive = (): Rect => {
    const live = read(target);
    if (live.width > 8 && live.height > 8) return live;
    return computeSettledTarget();
  };

  const clearFlightRects = () => {
    lockedFrom = null;
    lockedTo = null;
  };

  const ensureOriginShell = () => {
    if (origin.querySelector("[data-media-origin-shell]")) return;
    const shell = document.createElement("div");
    shell.setAttribute("data-media-origin-shell", "");
    shell.setAttribute("aria-hidden", "true");
    shell.style.cssText = "width:100%;height:100%;visibility:hidden;pointer-events:none;";
    origin.appendChild(shell);
  };

  const clearInlineFlight = () => {
    gsap.set(media, {
      clearProps:
        "position,left,top,width,height,x,y,xPercent,yPercent,rotate,zIndex,margin,maxWidth,transform",
    });
  };

  const setFlight = (rect: Rect, rotate: number) => {
    media.removeAttribute("data-media-tilted");
    gsap.set(media, {
      position: "fixed",
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      rotate,
      borderRadius: RADIUS,
      margin: 0,
      maxWidth: "none",
      zIndex: 20,
      boxSizing: "border-box",
      pointerEvents: "none",
    });
  };

  const getFlightContainer = () => origin.parentElement || document.body;

  const flightRectAt = (flightProgress: number, from: Rect, to: Rect): { rect: Rect; rotate: number } => {
    const sizeStart = sizeFlightStart();
    const sizeProgress = gsap.utils.clamp(
      0,
      1,
      (flightProgress - sizeStart) / (1 - sizeStart),
    );

    const currentWidth = gsap.utils.interpolate(from.width, to.width, sizeProgress);
    const currentHeight = gsap.utils.interpolate(from.height, to.height, sizeProgress);

    const fromCenterX = from.left + from.width / 2;
    const toCenterX = to.left + to.width / 2;
    const currentCenterX = gsap.utils.interpolate(fromCenterX, toCenterX, flightProgress);

    return {
      rect: {
        left: currentCenterX - currentWidth / 2,
        top: gsap.utils.interpolate(from.top, to.top, flightProgress),
        width: currentWidth,
        height: currentHeight,
      },
      rotate: gsap.utils.interpolate(-4, 0, flightProgress),
    };
  };

  const takeFlight = () => {
    if (flying || parked) return;
    flying = true;
    ensureOriginShell();
    lockTargetRect();
    media.setAttribute("data-media-flying", "");

    const rect = lockOriginRect();
    getFlightContainer().appendChild(media);
    setFlight(rect, -4);
  };

  const park = () => {
    if (parked) return;
    parked = true;
    flying = false;

    clearInlineFlight();
    target.appendChild(media);
    media.removeAttribute("data-media-tilted");
    Object.assign(media.style, fillStyles());
  };

  /** Detach from target without snapping position — next applyProgress writes flight. */
  const unpark = () => {
    if (!parked) return;
    parked = false;
    flying = true;

    const rect = readTargetLive();
    getFlightContainer().appendChild(media);
    if (rect.width > 8) setFlight(rect, 0);
  };

  const restoreToHero = () => {
    parked = false;
    flying = false;
    lastProgress = 0;
    scrollDirection = "forward";
    clearFlightRects();
    clearInlineFlight();

    const shell = origin.querySelector("[data-media-origin-shell]");
    shell?.remove();

    origin.appendChild(media);
    media.removeAttribute("data-media-flying");
    media.setAttribute("data-media-tilted", "");
    Object.assign(media.style, {
      display: "",
      position: "",
      inset: "",
      width: "",
      height: "",
      transform: "",
      borderRadius: "",
      maxWidth: "",
      margin: "",
      boxSizing: "",
      pointerEvents: "",
      zIndex: "",
    });
  };

  const applyProgress = (progress: number) => {
    const p = gsap.utils.clamp(0, 1, progress);
    const reversing = p < lastProgress - 0.0001;

    if (reversing && scrollDirection === "forward") clearFlightRects();
    if (!reversing && scrollDirection === "reverse") clearFlightRects();
    scrollDirection = reversing ? "reverse" : "forward";

    lastProgress = p;

    const flightProgress = gsap.utils.clamp(0, 1, p / flightEnd());

    if (flightProgress <= 0.001) {
      if (flying || parked) restoreToHero();
      return;
    }

    if (parked && flightProgress < PARK_OUT) unpark();
    if (!flying && !parked) takeFlight();

    if (!parked && flightProgress >= PARK_IN) {
      park();
      return;
    }

    if (parked) return;

    const from = reversing ? readOriginLive() : lockOriginRect();
    const to = reversing ? readTargetLive() : lockTargetRect();
    if (from.width < 8 || to.width < 8) return;

    if (!flying) takeFlight();

    const { rect, rotate } = flightRectAt(flightProgress, from, to);
    setFlight(rect, rotate);
  };

  if (prefersReducedMotion()) {
    triggers.push(
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        onEnter: () => {
          takeFlight();
          park();
        },
        onLeaveBack: restoreToHero,
      }),
    );
  } else {
    triggers.push(
      ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        end: "bottom bottom",
        scrub: 0.65,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
      }),
    );
  }

  const onResize = () => {
    clearFlightRects();
    ScrollTrigger.refresh();
  };
  window.addEventListener("resize", onResize);

  return () => {
    triggers.forEach((t) => t.kill());
    window.removeEventListener("resize", onResize);
    restoreToHero();
  };
}
