# TASK-003: Create Astro static-site foundation

- **Status:** Ready for review
- **Phase:** Foundation
- **Branch:** `task/003-astro-foundation`
- **Depends on:** `TASK-002`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Create the dependency-light Astro project, RTL shell, static output configuration, and direct-file/GitHub Pages compatibility strategy.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] The static shell builds, renders Hebrew RTL, and has no runtime backend.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added pinned Astro 7.1.3 static configuration, strict TypeScript baseline, accessible Hebrew RTL layout, mobile-first/print-safe landing shell, and robots policy. Preserved the legacy root questionnaire while establishing `src/` -> `dist/` as the catalog build path.
- **Tests:** Root build and `PUBLIC_BASE_PATH=/sderot-course-catalog/` build passed. Generated `dist/index.html` assertions confirmed Hebrew RTL, main landmark, no scripts, and no absolute asset references. `npm audit --omit=dev --audit-level=high` found 0 vulnerabilities; `git diff --check` passed.
- **Documentation:** Rewrote `README.md` for Astro development/build commands, legacy questionnaire status, direct-file shell limits, GitHub Pages base-path configuration, and fixed architecture constraints.
- **Security/privacy:** Static output contains no runtime backend, client script, analytics, authentication, personal-data collection, or registration behavior. Development server binds to `127.0.0.1`.
- **Skill compliance:** Development-lifecycle and git-task-workflow instructions followed; dependency TASK-002 merge commit `5c1fcd1` was verified before branching.
- **Commit:** `b0af852` (`feat: establish TASK-003 Astro foundation`)
- **Pull request:** [#10](https://github.com/idubi/sederot-course-catalog/pull/10), targeting `main`, awaiting review; no automatic merge requested.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Opening `dist/index.html` directly is supported for the current self-contained shell. Future nested routes require static HTTP hosting for reliable browser navigation; this limitation and the GitHub Pages subpath strategy are documented in `README.md`.
