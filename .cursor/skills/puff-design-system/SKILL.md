---
name: puff-design-system
description: "Defines Puff Cross Media visual tokens, typography, spacing, responsive geometry, surfaces, and interaction states. Use when designing or reviewing any Puff section, component, layout, or visual token."
disable-model-invocation: true
---

# Puff Design System

## Activation Contract

Load `puff-scope` and `puff-brand` first. This skill turns Puff's brand into a consistent, implementation-ready visual language; it does **not** authorize UI implementation while the repository remains in PLANNING.

## Design Read

Puff is an **editorial, high-energy creative-service brand**: oversized condensed display type, modular surfaces, hand-drawn interventions, and intentional asymmetry. The reference direction combines:

- Omotive: dark canvas, fluorescent accents, sticker-like illustrations, modular metric cards.
- Check: editorial scale, collage overlaps, severe type hierarchy, image-as-letterform composition.
- Behance FAQ: reduced accordion rhythm, vivid blue panels, lime gesture overlays.
- Recruitment UI: rounded high-contrast modules, bold control groups, dense but legible information hierarchy.
- Grumpi: oversized wordmark/footer as a terminal brand moment.

Puff MUST keep its original yellow as the primary signal. References define composition and density, not a replacement palette.

## Non-Negotiables

- Use semantic design tokens; never scatter raw colors, one-off radii, or arbitrary spacing values.
- The primary accent is Puff yellow `#FFD100`; lime, pink, cobalt, and lavender are **supporting editorial accents only**, never a new brand primary.
- Each viewport MUST have one dominant visual anchor: display typography, an illustration, a media collage, or a data/module cluster — never all four at equal weight.
- Use black `#1A1A1A` for high-density type and surfaces; avoid dark-gray UI chrome.
- Preserve hand-drawn squiggles, mascot hands, circles, and imperfect marks as a controlled overlay layer, not decoration sprayed across every block.
- Never use generic SaaS card grids, default gradient meshes, glassmorphism, or a symmetric three-card feature section unless a section contract explicitly calls for it.

## Token System

Read [tokens.md](references/tokens.md) before selecting colors, typography, spacing, radii, or shadows.

### Required token families

| Family | Purpose |
|---|---|
| `color.*` | Brand, surface, text, border, editorial accents |
| `space.*` | 4 px base rhythm and section spacing |
| `type.*` | Display, headline, body, label, microcopy |
| `layout.*` | Container widths, gutters, grid columns |
| `radius.*` | Cards, controls, pills, panels |
| `motion.*` | Duration and easing primitives |

## Type Hierarchy

- **Display:** ultra-bold condensed grotesk; caps or near-caps are allowed for high-impact statements. Target 0.84–0.94 line-height, optical tracking from `-0.045em` to `-0.02em`.
- **Editorial headline:** bold/black grotesk with less condensation; use for readable narrative sections.
- **Body:** neutral sans at 16–18 px desktop / 16 px mobile; line-height 1.45–1.60.
- **Utility labels:** mono, compact sans, or uppercase grotesk; minimum 12 px physical size and 0.08–0.14em tracking.
- Do not set paragraphs in the display face. Do not use all caps for long body copy or FAQ answers.

## Surface Hierarchy

1. **Canvas** — white or near-white for reading and content credibility.
2. **Signal** — Puff yellow for conversion steps, promo bands, and energetic transitions.
3. **Anchor** — black for visual resets, statement blocks, image-collage frames, or terminal footer.
4. **Utility** — pale gray for quiet backgrounds and comparison scaffolding.
5. **Accent** — cobalt, lime, pink, lavender: one per composition cluster, max two visible accents per section.

## Responsive Geometry

Use fluid container geometry rather than fixed desktop canvases:

| Viewport | Columns | Outer gutter | Section vertical padding |
|---|---:|---:|---:|
| 320–767 px | 4 | 20–24 px | 64–88 px |
| 768–1023 px | 8 | 32–40 px | 88–112 px |
| 1024–1439 px | 12 | 48–64 px | 112–144 px |
| ≥1440 px | 12 | `max(64px, calc((100vw - 1440px)/2))` | 128–176 px |

- Keep text measures at 45–75 characters for paragraph blocks.
- A display composition MAY break the grid on desktop by 1–2 columns; it MUST return to flow layout below 768 px.
- Do not use `100vh`; full-screen statements use `min-height: 100dvh`.

## Execution Workflow

1. Identify the section's **dominant anchor** and intended surface hierarchy.
2. Select token values only from `references/tokens.md`.
3. Choose an approved archetype in `puff-layouts`.
4. Verify contrast, text measure, focus visibility, and mobile collapse rules.
5. Before approval, run the anti-pattern check in [reference-composition.md](references/reference-composition.md).

## References

- [tokens.md](references/tokens.md) — token values and responsive scale
- [reference-composition.md](references/reference-composition.md) — extracted visual principles from the five references
- `.cursor/skills/puff-brand/SKILL.md` — brand constraints
- `.cursor/skills/puff-layouts/SKILL.md` — layout archetypes
