---
name: puff-layouts
description: "Defines editorial layout archetypes, responsive collapse rules, and section composition for Puff Cross Media. Use when planning or reviewing hero, pricing, portfolio, FAQ, CTA, footer, or any landing-page layout."
disable-model-invocation: true
---

# Puff Layouts

## Activation Contract

Load `puff-scope`, `puff-brand`, and `puff-design-system` before this skill. Apply one archetype per section; sections may transition between archetypes but MUST NOT merge competing compositions.

## Layout Principle

Puff's page rhythm alternates between **expressive editorial statements** and **calm utility surfaces**:

```
statement → proof → utility → release → conversion → terminal brand moment
```

This prevents a long landing page from becoming visually monotonous or cognitively noisy.

## Approved Archetypes

### A. Editorial Split — hero / manifesto

**Use:** hero, repositioning statement, final CTA.

| Desktop | Mobile |
|---|---|
| 12-column grid; copy occupies 5–7 columns; visual anchor occupies 4–6 columns with controlled overlap | Single flow; statement first, then supporting copy, then illustration/media |

- Set the display statement at 56–112 px fluid; max 4 visual lines.
- Supporting copy aligns to the optical left edge of the statement, not necessarily its first glyph.
- The illustration can exceed its grid region by one column or 8–12% width.
- CTAs sit below the message, never inside a decorative overlay.
- Large yellow squiggles may originate off-canvas and guide eye movement toward the CTA.

### B. Typographic Collage — brand/process/portfolio intro

**Use:** one high-impact title before a visual portfolio or a three-step explanation.

- Begin with 1–3 oversized condensed words split across non-uniform lines.
- Replace no more than one word fragment with a rectangular image/illustration insert.
- Use mini-labels/tags as semantic annotations; they must not be the only way to understand the heading.
- Constrain the collage to 8–10 columns; reserve remaining columns for microcopy, a CTA, or visual breathing room.
- Desktop overlap: 8–32 px. Mobile overlap: 0–8 px and no content occlusion.

### C. Modular Proof Cluster — metrics/benefits/dashboard preview

**Use:** quantified benefits, workflow proof, dashboard placeholder.

- Build one primary module (span 5–7 columns) plus 2–4 asymmetric secondary modules.
- Module aspect ratios may differ, but shared `radius.lg` and internal padding MUST unify the cluster.
- At least one module MUST be text-only/readable; not every tile needs illustration.
- Use a black anchor background or white canvas, then a single support accent cluster.
- Never use four equal cards in a row.

### D. Quiet Utility Stack — FAQ/legal/pricing detail

**Use:** FAQ, table detail, policy text, comparisons.

- Center a 6–8 column information rail on a calm paper/mist surface.
- FAQ row heights: 64–80 px closed desktop; 56–72 px mobile, growing naturally when open.
- Separate rows with `border.hairline`; no card-per-question layout.
- Keep control affordance on the far end; it must remain visible and keyboard-operable.
- A single high-saturation panel may follow the stack as the conversion release.

### E. High-Signal Panel — promotion/contact/final CTA

**Use:** trial offer, newsletter/contact, final conversion panel.

- Use a full-width panel within the global container, radius `xl` desktop / `lg` mobile.
- Panel hierarchy: eyebrow → display claim → supporting terms → CTA.
- A scribble/shape can overlap 10–20% of the panel surface, but must stay behind text/control layers.
- Pair yellow with ink or paper with ink; do not use white body copy on yellow.

### F. Terminal Wordmark Footer — close

**Use:** footer only.

- Upper zone: compact nav, social, legal, email/CTA in 2–4 uneven columns.
- Lower zone: oversized wordmark/logo, cropped only if alternate text/logo remains accessible.
- Footer supports an ink slab on a yellow canvas or a yellow slab on ink; do not introduce a third main surface.
- Mobile: all links appear before the wordmark; email/control becomes full width; wordmark maintains scale but must not overflow horizontally.

## Section Map

| Puff section | Primary archetype | Secondary treatment |
|---|---|---|
| Hero | A Editorial Split | hand-drawn gesture overlay |
| Client/logo proof | C Modular Proof Cluster | quiet label rail |
| How it works | B Typographic Collage | C dashboard/proof cluster |
| Pricing | D Quiet Utility Stack | C featured plan module |
| Benefits | C Modular Proof Cluster | isolated editorial statement |
| Portfolio | B Typographic Collage | asymmetric media grid |
| Testimonials | A split or C cluster | strong quote typography |
| FAQ | D Quiet Utility Stack | E final micro-CTA |
| Final CTA | E High-Signal Panel | illustration overlap |
| Footer | F Terminal Wordmark Footer | compact nav utility |

## Responsive Collapse Rules

- At `<768px`, every multi-column composition becomes a document-flow stack; decorative overlap cannot change reading, focus, or tap order.
- Preserve the content order: eyebrow → headline → support → proof → CTA.
- Disable horizontal transforms/rotations that could cause overflow; preserve only small optical offsets.
- For media mosaics, use a 2-column grid only if assets keep meaningful crop at 160 px minimum width; otherwise one column.
- Do not hide content merely because an editorial desktop composition lacks space.

## Review Checklist

- [ ] A section has one dominant anchor and one archetype.
- [ ] The visual rhythm alternates expressive and utility sections.
- [ ] Display type never reduces paragraph readability.
- [ ] Overlap is layered behind interactive content.
- [ ] Desktop asymmetry collapses intentionally on mobile.
- [ ] No section recreates a generic equal-card SaaS grid.

## References

- `.cursor/skills/puff-design-system/references/reference-composition.md`
- `.cursor/skills/puff-design-system/references/tokens.md`
- `.cursor/skills/puff-motion/SKILL.md`
