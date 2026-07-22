# TASK-015: Edit programs and audience groups

- **Status:** Complete
- **Phase:** Editor
- **Branch:** `task/015-editor-program-groups`
- **Depends on:** `TASK-014`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Provide forms for program, grade, self-declared gender/audience, schedule, and group ordering.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Program/group edits preserve references and reflect the public selection funnel.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added structured RTL forms for program ID/name/category and audience-group program, grades, self-declared gender/audience, day, start/end time, and ordering. Program ID changes cascade to group references; group ID changes cascade to offering references; form edits update the same autosaved JSON used by TASK-014.
- **Tests:** `npm run check` passed: 35 files checked twice with 0 errors, warnings, or hints; ESLint/Prettier passed; Vitest passed 39/39 tests across 10 files; approved content validated; static build produced one page. New tests cover program/group reference cascades and ordering boundaries.
- **Documentation:** Synchronized TASK-014 merge evidence and the master checklist; form labels directly document the selection-funnel fields in the local UI.
- **Security/privacy:** Gender/audience remains a self-declared catalog navigation value, not personal data. No registration target or action was added to courses/offerings; editor code remains outside production.
- **Skill compliance:** Followed development-lifecycle, content-import, and git-task-workflow; verified TASK-014 merge `46aebba`; preserved unrelated `.vscode/` and `instractions`.
- **Commit:** `cbb3674` (`TASK-015 add program group editor`)
- **Pull request:** [#23](https://github.com/idubi/sederot-course-catalog/pull/23), approved and merged to `main` as `c8d5d75`.

## Completion record

- **Completed by:** Codex after explicit owner approval
- **Completed at:** 2026-07-21
- **Notes:** Program and audience-group editing is merged and available to TASK-016.
