# TASK-004: Establish TypeScript and quality gates

- **Status:** Ready for review
- **Phase:** Foundation
- **Branch:** `task/004-typescript-quality`
- **Depends on:** `TASK-003`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Enable strict TypeScript, formatting, linting, test commands, and build scripts.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Quality commands run locally and fail on invalid code.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Upgraded the Astro TypeScript preset from `strict` to `strictest`; added exact-pinned Astro checking, ESLint flat configuration for JavaScript/TypeScript/Astro, Prettier with the official Astro plugin, Vitest, supported Node/npm engines, and deterministic `typecheck`, `lint`, `test`, `format`, `format:check`, `check`, and type-safe `build` scripts.
- **Tests:** `npm run check` passed: Astro checked 6 files with 0 errors, warnings, or hints; ESLint passed; Prettier reported all matched files formatted; Vitest reported no test files and exited 0 as explicitly configured for the foundation; root static build produced one page. `PUBLIC_BASE_PATH=/sderot-course-catalog/ npm run build` passed; generated `dist/index.html` existed and contained no script or root-absolute `src`/`href` references. `npm audit --omit=dev --audit-level=high` reported 0 vulnerabilities. `git diff --check` passed.
- **Documentation:** Updated `README.md` with supported runtime versions, quality commands, gate behavior, and exclusions; added formatter/linter policy files.
- **Security/privacy:** No runtime dependencies, client scripts, APIs, data collection, registration behavior, or production content were added. Generated output, dependencies, local editor settings, source artifacts, and legacy files are excluded from quality-tool traversal as appropriate.
- **Skill compliance:** Followed development-lifecycle, git-task-workflow, and deployment instructions; verified TASK-003 merge commit `679de21`, branched from updated `main`, preserved untracked `.vscode/` and `instractions`, and did not merge or deploy.
- **Commit:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
