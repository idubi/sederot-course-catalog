# TASK-029: Add end-to-end program and editor flows

- **Status:** Complete
- **Phase:** Quality
- **Branch:** `task/029-end-to-end-tests`
- **Depends on:** `TASK-012`, `TASK-017`, `TASK-027`, `TASK-028`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Test selection → group → course → back and group → registration information → external link, plus editor approval.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] All critical flows pass against production-like static output.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added pinned Playwright/Chromium E2E infrastructure with managed production-preview and loopback-editor servers. Added five Chromium flows covering selection → group → course → same-group back, group → registration information → approved external target → same-group close, 320px overflow/keyboard basics, approved print rendering, and editor approved-content load/validation without save or export.
- **Tests:** `npm run test:e2e` built the production-like static site (65 files, 0 diagnostics; five routes) and Playwright passed 5/5 Chromium flows. Vitest regression passed 78/78 tests across 19 files; standalone typecheck, ESLint, focused Prettier, and `git diff --check` passed. Dependency installation audited 453 packages with 0 vulnerabilities. Localhost server execution required sandbox escalation as expected.
- **Documentation:** Updated `README.md` with E2E/install commands, ports, covered flows, no-write editor boundary, and ignored report locations; synchronized TASK-028 approved merge evidence.
- **Security/privacy:** The browser suite uses only loopback servers. It inspects but does not follow the external registration URL, clears only browser-local editor state, and invokes only editor load/validate APIs—never draft save or approved export—so repository content is not changed. No production runtime behavior was added.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; verified PR #36 merged, branched from updated `main`, verified TASK-012/TASK-017/TASK-027/TASK-028 dependencies, preserved unrelated local files, and kept the PR target as `main` without automatic merge.
- **Commit:** `13c37ae` (`TASK-029 add end-to-end browser flows`)
- **Pull request:** [#37](https://github.com/idubi/sederot-course-catalog/pull/37) merged into `main` at commit `1fec38e62bbf98dbd6a7660bb12260a0d74f21af` on 2026-07-22.

## Completion record

- **Completed by:** Codex, with human review and merge approval
- **Completed at:** 2026-07-22
- **Notes:** Human approval and merge were confirmed before TASK-030 started from synchronized `main`.
