# TASK-043: Browse and close diagnostics from entity cards

- **Status:** In review
- **Phase:** Content tooling
- **Category:** Bug fix
- **Branch:** `task/043-diagnostic-entity-navigation`
- **Depends on:** `TASK-039` (merged in PR #49)
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/content-import.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, and `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`

## Objective

Allow editors who opened an entity from a diagnostic to close that diagnostic or browse directly to the previous and next active linked diagnostics without returning to the diagnostics tab between items.

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`

## Implementation checklist

- [x] Add close, previous, and next diagnostic actions beside the existing return action.
- [x] Skip closed and otherwise inactive diagnostics during entity navigation.
- [x] After closing, open the next active linked diagnostic, then the previous one, or return to the diagnostics overview when none remain.
- [x] Preserve closed diagnostics in the main list with gray struck-through presentation.
- [x] Add focused browser regression coverage and update authoritative documentation.
- [x] Run the production gate and `git diff --check`.
- [x] Record evidence, commit, push, and open one reviewed PR to `main`.

## Acceptance criteria

- [x] The entity toolbar exposes return, close, previous, and next diagnostic actions.
- [x] Previous and next navigation includes only active diagnostics linked to entities.
- [x] Closing from an entity immediately advances to the next eligible entity diagnostic.
- [x] When no following diagnostic remains, closing falls back to the previous eligible diagnostic; when none remain, the diagnostics overview opens.
- [x] Closed diagnostics remain available in Approved/all filters and appear gray with a line through them.
- [x] All relevant automated checks pass.

## Completion evidence

- **Implementation:** Added a sticky entity diagnostic toolbar beside the existing return action. Previous/next navigation is limited to active diagnostics with resolvable entity links. Closing persists approval, removes any saved-return pin, advances next then previous, and returns to the active diagnostics overview when none remain. Approved history remains visible in gray with a line through each row.
- **Tests:** Focused diagnostics Vitest — 5/5 passed. Focused Playwright entity-toolbar flow — 1/1 passed. After merging current `main` at `b50ed23`, `npm run production:gate` — approved content validated; 80 files checked with zero diagnostics; 24 test files and 109 tests passed; five production pages built and verified; 9 Chromium flows passed. `git diff --check` — passed.
- **Documentation:** Updated `README.md`, `artifacts/content-import.md`, the master task list, and this task record.
- **Commits:** `b89586b` (`fix(editor): browse diagnostics from entity cards`)
- **Pull request:** [#54](https://github.com/idubi/sederot-course-catalog/pull/54)

## Completion record

- **Completed by:** Codex implementation; awaiting human review and approved merge.
- **Completed at:** Pending approved merge.
- **Notes:** TASK-041 / PR #52 independently contains the requested grid layout for course program tabs and is intentionally excluded from this branch.
