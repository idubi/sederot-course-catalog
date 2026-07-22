# TASK-031: Deploy validated main to temporary hosting

- **Status:** Ready for review; deployment pending approved merge
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
- [ ] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [ ] Temporary HTTPS release passes smoke tests and rollback is documented.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Extended the production workflow with GitHub Pages artifact and deployment jobs that run only for a push to `main` after `production-gates` succeeds. The job rebuilds the exact gated commit for `/sderot-course-catalog/`, verifies it, deploys only `dist/`, and runs a catalog-aware remote HTTPS smoke script across home, group, course, registration-information, and print routes. The current Pages URL still serves the legacy root questionnaire; the reviewed TASK-031 merge intentionally changes the published artifact without deleting that preserved source file.
- **Tests:** `npm run production:gate` passed: approved content validated; Astro checked 67 files with 0 diagnostics; Vitest passed 78/78 tests across 19 files; five pages built; 6 artifact files, 5 HTML pages, and 22 links passed production verification; Playwright passed 5/5 Chromium flows. A separate `PUBLIC_BASE_PATH=/sderot-course-catalog/` build passed and generated base-prefixed links; its production verifier passed the same 6 files, 5 pages, and 22 links. Focused ESLint/Prettier and `git diff --check` passed. Remote HTTPS smoke and deployment evidence remain pending until the reviewed PR is merged to `main`.
- **Documentation:** Added `artifacts/deployment-runbook.md` with the temporary environment, required evidence, emergency known-good redeploy, durable reviewed revert/fix, and prohibited bypasses. Updated `README.md` with the Pages URL, gated deployment behavior, smoke command, and runbook pointer; synchronized TASK-030’s approved merge and the master checklist.
- **Security/privacy:** Deployment permissions are job-scoped: artifact creation has read-only contents access; only the final Pages job receives `pages: write` and `id-token: write`. Pull requests cannot deploy. The smoke script requires HTTPS and confirms the external registration target appears on the registration-information page but not the course page. Only static `dist/` is uploaded; the editor, questionnaire source, drafts, diagnostics, APIs, personal data, authentication, analytics, and tracking are excluded.
- **Skill compliance:** Followed deployment, development-lifecycle, and git-task-workflow instructions; verified PR #38 and its gate, synchronized `main` at `9916ff9`, and created `task/031-temporary-deployment`. The existing Pages endpoint and errored legacy root-source configuration were inspected read-only before selecting the already-provisioned target. No deployment or Pages setting was changed from the task branch; publication awaits human review, merge, and the gated `main` workflow. User-owned `content/approved/catalog.json`, `.vscode/`, and `instractions` remain excluded.
- **Commit:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
