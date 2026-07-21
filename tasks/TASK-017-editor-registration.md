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

- **Implementation:** Added structured RTL registration-target editing for ID, opaque type, information/action label, HTTPS URL, and enabled state; program-default and audience-group override assignment; effective group-first/program-fallback resolution; a group-context registration-information preview; and reference cascading when a target ID changes.
- **Tests:** `npm run check` passed: 37 files checked twice with 0 errors, warnings, or hints; ESLint/Prettier passed; Vitest passed 45/45 tests across 10 files; approved content validated; static build produced one page. `npx vite build --config tools/content-editor/vite.config.ts` produced the local editor bundle; production-exclusion assertions and `git diff --check` passed. New tests cover group override precedence, program fallback, target-ID cascading, and the absence of registration data on offerings.
- **Documentation:** Updated `README.md` with the registration editor contract, resolution order, preview behavior, safe target fields, and course/offering boundary.
- **Security/privacy:** URL inputs use the existing strict HTTPS schema and approved export validation; disabled or missing effective targets are visibly flagged and fail schema validation. No registration target or action was added to courses/offerings, and no user data, runtime API, tracking, or production editor code was introduced.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; started from merged TASK-016 on current `main`, used the specified task branch, preserved unrelated `.vscode/`/`instractions`, and kept the PR target as `main` without automatic merge.
- **Commit:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
