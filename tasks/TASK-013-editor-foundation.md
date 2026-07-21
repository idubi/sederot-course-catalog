# TASK-013: Create local-only content editor foundation

- **Status:** Ready for review
- **Phase:** Editor
- **Branch:** `task/013-editor-foundation`
- **Depends on:** `TASK-006`, `TASK-007`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Create the loopback-only editor/API boundary and local application shell.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Editor runs only locally, binds to 127.0.0.1, and is absent from production output.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added an exact-pinned React/Vite development stack and a separate `tools/content-editor/` application with a Hebrew RTL, mobile-first shell. `npm run editor` serves the editor on the explicit IPv4 loopback host `127.0.0.1`; a Vite middleware supplies the initial local Node API boundary at `GET /api/health`, while all unimplemented API routes fail closed. Editor build output is isolated under ignored `tools/content-editor/.local-dist/`. JSON load/save/export remains intentionally scoped to TASK-014.
- **Tests:** `npm run check` passed: Astro checked 30 files twice with 0 errors, warnings, or hints; ESLint and Prettier passed; Vitest passed 33/33 tests across 8 files; approved-content validation passed; and the Astro static build produced one page. The editor test suite verifies the exact loopback host, deterministic no-cache health response, and non-interception of public routes. A live `npm run editor -- --port 4313` smoke test reported only `http://127.0.0.1:4313/`; `GET /api/health` returned HTTP 200 with the expected loopback-only payload and `Cache-Control: no-store`. A standalone Vite editor build succeeded, and assertions confirmed both build artifacts exist separately, the editor build is ignored, and no editor/API/draft/diagnostic marker appears in public `dist`. `npm install` audited 435 packages with 0 vulnerabilities; `git diff --check` passed.
- **Documentation:** Updated `README.md` with the local editor command, current health-only API scope, TASK-014 boundary, loopback restriction, separate output path, and production exclusion; synchronized merged TASK-006, TASK-007, and TASK-012 evidence plus the master checklist.
- **Security/privacy:** The editor and API bind to `127.0.0.1`, emit no telemetry, store no personal data, and are not Astro routes. The API returns no catalog data in this foundation task and sends no-cache JSON responses. No course/offering registration field or target was introduced, and the public artifact contains no editor, API, draft, or diagnostic content.
- **Skill compliance:** Followed development-lifecycle, content-import, and git-task-workflow instructions; confirmed dependencies in `main` at TASK-006 merge `148a913` and TASK-007 merge `ac232fb`; preserved approved JSON as the sole production input; and left user-owned `.vscode/` and `instractions` unchanged. No design conflict blocks the task: the current consolidated SDD supersedes older offering-registration wording and the implementation follows its program/group boundary.
- **Commit:** `59a6d70` (`TASK-013 establish local content editor`)
- **Pull request:** [#21](https://github.com/idubi/sederot-course-catalog/pull/21), targeting `main`, awaiting review; no automatic merge requested.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
