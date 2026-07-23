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

- [ ] Audit the current DOCX/Markdown/JSON import, editing, diagnostics, relationship, validation, and Bootstrap-export flows with representative catalog content.
- [ ] Record concrete editor usability problems and prioritize fixes that reduce repetitive manual correction without guessing uncertain source values.
- [ ] Improve navigation and information hierarchy for programs, audience groups, courses, offerings, instructors, descriptions, images, registration data, and raw JSON.
- [ ] Fine-tune bidirectional course/program-group controls so relationships are easy to inspect and modify from either entity view while offerings remain the canonical data model.
- [ ] Make import warnings actionable, localized, filterable, and linked to the affected entity or source location where possible.
- [ ] Distinguish resolved, stale, duplicate, and blocking diagnostics after manual edits.
- [ ] Improve source-specific extraction and matching only where deterministic evidence exists; preserve ambiguous source content and report it instead of guessing.
- [ ] Keep editor writes explicit and confined to draft, approved, image, or `contents/<folder>/bootstrap.json` paths according to their existing contracts.
- [ ] Preserve loopback-only operation and keep all editor/import dependencies out of the public production bundle.
- [ ] Add focused unit/component coverage and end-to-end coverage for the fine-tuned workflows.
- [ ] Update `README.md`, `artifacts/content-import.md`, this checklist, and the master task list with final behavior and evidence.
- [ ] Run `npm run typecheck`, `npm test`, the standalone editor build, relevant Playwright flows, `npm run production:gate`, and `git diff --check`.
- [ ] Review the diff for unrelated files, source excerpts, personal data, secrets, generated content, and accidental approved-content changes.
- [ ] Record exact evidence, commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [ ] A content editor can locate and edit any imported program, group, course, or relationship without relying on the raw JSON textarea.
- [ ] Course-to-group relationships are consistent in both editor views and serialize as canonical offerings without duplicates or broken references.
- [ ] Diagnostics explain the problem, affected entity/source, severity, and required action; resolved problems no longer remain as misleading active warnings.
- [ ] Document import preserves source evidence and never silently invents instructors, descriptions, schedules, contacts, or registration destinations.
- [ ] Draft and Bootstrap workflows remain separate from approved production export.
- [ ] The editor remains usable in RTL on narrow and desktop viewports and meets applicable keyboard, labeling, focus, and contrast requirements.
- [ ] The standalone editor contains no browser-externalized Node module warnings, and editor/import code does not enter `dist/`.
- [ ] All required automated checks pass with recorded results.

## Completion evidence

- **Implementation:** Pending
- **Tests:** Pending
- **Documentation:** Pending
- **Security/privacy:** Pending
- **Skill compliance:** Development-lifecycle and git-task-workflow loaded; unrelated approved-catalog and untracked owner files remain outside task scope.
- **Commits:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** TASK-034 was merged in PR #43. TASK-035 starts from that merged state and is limited to editor fine-tuning; it does not imply approval of unresolved catalog content.
