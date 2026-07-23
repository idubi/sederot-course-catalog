# TASK-035: Fine-tune the local content editor

- **Status:** In progress
- **Phase:** Content tooling
- **Category:** Bug fix
- **Branch:** `task/035-editor-fine-tuning`
- **Depends on:** `TASK-034`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/content-import.md`, `artifacts/2027 cources details - blueprint.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, and `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`

## Objective

Fine-tune the local content editor so imported course documents can be reviewed, corrected, related, validated, and exported efficiently in a clear mobile-first RTL interface without weakening schema validation or production-content boundaries.

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`

## Implementation checklist

- [x] Audit the current DOCX/Markdown/JSON import, editing, diagnostics, relationship, validation, and Bootstrap-export flows with representative catalog content.
- [x] Record concrete editor usability problems and prioritize fixes that reduce repetitive manual correction without guessing uncertain source values.
- [x] Improve navigation and information hierarchy for programs, audience groups, courses, offerings, instructors, descriptions, images, registration data, and raw JSON.
- [x] Fine-tune bidirectional course/program-group controls so relationships are easy to inspect and modify from either entity view while offerings remain the canonical data model.
- [x] Make import warnings actionable, localized, filterable, and linked to the affected entity or source location where possible.
- [x] Distinguish resolved, stale, duplicate, and blocking diagnostics after manual edits.
- [x] Improve source-specific extraction and matching only where deterministic evidence exists; preserve ambiguous source content and report it instead of guessing.
- [x] Keep editor writes explicit and confined to draft, approved, image, or `contents/<folder>/bootstrap.json` paths according to their existing contracts.
- [x] Preserve loopback-only operation and keep all editor/import dependencies out of the public production bundle.
- [x] Add focused unit/component coverage and end-to-end coverage for the fine-tuned workflows.
- [x] Update `README.md`, `artifacts/content-import.md`, this checklist, and the master task list with final behavior and evidence.
- [x] Run `npm run typecheck`, `npm test`, the standalone editor build, relevant Playwright flows, `npm run production:gate`, and `git diff --check`.
- [x] Review the diff for unrelated files, source excerpts, personal data, secrets, generated content, and accidental approved-content changes.
- [ ] Record exact evidence, commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] A content editor can locate and edit any imported program, group, course, or relationship without relying on the raw JSON textarea.
- [x] Course-to-group relationships are consistent in both editor views and serialize as canonical offerings without duplicates or broken references.
- [x] Diagnostics explain the problem, affected entity/source, severity, and required action; resolved problems no longer remain as misleading active warnings.
- [x] Document import preserves source evidence and never silently invents instructors, descriptions, schedules, contacts, or registration destinations.
- [x] Draft and Bootstrap workflows remain separate from approved production export.
- [x] The editor remains usable in RTL on narrow and desktop viewports and meets applicable keyboard, labeling, focus, and contrast requirements.
- [x] The standalone editor contains no browser-externalized Node module warnings, and editor/import code does not enter `dist/`.
- [x] All required automated checks pass with recorded results.

## Completion evidence

- **Implementation:** Complete — implemented the supplied empty-state and Courses/Groups/Programs tab wireframes, scrollable RTL entity cards, add/remove operations with dependent-offering cleanup, course image preview/upload, derived program/group course arrays, relationship checkboxes, and required program/optional group external registration target selection. Import diagnostics retain source evidence, are localized and filterable by active/resolved/stale/duplicate state, link to structured entities, and require acknowledgement only while active. Raw JSON remains available in a collapsed advanced section.
- **Tests:** `npm run typecheck` — 79 files, zero diagnostics; `npm test` — 24 files and 97 tests passed; `npx vite build --config tools/content-editor/vite.config.ts` — 23 modules, no externalized Node warnings; `npx playwright test --reporter=line` — 6 Chromium flows passed; `npm run production:gate` — content validation, typecheck, 97 tests, five-page build, production artifact verification, and 6 E2E flows passed; `git diff --check` — passed.
- **Documentation:** Updated `README.md`, `artifacts/content-import.md`, and this task record; the master list remains correctly marked In progress until review and approved merge. Supplied wireframes are retained under `artifacts/editor forms/`.
- **Security/privacy:** External registration/payment remains program/group-owned and opens outside the static site only after the existing information step. No course registration action, payment processing, runtime public API, or editor code in production was added.
- **Skill compliance:** Development-lifecycle and git-task-workflow loaded. The unrelated `.vscode/`, `instractions`, and approved-catalog whitespace-only change remain outside the task commit.
- **Commits:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** TASK-034 was merged in PR #43. TASK-035 starts from that merged state and is limited to editor fine-tuning; it does not imply approval of unresolved catalog content.
