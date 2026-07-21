# TASK-020: Build the public application shell and view models

- **Status:** Complete
- **Phase:** Public UI
- **Branch:** `task/020-catalog-foundation`
- **Depends on:** `TASK-007`, `TASK-019`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Implement RTL layouts, approved-content loading, static generation, and program/group/course view models.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] No draft/source/editor content enters the public bundle.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added pure approved-catalog view-model builders for program summaries, audience groups, and contextual offerings; deterministic offering order; image override/default resolution; and an approved-content-driven, mobile-first RTL public home shell with program/group/offering counts.
- **Tests:** Type checking passed for 49 files with 0 diagnostics; Vitest passed 64/64 tests across 16 files; approved content validation and static build passed. Production assertions confirmed `dist/index.html` exists and contains no draft, diagnostics, editor, importer/source-reader, or registration-target content.
- **Documentation:** Updated `README.md` with the build-time-only approved JSON and public view-model contract, current no-client-JavaScript shell, and TASK-021–TASK-024 boundaries; synchronized TASK-019 merge evidence.
- **Security/privacy:** Public view models intentionally omit registration targets from offerings. The shell adds no client persistence, runtime fetch, API, analytics, tracking, authentication, or personal data; approved JSON remains the only input.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; started from merged PR #27 on current `main`, verified dependencies, preserved the unrelated approved-content edit and untracked user files, and kept the PR target as `main` without automatic merge.
- **Commit:** `7986491` (`TASK-020 add public catalog foundation`)
- **Pull request:** [#28](https://github.com/idubi/sederot-course-catalog/pull/28), approved and merged to `main` as `962aec6`.

## Completion record

- **Completed by:** Codex after explicit owner approval
- **Completed at:** 2026-07-22
- **Notes:** Public shell and approved-content view models are merged and available to TASK-021.
