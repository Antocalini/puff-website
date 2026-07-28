# AGENTS.md — puff-website

> Contrato del repositorio. Leer antes de cualquier acción.

## Fase actual: IMPLEMENTATION — PR 2 Static Landing complete

La estrategia `stacked-to-main` está aprobada. Aplicar un work unit por vez; no hacer deploy, DNS ni commits sin instrucción explícita.

Package manager: **Yarn 1.22.22**. Usar `yarn`; no ejecutar `npm install`, `npx` ni mantener `package-lock.json`.

## Proyecto

Rediseño del sitio marketing de [Puff Cross Media](https://puffcrossmedia.com/) — modelo Design-as-a-Service.

## Skills (cargar en este orden)

| Orden | Skill | Cuándo |
|-------|-------|--------|
| 1 | `puff-scope` | Siempre — límites del repo |
| 2 | `puff-brand` | Decisiones de UI/copy/marca (override skills importadas) |
| 3 | `puff-design-system` | Tokens, tipografía, grid, superficies |
| 4 | `puff-layouts` | Layout de secciones y responsive composition |
| 5 | `puff-components` | Componentes reutilizables y estados |
| 6 | `puff-motion` | Animación e interacción |
| 7 | `puff-clean-code` | Implementación/review Astro + Tailwind |
| 8 | `puff-sdd` | Al tocar `openspec/` |
| 9+ | Imported skills | Según tarea — ver registry |

### Imported (`.agents/skills/`) — descargadas, pendiente adaptar

| Skill | Uso |
|-------|-----|
| `web-design-guidelines` | Audit a11y / UX (Vercel) |
| `ui-ux-pro-max` | Inteligencia UI: color, typo, layout |
| `design-taste-frontend` | Anti-slop, brief inference, redesigns |
| `high-end-visual-design` | Polish visual, motion, layouts premium |

Registry completo: `.atl/skill-registry.md`

## Límites del repo

### ✅ Pertenece aquí

- Landing marketing pública
- Secciones de conversión (hero, pricing, FAQ, portfolio, testimonials)
- Artefactos SDD de planificación
- Skills y convenciones del proyecto

### ❌ NO pertenece aquí

- Dashboard / portal de clientes
- Pagos / suscripciones (Stripe logic)
- Sistema de entrega de diseños
- CRM / ticketing
- Blog completo (v1)
- Multi-idioma (v1)

## Prohibido sin aprobación explícita

- Deploy / DNS
- Commits

## Comunicación

- Con el usuario: **español**
- Copy del sitio: **inglés**

## SDD

Change activo: `puff-redesign`

| Artefacto | Path | Estado |
|-----------|------|--------|
| Auditoría | `openspec/changes/puff-redesign/exploration.md` | Done |
| Propuesta | `openspec/changes/puff-redesign/proposal.md` | Draft — revisar |
| Specs | `openspec/specs/` | Done — 10 capabilities |
| Design | `openspec/changes/puff-redesign/design.md` | Done |
| Tasks | `openspec/changes/puff-redesign/tasks.md` | Done — apply gated |

Stack decidido: **Astro + Tailwind CSS**. Renderizar estático por defecto; usar islas de JavaScript solo para interacción necesaria. CMS: **TBD**.

Motion runtime decidido para cuando se apruebe implementación: **Lenis + GSAP + ScrollTrigger**. No instalar dependencias hasta que cambie la fase.

## Estructura permitida (fase actual)

```
puff-website/
├── AGENTS.md
├── .cursor/skills/          # Skills propias puff-*
│   ├── puff-design-system/
│   ├── puff-layouts/
│   ├── puff-components/
│   ├── puff-motion/
│   └── puff-clean-code/
├── .agents/skills/          # Skills importadas (npx skills add)
│   ├── web-design-guidelines/
│   ├── ui-ux-pro-max/
│   ├── design-taste-frontend/
│   └── high-end-visual-design/
├── .atl/
└── openspec/
```
