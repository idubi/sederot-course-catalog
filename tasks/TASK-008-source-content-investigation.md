# TASK-008: Identify and map the current course-content source

- **Status:** In progress
- **Phase:** Import
- **Branch:** `task/008-source-content-investigation`
- **Depends on:** `TASK-002`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Locate the actual current-format course-source DOCX or record an explicitly approved replacement input contract; map the blueprint and registration references without treating design Markdown as importer input.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [ ] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] A source inventory, structural map, gaps, and go/no-go decision are recorded without changing the source.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Inventoried every repository source candidate; verified that the named `content-source/תשפז - חוברת קורסים פתיחת שנה(2).docx` and all other DOC/DOCX files are absent; classified the blueprint, prior-year PDF, design Markdown, and two external-directory shortcuts; mapped expected source semantics; and recorded a no-go decision plus explicit unblock conditions without modifying or substituting a source.
- **Tests:** `npm run check` passed: Astro checked 15 files twice with 0 errors, warnings, or hints; ESLint and Prettier passed; Vitest passed 14/14 tests across 3 files; approved seed validation passed; and the static build produced one page. Shell assertions confirmed the canonical DOCX path is absent, the repository contains zero DOC/DOCX files outside excluded dependency/Git trees, the report contains the no-go decision and 14/12 group-page comparison, and no course/offering registration target was introduced. `git diff --check` passed.
- **Documentation:** Added `artifacts/TASK-008-source-content-investigation.md` with the expected source, inventory and hashes, expected semantic map, unavailable structural evidence, replacement-contract requirements, and go/no-go decision; synchronized the master checklist state.
- **Security/privacy:** Read-only metadata and hash inspection only; no source content was copied into production, no personal data or secret was added, registration remains program/group-level, and untracked `.vscode/`, `instractions`, and the root shortcut were preserved unchanged.
- **Skill compliance:** Followed development-lifecycle, content-import, and git-task-workflow instructions; verified TASK-002 merge commit `5c1fcd1` and current `main` at `ac232fb`; branched from synchronized `main`; treated design Markdown only as requirements; and did not infer an unapproved replacement contract.
- **Commit:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
