# TASK-041: Arrange course program tabs in a grid

- **Status:** In progress
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
- [ ] Run relevant tests, production gate, and `git diff --check`.
- [ ] Record evidence, commit, push, and open one reviewed PR to `main`.

## Acceptance criteria

- [x] Multiple program headers render in grid columns within a course card.
- [x] The active program remains visually and semantically selected.
- [x] Narrow layouts wrap safely without horizontal scrolling.
- [ ] All relevant automated checks pass.

## Completion evidence

- **Implementation:** Complete — course-card program assignment headers use a responsive equal-width grid matching the primary tab treatment while preserving the active tab and RTL keyboard behavior.
- **Tests:** `npm run typecheck` — 80 files with zero diagnostics; focused Chromium grid and keyboard flow — passed; full production gate pending before PR publication.
- **Documentation:** Updated `README.md`, `artifacts/content-import.md`, the master list, and this task record.
- **Commits:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Limited to course-card program assignment header layout.
