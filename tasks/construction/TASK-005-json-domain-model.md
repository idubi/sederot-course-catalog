# TASK-005: Define program-first catalog domain model

- **Status:** Ready for review
- **Phase:** Data
- **Branch:** `task/005-json-domain-model`
- **Depends on:** `TASK-002`, `TASK-004`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Model Program, AudienceGroup, Course, CourseOffering, group/program RegistrationTarget, images, and contacts; prohibit offering registration targets.

## Domain-contract decision record

- **Problem and deadline:** Establish one compile-time contract before TASK-006 adds runtime schemas. The baseline examples conflict with the newer detailed design on root, image, academic-year, and relationship field names.
- **Confirmed constraints:** Programs own audience groups; offerings join courses to groups; registration targets belong only to groups or a program default; images resolve offering override -> course default -> none; IDs are stable lowercase kebab-case values; there is no course status or runtime data.
- **Assumptions and open questions:** `RegistrationTarget.type` remains an opaque string because no authoritative source defines allowed values. TASK-006 must decide its runtime non-empty-string validation without inventing an enum. HTML sanitization and referential validation also remain TASK-006 scope.
- **Alternatives considered:** (1) Preserve the older compact example (`groups`, scalar `academicYear`, `image.path`, `contacts`); (2) use the newer detailed contract (`audienceGroups`, structured `academicYear`, `defaultImage.src`, `audienceGroupId`, `siteConfig`); (3) support aliases for both. Aliases would weaken correctness and complicate import/editor code, while the older example loses the stable grade-group and academic-year structures required by later UI work.
- **Decision:** Use the newer detailed names and structures, except retain the consolidated SDD's explicit `contacts` root entity instead of the undefined `siteConfig` wrapper. Represent entity references with semantic ID aliases, keep arrays mutable for the local editor, and omit any registration field from `Course` and `CourseOffering`.
- **Trade-offs:** A single canonical shape improves type safety, maintenance, tests, and deterministic JSON. It requires importer normalization from older aliases, but avoids runtime ambiguity and has no accessibility, performance, privacy, or deployment cost.
- **Impact:** `artifacts/SDD.md` records the canonical field contract. TASK-006 schemas and referential tests must implement it; TASK-007 fixtures and later importer/editor/public tasks must consume it. No approved public behavior or architecture changes.
- **Owner and approval:** Codex recommendation derived from the authoritative source order; pending human review in the TASK-005 pull request. Final decision locations are this record and `artifacts/SDD.md`.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [x] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [x] Types encode group-level registration and contextual course membership.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** Added the canonical `Catalog`, `AcademicYear`, `Program`, `AudienceGroup`, `Course`, `CourseOffering`, `RegistrationTarget`, `ImageAsset`, and `Contacts` TypeScript contracts plus semantic ID/category/audience/semester aliases and a public type-only barrel. Offerings encode course-to-group membership through `courseId` and `audienceGroupId`; only groups and programs expose registration target references.
- **Tests:** `npm run check` passed: Astro checked 9 files with 0 errors, warnings, or hints; ESLint and Prettier passed; Vitest passed 3/3 domain tests; root static build passed. `PUBLIC_BASE_PATH=/sderot-course-catalog/ npm run build` passed and generated `dist/index.html` with no script or root-absolute `src`/`href` references. `npm audit --omit=dev --audit-level=high` reported 0 vulnerabilities. `git diff --check` passed. The first strict check intentionally exposed unsafe fixture array access; explicit guards were added and the complete gate rerun successfully.
- **Documentation:** Added the required domain-contract decision record to this task and canonical v1 TypeScript/JSON field names plus legacy-normalization guidance to `artifacts/SDD.md`.
- **Security/privacy:** The model contains catalog content and public contact channels only; it introduces no personal-user data, authentication, tracking, runtime API, registration callback, or offering-level registration target.
- **Skill compliance:** Followed development-lifecycle, git-task-workflow, deployment, and brainstorming instructions; verified TASK-002 and TASK-004 merge dependencies, branched from updated `main`, recorded alternatives/trade-offs, preserved untracked `.vscode/` and `instractions`, and did not merge or deploy.
- **Commit:** `aaba770` (`TASK-005 define catalog domain model`)
- **Pull request:** [#12](https://github.com/idubi/sederot-course-catalog/pull/12), targeting `main`, awaiting review; no automatic merge requested.

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Pending
