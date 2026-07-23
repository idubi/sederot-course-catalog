# TASK-042: Add inherited pre-registration information HTML

- **Status:** In progress
- **Phase:** Content model, editor, and public registration flow
- **Category:** Bug fix
- **Branch:** `task/042-registration-info-html`
- **Depends on:** `TASK-024` (complete)
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, and `artifacts/registration process described heb.md`

## Objective

Allow each program and audience group to provide safe HTML shown before the external registration/payment action. A group without an override inherits its parent program’s content; legacy catalogs without either value retain the built-in safety notice.

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`

## Implementation checklist

- [x] Add optional safe registration-information HTML to programs and audience groups.
- [x] Resolve group content before program content and preserve the legacy safe fallback.
- [x] Add dedicated HTML text boxes and inherited-content guidance to the editor cards.
- [x] Render the effective content before the external registration/payment action.
- [x] Add schema, resolver, component, editor, and browser regression coverage.
- [x] Update authoritative documentation.
- [x] Run the production gate and `git diff --check`.
- [ ] Record evidence, commit, push, and open one reviewed PR to `main`.

## Acceptance criteria

- [x] A group-specific value overrides the parent program value.
- [x] A blank group value inherits the parent program value.
- [x] Unsafe or unsupported HTML is rejected.
- [x] The effective information appears before the external registration action.
- [x] Course and offering entities remain free of registration content and actions.
- [x] Older approved catalogs without the new optional fields remain valid.
- [x] All relevant automated checks pass.

## Completion evidence

- **Implementation:** Program and audience-group entities accept optional safe `registrationInfoHtml`; registration pages resolve group → program → built-in notice and render it before the external action. Editor cards provide separate HTML text boxes with inheritance guidance.
- **Tests:** `npm run production:gate` — approved content validated; 80 files checked with zero diagnostics; 24 test files and 109 tests passed; five production pages built and verified; 8 Chromium flows passed. Focused regression suite: 5 files and 46 tests passed. `git diff --check` — passed.
- **Documentation:** Updated `README.md`, the consolidated and extension SDDs, detailed design, use-case specification, content-import guide, master task list, and this record.
- **Commits:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Registration ownership remains at program/audience-group level.
