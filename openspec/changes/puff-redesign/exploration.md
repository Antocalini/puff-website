# Exploration: Puff Cross Media — Auditoría pre-redesign

> Fuente: https://puffcrossmedia.com/ + captura full-page (jul 2026)
> Change: `puff-redesign` | Fase: explore

---

## 1. Mapa de secciones actuales

El sitio es una **landing page de scroll único** (SPA visual). La navegación apunta a anclas; rutas como `/how-it-works`, `/plans` y `/portfolio` devuelven **404**.

| # | Sección | Fondo | Contenido principal | CTA |
|---|---------|-------|---------------------|-----|
| 1 | **Header / Nav** | Blanco | Logo "PUFF CROSS MEDIA", links: Home, How it works, Plans, Portfolio | — |
| 2 | **Hero** | Blanco | H1: "Your on-demand design team. Fast, easy and unlimited." + explicación DaaS + entrega 48h | "Start your subscription" |
| 3 | **Proceso (How it works)** | Amarillo | H2: "Designs at your pace without complications." + 3 pasos numerados | "Get started now" |
| 4 | **Planes y pricing** | Blanco | 4 columnas: Graphic Lite ($500), Graphic ($1000), Web ($1500), Video ($1500) | "Join Now" por plan |
| 5 | **Promo bar** | Amarillo | "Try Puff free for 7 days + 20% OFF for 3 months" | — |
| 6 | **Beneficios (Why Puff)** | Gris | 6 iconos: ideas ilimitadas, ritmo propio, diseñadores, revisiones, soporte, calidad | — |
| 7 | **Portfolio** | Amarillo claro | 4 imágenes estáticas (letrero, tazas, stickers, tarjetas) | — |
| 8 | **Footer CTA** | Amarillo | "Your design team in just one click away" + trial 7 días | "Start your subscription" |
| 9 | **Footer info** | Amarillo | Logo + redes (Facebook, email, Instagram) + ilustraciones squiggle | — |

### Flujo visual

```
Nav → Hero (propuesta de valor)
    → Proceso (3 pasos)
    → Pricing (4 tiers)
    → Beneficios (6 features)
    → Portfolio (4 items)
    → Footer CTA + social
```

### Identidad visual

- **Paleta:** Amarillo taxi-cab dominante, blanco, negro, gris neutro
- **Tipografía:** Sans-serif bold en headers; fuente decorativa/hand-drawn para énfasis
- **Ilustraciones:** Líneas squiggle amarillas, manos cartoon (hang loose, peace sign), engranajes
- **Tono:** Profesional pero lúdico, alta energía

---

## 2. Auditoría UX / contenido / conversión

### Lo que funciona

| Aspecto | Detalle |
|---------|---------|
| Propuesta clara | "Design-as-a-Service" se entiende en 5 segundos |
| Pricing transparente | 4 tiers con precio fijo mensual — reduce fricción vs. cotización |
| Proceso simple | 3 pasos fáciles de escanear |
| CTAs repetidos | Hero, proceso, footer — buena práctica de conversión |
| Trial + descuento | 7 días gratis + 20% 3 meses reduce riesgo percibido |
| Identidad memorable | El amarillo + ilustraciones son diferenciables |

### Problemas detectados

#### Críticos (bloquean conversión top-tier)

| # | Problema | Impacto |
|---|----------|---------|
| C1 | **Cero prueba social** — no hay testimonios, logos de clientes, métricas ("500+ brands"), ni case studies | Sin trust = baja conversión en tickets $500–1500/mo |
| C2 | **Portfolio mínimo** — 4 fotos de print/branding; no muestra web, video ni UI/UX prometidos en pricing | Desalineación entre lo que venden y lo que demuestran |
| C3 | **Dashboard invisible** — mencionan "send briefs from your dashboard" pero no hay screenshot, demo ni video | Objeción #1: "¿cómo funciona por dentro?" |
| C4 | **Sin FAQ** — no responde objeciones (¿qué es un "project"?, ¿pausa?, ¿propiedad intelectual?, ¿zona horaria?) | Aumenta abandono en pricing |
| C5 | **Errores de copy** — "deisgn", "One Reques at a time", nombres inconsistentes (Lite/Pro/Premium vs Graphic Lite/Graphic/Web/Video) | Percepción de baja calidad |
| C6 | **Rutas rotas** — nav apunta a URLs que 404 | SEO roto, links compartibles inexistentes |

#### Importantes (limitan posicionamiento premium)

| # | Problema | Impacto |
|---|----------|---------|
| I1 | **Sin comparativa** vs agencia tradicional / freelancer / in-house | No justifica el premium |
| I2 | **Sin sección "Team"** — no se ven diseñadores reales | Commodity vs. relación humana |
| I3 | **Sin SLA detallado** — "48h" y "24/5 support" sin definición operativa | Expectativas mal alineadas → churn |
| I4 | **Sin contenido SEO** — no blog, recursos, ni páginas de servicio | Tráfico orgánico = 0 |
| I5 | **Accesibilidad dudosa** — texto blanco sobre amarillo brillante en footer | WCAG AA probablemente falla |
| I6 | **Headline repetido** — "Designs at your pace..." aparece 2 veces | Sensación de contenido duplicado |
| I7 | **Sin páginas legales** — privacy policy, terms of service | Requisito para SaaS/subscription |
| I8 | **Sin chat en vivo** — prometen soporte 24/5 pero no hay widget visible | Desconfianza |

#### Nice-to-have (sitio top tier)

| # | Gap | Referencia competencia |
|---|-----|------------------------|
| N1 | Calculadora ROI / "vs hiring in-house" | Design Pickle |
| N2 | Integraciones (Slack, Trello, Asana, Figma) | ManyPixels |
| N3 | Video hero o Lottie animado del flujo | Superside |
| N4 | Página de case study individual con before/after | Penji |
| N5 | Programa de referidos | — |
| N6 | Multi-idioma (EN/ES) | Mercado LATAM potencial |
| N7 | Trust badges (Stripe, SOC2 si aplica) | — |

---

## 3. Auditoría del modelo de negocio

### Tipo de modelo

**Productized Service / Design-as-a-Service (DaaS)** — suscripción mensual con entregables creativos bajo demanda.

```
Cliente paga MRR fijo → envía briefs vía dashboard → equipo dedicado entrega en 48h
```

Comparable a: **Design Pickle**, **ManyPixels**, **Penji**, **Kimp**, **Superside** (enterprise).

### Revenue streams

| Stream | Detalle |
|--------|---------|
| **MRR principal** | $500 / $1000 / $1500 por mes según tier |
| **Upsell implícito** | Web y Video a $1500 vs Graphic a $1000 |
| **Promo de adquisición** | 7-day free trial + 20% off 3 meses |
| **Print discount** | 25–50% off en impresión (posible revenue share con print partner) |
| **Churn management** | "Pause or cancel anytime" — flexibilidad como feature |

### Estructura de tiers

| Plan | Precio | Diferenciador clave | Límite |
|------|--------|---------------------|--------|
| Graphic Lite | $500/mo | Solo gráfico, básico | 10 projects, 1 request at a time |
| Graphic | $1000/mo | Gráfico + Web | 20 projects, 1 request at a time |
| Web | $1500/mo | Full stack diseño | Unlimited projects, simultaneous requests |
| Video | $1500/mo | Gráfico + Video editing | Unlimited projects, simultaneous requests |

### Unit economics (hipótesis)

| Variable | Análisis |
|----------|----------|
| **COGS** | Salario diseñadores ÷ clientes por diseñador (ratio típico DaaS: 1:3 a 1:5) |
| **Margen bruto objetivo** | 60–70% (estándar industria DaaS) |
| **CAC** | Trial de 7 días = costo de onboarding + diseño gratis |
| **LTV** | Si retención media 8–12 meses → LTV $4000–$18000 según tier |
| **Churn risk** | Alto si expectativas de "unlimited" chocan con "one request at a time" en tiers bajos |

### Fortalezas del modelo

1. **Ingresos recurrentes predecibles** — MRR vs. proyecto a proyecto
2. **Barrera de entrada baja** — $500/mo vs. $5k+ agencia
3. **Escalabilidad** — mismo equipo atiende múltiples clientes con cola
4. **Diferenciación por velocidad** — 48h es el moat operativo
5. **Flexibilidad** — pause/cancel reduce fricción de compra

### Debilidades / riesgos

| Riesgo | Severidad | Mitigación sugerida |
|--------|-----------|---------------------|
| **Commoditización** — muchos competidores DaaS | Alta | Nicho vertical (e-commerce, SaaS, restaurants) o calidad premium |
| **Definición vaga de "project"** | Alta | Página dedicada con ejemplos: "1 project = 1 social post OR 1 banner" |
| **Scope creep** — "unlimited revisions" | Media | Política clara en FAQ + fair use policy |
| **Tier confusion** — 4 planes con overlap | Media | Matriz comparativa visual + recomendador |
| **Dependencia de talento** — diseñadores = COGS | Media | Playbooks, templates, AI-assisted workflow |
| **Sin lock-in** — pause/cancel anytime | Baja (feature) | Onboarding sticky + integraciones |
| **Print revenue no escalable** | Baja | Tratarlo como perk, no core |

### Oportunidades de mejora del modelo (para el redesign)

1. **Annual billing discount** — 2 meses gratis al pagar anual (mejora cash flow)
2. **Add-ons** — rush delivery (+$), extra simultaneous slot, brand strategy session
3. **Enterprise tier** — white-label, SLA dedicado, account manager
4. **Referral program** — 1 mes gratis por referido convertido
5. **Vertical landing pages** — /for-saas, /for-restaurants con portfolio filtrado

---

## 4. Benchmark: qué tienen los sitios top del nicho

| Elemento | Design Pickle | ManyPixels | Puff (actual) |
|----------|-------------|------------|---------------|
| Testimonials | ✅ Carousel + video | ✅ Con foto y cargo | ❌ |
| Client logos | ✅ 50+ marcas | ✅ Grid de logos | ❌ |
| Portfolio filtrable | ✅ Por categoría | ✅ Con filtros | ❌ (4 imgs) |
| Dashboard preview | ✅ Screenshots + tour | ✅ GIF animado | ❌ |
| FAQ extenso | ✅ 20+ preguntas | ✅ Accordion | ❌ |
| Case studies | ✅ Páginas dedicadas | ✅ Before/after | ❌ |
| Blog / recursos | ✅ SEO content | ✅ Design tips | ❌ |
| Comparativa vs alternativas | ✅ Tabla | ✅ vs freelancer | ❌ |
| Live chat | ✅ Intercom | ✅ Crisp | ❌ |
| Pricing calculator | ✅ | ❌ | ❌ |
| Integraciones | ✅ Slack, Asana | ✅ Trello, Slack | ❌ |

---

## 5. Secciones recomendadas para el redesign

### Must-have (MVP redesign)

```
1.  Hero (refinado + social proof snippet)
2.  Logo bar (clientes)
3.  How it works (3 pasos + dashboard preview)
4.  Pricing (matriz comparativa clara)
5.  What's included (definición de "project")
6.  Portfolio (filtrable: graphic / web / video)
7.  Testimonials
8.  FAQ
9.  Final CTA
10. Footer (legal links, social, contact)
```

### Should-have (v1.1)

```
11. Case study destacado (1 hero case)
12. Team / "Meet your designers"
13. Comparison table (Puff vs Agency vs Freelancer)
14. Integrations strip
15. Blog / Resources (3–5 artículos seed)
```

### Could-have (v2)

```
16. ROI calculator
17. Vertical landing pages
18. Referral program page
19. Enterprise / custom plan
20. Multi-language
```

---

## 6. Affected Areas

| Area | Impacto | Descripción |
|------|---------|-------------|
| `openspec/specs/` | New | Specs por capability (hero, pricing, portfolio, etc.) |
| Stack del proyecto | New | Greenfield — elegir framework |
| `.cursor/skills/puff-brand/` | New | Skill de identidad de marca |
| `.cursor/skills/puff-redesign/` | New | Skill de workflow de redesign |
| CMS (opcional) | New | Sanity/Contentful para portfolio, testimonials, FAQ |

---

## 7. Approaches para el stack

| Approach | Pros | Cons | Effort |
|----------|------|------|--------|
| **A: Next.js + Tailwind + Sanity CMS** | SSR/SSG, SEO, CMS flexible para portfolio/FAQ | Más setup inicial | Medium |
| **B: Astro + Tailwind + MDX** | Ultra rápido, ideal landing | CMS manual, menos dinámico | Low |
| **C: Framer/Webflow** | Diseño rápido, no-code | Menos control, vendor lock-in | Low |

### Recommendation

**Approach A (Next.js + Tailwind + Sanity)** — balance entre performance, SEO, CMS para contenido que cambia (portfolio, testimonials, pricing) y escalabilidad futura (dashboard link, blog).

---

## 8. Risks

- **Scope creep** — el redesign puede crecer indefinidamente; acotar a MVP must-have primero
- **Contenido faltante** — sin testimonials/logos reales del cliente, las secciones quedarán vacías
- **Brand dilution** — elevar "premium" sin perder la personalidad lúdica amarilla
- **Definición de "project"** — requiere input del negocio, no solo diseño

---

## Ready for Proposal

**Yes** — la auditoría está completa. Siguiente paso: `sdd-propose` → `puff-redesign/proposal.md` con scope MVP del redesign.
