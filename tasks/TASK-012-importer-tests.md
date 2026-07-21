# TASK-012: Add importer fixtures and regression tests

- **Status:** Ready for review
- **Phase:** Import
- **Branch:** `task/012-importer-tests`
- **Depends on:** `TASK-009`, `TASK-010`, `TASK-011`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Cover known headings, numbered lists, shared courses, instructors, missing values, and ambiguity.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Importer behavior is reproducible and protected by fixtures.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added the synthetic UTF-8 Hebrew fixture `tests/fixtures/importer/edge-cases.md` and an end-to-end reader/normalizer/diagnostics regression suite. Extended the lossless reader to recognize ordered Markdown list markers (`1.` and `1)`) in addition to bullets, preserving raw text, nesting, and locations. The fixture covers bold headings, numbered course lists, two program/groups, a shared course assigned twice, temporary and missing values, all instructor-label variants (`מורה`, `המורה`, `בהנחיית`), near-duplicate course names, unmatched ambiguity, and the registration boundary.
- **Tests:** `npm run check` passed: Astro checked 25 files twice with 0 errors, warnings, or hints; ESLint and Prettier passed; Vitest passed 30/30 tests across 7 files; approved-content validation passed; and the static build produced one page. Fixture tests verified byte-exact reconstruction, 5 numbered items, all instructor labels, 2 programs/groups, 4 exact-name courses, 5 offerings, one shared course with 2 traceable assignments, all four diagnostic categories, retained missing/unmatched text, deterministic equality, and no registration field on courses/offerings. Fixture SHA-256 is `16a7678577b141d67e01ca591e4730e1791bbb8194e3468a8de7b67b1112a9a5`; two real-source runs retained identical draft and diagnostic hashes; generated outputs remained ignored and production exclusion passed.
- **Documentation:** Updated `artifacts/content-import.md` with the fixture location, synthetic-data boundary, and protected edge cases; synchronized TASK-011 closure and the master checklist.
- **Security/privacy:** The committed fixture is synthetic and contains no real registration destination or personal data; generated draft/diagnostic files remain ignored and absent from `dist`; no registration field or target was introduced on a course/offering.
- **Skill compliance:** Followed development-lifecycle, content-import, and git-task-workflow instructions; verified TASK-009, TASK-010, and merged TASK-011 dependencies; preserved ambiguous/missing text and all assignments; and left user-owned `.vscode/` and `instractions` unchanged.
- **Commit:** `4aa92c4` (`TASK-012 add importer regression fixtures`)
- **Pull request:** [#20](https://github.com/idubi/sederot-course-catalog/pull/20), targeting `main`, awaiting review; no automatic merge requested.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
