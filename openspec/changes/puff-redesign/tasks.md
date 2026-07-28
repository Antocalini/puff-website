# Tasks: Puff Cross Media — Redesign MVP

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | 900–1,250 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | Foundation → static landing → islands/quality |
| Delivery strategy | ask-on-risk |
| Chain strategy | stacked-to-main |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|---|---|---|---|
| 1 | Foundation/content | PR 1 | Autonomous; validates build. |
| 2 | Static sections/legal | PR 2 | Autonomous; follows PR 1. |
| 3 | Islands/quality | PR 3 | Autonomous; follows PR 2. |

## Phase 1: Approval and Content Gate

- [ ] 1.1 Obtain `[NEEDS CLIENT INPUT]` logo, fonts, assets and portfolio media/alt text; record sources in `src/content/landing.ts`.
- [ ] 1.2 Obtain `[NEEDS CLIENT INPUT]` approved dashboard screenshot/mockup and descriptive alternative for `src/components/sections/Process.astro`; verify it implies no portal behavior.
- [ ] 1.3 Obtain `[NEEDS CLIENT INPUT]` authorized client logos, testimonials, attributions and permissions for `Testimonials.astro`; omit unavailable proof.
- [ ] 1.4 Obtain `[NEEDS CLIENT INPUT]` tiers, “project”, SLA, FAQ, trial and CTA destinations for `landing.ts`.
- [ ] 1.5 Obtain `[NEEDS CLIENT INPUT]` canonical URL, Organization data, social/contact URLs, Privacy Policy and Terms text for `BaseLayout.astro` and legal routes.

## Phase 2: Scaffold and Foundation (after approval)

- [x] 2.1 Scaffold approved Astro + Tailwind project and configure semantic Puff tokens; verify no raw repeated color/spacing values.
- [x] 2.2 Create `src/content/landing.ts` typed content contracts and approved-input markers; verify no commercial claim is inferred.
- [x] 2.3 Create `src/layouts/BaseLayout.astro`, `SiteHeader.astro`, `SiteFooter.astro`, and `MediaFrame.astro`; verify landmarks, skip link, metadata and valid anchor navigation.

## Phase 3: Static Marketing Sections

- [x] 3.1 Compose `src/pages/index.astro` with all static sections and valid section IDs; verify every navigation link avoids a 404.
- [x] 3.2 Create `Hero.astro` and `Process.astro`; verify English copy, CTA focus state, three ordered steps and preview boundary.
- [x] 3.3 Create `Pricing.astro` and `Cta.astro`; verify four comparable tiers, approved external-only CTAs and 320px readability.
- [x] 3.4 Create `Portfolio.astro` and `Testimonials.astro`; verify reserved media ratios, contextual alt text and no fabricated proof.
- [x] 3.5 Create `Faq.astro` with semantic disclosure fallback; verify questions remain usable without JavaScript.
- [x] 3.6 Create `src/pages/privacy.astro` and `src/pages/terms.astro`; verify approved legal content, headings and keyboard links.

## Phase 4: Isolated Interactivity and Motion

- [ ] 4.1 Add `src/scripts/portfolio-filter.ts`; verify keyboard selection, visible state and empty-category messaging.
- [ ] 4.2 Add FAQ enhancement only if native disclosure cannot meet the approved interaction; verify `aria-expanded`, association and stable focus.
- [ ] 4.3 Add centralized `src/scripts/motion-runtime.ts`; verify one Lenis/GSAP loop, cleanup, deferred below-fold work and reduced-motion native fallback.

## Phase 5: Quality and Verification

- [ ] 5.1 Add approved tooling and focused checks after scaffold; verify content/filter contracts and island fallback/lifecycle scenarios.
- [ ] 5.2 Audit keyboard paths, focus contrast, semantic landmarks and WCAG AA across page and legal routes.
- [ ] 5.3 Test 320px, 768px and desktop layouts for semantic order, media geometry and no horizontal overflow.
- [ ] 5.4 Verify anchors, `/privacy`, `/terms`, assets and metadata produce no 404; validate canonical and Organization data when approved.
- [ ] 5.5 Run production build and Lighthouse mobile/desktop; verify Web Vitals, reduced motion, and scores ≥90 or document remediation.

## Phase 6: Handoff

- [ ] 6.1 Review copy for English typos, approved claims and all unresolved `[NEEDS CLIENT INPUT]` markers; verify landing-only scope.
- [x] 6.2 Delivery strategy selected: `stacked-to-main`; keep implementation blocked until scaffold/apply is explicitly authorized.
