# TASK-006: Implement schemas and reference validation

- **Status:** Ready for review
- **Phase:** Data
- **Branch:** `task/006-zod-schemas`
- **Depends on:** `TASK-005`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Create schemas and referential validators for approved/draft JSON, safe URLs, group registration, and contextual offerings.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Invalid refs, HTTP production URLs, and offering-level registration data fail validation.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added exact-pinned Zod 4.4.3 as a runtime dependency; strict schemas for every TASK-005 entity and catalog root; lowercase-kebab IDs, nonblank text, 24-hour times, positive image dimensions, nonnegative display order, email, and HTTPS target constraints; duplicate-ID, entity-reference, enabled-target, and effective group-registration validation; public schema exports and `safeParse` wrapper. Aligned optional domain properties with Zod output under `exactOptionalPropertyTypes` without changing JSON semantics.
- **Tests:** `npm run check` passed: Astro checked 12 files with 0 errors, warnings, or hints; ESLint and Prettier passed; Vitest passed 11/11 tests across 2 files; root static build passed. `PUBLIC_BASE_PATH=/sderot-course-catalog/ npm run build` passed and generated `dist/index.html` with no script or root-absolute `src`/`href` references. `npm audit --audit-level=high` reported 0 vulnerabilities after a sandbox DNS failure was retried with approved network access. `git diff --check` passed. Tests cover valid catalog parsing, schema/domain output compatibility, duplicates, missing program/course/group references, HTTP URLs, disabled targets, missing effective targets, and forbidden offering registration data.
- **Documentation:** Updated `artifacts/SDD.md` with strict schema behavior, actionable issue paths, structural/cross-reference validation rules, draft `safeParse` behavior, and approved-build failure semantics.
- **Security/privacy:** Registration destinations are HTTPS-only and must be enabled; unknown fields fail closed; offerings cannot carry registration targets. No user data, authentication, tracking, runtime API, or unsafe URL fallback was introduced.
- **Skill compliance:** Followed development-lifecycle, git-task-workflow, and deployment instructions; verified TASK-005 merge commit `93c14f0`, branched from updated `main`, preserved untracked `.vscode/` and `instractions`, and did not merge or deploy.
- **Commit:** `aab84fb` (`TASK-006 validate catalog content contract`)
- **Pull request:** [#13](https://github.com/idubi/sederot-course-catalog/pull/13), targeting `main`, awaiting review; no automatic merge requested.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
