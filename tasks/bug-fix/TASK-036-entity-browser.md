# TASK-036: Add single-entity editor browser

- **Status:** In review
- **Phase:** Content tooling
- **Category:** Bug fix
- **Branch:** `task/036-entity-browser`
- **Depends on:** `TASK-035` (implementation merged in PR #45)
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/content-import.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, and `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`

## Objective

Replace the editor's long entity-card lists with a master-detail layout that shows one selected entity card and a side browser for pinpointing any course, group, or program.

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`

## Implementation checklist

- [x] Show exactly one selected course, group, or program card in its tab.
- [x] Add an accessible side browser containing every entity in the active tab.
- [x] Keep selection stable when entity content changes and choose a safe neighbor after add/delete.
- [x] Preserve diagnostic navigation to the selected entity.
- [x] Pin a specific diagnostic for later and return from its entity to the exact warning or error.
- [x] Stack the browser and card cleanly on narrow RTL viewports.
- [x] Add focused unit/E2E coverage and update editor documentation.
- [x] Run relevant tests, standalone editor build, production gate, and `git diff --check`.
- [x] Record evidence, commit, push, and open one reviewed PR to `main`.

## Acceptance criteria

- [x] Only one entity card is visible in each entity tab.
- [x] Every entity can be selected by name from the adjacent browser.
- [x] Selection works with keyboard and exposes the selected state to assistive technology.
- [x] Add, delete, ID editing, and diagnostic jumps keep the editor usable.
- [x] Saved diagnostic identities survive tab changes and are recognized after re-importing the same source.
- [x] Existing schema, write-path, registration, import, and production boundaries remain unchanged.

## Completion evidence

- **Implementation:** Complete — added a reusable RTL entity browser and controlled master-detail selection for Courses, Groups, and Programs. Exactly one card renders; add selects the new entity, delete selects a neighbor, ID edits retain selection, and diagnostic jumps select before focusing. Diagnostics now have stable identities, local “save for later” pins, a saved filter, and an exact return action from the affected entity.
- **Tests:** `npm run typecheck` — 80 files, zero diagnostics; `npm test` — 24 files and 98 tests passed; `npx vite build --config tools/content-editor/vite.config.ts` — 24 modules and no externalized Node warnings; `npm run production:gate` — content validation, typecheck, 98 tests, five-page build, artifact verification, and 8 Chromium flows passed; `git diff --check` — passed.
- **Documentation:** Updated `README.md` and `artifacts/content-import.md`. Playwright now uses isolated loopback port 4334 for editor tests so it cannot reuse a developer's editor on 4333.
- **Commits:** `6000a58` (implementation, tests, documentation, and initial evidence)
- **Pull request:** [#46](https://github.com/idubi/sederot-course-catalog/pull/46) targets `main`; awaiting checks and human review.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** TASK-035 implementation was merged in PR #45. TASK-036 is limited to entity navigation and presentation.
