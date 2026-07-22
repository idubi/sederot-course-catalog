# TASK-033: Complete MVP acceptance and handoff

- **Status:** Acceptance blocked — real approved content and owner approval required
- **Phase:** Release
- **Branch:** `task/033-mvp-acceptance`
- **Depends on:** `TASK-032`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Execute acceptance criteria, content-owner review, accessibility/print verification, and operational handoff.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [ ] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [ ] Every Must use case and acceptance criterion has recorded evidence and approval.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Audited every Must use case and assembled the final acceptance and operational handoff. Technical behavior, tooling, production gates, and temporary deployment have evidence; TASK-032 was explicitly waived/deferred by the owner. Final public-content acceptance is blocked because the sole committed production input is still the explicit non-production seed fixture with placeholder contacts and an `.invalid` registration target.
- **Tests:** `npm run production:gate` passed: approved seed validation; Astro checked 67 files twice with 0 errors, warnings, or hints; Vitest passed 78/78 tests across 19 files; five static pages built; production verification passed 6 files, 5 HTML pages, and 22 links; Playwright passed 5/5 Chromium flows. Final independent `npm run deployment:smoke -- https://idubi.github.io/sederot-course-catalog/` passed home, group, course, registration, and print over HTTPS. These prove technical behavior, not business approval of the seed content.
- **Documentation:** Added `artifacts/mvp-acceptance-handoff.md` with the release decision, Must-use-case matrix, accessibility/print boundaries, operational commands, and exact content-owner actions required to unblock approval.
- **Security/privacy:** No placeholder value was silently treated as approved business content. No authentication, database, analytics, tracking, personal-data collection, or course/offering registration target was added. The temporary static preview remains technically safe but must not be represented as approved council content.
- **Skill compliance:** Followed development-lifecycle and deployment evidence rules; synchronized `main` at PR #40 merge `7e90871`, created the required TASK-033 branch, preserved user-owned local files, and refused to claim content-owner approval that has not occurred.
- **Commit:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending content-owner approval
- **Completed at:** Not completed — acceptance blocked on 2026-07-22
- **Notes:** Technical preview acceptance can proceed, but MVP public-content approval cannot. Resume this branch after real approved JSON and explicit content-owner approval are available.
