---
name: puff-brand
description: "Puff Cross Media brand identity: colors, typography, tone, illustration style. Trigger: UI, design, copy, or brand decisions for puff-website."
---

# Puff Brand Guidelines

## Activation Contract

Load before any UI, design, copy, or brand decision in puff-website. Does NOT authorize implementation — see `puff-scope`.

## Hard Rules

- Primary brand color MUST remain yellow (approx `#FFD100` / `#FFC700`) — non-negotiable
- Tone: professional yet playful — never corporate-grey or generic SaaS purple
- Illustrations: hand-drawn/squiggle style (thick lines, cartoon hands, organic shapes)
- Headlines: bold, large, sans-serif. Decorative font ONLY for 1–2 accent words
- CTAs: yellow fill on white sections; white fill on yellow sections
- Never use Inter, Roboto, Arial, or Space Grotesk as primary fonts
- Zero typos in visible copy

## Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--puff-yellow` | `#FFD100` | Primary bg, CTAs, accents |
| `--puff-yellow-dark` | `#E6BC00` | Hover on yellow |
| `--puff-white` | `#FFFFFF` | Hero, pricing bg |
| `--puff-black` | `#1A1A1A` | Headlines, body on light bg |
| `--puff-grey` | `#F5F5F5` | Alternate section bg |
| `--puff-grey-dark` | `#6B6B6B` | Secondary text |

## Typography (candidates — final choice TBD)

- Display: Clash Display, Satoshi Black, or similar bold geometric sans
- Body: Satoshi, General Sans, or DM Sans
- Accent: hand-drawn/rounded display, max 1–2 words per headline

## Voice & Tone (site copy = English)

| Do | Don't |
|----|-------|
| "Fast, easy, unlimited" | "Synergistic design solutions" |
| "No hassle" | "Leverage our proprietary workflow" |
| "Your on-demand design team" | "We are a leading creative agency" |

## Accessibility

- White text on yellow: large headlines only (≥24px bold)
- Body on yellow: black/dark text
- Contrast ≥ 4.5:1 for body (WCAG AA)
- Visible focus states on all interactive elements

## Open Decisions (need user input)

- [ ] Final font pairing
- [ ] Illustration assets: reuse existing vs. re-draw
- [ ] Logo format (SVG source?)
- [ ] Photography style (if any) vs. illustration-only

## References

- Current site: https://puffcrossmedia.com/
- Audit: `openspec/changes/puff-redesign/exploration.md`
