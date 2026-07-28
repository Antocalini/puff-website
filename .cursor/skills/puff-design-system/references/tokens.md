# Puff Design Tokens

These values are design-system contracts. Exact framework syntax is intentionally deferred until stack selection.

## Color

| Token | Value | Intended use |
|---|---|---|
| `color.brand.yellow` | `#FFD100` | Primary signal, conversion CTA, highlight field |
| `color.brand.yellow-hover` | `#E6BC00` | Hover/pressed yellow |
| `color.ink` | `#1A1A1A` | Primary type, anchor surface, iconography |
| `color.paper` | `#FFFFFF` | Base canvas, inverse card |
| `color.mist` | `#F5F5F2` | Quiet alternate canvas |
| `color.graphite` | `#5F5F5B` | Secondary readable text |
| `color.line` | `#D9D9D4` | Dividers and quiet borders |
| `color.accent.cobalt` | `#2447F5` | Navigational/editorial signal, max 1 cluster |
| `color.accent.lime` | `#C7F72B` | Gesture overlay, callout, max 1 cluster |
| `color.accent.pink` | `#F091F2` | Playful supporting tile, max 1 cluster |
| `color.accent.lavender` | `#C9CCF6` | Soft data tile/media ground |

### Color constraints

- Ink on yellow is preferred for copy and controls.
- Paper on ink is permitted for display copy; yellow may punctuate a maximum of 20% of the visual field.
- Paper on yellow is reserved for display text ≥24 px and semibold/bold after contrast verification.
- Accent colors cannot encode status alone; pair them with labels, icons, or shape.

## Typography

| Token | Desktop | Mobile | Line-height | Role |
|---|---:|---:|---:|---|
| `type.display-2xl` | clamp(72px, 10vw, 172px) | 56px | 0.82–0.90 | Terminal wordmark / manifesto |
| `type.display-xl` | clamp(56px, 7vw, 112px) | 48px | 0.86–0.94 | Hero statement |
| `type.display-lg` | clamp(42px, 5vw, 76px) | 38px | 0.92–1.00 | Section statement |
| `type.h1` | 48–64px | 36–44px | 0.98–1.06 | Standard page heading |
| `type.h2` | 32–44px | 28–34px | 1.00–1.12 | Section heading |
| `type.body-lg` | 18px | 16px | 1.50 | Lead/supporting copy |
| `type.body` | 16px | 16px | 1.55 | Standard paragraph |
| `type.label` | 12–14px | 12px | 1.15 | Labels, nav, pricing metadata |

## Spacing

Use a 4 px base unit. No unscaled gaps except optical corrections adjacent to display type or hand-drawn assets.

| Token | Value | Typical role |
|---|---:|---|
| `space.1` | 4px | Icon-to-label micro-gap |
| `space.2` | 8px | Compact control internal gap |
| `space.3` | 12px | Metadata grouping |
| `space.4` | 16px | Default component padding |
| `space.5` | 20px | Mobile card padding |
| `space.6` | 24px | Standard grid gap |
| `space.8` | 32px | Card / small cluster gap |
| `space.10` | 40px | Subsection separation |
| `space.12` | 48px | Desktop module gap |
| `space.16` | 64px | Mobile section separation |
| `space.20` | 80px | Desktop section separation |
| `space.24` | 96px | Major desktop section separation |
| `space.32` | 128px | Manifesto/terminal separation |

## Shape and elevation

| Token | Value | Use |
|---|---:|---|
| `radius.sm` | 8px | Tags, compact controls |
| `radius.md` | 16px | Cards, FAQ rows |
| `radius.lg` | 24px | Media frames, feature modules |
| `radius.xl` | 32px | Large rounded utility panels |
| `radius.pill` | 999px | CTAs, filter chips, status |
| `border.hairline` | 1px solid `color.line` | Quiet division only |
| `shadow.ambient` | 0 20px 60px rgb(26 26 26 / 10%) | Floating dialog/media overlay only |

Avoid default `shadow-md`-style box shadows. Favor surface contrast, rhythm, and overlap.

## Layout

| Token | Value |
|---|---|
| `layout.max-content` | 1440px |
| `layout.max-reading` | 680px |
| `layout.max-narrow` | 520px |
| `layout.gutter-mobile` | 20–24px |
| `layout.gutter-tablet` | 32–40px |
| `layout.gutter-desktop` | 48–64px |
| `layout.grid-gap` | 24px mobile / 32px desktop |

## Motion

| Token | Value | Use |
|---|---|---|
| `motion.quick` | 140ms | Hover feedback |
| `motion.standard` | 220ms | Buttons, controls, cards |
| `motion.reveal` | 460ms | Section entry |
| `motion.editorial` | 680ms | Hero/statement choreography |
| `ease.out` | cubic-bezier(.22, 1, .36, 1) | Default entrance |
| `ease.in-out` | cubic-bezier(.65, 0, .35, 1) | Controlled transforms |
