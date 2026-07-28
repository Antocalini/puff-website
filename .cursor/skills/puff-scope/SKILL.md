---
name: puff-scope
description: "Defines what puff-website repo IS and IS NOT — boundaries, phases, and forbidden actions. Trigger: any work in puff-website, scope questions, or before creating code/specs."
---

# Puff Repo — Scope & Boundaries

## Activation Contract

Load this skill **first** on any task in puff-website. It overrides default agent behavior. If a request conflicts with these boundaries, STOP and ask the user before proceeding.

## What This Repo IS

| In scope | Description |
|----------|-------------|
| Marketing site | Landing pública de Puff Cross Media (puffcrossmedia.com) |
| Conversión | Secciones que venden el modelo DaaS (pricing, FAQ, portfolio, testimonials) |
| Marca | Identidad visual, copy, tono — skill `puff-brand` |
| Planificación SDD | Artefactos en `openspec/` (explore, propose, spec, design, tasks) |
| Skills del proyecto | Convenciones en `.cursor/skills/` y `AGENTS.md` |
| CMS de contenido | Portfolio, FAQ, testimonials editables (cuando se elija stack) |

## What This Repo IS NOT

| Out of scope | Dónde vive (si existe) |
|--------------|------------------------|
| Client dashboard / portal | Repo separado — clientes envían briefs ahí |
| Backend de suscripciones / pagos | Stripe/billing — integración externa, no lógica de negocio aquí |
| Sistema de entrega de diseños | Operaciones internas del equipo Puff |
| CRM / ticketing | Herramienta externa (Notion, Linear, etc.) |
| App móvil | No aplica |
| Blog completo (v1) | Diferido — solo estructura seed si el usuario lo pide explícitamente |
| Multi-idioma (v1) | Diferido |
| Admin panel custom | Preferir CMS headless (Sanity u otro — **stack TBD**) |

## Current Phase: IMPLEMENTATION (Foundation complete)

```
[✓] Auditoría del sitio actual
[✓] SDD bootstrap (openspec/, skills base)
[✓] Definir skills y límites del repo
[✓] Decidir stack: Astro + Tailwind CSS
[✓] Escribir specs por sección
[✓] Definir arquitectura del prototipo
[✓] Desglosar tareas de implementación
[✓] Aprobar delivery strategy e implementación
[→] Implementar PR 2: Static Landing             ← ESTAMOS AQUÍ
[ ] Deploy / cutover
```

### Still Forbidden Until Explicit User Approval

- Elegir CMS definitivo
- Deploy o tocar DNS del sitio en producción
- Commits (salvo que el usuario lo pida)

## Decision Gates

| Request | Action |
|---------|--------|
| "Implementa X" | Check phase. If PLANNING → refuse gently, offer to update specs/skills instead |
| "Elige el stack" | Present options, do NOT decide autonomously |
| "Agrega sección Y" | Update exploration/proposal artifacts first; no code |
| New feature out of scope | Propose new repo or new openspec change; do not inline |
| Missing client content | Mark `[NEEDS CLIENT INPUT]` — never invent testimonials/logos reales |
| User says "todavía no" / "aún no" | Respect — stay in planning/skills mode |

## Repo Structure

```
puff-website/
├── AGENTS.md                 # Contrato del repo
├── .cursor/skills/           # Skills del proyecto
├── .atl/                     # Skill registry, testing capabilities
└── openspec/                 # Artefactos SDD (planning only)
```

El foundation ya creó `src/`, `package.json` y dependencias Astro/Tailwind. Mantener el trabajo dentro del work unit activo.

## Content Boundaries

- Copy visible: **inglés** (sitio target EN) — comunicación con usuario en **español**
- No inventar testimonios, logos de clientes, ni métricas ("500+ brands")
- Placeholders permitidos solo si están marcados explícitamente
- Pricing tiers actuales son referencia — cambios requieren confirmación del cliente

## Quality Bar (for when implementation starts)

- WCAG AA mínimo
- Lighthouse ≥ 90 mobile/desktop
- Zero typos en copy visible
- Brand yellow preserved — ver `puff-brand`

## References

- Audit: `openspec/changes/puff-redesign/exploration.md`
- Brand: `.cursor/skills/puff-brand/SKILL.md`
- SDD rules: `.cursor/skills/puff-sdd/SKILL.md`
