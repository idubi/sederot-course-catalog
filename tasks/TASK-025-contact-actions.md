# TASK-025: Implement contextual contact actions

- **Status:** Complete
- **Phase:** Public UI
- **Branch:** `task/025-contact-actions`
- **Depends on:** `TASK-022`, `TASK-023`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Add accessible phone, WhatsApp, and email links with approved non-sensitive context.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Links are valid and no user data is stored.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added a reusable accessible ContactActions component and pure URL builder for phone, WhatsApp, and email. Group pages prefill approved program/grade context; course pages additionally include the contextual course name. Visible contact values remain copyable, and external WhatsApp navigation uses safe link attributes.
- **Tests:** Type checking passed for 59 files with 0 diagnostics; ESLint and focused Prettier checks passed; Vitest passed 70/70 tests across 18 files, including phone normalization, WhatsApp URL/context, and email subject/body coverage; approved-content validation and the four-page static build passed. Output assertions confirmed tel/WhatsApp/mailto links, safe external-link attributes, course context, absence of forms and course registration targets, and `git diff --check`.
- **Documentation:** Updated `README.md` with contact surfaces, approved non-sensitive context, direct device-app behavior, and the no-storage boundary; synchronized TASK-024 approved merge evidence.
- **Security/privacy:** Only approved catalog contact data and public program/course labels are encoded in links. The static site does not accept, transmit through a server, log, or store user-entered data; no form, runtime API, tracking, authentication, or registration behavior was introduced.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; verified PR #32 merged, branched from updated `main`, verified TASK-022/TASK-023 dependencies, preserved unrelated local files, and kept the PR target as `main` without automatic merge.
- **Commit:** `b44091a` (`TASK-025 add contextual contact actions`)
- **Pull request:** [#33](https://github.com/idubi/sederot-course-catalog/pull/33)

## Completion record

- **Completed by:** Codex after owner approval
- **Completed at:** 2026-07-22
- **Notes:** PR #33 was approved and merged to `main` as `ad1e2fb`.
