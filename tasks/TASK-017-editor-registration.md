# TASK-017: Edit program-level registration information

- **Status:** Ready for review
- **Phase:** Editor
- **Branch:** `task/017-editor-registration`
- **Depends on:** `TASK-014`, `TASK-015`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Manage group targets, program defaults, registration-information copy, safe URLs, and preview.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Registration targets resolve group then program and cannot be attached to a course.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added structured RTL registration-target editing for ID, opaque type, information/action label, HTTPS URL, and enabled state; program-default and audience-group override assignment; effective group-first/program-fallback resolution; a group-context registration-information preview; and reference cascading when a target ID changes. Pinned editor development and preview to loopback port `4333`, added JSON loading from a browser-selected local/synced-drive file or an HTTPS+CORS web source with parse-before-replace behavior, and added a confirmed browser-state reset that never deletes repository files.
- **Tests:** The original `npm run check` passed, and follow-up validation passed with 41 files type-checked with 0 errors, warnings, or hints; focused ESLint/Prettier checks passed; Vitest passed 51/51 tests across 12 files; approved content validated; static build produced one page; and the local editor Vite bundle built successfully. Production-exclusion assertions and `git diff --check` passed. Tests cover group override precedence, program fallback, target-ID cascading, the absence of registration data on offerings, fixed port `4333`, JSON parsing/formatting, malformed JSON rejection, HTTPS-only web imports, autosave persistence, and reset-key isolation.
- **Documentation:** Updated `README.md` with the registration editor contract, resolution order, preview behavior, safe target fields, course/offering boundary, fixed editor URL, local-drive/web JSON loading behavior, and the reset action's browser-only boundary.
- **Security/privacy:** URL inputs use the existing strict HTTPS schema and approved export validation; disabled or missing effective targets are visibly flagged and fail schema validation. No registration target or action was added to courses/offerings, and no user data, runtime API, tracking, or production editor code was introduced.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; started from merged TASK-016 on current `main`, used the specified task branch, preserved unrelated `.vscode/`/`instractions`, and kept the PR target as `main` without automatic merge.
- **Commits:** `2f27aed` (`TASK-017 add registration editor`), `ae1ef5c` (`TASK-017 record validation evidence`), `a5eb0b4` (`TASK-017 record pull request evidence`), `fc4edfe` (`TASK-017 add JSON import sources`), and `8f46e5a` (`TASK-017 add safe editor reset`).
- **Pull request:** [#25](https://github.com/idubi/sederot-course-catalog/pull/25), targeting `main`, awaiting review; no automatic merge requested.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
