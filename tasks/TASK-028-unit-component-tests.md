# TASK-028: Add unit and component coverage

- **Status:** Complete
- **Phase:** Quality
- **Branch:** `task/028-unit-component-tests`
- **Depends on:** `TASK-019`, `TASK-020`, `TASK-021`, `TASK-022`, `TASK-023`, `TASK-024`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Test selection, grouping, images, registration resolution, validation, cards, and registration information.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Correct flow and prohibited course registration regressions are covered.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added Astro's Vite test harness and five rendered-component tests for selection semantics, course cards without/with resolved images, contextual contact links, and the mandatory registration-information screen. Extended public-catalog unit coverage for course-image fallback, no-image behavior, and deterministic offering order. Assertions explicitly prohibit registration targets/actions from cards and course context.
- **Tests:** Type checking/build validation passed for 62 files with 0 diagnostics; ESLint and focused Prettier checks passed; Vitest passed 78/78 tests across 19 files, including all existing source/editor/importer suites and the five new Astro render tests; approved-content validation and the five-page static build passed; `git diff --check` passed. The aggregate formatting command still reports only the preserved user-edited `content/approved/catalog.json`, which is outside this test task and was not rewritten.
- **Documentation:** Updated `README.md` with the Astro-aware Vitest configuration, covered domain/component areas, and prohibited course-registration regression contract; synchronized TASK-027 approved merge evidence.
- **Security/privacy:** Tests use synthetic public labels and invalid/example destinations only. Production components remain unchanged; no registration field, personal data, storage, tracking, authentication, dependency, or runtime behavior was introduced.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; verified PR #35 merged, branched from updated `main`, verified TASK-019 through TASK-024 dependencies, preserved unrelated local files, and kept the PR target as `main` without automatic merge.
- **Commit:** `44b4c5e` (`TASK-028 add unit and component coverage`)
- **Pull request:** [#36](https://github.com/idubi/sederot-course-catalog/pull/36)

## Completion record

- **Completed by:** Codex after owner approval
- **Completed at:** 2026-07-22
- **Notes:** PR #36 was approved and merged to `main` as `846ae5d`.
