# TASK-014: Implement editor JSON load, save, and export

- **Status:** Ready for review
- **Phase:** Editor
- **Branch:** `task/014-editor-json-io`
- **Depends on:** `TASK-011`, `TASK-013`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Load draft/approved JSON, autosave locally, validate, and export approved JSON.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Errors block export; warnings require acknowledgement; writes stay inside repository paths.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added browser Local Storage autosave, approved/draft loading, JSON editing, validation, explicit draft save, warning acknowledgement, and approved export to the local RTL editor. Added a repository-confined file service with fixed approved/draft paths, 5 MiB request limits, atomic writes, strict shared-schema validation, deterministic serialization, and no partial export. The loopback API now implements `GET /api/catalog`, `POST /api/validate`, `PUT /api/catalog/draft`, and `POST /api/catalog/export` while retaining the health endpoint and fail-closed unknown routes.
- **Tests:** `npm run check` passed: Astro checked 32 files twice with 0 errors, warnings, or hints; ESLint and Prettier passed; Vitest passed 36/36 tests across 9 files; approved-content validation passed; and the static build produced one page. Six editor tests verify loopback behavior, no-cache health, public-route pass-through, repository-local draft round-trip, invalid-export non-mutation, warning acknowledgement, deterministic repeated exports, and trailing newline. Production assertions found no editor/API/draft/diagnostic/Local-Storage marker in `dist`; both local output paths are ignored; `git diff --check` passed.
- **Documentation:** Updated `README.md` and `artifacts/content-import.md` with editor autosave, endpoints, explicit-write behavior, fixed paths, atomicity, validation, warning acknowledgement, deterministic output, and production exclusion. Synchronized TASK-013 merge evidence and the master checklist.
- **Security/privacy:** File paths are server-owned constants and cannot be supplied by API clients; draft and approved writes remain inside the repository. Invalid content never changes approved JSON, requests are size-limited, responses are no-cache, and the API remains loopback-only. No authentication, telemetry, personal-data storage, runtime production API, or course/offering registration target was introduced.
- **Skill compliance:** Followed development-lifecycle, content-import, and git-task-workflow instructions; verified TASK-011 and TASK-013 dependencies merged, preserved approved JSON as the sole Astro input, kept drafts local-only, and left `.vscode/` and `instractions` untouched.
- **Commit:** `3a72700` (`TASK-014 add editor JSON persistence`)
- **Pull request:** [#22](https://github.com/idubi/sederot-course-catalog/pull/22), targeting `main`, awaiting review; no automatic merge requested.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
