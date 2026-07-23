# TASK-024: Implement registration-information and external-link flow

- **Status:** Complete
- **Phase:** Public UI
- **Branch:** `task/024-registration-information`
- **Depends on:** `TASK-017`, `TASK-022`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Create /programs/[groupId]/registration, group/program target resolution, close/back, and approved external CTA.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Information always precedes external navigation; close/back restores the same group.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added a build-time registration resolver that selects the audience-group target before the program default and never consults courses or offerings. Added one static information page per approved group with program context, external-handoff and privacy guidance, same-group close/back actions, and the sole approved external registration CTA.
- **Tests:** Type checking passed for 56 files with 0 diagnostics; ESLint and focused Prettier checks passed; Vitest passed 68/68 tests across 17 files, including group-target precedence and program fallback coverage; approved-content validation and the static build passed with four pages. Output assertions confirmed the information route, safe external-link attributes, same-group close action, and that the external URL appears on neither the group page nor course details; `git diff --check` passed.
- **Documentation:** Updated `README.md` with the mandatory internal information route, resolution precedence, external-link boundary, same-group return behavior, and no-data-collection statement; synchronized TASK-023 approved merge evidence.
- **Security/privacy:** Only an enabled HTTPS URL already accepted by the approved-content schema reaches the static information page. The external link uses `noopener noreferrer`; no personal data, callback, tracking, storage, authentication, payment handling, or runtime API was added.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; verified PR #31 merged, branched from updated `main`, verified TASK-017 and TASK-022 dependencies, preserved unrelated local files, and kept the PR target as `main` without automatic merge.
- **Commit:** `4eedcde` (`TASK-024 add registration information flow`)
- **Pull request:** [#32](https://github.com/idubi/sederot-course-catalog/pull/32)

## Completion record

- **Completed by:** Codex after owner approval
- **Completed at:** 2026-07-22
- **Notes:** PR #32 was approved and merged to `main` as `dde89da`.
