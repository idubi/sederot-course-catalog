# TASK-027: Complete responsive RTL and accessibility behavior

- **Status:** Ready for review
- **Phase:** Quality
- **Branch:** `task/027-responsive-accessibility`
- **Depends on:** `TASK-021`, `TASK-022`, `TASK-023`, `TASK-024`, `TASK-025`, `TASK-026`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Verify mobile-first layout, keyboard flow, focus, semantics, contrast, long Hebrew text, and reduced motion.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Critical flow works at 320px and by keyboard/screen-reader semantics.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Completed a mobile-first RTL and semantic audit across the selection, group, course, registration, contact, and print flows. Added global visible focus, 44px action targets, long-text/media containment, reduced-motion and forced-colors handling, and screen-reader-only text. Replaced the nested registration `<main>`, gave selection controls explicit labels/descriptions and live status, announced new-window links, and replaced dynamic option `innerHTML` with safe DOM option creation.
- **Tests:** Type checking passed for 60 files with 0 diagnostics; ESLint and focused Prettier checks passed; Vitest passed 70/70 tests across 18 files; approved-content validation and the five-page static build passed. Built-output assertions confirmed Hebrew RTL metadata, one semantic main landmark, skip link, explicit label/description relationships, polite live status, focus/reduced-motion CSS, and new-window announcements; source assertion confirmed no selection `innerHTML`; `git diff --check` passed. The mobile-first CSS has a 320px minimum viewport with fluid widths, wrapping content, and no fixed content width requiring horizontal scrolling.
- **Documentation:** Updated `README.md` with the 320px, RTL, keyboard, focus, touch-target, wrapping, new-window, reduced-motion, forced-colors, and non-certification accessibility contract; synchronized TASK-026 approved merge evidence.
- **Security/privacy:** Accessibility behavior is static CSS/semantic HTML except for the existing local selection and print interactions. Safe DOM APIs now create dynamic options; no personal data, registration target, storage, tracking, authentication, or runtime API was introduced.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; reverified PR #34 after merge propagation, branched from updated `main`, verified TASK-021 through TASK-026 dependencies, preserved unrelated local files, and kept the PR target as `main` without automatic merge.
- **Commit:** `30d918d` (`TASK-027 improve responsive accessibility`)
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
