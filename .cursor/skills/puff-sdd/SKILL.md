---
name: puff-sdd
description: "How SDD works in puff-website — artifact locations, phase rules, when to write docs vs code. Trigger: openspec work, planning artifacts, or SDD phase questions in puff-website."
---

# Puff SDD — Planning Rules

## Activation Contract

Load alongside `puff-scope` when creating or updating SDD artifacts in `openspec/`.

## Hard Rules

- SDD artifacts are **planning documents** — not code, not configs de runtime
- Current phase: **TASKS** — exploration, proposal, specifications, technical design, and task breakdown are active
- Do NOT create implementation files until user explicitly authorizes `sdd-apply`
- Do NOT create change delta specs unprompted; maintain approved greenfield specs in `openspec/specs/`
- Every change MUST have a named folder under `openspec/changes/`
- Active change: `puff-redesign`

## Artifact Map

| Phase | File | Status |
|-------|------|--------|
| explore | `openspec/changes/puff-redesign/exploration.md` | ✅ Done |
| propose | `openspec/changes/puff-redesign/proposal.md` | ✅ Draft — subject to user review |
| spec | `openspec/specs/{capability}/spec.md` | ✅ Done — 10 greenfield capabilities |
| design | `openspec/changes/puff-redesign/design.md` | ✅ Done |
| tasks | `openspec/changes/puff-redesign/tasks.md` | ✅ Done — implementation remains gated |
| apply | code in repo | 🔒 Blocked |
| verify | `verify-report.md` | 🔒 Blocked |
| archive | `openspec/changes/archive/` | 🔒 Blocked |

## When to Write What

| User intent | Write | Do NOT write |
|-------------|-------|--------------|
| Auditar / analizar | Update `exploration.md` | Code, specs |
| Definir scope MVP | Update `proposal.md` | tasks, design |
| Definir límites del repo | Update skills + `AGENTS.md` | openspec specs |
| "Escribe specs" (explícito) | Main specs for greenfield / delta specs for existing capabilities | Code |
| "Diseña la arquitectura" (explícito) | `design.md` | Code, tasks |
| "Implementa" (explícito) | Code + tasks | — |

## Change Naming

- Kebab-case: `puff-redesign`, `add-faq-section`, `pricing-matrix`
- One active change at a time unless user requests parallel changes
- Archive completed changes to `openspec/changes/archive/YYYY-MM-DD-{name}/`

## Config

- Project config: `openspec/config.yaml`
- State tracking: `openspec/changes/{change}/state.yaml`
- Stack: Astro + Tailwind CSS. CMS is **TBD** and must not be inferred as a decision.

## Output Contract

When updating SDD artifacts, report:
- Which file changed
- Current phase
- What remains blocked
- What user decision is needed next

## References

- Boundaries: `.cursor/skills/puff-scope/SKILL.md`
- Shared convention: user-level `sdd-*` skills in `~/.cursor/skills/`
