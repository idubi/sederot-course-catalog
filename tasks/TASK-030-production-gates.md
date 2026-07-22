# TASK-030: Enforce production build and content gates

- **Status:** Ready for review
- **Phase:** Release
- **Branch:** `task/030-production-gates`
- **Depends on:** `TASK-019`, `TASK-028`, `TASK-029`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Run content validation, Astro checks, tests, build, link checks, and dist exclusion checks.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [ ] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] A failing gate blocks deployment and local/source artifacts never ship.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added the canonical `npm run production:gate` sequence and a deterministic production-artifact verifier for generated links, anchors, URL schemes, local/source exclusions, and course-level registration-target leakage. Added a GitHub Actions required-gate candidate for every pull request and push to `main`; the validated `dist/` artifact uploads only after all gates pass.
- **Tests:** `npm run production:gate` passed: approved content validated; Astro checked 66 files with 0 errors, warnings, or hints; Vitest passed 78/78 tests across 19 files; five static pages built; the artifact verifier checked 6 files, 5 HTML pages, and 22 links; Playwright passed 5/5 Chromium flows. Focused Prettier and ESLint checks passed for new gate files; `npm audit --omit=dev --audit-level=high` found 0 vulnerabilities after a sandbox DNS retry; `git diff --check` passed.
- **Documentation:** Updated `README.md` with the canonical gate and artifact-verification commands, enforced sequence, CI triggers, exclusions, and short-lived validated artifact behavior. Synchronized TASK-029 merge closure and the master checklist.
- **Security/privacy:** The verifier rejects HTTP and unknown URL schemes, editor APIs/tooling, drafts, diagnostics, source documents, source maps, and TypeScript/Astro sources in `dist`; it also fails if an enabled registration target reaches a generated course page. CI permissions are read-only and no runtime API, authentication, analytics, tracking, personal-data storage, or offering-level registration field was added.
- **Skill compliance:** Followed development-lifecycle and git-task-workflow instructions; started from synchronized `main` at TASK-029 merge commit `1fec38e`; used the required task branch; preserved user-owned `content/approved/catalog.json`, `.vscode/`, and `instractions`; and kept the approved JSON as the sole production input. No blocking source conflict or missing canonical task dependency was found; the consolidated registration decision supersedes older offering-level wording.
- **Commit:** Pending
- **Pull request:** Pending

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
