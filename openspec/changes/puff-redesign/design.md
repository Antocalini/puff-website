# Design: Puff Cross Media — Redesign MVP

## Technical Approach

Landing de marketing estática primero con Astro y Tailwind CSS cuando se autorice el scaffold. La estructura, SEO y secciones no interactivas se entregarán como HTML; solo FAQ, filtros de portfolio y runtime de motion podrán ser islas cliente acotadas. El contenido local estructurado será intercambiable por un adaptador CMS futuro (TBD). La dirección combina el trust y claridad comparativa de Design Pickle/ManyPixels con la escala editorial de Puff; no replica sus productos ni afirma datos sin aprobación.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Render | Astro static-first | SPA hidratada | Reduce JS inicial y protege SEO, LCP y Lighthouse ≥90. |
| Client islands | Solo FAQ, filtros y motion justificable | Hidratar la página completa | Conserva HTML accesible; cada isla tiene motivo y límite verificable. |
| Content | Módulos tipados locales + adapter CMS futuro | CMS decidido ahora | El flujo editorial aún no está aprobado; evita acoplamiento prematuro. |
| Motion | Un runtime Lenis + GSAP + ScrollTrigger | RAF por sección u otra librería | Un reloj compartido evita drift y trabajo duplicado. |
| Accessibility | HTML nativo primero; JS progresivo | Controles `div` personalizados | Mantiene teclado, foco, hash links y fallback sin JS. |
| Media | Frames con dimensiones/ratio reservados | Carga sin geometría definida | Evita CLS y permite imágenes diferidas bajo el fold. |
| Responsive | Flujo móvil primero; composición editorial solo ≥768 px | Reordenamientos visuales arbitrarios | Conserva orden semántico y evita overflow en 320 px. |
| Art direction | Club-poster editorial: headline monumental, grilla técnica, marker gestures y panel blanco superpuesto | Tarjetas SaaS simétricas | La referencia aprobada exige mayor energía, jerarquía y memorabilidad; Puff conserva amarillo como color de señal y usa cobalt solo como acento estructural. |

## Data Flow

```text
[NEEDS CLIENT INPUT] assets/copy
             │
             v
  content modules ──> Astro sections ──> static HTML + metadata
             │                 │
             │                 ├──> native links / media frames
             │                 └──> isolated client islands
             │                              │
             └── CMS adapter (future, TBD)  ├── FAQ/filter state
                                            └── motion runtime
                                                 Lenis event → ScrollTrigger.update
                                                 GSAP ticker → Lenis.raf()
```

For normal motion, the runtime registers plugins once, uses `autoRaf: false`, disables ticker lag smoothing, scopes and cleans up listeners/timelines on disposal, and refreshes only after font/media, breakpoint, filter, or relevant disclosure changes. With `prefers-reduced-motion`, it uses native scroll and final visible states: no Lenis, scrub, pin, loop, or stagger.

## File Changes

| File | Action | Description |
|---|---|---|
| `openspec/changes/puff-redesign/design.md` | Create | Diseño técnico de esta fase. |
| `openspec/changes/puff-redesign/state.yaml` | Modify | Registrar phase `design` y artefacto creado. |
| `src/pages/index.astro` | Create (future) | Ensambla landing y metadata estáticas. |
| `src/layouts/BaseLayout.astro` | Create (future) | Shell, landmarks y metadata base. |
| `src/components/sections/{Hero,Process,Pricing,Portfolio,Testimonials,Faq,Cta}.astro` | Create (future) | Secciones estáticas y su composición. |
| `src/components/{SiteHeader,SiteFooter,MediaFrame}.astro` | Create (future) | Reutilizables semánticos. |
| `src/content/landing.ts` | Create (future) | Contenido tipado y marcadores aprobables. |
| `src/scripts/{portfolio-filter,motion-runtime}.ts` | Create (future) | Islas puntuales; runtime centralizado. |
| `src/pages/{privacy,terms}.astro` | Create (future) | Destinos legales con texto aprobado. |

## Interfaces / Contracts

```ts
type Approval<T> = T | "[NEEDS CLIENT INPUT]";
type PortfolioItem = {
  category: "graphic" | "web" | "video";
  title: Approval<string>; media: Approval<{ src: string; alt: string }>;
};
type MotionRuntime = { start(): void; destroy(): void };
```

Las CTAs solo aceptarán destinos aprobados y nunca iniciarán pago, autenticación ni portal. Los testimonios, logos, precios, definición de project, SLA, activos, copy legal y CTA permanecen `[NEEDS CLIENT INPUT]` hasta aprobación.

## Testing Strategy

| Layer | What to test | Approach |
|---|---|---|
| Unit | Contratos de contenido, filtro y estados | No tooling actual; definir tras scaffold. |
| Integration | Islas, anclas, fallback sin JS, lifecycle motion | Validación de navegador tras scaffold. |
| E2E/a11y | Teclado, 320 px, reduced motion, no 404, WCAG AA | Añadir runner y auditoría Lighthouse ≥90 post-scaffold. |

No hay runner, linter, type checker, formatter ni cobertura configurados; este diseño no los instala.

## Migration / Rollout

No migration required. Es greenfield: no se modifica producción, DNS ni el sitio actual. El cutover futuro será explícitamente aprobado; rollback será revertir el despliegue/commit del nuevo sitio.

## Open Questions

- [ ] ¿Qué CMS y flujo editorial se aprueban, si alguno?
- [ ] Entregar logo SVG, fuentes, ilustraciones, portfolio, dashboard preview, logos y testimonios autorizados.
- [ ] Aprobar precios, definición de project, SLA, CTA/trial, copy final y textos legales.
- [ ] Confirmar destinos externos de CTA y canonical/Organization metadata.
- [ ] Aprobar scaffold y tooling antes de pasar a implementación.
