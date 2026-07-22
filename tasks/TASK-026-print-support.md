# TASK-026: Implement RTL print and PDF support

- **Status:** Ready for review
- **Phase:** Public UI
- **Branch:** `task/026-print-support`
- **Depends on:** `TASK-022`, `TASK-023`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Create printable program/course views and print CSS without interactive controls.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Printed output is readable RTL and matches approved content.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added `/print` as a static RTL print view that selects only approved embedded group/offering IDs from the URL. Group actions print the full course cluster; contextual course details can print one offering. The view includes center/program context, academic year, schedule, course metadata, sanitized descriptions, and a generation date, with an explicit browser print/save-as-PDF action and invalid-context message.
- **Tests:** Type checking passed for 60 files with 0 diagnostics; ESLint and focused Prettier checks passed; Vitest passed 70/70 tests across 18 files; approved-content validation and the five-page static build passed. Output assertions confirmed approved group/offering data, group and course print links, A4/print CSS, print action, absence of registration/contact targets in print content, and `git diff --check`.
- **Documentation:** Updated `README.md` with group/course print scope, printed fields, A4 control hiding and page-break behavior, and browser-only PDF generation; synchronized TASK-025 approved merge evidence.
- **Security/privacy:** The small client script only compares URL IDs with approved content already embedded at build time and invokes the browser print dialog. It performs no network request, server PDF generation, storage, tracking, authentication, registration, or contact action.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; verified PR #33 merged, branched from updated `main`, verified TASK-022/TASK-023 dependencies, preserved unrelated local files, and kept the PR target as `main` without automatic merge.
- **Commit:** `7a90223` (`TASK-026 add RTL print support`)
- **Pull request:** [#34](https://github.com/idubi/sederot-course-catalog/pull/34)

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
