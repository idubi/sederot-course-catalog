# TASK-016: Edit courses and contextual offerings

- **Status:** Ready for review
- **Phase:** Editor
- **Branch:** `task/016-editor-courses-offerings`
- **Depends on:** `TASK-014`, `TASK-015`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Edit reusable course content and group-specific offerings, order, semester, and images.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Offerings remain attached to valid groups and expose no registration target.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added structured RTL forms for reusable course ID, name, short name, instructors, description HTML, and default-image metadata, plus contextual offering ID, course, audience group, semester, display order, group-scoped reordering, and image-override metadata. Course ID changes cascade to all offerings; shared course content remains separate from group-specific offering context. Asset upload remains TASK-018.
- **Tests:** `npm run check` passed: 36 files checked twice with 0 errors, warnings, or hints; ESLint/Prettier passed; Vitest passed 42/42 tests across 10 files; approved content validated; static build produced one page. New tests verify course-reference cascading, offering updates without registration data, and ordering boundaries; `git diff --check` and production exclusion passed.
- **Documentation:** Updated `README.md` with the structured program/group/course/offering editing contract, reference cascading, contextual fields, image metadata, and TASK-018 upload boundary; synchronized TASK-015 merge evidence and master checklist.
- **Security/privacy:** Course and offering forms expose no registration field or action. Group selection is constrained to existing catalog groups, output remains schema-validated, and editor code remains excluded from production.
- **Skill compliance:** Followed development-lifecycle, content-import, and git-task-workflow; verified TASK-014 and TASK-015 merged; preserved shared-course assignments and unrelated `.vscode/`/`instractions`.
- **Commit:** `9e1d5c4` (`TASK-016 add course offering editor`)
- **Pull request:** [#24](https://github.com/idubi/sederot-course-catalog/pull/24), targeting `main`, awaiting review; no automatic merge requested.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
