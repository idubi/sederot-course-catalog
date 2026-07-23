# TASK-038: Put registration URLs on their owning cards

- **Status:** In review
- **Phase:** Content tooling
- **Category:** Bug fix
- **Branch:** `task/038-registration-url-ownership`
- **Depends on:** `TASK-037` (merged in PR #47)
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/content-import.md`, `artifacts/registration process described heb.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, and `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`

## Objective

Make external registration/payment URLs directly editable on the program or group that owns them, without showing every group's links on the Programs tab.

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`

## Implementation checklist

- [x] Add a direct external HTTPS URL field to the selected program card.
- [x] Add an optional group-specific URL field and show its effective fallback.
- [x] Keep shared targets isolated when one owning entity changes its URL.
- [x] Remove the global registration-target and all-group-link section.
- [x] Add focused unit and browser coverage and update documentation.
- [x] Run typecheck, tests, standalone editor build, production gate, and `git diff --check`.
- [ ] Record evidence, commit, push, and open one reviewed PR to `main`.

## Acceptance criteria

- [x] A content editor can paste any valid external HTTPS service URL directly into a program card.
- [x] A group can override that URL from its own card or inherit it by leaving the field empty.
- [x] Program cards no longer contain a list of links for every group.
- [x] Registration remains program/group-owned and never moves to courses or offerings.
- [x] All relevant automated checks pass.

## Completion evidence

- **Implementation:** Complete — program and group cards now edit their own external URL directly, group cards show inherited/effective behavior, shared legacy targets are isolated on edit, and the global registration section was removed.
- **Tests:** `npm run typecheck` — 80 files with zero diagnostics; focused Vitest — 14/14 passed; standalone editor Vite build — 24 modules; focused Playwright flow — passed; `npm run production:gate` — content validation, typecheck, 24 files and 101 tests, five-page build, artifact verification, and 8 Chromium flows passed; `git diff --check` — passed.
- **Documentation:** Updated `README.md`, `artifacts/content-import.md`, and the development task list.
- **Commits:** `4e356c4` (implementation, tests, documentation, and initial evidence)
- **Pull request:** Pending.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Limited to editor ownership and presentation of registration URLs.
