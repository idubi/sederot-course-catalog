# TASK-010: Normalize programs, groups, courses, and offerings

- **Status:** In progress
- **Phase:** Import
- **Branch:** `task/010-import-normalization`
- **Depends on:** `TASK-005`, `TASK-009`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Map source content into stable program-first entities and contextual offerings while preserving raw text.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [ ] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Shared courses deduplicate safely and group assignments remain traceable.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added deterministic blueprint normalization into program-first draft entities: 2 programs, 26 source-derived audience groups, 34 exact-name courses, and 151 contextual offerings. Stable IDs are derived without transliterating or discarding Hebrew; grades and ranges, schedules, explicit audiences, temporary-name markers, display order, and every source assignment retain raw line/location evidence. Only exact whitespace-normalized names deduplicate; possible variants remain separate for TASK-011 diagnostics. Unconsumed source nodes are retained rather than discarded. Added `npm run content:normalize-source` to atomically write the ignored draft at `content/draft/import/normalized-catalog.json`.
- **Tests:** `npm run check` passed: Astro checked 21 files twice with 0 errors, warnings, or hints; ESLint and Prettier passed; Vitest passed 22/22 tests across 5 files; approved-content validation passed; and the static build produced one page. Normalizer tests verified 2 programs, 26 unique groups, 34 courses, 151 traceable offerings, exact-only deduplication, 24 retained social-course assignments, preserved near-duplicate museum titles, grade ranges, combined audiences, unmatched nodes, and absence of registration fields on courses/offerings. Two normalization runs produced identical SHA-256 `5cdce39d9593ccc951ceef641c6c72e7a1bcf56814cffd52a85da8f98b65d5f9`; Git-ignore and production-artifact exclusion assertions passed; `git diff --check` passed.
- **Documentation:** Updated `README.md` and `artifacts/content-import.md` with the normalization command, fixed draft location, exact-deduplication boundary, traceability behavior, and production exclusion; synchronized TASK-009 closure and the master checklist. Updated Prettier exclusions to respect the existing local-only draft/diagnostic content boundary.
- **Security/privacy:** The draft and retained raw evidence stay under ignored `content/draft/` and were confirmed absent from `dist`; no personal data, runtime API, registration behavior, or registration field on a course/offering was introduced. Approved JSON remains the sole production input.
- **Skill compliance:** Followed development-lifecycle, content-import, and git-task-workflow instructions; verified TASK-005 and merged TASK-009 dependencies; branched from synchronized `main` at `94323f0`; preserved uncertain and unmatched text, avoided speculative near-duplicate merges, and left user-owned `.vscode/` and `instractions` unchanged.
- **Commit:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
