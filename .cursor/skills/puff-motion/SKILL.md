---
name: puff-motion
description: "Defines Puff Cross Media motion choreography, interaction feedback, reduced-motion behavior, and performance limits. Use when designing, implementing, or reviewing animations, scroll reveals, hover states, and animated illustrations."
disable-model-invocation: true
---

# Puff Motion Direction

## Activation Contract

Load `puff-scope`, `puff-brand`, `puff-design-system`, and `puff-layouts` before this skill. Motion is a structural layer: it establishes rhythm and feedback; it must not compensate for weak hierarchy or delay content.

## Motion Character

Puff motion is **springy, hand-made, and directional**, derived from the existing squiggles and the reference collage language. It should feel like a printed sticker settling into place, not a luxury-tech glass interface.

## Runtime Decision: Lenis + GSAP

When implementation is approved, the motion runtime SHALL use:

- **Lenis** as the single document-level smooth-scroll controller.
- **GSAP** for sequenced animation and **ScrollTrigger** for scroll-linked choreography.

This is an approved architectural direction, not permission to install dependencies during PLANNING.

### Integration Contract

1. Initialize exactly one Lenis root instance. Nested smooth scrollers are prohibited unless a future change explicitly justifies one.
2. Disable Lenis automatic RAF when GSAP drives the shared frame loop; Lenis MUST receive its `raf()` tick from GSAP's ticker.
3. Subscribe `ScrollTrigger.update` to Lenis scroll events so trigger measurements follow the eased scroll position.
4. Disable GSAP ticker lag smoothing for Lenis synchronization; otherwise visual scroll and animation progress can drift.
5. Register GSAP plugins once at the client boundary. Every tween and ScrollTrigger MUST be scoped and cleaned up at unmount.
6. Call `ScrollTrigger.refresh()` only after meaningful layout changes (font/media load, filter result change, resize debounce); never on every scroll frame.
7. `ScrollTrigger.scrollerProxy()` is NOT the default for Lenis document scrolling. Use it only if a future custom transformed scroller requires it.

### Accessibility and escape hatches

- Reduced-motion preference MUST disable Lenis smoothing and all nonessential GSAP scroll choreography.
- Keyboard navigation, hash links, browser find-in-page, skip links, form focus, and native scroll restoration MUST remain usable.
- Do not use Lenis or ScrollTrigger to pin essential reading content, trap focus, alter semantic order, or delay navigation.

Read [runtime.md](references/runtime.md) before implementation.

## Global Constraints

- Animate only `transform` and `opacity` for frequent interactions.
- Never animate layout-affecting `width`, `height`, `top`, `left`, `margin`, or filter blur in scroll-linked sequences.
- Do not gate core content behind long entrance animation.
- One editorial reveal system per viewport; avoid independent simultaneous animation in every section.
- Respect `prefers-reduced-motion`: remove transforms, parallax, auto-play loops, and stagger delays; retain immediate state changes.
- Above-the-fold visual effects must preserve LCP element stability and avoid cumulative layout shift.

## Choreography by Layer

### 1. Page entry

- Hero display: opacity 0 → 1 plus 16–28 px upward settling; `motion.editorial`.
- Supporting copy: follows after 80–120 ms, max two staggered groups.
- Illustration/squiggle: one directional draw/reveal or gentle 2–3° settle; never continuous motion by default.
- CTA: arrives with supporting copy; do not make users wait for it.

### 2. Section reveal

- Use opacity + 12–20 px translate only.
- Reveal section heading before modules, then modules in batches of 2–4 with 50–80 ms stagger.
- Maximum total reveal window: 480 ms on normal motion preference.
- Do not replay a reveal on repeated scroll unless it communicates a filter/state change.

### 3. Interactive controls

| Component | Feedback |
|---|---|
| Button | 2 px translate / 0.98 scale on press; 140–220 ms |
| Portfolio tile | 1.01–1.03 media scale + label reveal; 220 ms |
| Accordion | answer height by layout-safe disclosure, glyph rotate/crossfade; 220–300 ms |
| Filter tab | color/surface transition + active indicator translate; 180–220 ms |
| Proof module | 2–4 px lift or visual nudge only if it is interactive |

Focus-visible is instant and persistent; it is not animated away.

### 4. Decorative gestures

- Squiggles may draw in once, slide 2–4% along an axis, or settle from a 2° rotation.
- Sticker labels may enter with a small overshoot but cannot exceed 8 px travel or 3° rotation.
- Use no more than one continuous decorative loop in the entire viewport; default loop interval ≥8 s and pause when off-screen.

## Easing and Duration

Use the motion tokens in `puff-design-system/references/tokens.md`.

- `ease.out`: entries and hover exits
- `ease.in-out`: position/rotation settling
- No linear motion except deliberate progress indicators.
- Avoid stock `ease-in-out`; the cubic-bezier token is mandatory.

## Performance Budget

- No runtime layout measurements for decorative animation.
- Lenis and GSAP are the only approved animation/scroll runtime dependencies; do not add a second smooth-scroll or scroll-animation library.
- Use CSS transitions/keyframes for local, non-sequenced micro-interactions. Use GSAP only when sequencing, scroll progress, or lifecycle-aware orchestration is required.
- Do not autoplay video in hero without poster, muted playback, and an explicit performance decision.
- Delay below-the-fold motion initialization until the section approaches viewport.
- Test reduced motion, keyboard focus, and 320 px viewport before approving an effect.

## Motion Review Checklist

- [ ] Motion conveys entry, hierarchy, or feedback.
- [ ] CTA/content is readable before animation completes.
- [ ] No transform creates horizontal overflow on mobile.
- [ ] Decoration is behind controls and semantic content.
- [ ] Reduced-motion path remains complete and usable.
- [ ] Frequent interactions animate compositor-safe properties only.

## References

- `.cursor/skills/puff-design-system/references/tokens.md`
- [runtime.md](references/runtime.md) — Lenis/GSAP integration and cleanup contract
- `.cursor/skills/puff-layouts/SKILL.md`
- `.agents/skills/high-end-visual-design/SKILL.md` — consult for polish only; Puff rules override it
