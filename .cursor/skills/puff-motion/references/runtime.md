# Lenis + GSAP Runtime Contract

## Scope

This reference governs the future client-side integration of Lenis and GSAP. It is intentionally framework-neutral because the application stack is not selected yet.

## Ownership

| Concern | Owner |
|---|---|
| Native/document scroll smoothing | Lenis |
| Shared animation frame clock | GSAP ticker |
| Sequenced entrance / interaction timelines | GSAP |
| Scroll-linked lifecycle and progress | GSAP ScrollTrigger |
| Simple local hover/focus transitions | CSS |

There MUST be one document smooth-scroll instance and one shared frame clock. A second RAF loop for Lenis is prohibited when GSAP owns its ticker integration.

## Required lifecycle

1. Create Lenis at the client/runtime boundary, never during server rendering.
2. Configure manual frame control (`autoRaf: false` equivalent) when using GSAP ticker synchronization.
3. Register `ScrollTrigger` once.
4. On each Lenis scroll event, invoke `ScrollTrigger.update`.
5. On each GSAP ticker tick, pass time in milliseconds to Lenis RAF.
6. Disable GSAP lag smoothing for the shared Lenis/GSAP ticker.
7. On component/application teardown:
   - unsubscribe Lenis scroll listener;
   - remove the GSAP ticker callback;
   - revert the GSAP context/timelines and kill their triggers;
   - destroy Lenis.

## Refresh policy

`ScrollTrigger.refresh()` is allowed after:

- webfont resolution changes text metrics;
- portfolio filter changes content height;
- responsive breakpoint/layout changes;
- media has loaded and affects section height;
- an accordion opens only if it contains a scroll-triggered region.

Do not call it from a raw scroll listener. On resize, debounce it to avoid repeat layout measurement.

## Reduced motion

When `prefers-reduced-motion: reduce` is active:

- do not initialize Lenis smoothing, or configure it for native/immediate scrolling;
- do not create scrubbed, parallax, pinning, looping, or staggered ScrollTriggers;
- render final content state without opacity/translate entrance offsets;
- retain functional accordion, tabs, filter, focus, and CTA feedback with instant/CSS-safe state changes.

## ScrollTrigger policy

- Use `scrub` only for a spatial relationship the user can track, such as an illustration moving with a section narrative.
- Prefer one trigger/timeline per section; avoid a trigger per child node.
- Pinning is exception-only. It needs a documented reading/interaction benefit and must be disabled or simplified on mobile.
- `scrollerProxy()` is only for non-native/custom transformed scroller implementations. It is not needed for normal Lenis document scrolling.

## Validation checklist

- [ ] Native wheel, touch, keyboard, hash navigation, skip link, and browser back/forward remain usable.
- [ ] No horizontal overflow is created by transforms.
- [ ] Lenis and GSAP use one frame loop, not two competing RAFs.
- [ ] ScrollTrigger updates and refreshes at the correct lifecycle points.
- [ ] All listeners, ticker callbacks, and triggers clean up on route/component disposal.
- [ ] Reduced-motion path uses no essential scroll-driven animation.
