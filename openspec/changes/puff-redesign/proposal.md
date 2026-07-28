# Proposal: Puff Cross Media — Redesign MVP

> **Status: DRAFT** — sujeto a revisión. No avanzar a specs/implementación hasta aprobación explícita.

## Intent

Rediseñar puffcrossmedia.com de una landing básica a un sitio de conversión top-tier para el modelo Design-as-a-Service, cerrando gaps críticos de trust (social proof, portfolio, FAQ, dashboard preview) sin perder la identidad visual amarilla/playful.

## Scope

### In Scope

- Bootstrap del repo (stack, SDD, skills de proyecto)
- 10 secciones MVP (hero → footer con legal)
- Matriz de pricing clara con definición de "project"
- Portfolio filtrable (graphic / web / video)
- FAQ con 15+ preguntas
- Sección de testimonials + logo bar (estructura lista; contenido del cliente)
- Preview del dashboard (screenshot/mockup)
- Páginas legales (privacy, terms)
- Accesibilidad WCAG AA
- Lighthouse ≥ 90 mobile/desktop
- SEO base (meta, OG, sitemap, structured data)

### Out of Scope

- Dashboard funcional (client portal)
- Blog completo (solo estructura seed)
- Multi-idioma
- ROI calculator
- Enterprise tier
- Integraciones reales (Slack, etc.)
- Sistema de pagos / checkout

## Capabilities

### New Capabilities

- `site-shell`: Layout, nav, footer, routing, SEO base
- `hero-section`: Hero con propuesta de valor + social proof snippet
- `process-section`: 3 pasos + dashboard preview
- `pricing-section`: 4 tiers con matriz comparativa
- `portfolio-section`: Grid filtrable con categorías
- `testimonials-section`: Carousel/grid de testimonios + logo bar
- `faq-section`: Accordion con objeciones comunes
- `cta-section`: Footer CTA + trial promo
- `legal-pages`: Privacy policy, Terms of service
- `brand-system`: Tokens de diseño (color, typo, spacing, illustrations)

### Modified Capabilities

- None (greenfield)

## Approach

Astro + Tailwind CSS para una landing estática por defecto, con islas de JavaScript solo para interacciones justificadas. Lenis + GSAP/ScrollTrigger gestionarán smooth scroll y coreografía con una única RAF compartida. El CMS es TBD: no se selecciona hasta confirmar el flujo editorial. Preservar identidad amarilla/playful, elevar tipografía, spacing y trust signals; mobile-first y componentes reutilizables.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `/` (root) | New | Scaffold Astro + Tailwind (cuando se autorice) |
| `src/components/sections/` | New | 10 section components (.astro por defecto) |
| `src/scripts/` | New | Islas cliente y runtime Lenis/GSAP aislado |
| `src/content/` | New | Contenido local o adapter CMS TBD |
| `.cursor/skills/puff-brand/` | New | Brand guidelines skill |
| `openspec/specs/` | New | Specs por capability |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Contenido real no disponible (logos, quotes) | High | Placeholders + CMS listo para swap |
| Brand demasiado "corporate" | Med | Skill puff-brand con constraints |
| Scope creep | High | MVP estricto; v1.1 en change separado |

## Rollback Plan

Repo greenfield — rollback = revert commits. Sitio actual en producción no se toca hasta cutover explícito con DNS/domain switch.

## Dependencies

- Assets de marca del cliente (logo SVG, ilustraciones, fotos portfolio)
- Copy definitivo para pricing y FAQ (input del negocio)
- Testimonials y logos de clientes (mínimo 3–5)

## Success Criteria

- [ ] 10 secciones MVP implementadas y responsive
- [ ] Lighthouse mobile ≥ 90, desktop ≥ 90
- [ ] WCAG AA en contraste y navegación por teclado
- [ ] FAQ responde top 15 objeciones del modelo DaaS
- [ ] Portfolio filtrable con ≥ 12 items (4 por categoría mínimo)
- [ ] CMS permite editar portfolio, FAQ y testimonials sin deploy
- [ ] 0 typos en copy visible
- [ ] Structured data (Organization + Product/Offer) validado
