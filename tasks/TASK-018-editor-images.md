# TASK-018: Manage general and offering-specific images

- **Status:** Ready for review
- **Phase:** Editor
- **Branch:** `task/018-editor-images`
- **Depends on:** `TASK-016`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Upload/validate images, alt text, stable paths, and offering override precedence.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Images stay inside approved asset paths and missing images remain valid.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added local course-default and offering-override upload controls, deterministic public asset paths, effective-image preview, and the `imageOverride ?? defaultImage ?? undefined` resolver. Missing optional images remain valid.
- **Tests:** Type checking passed for 43 files with 0 diagnostics; Vitest passed 55/55 tests across 13 files; approved content validation, static build, local editor build, focused formatting, and `git diff --check` passed. Tests cover safe deterministic writes, type/ID rejection, approved JSON paths, and override/default/none precedence.
- **Documentation:** Updated `README.md` with accepted formats, size limit, stable paths, update-on-success behavior, precedence, and optional no-image behavior; synchronized TASK-016/TASK-017 merge evidence.
- **Security/privacy:** Uploads are loopback-only, capped at 5 MiB, restricted to JPEG/PNG/WebP, checked by MIME signature, and named only from validated kebab-case entity IDs under `public/content/images`. SVG and user-controlled paths are rejected; no registration or user data was added.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow; started from merged PR #25 on current `main`, verified TASK-016 dependency merge, preserved the unrelated approved-content edit and untracked user files, and kept the PR target as `main` without automatic merge.
- **Commit:** `fdd2ce1` (`TASK-018 add managed image uploads`)
- **Pull request:** [#26](https://github.com/idubi/sederot-course-catalog/pull/26), targeting `main`, awaiting review; no automatic merge requested.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
