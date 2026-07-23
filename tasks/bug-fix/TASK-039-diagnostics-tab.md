# TASK-039: Move diagnostics into a dedicated editor tab

- **Status:** In review
- **Phase:** Content tooling
- **Category:** Bug fix
- **Branch:** `task/039-diagnostics-tab`
- **Depends on:** `TASK-038` (merged in PR #48)
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/content-import.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, and `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`

## Objective

Keep errors and warnings out of the active entity workspace by presenting all diagnostics in a dedicated editor tab.

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`

## Implementation checklist

- [x] Add a dedicated diagnostics tab beside Courses, Groups, and Programs.
- [x] Show import diagnostics, relationship warnings, and Schema scan results in that tab.
- [x] Remove diagnostic panels from above the active entity workspace.
- [x] Preserve filtering, saved diagnostics, entity navigation, and return navigation.
- [x] Allow errors, warnings, and information diagnostics to be approved, retained as gray struck-through history, and persisted for the same source in Local Storage.
- [x] Add entity-level return, close, previous, and next diagnostic navigation that skips closed items and advances automatically after closure.
- [x] Add focused browser coverage and update documentation.
- [x] Run relevant tests, production gate, and `git diff --check`.
- [x] Record evidence, commit, push, and open one reviewed PR to `main`.

## Acceptance criteria

- [x] The entity workspace starts without errors or warnings rendered above it.
- [x] The diagnostics tab exposes all current error and warning sources.
- [x] Navigating from a diagnostic selects the referenced entity and permits returning to diagnostics.
- [x] Approved diagnostics leave the active list and remain approved after reloading the same source.
- [x] Closed diagnostics remain gray and struck through in diagnostic history while entity browsing excludes them.
- [x] All relevant automated checks pass.

## Completion evidence

- **Implementation:** Complete — added a dedicated Errors and Warnings tab for Schema scan results, importer diagnostics, relationship warnings, and editor operation errors; entity tabs no longer render diagnostic panels above their active card. Rescan, entity navigation, filtering, saved diagnostics, and return navigation switch to the correct tab. Any imported error, warning, or information item can be approved and closed by stable identity; approval persists in Local Storage for the same source, removes the item from active/return state, and retains it as gray struck-through history. The entity toolbar browses previous/next active linked diagnostics and closing advances next, then previous, then returns to the overview.
- **Tests:** `npm run typecheck` — 80 files with zero diagnostics; focused diagnostics Vitest — 5/5 passed; focused Playwright editor flow — 5/5 passed, including approval persistence, entity previous/next navigation, close-and-advance behavior, and gray struck-through history; latest full `npm run production:gate` before the toolbar follow-up — content validation, typecheck, 24 files and 102 tests, five-page build, artifact verification, and 8 Chromium flows passed; `git diff --check` — passed.
- **Documentation:** Updated `README.md`, `artifacts/content-import.md`, the master task list, and this task record.
- **Commits:** `7936f20` (dedicated diagnostics tab); `555292f` (persistent per-diagnostic approval)
- **Pull request:** [#49](https://github.com/idubi/sederot-course-catalog/pull/49) targets `main`; awaiting checks and human review.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Limited to diagnostics placement and navigation in the local editor.
