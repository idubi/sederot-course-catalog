# TASK-002: Reconcile authoritative documentation and registration flow

- **Status:** Ready for review
- **Phase:** Documentation
- **Branch:** `task/002-documentation-baseline`
- **Depends on:** `TASK-001`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Consolidate the Markdown design hierarchy, program-level registration flow, repository structure, and regenerated backlog.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [ ] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] All authoritative Markdown sources agree; retired design DOCX references are absent; every task/reference path validates.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Replaced the design DOCX set with canonical Markdown references; reconciled the program-level registration flow; rebuilt TASK-002 through TASK-033 while retaining TASK-001.
- **Tests:** 51 Markdown files and 33 task forms audited; relative links and dependency order passed; stale design-DOCX/non-canonical-SDD searches returned no matches; `git diff --check` passed.
- **Documentation:** Updated canonical SDD, v1.0 baseline, v1.1 extension, detailed design, use cases, bootstrap guidance, repository instructions, master backlog, and task forms.
- **Security/privacy:** Registration audience remains self-declared and unverified; no personal data, tracking, course-level registration, or unsafe URL construction introduced; `.env` excluded.
- **Skill compliance:** Development, git, deployment, brainstorming, content-import, and skill-creator guidance followed. Automated skill validation was unavailable because the validator environment lacks the `yaml` Python module; affected skill changes were manually reviewed.
- **Commit:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** The actual current course-content DOCX is not present at the documented path. TASK-008 must locate it or record an explicitly approved replacement input contract before parser work. Design Markdown files are not importer inputs.
