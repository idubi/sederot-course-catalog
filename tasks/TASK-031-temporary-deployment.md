# TASK-031: Deploy validated main to temporary hosting

- **Status:** Complete
- **Phase:** Deployment
- **Branch:** `task/031-temporary-deployment`
- **Depends on:** `TASK-030`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Deploy only reviewed main artifacts, capture evidence, smoke-test the complete program flow, and record rollback.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Temporary HTTPS release passes smoke tests and rollback is documented.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Extended the production workflow with GitHub Pages artifact and deployment jobs that run only for a push to `main` after `production-gates` succeeds. The job rebuilds the exact gated commit for `/sderot-course-catalog/`, verifies it, deploys only `dist/`, and runs a catalog-aware remote HTTPS smoke script across home, group, course, registration-information, and print routes. PR #39 merged at `dc0818243a8f7c7ac741a80c471f8a1366e19d41`; Pages publishing changed from the legacy root questionnaire to the reviewed Actions workflow, while the preserved root `index.html` remains unchanged in Git.
- **Tests:** `npm run production:gate` passed: approved content validated; Astro checked 67 files with 0 diagnostics; Vitest passed 78/78 tests across 19 files; five pages built; 6 artifact files, 5 HTML pages, and 22 links passed production verification; Playwright passed 5/5 Chromium flows. A separate `PUBLIC_BASE_PATH=/sderot-course-catalog/` build passed and generated base-prefixed links; its production verifier passed the same 6 files, 5 pages, and 22 links. Merged-main workflow run [#29882478536](https://github.com/idubi/sederot-course-catalog/actions/runs/29882478536) passed production gates, Pages artifact creation, deployment, and remote smoke for commit `dc08182`. An independent `npm run deployment:smoke -- https://idubi.github.io/sederot-course-catalog/` also passed home, group, course, registration, and print over HTTPS.
- **Documentation:** Added `artifacts/deployment-runbook.md` with the temporary environment, required evidence, emergency known-good redeploy, durable reviewed revert/fix, and prohibited bypasses. Updated `README.md` with the Pages URL, gated deployment behavior, smoke command, and runbook pointer; synchronized TASK-030’s approved merge and the master checklist.
- **Security/privacy:** Deployment permissions are job-scoped: artifact creation has read-only contents access; only the final Pages job receives `pages: write` and `id-token: write`. Pull requests cannot deploy. The smoke script requires HTTPS and confirms the external registration target appears on the registration-information page but not the course page. Only static `dist/` is uploaded; the editor, questionnaire source, drafts, diagnostics, APIs, personal data, authentication, analytics, and tracking are excluded.
- **Skill compliance:** Followed deployment, development-lifecycle, and git-task-workflow instructions; verified PR #38 and its gate, synchronized `main` at `9916ff9`, and created `task/031-temporary-deployment`. Publication occurred only after human approval and PR #39 merge. The deployed commit, workflow, Pages URL, automated/independent smoke, and rollback runbook are recorded; user-owned local files remained excluded.
- **Commit:** `0f370d3` (`TASK-031 add gated temporary deployment`)
- **Pull request:** [#39](https://github.com/idubi/sederot-course-catalog/pull/39)

## Completion record

- **Completed by:** Codex, with human review and merge approval
- **Completed at:** 2026-07-22
- **Notes:** The validated catalog is live at `https://idubi.github.io/sederot-course-catalog/`. This is the first catalog release; the pre-release fallback is the preserved legacy root questionnaire, and future catalog rollbacks use the most recent known-good gated Pages workflow run as documented in `artifacts/deployment-runbook.md`.
