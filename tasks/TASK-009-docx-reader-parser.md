# TASK-009: Implement source-specific document reader

- **Status:** Ready for review
- **Phase:** Import
- **Branch:** `task/009-docx-reader-parser`
- **Depends on:** `TASK-006`, `TASK-008`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Read the approved current course source and preserve paragraphs, tables, headings, lists, and source locations.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Known source structures are extracted losslessly enough for mapping and uncertain structures are surfaced.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Recorded the owner's explicit blueprint replacement contract; added a fixed-path, hash-pinned UTF-8 Markdown reader that retains every raw line with one-based line/column and zero-based offsets; classifies headings, images, list items with depth, paragraphs, table rows, and blank lines; preserves unknown/mixed structures; and reconstructs the exact source. Added `npm run content:read-source` to atomically regenerate the deterministic local snapshot at `content/draft/source-reader/blueprint-document.json` after approved source changes.
- **Tests:** `npm run check` passed: Astro checked 18 files twice with 0 errors, warnings, or hints; ESLint and Prettier passed; Vitest passed 18/18 tests across 4 files; approved-content validation passed; and the static build produced one page. Reader tests verified the approved source path/hash, exact reconstruction, stable offsets, all 26 group headings, headings, nested lists, paragraphs, tables, instructor labels, temporary names, and the mixed image/heading line. Two snapshot generations produced identical SHA-256 `16c03f2b9d90c5a4f3dec9ea640f53c2e7f91d6c982ef3821fa27965f53db238`; Git-ignore and production-artifact exclusion assertions passed; `git diff --check` passed.
- **Documentation:** Updated `README.md`, `artifacts/content-import.md`, and the TASK-008 investigation with the approved canonical source, immutable hash, reconstruction command/location, structural contract, preservation rules, and go decision; closed TASK-008 and synchronized the master checklist.
- **Security/privacy:** Generated source snapshots remain under ignored `content/draft/`, are never production inputs, and were confirmed absent from `dist`; no personal data, runtime API, registration behavior, or course/offering registration target was added.
- **Skill compliance:** Followed development-lifecycle, content-import, and git-task-workflow instructions; started from synchronized `main` at TASK-008 merge commit `4faee55`; preserved raw/unmatched source text and user-owned `.vscode/` and `instractions`; added exact-pinned Node types; and kept approved JSON as the only production input.
- **Commit:** `d2245a4` (`TASK-009 add approved blueprint reader`)
- **Pull request:** [#16](https://github.com/idubi/sederot-course-catalog/pull/16), targeting `main`, awaiting review; no automatic merge requested.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
