---
name: puff-components
description: "Defines Puff Cross Media component anatomy, variants, states, and composition boundaries. Use when planning, designing, implementing, or reviewing reusable buttons, cards, accordions, tabs, modules, navigation, and footer elements."
disable-model-invocation: true
---

# Puff Component System

## Activation Contract

Load `puff-scope`, `puff-brand`, `puff-design-system`, and `puff-layouts` first. This component catalog is a planning contract during the current repository phase; do not generate implementation code unless the phase changes.

## Component Boundary Rule

- A reusable element used in 2+ sections becomes a system component.
- A composition unique to one page section remains owned by that section.
- Components MUST expose semantic variants, not visual escape-hatch props such as `customColor`, `randomPadding`, or `specialLayout`.

## Core Components

### Button

| Variant | Surface | Text | Use |
|---|---|---|---|
| `primary` | Puff yellow | Ink | Main conversion action |
| `inverse` | Paper | Ink | CTA on yellow/ink panel |
| `ink` | Ink | Paper | Quiet canvas CTA |
| `text` | Transparent | Ink | Secondary navigation/action |

**Anatomy:** optional leading icon → label → optional directional glyph.  
**Geometry:** min-height 44 px; horizontal padding 20–28 px; `radius.pill`; label never wraps at desktop.  
**States:** default, hover, active, focus-visible, disabled, loading. Hover is a 2–4 px translate or modest scale/rotation only; never color-only feedback.  
**Rules:** labels use verbs; icon-only button requires accessible name; no more than one primary button per local composition.

### Section Shell

**Anatomy:** surface layer → bounded container → optional decoration layer → content layer.  
**Variants:** `paper`, `mist`, `yellow`, `ink`.  
**Rules:** decoration is `aria-hidden`, cannot overlap focusable content, and cannot define layout dimensions. The content layer must preserve the global 4/8/12 column grid.

### Editorial Label

**Use:** eyebrow, annotation, category, step number.  
**Geometry:** 12–14 px uppercase/compact label; 0.08–0.14em tracking; optional yellow backing or sticker angle of ±2°.  
**Rule:** annotations reinforce hierarchy but cannot contain essential information missing from the main copy.

### Proof Module

**Use:** metric, named client, workflow item, service inclusion, dashboard preview.  
**Anatomy:** label → focal value/media → optional supporting context.  
**Variants:** `metric`, `logo`, `media`, `service`, `data`.  
**Rules:** use `radius.lg`; align internal padding at 20–32 px; one featured module per cluster; use supporting accent only on a subset of modules.

### Portfolio Tile

**Anatomy:** media ratio frame → category label → title/client → optional hover affordance.  
**Ratios:** landscape 4:3 / 16:10, portrait 3:4, square 1:1. Do not crop logos or proof detail irresponsibly.  
**States:** rest, hover/focus (subtle crop zoom or label reveal), selected only if filterable.  
**Rule:** masonry asymmetry belongs to the grid, not to unpredictable individual component dimensions.

### Accordion Row

**Use:** FAQ only.  
**Anatomy:** indexed/optional label → question button → affordance glyph → answer region.  
**Rules:** question is the sole interactive control; support roving focus by native document order; the open state uses `aria-expanded`; answer region is associated with the button. No nested button/link inside the trigger.  
**Visual behavior:** hairline separators; focus ring contrasts against paper/mist; plus-to-minus transformation is supplemental, not state-only.

### Filter Tab

**Use:** portfolio categories only.  
**Variants:** `default`, `active`, `focus`, `disabled`.  
**Rules:** control group uses native tab semantics only when it switches in-place panels; otherwise standard buttons with pressed state. Do not make chips smaller than 44 px target height.

### Media Frame

**Use:** dashboard preview, case-study visual, product mockup.  
**Variants:** `flat`, `stacked`, `tilted-accent`.  
**Rules:** frame establishes aspect ratio before media loads; crop target must be defined; rotations limited to ±3° desktop and 0° mobile. Any foreground UI/text stays at 0° for legibility.

### Footer Terminal

**Anatomy:** utility navigation cluster → contact/newsletter action → social links → legal row → oversized brand mark.  
**Rule:** the logo/wordmark is a visual finale, not the only available site identification.

## State and Accessibility Contract

Every interactive component MUST define:

1. Default and hover states
2. Keyboard focus-visible state with ≥3:1 focus-indicator contrast
3. Active/pressed state where relevant
4. Disabled and loading behavior where applicable
5. Reduced-motion behavior
6. Screen-reader name and semantic HTML responsibility

## Component Anti-Patterns

- A `Card` generic abstraction that erases the semantic difference between pricing, FAQ, proof, and portfolio.
- Clickable `<div>` patterns without keyboard behavior.
- Yellow body text on white with insufficient contrast.
- Hover-only portfolio metadata.
- Repeated 1 px gray borders used as the sole hierarchy mechanism.
- A large rounded radius applied to every element indiscriminately.

## References

- `.cursor/skills/puff-design-system/SKILL.md`
- `.cursor/skills/puff-layouts/SKILL.md`
- `.cursor/skills/puff-motion/SKILL.md`
