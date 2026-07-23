# TASK-040: Add a JSON reference browser tab

- **Status:** In review
- **Phase:** Content tooling
- **Category:** Bug fix
- **Branch:** `task/040-json-reference-tab`
- **Depends on:** `TASK-039` (merged in PR #49)
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/content-import.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, and `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`

## Objective

Move manual JSON editing into a dedicated editor tab and provide a side inspector that displays one catalog object with navigable links to related objects.

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`

## Implementation checklist

- [x] Add a dedicated JSON tab beside the entity and diagnostics tabs.
- [x] Move the raw JSON textarea out of the shared workspace.
- [x] Show a selected catalog object in a side inspector.
- [x] Link related programs, groups, courses, offerings, and registration targets.
- [x] Preserve raw editing, validation, RTL layout, and narrow-screen behavior.
- [x] Add focused unit/browser coverage and update documentation.
- [x] Run relevant tests, production gate, and `git diff --check`.
- [x] Record evidence, commit, push, and open one reviewed PR to `main`.

## Acceptance criteria

- [x] Manual JSON editing appears only in the JSON tab.
- [x] The side inspector displays the selected object as formatted JSON.
- [x] Relevant object references are navigable in both directions.
- [x] All relevant automated checks pass.

## Completion evidence

- **Implementation:** Complete — raw JSON editing now appears only in a dedicated JSON tab. A responsive side inspector selects and renders one formatted object and provides relationship navigation among programs, groups, courses, offerings, and registration targets.
- **Tests:** `npm run typecheck` — 83 files with zero diagnostics; focused JSON-reference Vitest — 2/2 passed; focused JSON-tab Chromium flow — passed; `npm run production:gate` — content validation, typecheck, 25 files and 104 tests, five-page build, artifact verification, and 8 Chromium flows passed; `git diff --check` — passed.
- **Documentation:** Updated `README.md`, `artifacts/content-import.md`, the master task list, and this task record.
- **Commits:** `bb54860` (implementation, tests, documentation, and initial evidence)
- **Pull request:** [#51](https://github.com/idubi/sederot-course-catalog/pull/51) targets `main`; awaiting checks and human review.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Limited to the local editor JSON workspace and relationship navigation.
