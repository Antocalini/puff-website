---
name: puff-clean-code
description: "Defines maintainable Astro and Tailwind code conventions for Puff Cross Media. Use when planning, implementing, or reviewing Astro components, Tailwind styles, client islands, content data, and motion integration."
disable-model-invocation: true
---

# Puff Clean Code

## Activation Contract

Load `puff-scope`, `puff-design-system`, `puff-components`, and `puff-motion` first. Use this skill once implementation is explicitly authorized; it defines quality conventions but does not authorize code in the current planning phase.

## Architecture Boundary

Puff is a static-first Astro landing:

- Render page structure, copy, SEO metadata, and noninteractive sections as `.astro` components.
- Add client JavaScript only through narrowly scoped islands for behavior that cannot be expressed semantically in HTML/CSS: FAQ disclosure enhancements, portfolio filtering, carousel behavior, or Lenis/GSAP runtime.
- Do not introduce React, Vue, or another UI framework merely for simple state or animation.
- Keep landing content and presentation separate: structured content/data modules supply copy and media references; section components render them.

## Dependency Management

- Use **Yarn Classic 1.22.22** exclusively: `yarn`, `yarn add`, `yarn add --dev`, `yarn run`.
- Keep `yarn.lock` committed as the sole dependency lockfile.
- Never run `npm install`, `npx`, or add `package-lock.json`; remove conflicting npm lockfiles before dependency work.
- Add a dependency only when semantic HTML, CSS, Astro, Tailwind, Lenis, or GSAP cannot fulfill the requirement already.

## Component Design

- One component = one semantic responsibility. A section owns composition; shared primitives own reusable interaction/anatomy.
- Use descriptive names based on domain (`PricingComparison`, `PortfolioFilter`, `FaqAccordion`), not visual accidents (`YellowBox`, `BigThing`, `SectionTwo`).
- Keep `.astro` frontmatter limited to data preparation and explicit props; do not hide business logic in template expressions.
- Pass minimal, typed props. Do not pass a catch-all configuration object to avoid modeling an API.
- Prefer slots for intentional composition only; do not turn every component into an unbounded layout primitive.
- Keep client-island boundaries at the smallest interactive unit. A static parent section MUST NOT become hydrated because one child needs JavaScript.

## Tailwind Discipline

- Implement Puff tokens through the Tailwind theme/token layer. Components consume semantic utilities; they MUST NOT repeat raw hex, arbitrary spacing, or arbitrary typography values.
- Use utilities directly for local layout. Extract a component class or shared primitive only after a pattern is repeated and has stable semantics.
- Do not use `@apply` to recreate large component markup or conceal a one-off design decision.
- Arbitrary values require a documented design-system exception: optical display adjustment, source-media aspect ratio, or a measured composition breakpoint.
- Class ordering MUST follow a stable convention: layout → box model → typography → visual surface → state/responsive modifiers.
- Responsive rules are mobile-first. Never duplicate the same visual declaration across breakpoint variants without a behavior change.

## JavaScript and Motion

- Client modules are feature-local and lifecycle-safe; register event listeners once and remove them on teardown.
- Lenis + GSAP integration belongs in a dedicated motion runtime/client island, never duplicated per section.
- Every GSAP timeline/ScrollTrigger is scoped to its owning component and cleaned up with its lifecycle.
- Prefer native `<details>` / `<summary>`, buttons, links, and CSS before custom JavaScript behavior.
- No global DOM selectors that can accidentally target another section; scope selectors to a component root or use direct references.

## Naming and Data

- Names describe purpose and units: `monthlyPrice`, `deliveryWindowHours`, `portfolioCategory`; never `data`, `item2`, or `thing`.
- Use immutable content objects and explicit content types/schemas once the stack supports them.
- Values requiring business approval MUST remain `[NEEDS CLIENT INPUT]`; never derive commercial claims from visual mockups.
- Keep presentation-only derived values close to the component; move cross-section domain concepts into a dedicated data module.

## Performance and Review Gates

- Static HTML is the default deliverable. Each hydration directive requires a written interaction reason.
- Reserve media dimensions/aspect ratios to protect CLS.
- Do not load GSAP, Lenis, carousels, or portfolio filter code above the fold unless their interaction is visible and necessary.
- Audit bundle impact after each new island. No dependency is added for a behavior achievable with semantic HTML/CSS.
- Before merging, check: semantic landmarks, keyboard operation, reduced motion, token usage, mobile overflow, zero visible typos, and no dead code.

## Prohibited Patterns

- One monolithic `index.astro` containing all sections and behavior.
- Hydrating the complete page with `client:load`.
- A shared `utils.ts` dumping ground.
- Tailwind class strings copied across unrelated sections.
- Styling by DOM position (`nth-child`) when an explicit component variant conveys intent.
- Animation lifecycle code inside markup event attributes.

## References

- `.cursor/skills/puff-design-system/SKILL.md`
- `.cursor/skills/puff-components/SKILL.md`
- `.cursor/skills/puff-motion/references/runtime.md`
- `.agents/skills/web-design-guidelines/SKILL.md`
