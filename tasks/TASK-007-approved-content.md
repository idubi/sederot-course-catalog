# TASK-007: Create approved content structure and seed fixture

- **Status:** Ready for review
- **Phase:** Content
- **Branch:** `task/007-approved-content`
- **Depends on:** `TASK-006`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Create approved/draft/diagnostic directories and a minimal program-first fixture.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Production consumes only approved catalog JSON and fixture validation passes.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added `content/approved/catalog.json` as a minimal, explicitly non-production program-first seed; local-only `content/draft/` and `content/diagnostics/` directory policies that ignore all payloads; a fixed-path approved catalog loader; a TypeScript validation CLI; exact-pinned `tsx`; and a mandatory `content:validate` step before every build. The loader exposes no configurable or draft path.
- **Tests:** `npm run check` passed: Astro checked 15 files with 0 errors, warnings, or hints; ESLint and Prettier passed; Vitest passed 14/14 tests across 3 files; approved seed validation reported 1 program, 1 audience group, 1 course, and 1 offering; root static build passed. `PUBLIC_BASE_PATH=/sderot-course-catalog/ npm run build` passed. Artifact assertions confirmed `dist/index.html`, no scripts/root-absolute links, and no draft/diagnostic paths, reserved `.invalid` destinations, or seed course data in `dist`. `git check-ignore --no-index` confirmed local draft and diagnostic payload paths are ignored. `npm audit --audit-level=high` reported 0 vulnerabilities after sandbox DNS retry. `git diff --check` passed.
- **Documentation:** Updated `README.md` with the approved validation command and content boundaries; updated `artifacts/content-import.md` with canonical repository paths, static loader behavior, build validation, local-only policies, and seed replacement requirement.
- **Security/privacy:** The seed uses reserved `.invalid` destinations and zero-value contact placeholders, contains no real registration/contact data, and has no offering registration field. Drafts and diagnostics (which may contain source excerpts) are ignored and excluded from the public artifact.
- **Skill compliance:** Followed development-lifecycle, git-task-workflow, deployment, and content-import instructions; verified TASK-006 merge commit `148a913`, branched from updated `main`, preserved the source-document boundary and untracked `.vscode/`/`instractions`, and did not merge or deploy.
- **Commit:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
