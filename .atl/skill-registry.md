# Skill Registry — puff-website

Last updated: 2026-07-22
Phase: **PLANNING** (skills + boundaries only)

## Loading order

```
1. puff-scope          ← siempre (límites del repo)
2. puff-brand          ← identidad Puff (override externas si hay conflicto)
3. puff-design-system  ← tokens, type scale, grid y superficies
4. puff-layouts        ← si defines composición de una sección
5. puff-components     ← si defines un componente reutilizable
6. puff-motion         ← si defines movimiento o interacción
7. puff-clean-code     ← si implementas o revisas Astro/Tailwind
8. puff-sdd            ← si tocas openspec/
9. [imported skills]   ← según tarea (ver abajo)
```

**Regla de conflicto:** Las skills `puff-*` tienen prioridad sobre skills importadas. El amarillo playful de Puff NO se reemplaza por estéticas dark/glass de skills externas.

---

## Project Skills (`.cursor/skills/`)

| Skill | Trigger | Path |
|-------|---------|------|
| `puff-scope` | Cualquier trabajo en repo | `.cursor/skills/puff-scope/SKILL.md` |
| `puff-sdd` | Artefactos openspec | `.cursor/skills/puff-sdd/SKILL.md` |
| `puff-brand` | UI, copy, marca | `.cursor/skills/puff-brand/SKILL.md` |
| `puff-design-system` | Tokens, tipografía, color, grids, superficies | `.cursor/skills/puff-design-system/SKILL.md` |
| `puff-layouts` | Arquitectura de secciones y responsive composition | `.cursor/skills/puff-layouts/SKILL.md` |
| `puff-components` | Anatomía, variantes y estados de componentes | `.cursor/skills/puff-components/SKILL.md` |
| `puff-motion` | Motion, microinteracciones, reduced motion | `.cursor/skills/puff-motion/SKILL.md` |
| `puff-clean-code` | Convenciones Astro, Tailwind, islas cliente y mantenibilidad | `.cursor/skills/puff-clean-code/SKILL.md` |

## Imported Skills (`.agents/skills/`) — pendiente adaptar

| Skill | Source | Trigger | Path | Security |
|-------|--------|---------|------|----------|
| `web-design-guidelines` | vercel-labs/agent-skills | Review UI, a11y, audit UX | `.agents/skills/web-design-guidelines/SKILL.md` | Safe |
| `ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill | UI structure, color, typography, layout, a11y | `.agents/skills/ui-ux-pro-max/SKILL.md` | ⚠️ Gen: High Risk |
| `design-taste-frontend` | leonxlnx/taste-skill | Landing/redesign anti-slop, brief inference | `.agents/skills/design-taste-frontend/SKILL.md` | Safe |
| `high-end-visual-design` | leonxlnx/taste-skill | Visual polish, motion, premium layouts | `.agents/skills/high-end-visual-design/SKILL.md` | Safe |

## Cuándo cargar cada imported skill

| Tarea | Skills |
|-------|--------|
| Auditar UI existente / a11y | `web-design-guidelines` |
| Elegir palette, fonts, layout patterns | `ui-ux-pro-max` |
| Rediseño landing (evitar AI slop) | `design-taste-frontend` + `puff-brand` |
| Motion, micro-interactions, polish | `high-end-visual-design` + `puff-brand` |
| Review pre-deploy | `web-design-guidelines` + `puff-a11y` (futura) |

## User Skills (cuando avance implementación)

| Skill | Path |
|-------|------|
| `frontend-design` | `C:\Users\Antx\.claude\skills\frontend-design\SKILL.md` |
| `ui-animation` | `C:\Users\Antx\.agents\skills\ui-animation\SKILL.md` |
| `sdd-*` | `C:\Users\Antx\.cursor\skills\sdd-*/SKILL.md` |

## Pendiente crear (puff-*)

- `puff-sections` — contrato por sección de landing
- `puff-content` — copy DaaS, CTAs, terminología
- `puff-a11y` — reglas WCAG específicas Puff (amarillo)
- `puff-seo` — meta, structured data
- `puff-motion` — motion acotado a marca playful

## Adaptación pendiente

Las imported skills son **base genérica**. Hay que crear wrappers o reglas en `puff-brand` / `puff-design-system` que:

1. Preserven amarillo `#FFD100` como primary (high-end-visual empuja dark/glass)
2. Mantengan ilustraciones hand-drawn (taste-skill empuja minimal/editorial)
3. Respeten fase PLANNING (no generar código aún)
4. Usen `ui-ux-pro-max` solo como consulta (CSV/scripts), no como fuente de verdad de marca
