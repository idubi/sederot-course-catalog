# TASK-011: Produce draft content and structured diagnostics

- **Status:** In progress
- **Phase:** Import
- **Branch:** `task/011-import-diagnostics`
- **Depends on:** `TASK-010`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Emit draft JSON plus actionable warnings/errors with source locations and retained source text.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [ ] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] No uncertain value is silently discarded.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added deterministic import artifact generation through `npm run content:import-draft`. It writes the closest program-first draft to `content/draft/import/draft-catalog.json` and structured diagnostics to `content/diagnostics/import-diagnostics.json`. Diagnostics include severity, stable code, actionable message, capped excerpt, full source location, confidence, and entity reference when known. The current source produces 223 diagnostics: 34 unresolved course-detail warnings, 7 temporary-name warnings, 2 possible-duplicate warnings, and 180 substantive unmatched-node notices. Full raw unmatched content remains in the draft even when excerpts are capped.
- **Tests:** `npm run check` passed: Astro checked 24 files twice with 0 errors, warnings, or hints; ESLint and Prettier passed; Vitest passed 26/26 tests across 6 files; approved-content validation passed; and the static build produced one page. Diagnostic tests verified all required fields/ranges, expected uncertainty codes, the museum-title duplicate candidate, one unmatched diagnostic per substantive retained node, full preservation of the embedded long source line, capped excerpts, 151 retained offerings, and no registration field on courses/offerings. Two runs produced identical draft SHA-256 `5cdce39d9593ccc951ceef641c6c72e7a1bcf56814cffd52a85da8f98b65d5f9` and diagnostics SHA-256 `3cd41470a109cb7bbafc21323aec8fbc96693e097b9fd1b03dd43c748828d542`; Git-ignore and production-artifact exclusion assertions passed.
- **Documentation:** Updated `README.md` and `artifacts/content-import.md` with the import command, fixed local output locations, diagnostic contract, excerpt/full-text behavior, and production boundary; synchronized TASK-010 closure and the master checklist.
- **Security/privacy:** Drafts, source excerpts, and diagnostics remain in ignored local-only directories and were confirmed absent from `dist`; no personal data, runtime API, registration behavior, or registration field on a course/offering was introduced. Approved JSON remains the sole production input.
- **Skill compliance:** Followed development-lifecycle, content-import, and git-task-workflow instructions; verified and synchronized TASK-010 merge `64167d6`; preserved every uncertain/unmatched source fragment in the closest draft; and left user-owned `.vscode/` and `instractions` unchanged.
- **Commit:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
