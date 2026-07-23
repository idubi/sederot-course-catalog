# TASK-037: Split course assignments into program tabs

- **Status:** In progress
- **Phase:** Content tooling
- **Category:** Bug fix
- **Branch:** `task/037-course-program-tabs`
- **Depends on:** `TASK-036` (merged in PR #46)
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/content-import.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, and `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`

## Objective

Divide each course's program/group assignment area into program tabs so editors see and change one program's groups at a time.

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`

## Implementation checklist

- [x] Render one tab per program in the selected course card.
- [x] Show only the active program's audience-group checkboxes.
- [x] Preserve canonical offering assignment behavior.
- [x] Support RTL keyboard tab navigation and narrow viewports.
- [x] Add focused browser coverage and update documentation.
- [x] Run typecheck, tests, standalone editor build, production gate, and `git diff --check`.
- [ ] Record evidence, commit, push, and open one reviewed PR to `main`.

## Acceptance criteria

- [x] Every program appears as a distinct tab.
- [x] Changing tabs reveals the matching program groups without changing assignments.
- [x] Checking/unchecking a group still creates/removes only the canonical offering.
- [x] Tabs expose correct selected/tab-panel semantics and keyboard behavior.
- [x] Existing editor, schema, import, registration, and production boundaries remain unchanged.

## Completion evidence

- **Implementation:** Complete — extracted a course-program assignment tablist that renders one tab per program and one matching group panel. RTL arrow, Home, and End keys use roving focus; group checkboxes continue to call the canonical offering helper.
- **Tests:** `npm run typecheck` — 81 files, zero diagnostics; `npm test` — 24 files and 98 tests passed; `npx vite build --config tools/content-editor/vite.config.ts` — 25 modules and no externalized Node warnings; `npm run production:gate` — content validation, typecheck, 98 tests, five-page build, artifact verification, and 8 Chromium flows passed; `git diff --check` — passed.
- **Documentation:** Updated `README.md` and `artifacts/content-import.md`.
- **Commits:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Limited to course assignment presentation and interaction.
