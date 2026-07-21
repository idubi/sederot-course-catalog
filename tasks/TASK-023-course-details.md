# TASK-023: Implement contextual course cards and details

- **Status:** Ready for review
- **Phase:** Public UI
- **Branch:** `task/023-course-details`
- **Depends on:** `TASK-022`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Create course cards and /programs/[groupId]/courses/[offeringId] with image resolution and back-to-program behavior.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Course pages contain no registration CTA and cannot escape or infer another group.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added a statically generated contextual detail route for every approved group/offering pair. It renders the resolved offering image, course name and short name, instructors, semester, sanitized description, and links back only to its owning program-group page.
- **Tests:** Type checking passed for 55 files with 0 diagnostics; ESLint and focused Prettier checks passed; Vitest passed 66/66 tests across 17 files; approved-content validation and the static build passed with three pages. Output assertions confirmed the contextual route exists, contains its same-group return action, contains no registration text or route, and `git diff --check` passed. The aggregate `npm run check` formatting phase reports only the preserved user-edited `content/approved/catalog.json`, which is outside this task and was not rewritten.
- **Documentation:** Updated `README.md` with the contextual course-detail route, image precedence, displayed content, return behavior, and no-registration boundary; synchronized TASK-022 approved merge evidence.
- **Security/privacy:** The page is generated only from validated approved JSON, renders only build-time-sanitized description HTML, and has no registration target, runtime input, storage, tracking, authentication, or API behavior.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; verified PR #30 merged, branched from updated `main`, preserved unrelated local files, and kept the PR target as `main` without automatic merge.
- **Commit:** `ddfd42d` (`TASK-023 add contextual course details`)
- **Pull request:** [#31](https://github.com/idubi/sederot-course-catalog/pull/31)

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
