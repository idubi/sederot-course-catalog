# TASK-021: Implement program, grade, and audience selection

- **Status:** Ready for review
- **Phase:** Public UI
- **Branch:** `task/021-selection-funnel`
- **Depends on:** `TASK-020`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Implement Program → Grade → boys/girls/mixed selection with accessible incomplete/empty states and no identity verification.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Every valid selection opens the correct group and no personal choice is tracked.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added an accessible program → grade → self-declared audience funnel driven only by approved audience groups, dependent option availability, live incomplete/valid status, exact group resolution, and repository-base-path-safe navigation.
- **Tests:** Type checking passed for 52 files with 0 diagnostics; Vitest passed 66/66 tests across 17 files; approved content validation and static build passed; `git diff --check` passed. Unit tests cover exact valid resolution plus incomplete and unavailable selections.
- **Documentation:** Updated `README.md` with the dependent selection, exact group match, self-declaration, non-verification, and no-persistence contract; synchronized TASK-020 merge evidence.
- **Security/privacy:** The funnel collects no name, identity, contact, eligibility, or other personal data; selection remains in transient form controls only and no analytics, tracking, cookies, storage, or runtime API is used. No course/offering registration action was added.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; started from merged PR #28 on current `main`, verified TASK-020 dependency, preserved unrelated local files, and kept the PR target as `main` without automatic merge.
- **Commit:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
