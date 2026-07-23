# TASK-041: Arrange course program tabs in a grid

- **Status:** In review
- **Phase:** Content tooling
- **Category:** Bug fix
- **Branch:** `task/041-program-course-grid`
- **Depends on:** `TASK-037` (merged in PR #47)
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/content-import.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, and `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`

## Objective

Arrange the program assignment headers inside course cards as a responsive equal-width grid instead of a single flex strip.

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`

## Implementation checklist

- [x] Replace the program-header flex strip with a responsive grid.
- [x] Match the main editor tab-header visual treatment.
- [x] Preserve selection, active-panel semantics, and RTL keyboard navigation.
- [x] Add focused browser coverage and update documentation.
- [x] Run relevant tests, production gate, and `git diff --check`.
- [x] Record evidence, commit, push, and open one reviewed PR to `main`.

## Acceptance criteria

- [x] Multiple program headers render in grid columns within a course card.
- [x] The active program remains visually and semantically selected.
- [x] Narrow layouts wrap safely without horizontal scrolling.
- [x] All relevant automated checks pass.

## Completion evidence

- **Implementation:** Complete — course-card program assignment headers use a responsive equal-width grid matching the primary tab treatment while preserving the active tab and RTL keyboard behavior.
- **Tests:** After merging current `main` at `b50ed23`, `npm run production:gate` — approved content validated; 80 files checked with zero diagnostics; 24 test files and 109 tests passed; five production pages built and verified; 8 Chromium flows passed. `git diff --check` — passed.
- **Documentation:** Updated `README.md`, `artifacts/content-import.md`, the master list, and this task record.
- **Commits:** `4a0ab65`, `72e1e3a`
- **Pull request:** [#52](https://github.com/idubi/sederot-course-catalog/pull/52)

## Completion record

- **Completed by:** Codex implementation; awaiting human review and approved merge.
- **Completed at:** Pending approved merge.
- **Notes:** Limited to course-card program assignment header layout. PR #52 is open against `main` and was not automatically merged.
