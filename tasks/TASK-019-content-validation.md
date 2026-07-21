# TASK-019: Finalize sanitation and production content validation

- **Status:** Complete
- **Phase:** Content
- **Branch:** `task/019-content-validation`
- **Depends on:** `TASK-014`, `TASK-017`, `TASK-018`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Sanitize rich text and enforce all schema, URL, asset, registration, and publication rules.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Only fully valid approved JSON can enter a build.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added parser-based rich-text sanitation on editor blur and approved export, strict build-time rejection of unsanitized HTML, HTTPS-only anchors with `noopener noreferrer`, and production validation that every referenced image asset exists. Existing strict schema/reference/registration/URL/path validation remains the single publication contract.
- **Tests:** Type checking passed for 47 files with 0 diagnostics; Vitest passed 61/61 tests across 15 files; approved content validation and static build passed. Tests cover allowed markup, script/event/style and unsafe-link removal, secured HTTPS links, export sanitation, unsanitized schema rejection, missing/recovered asset references, and optional no-image catalogs.
- **Documentation:** Updated `README.md` with the exact HTML allowlist, HTTPS anchor policy, sanitation stages, approved image path, and missing-asset build gate; synchronized TASK-018 merge evidence.
- **Security/privacy:** Sanitization uses an HTML parser rather than regular expressions. Scripts, iframes, forms, styles, event attributes, unsafe schemes, unknown tags/attributes, and missing asset references cannot enter a production build. No runtime API, tracking, user data, or offering-level registration was introduced.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; started from merged PR #26 on current `main`, verified all dependencies, preserved the unrelated approved-content edit and untracked user files, and kept the PR target as `main` without automatic merge.
- **Commit:** `51c93a4` (`TASK-019 enforce approved content safety`)
- **Pull request:** [#27](https://github.com/idubi/sederot-course-catalog/pull/27), approved and merged to `main` as `b21f147`.

## Completion record

- **Completed by:** Codex after explicit owner approval
- **Completed at:** 2026-07-22
- **Notes:** Approved-content sanitation and production validation are merged and available to TASK-020.
