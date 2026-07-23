# TASK-022: Implement program group and course-cluster page

- **Status:** Complete
- **Phase:** Public UI
- **Branch:** `task/022-program-group-page`
- **Depends on:** `TASK-021`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Render the selected program, group details, cluster of contextual course cards, contacts, print, and the sole registration-start action.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Cluster matches approved group data and registration starts only here.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added one statically generated RTL page per approved audience group with program/group schedule metadata, ordered contextual course cards, optional resolved images, generic contact actions, print navigation, and the sole group-level registration-start link to the internal information route. Course cards link only to contextual details.
- **Tests:** Type checking passed for 54 files with 0 diagnostics; Vitest passed 66/66 tests across 17 files; approved content validation and static build passed with two pages. Output assertions confirmed the group page exists and contains the group registration-information action; `git diff --check` passed.
- **Documentation:** Updated `README.md` with static group routes, approved ordering, contacts/print surface, and the registration-versus-course-card boundary; synchronized TASK-021 merge evidence.
- **Security/privacy:** All page content is build-time approved JSON. Contact links leave the static site directly without forms or storage; no analytics, tracking, runtime API, identity data, or course/offering registration target was added.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; started from merged PR #29 on current `main`, verified TASK-021 dependency, preserved unrelated local files, and kept the PR target as `main` without automatic merge.
- **Commit:** `29b4ed3` (`TASK-022 add program group course cluster`)
- **Pull request:** [#30](https://github.com/idubi/sederot-course-catalog/pull/30)

## Completion record

- **Completed by:** Codex after owner approval
- **Completed at:** 2026-07-22
- **Notes:** PR #30 was approved and merged to `main` as `ed6727f`.
