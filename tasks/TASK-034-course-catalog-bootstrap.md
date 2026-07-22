# TASK-034: Bootstrap the approved catalog with schema-valid course content

- **Status:** In progress
- **Phase:** Content
- **Branch:** `task/034-course-catalog-bootstrap`
- **Depends on:** `TASK-019`, `TASK-030`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/content-import.md`, `artifacts/2027 cources details - blueprint.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`, and owner-designated `content/baseline/catalog_2026-2027.json` at SHA-256 `cc7440cc19542e8a1aca012c1cba9ca79edbf437f26facc4138f10409755a5ca`

## Objective

Transform the owner-designated course JSON into the canonical catalog schema, resolve its content diagnostics in the local editor, and replace the technical seed with a complete, business-approved course catalog that safely bootstraps the public site.

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`

## Implementation checklist

- [x] Confirm and record the baseline JSON owner, source, academic year, canonical repository path, and SHA-256 before treating it as an input.
- [x] Preserve the baseline file unchanged; perform conversion through deterministic tooling or a separately generated draft.
- [x] Inventory every source program, group, course, offering, contact, image, and registration value, including values missing from the baseline.
- [x] Map legacy fields to the canonical v1 schema, including scalar `academicYear` to `{ id, label }`, `groups` to `audienceGroups`, and all offering group references to `audienceGroupId`.
- [x] Preserve all course text and assignments; emit structured diagnostics for missing, ambiguous, invalid, or unmapped values instead of silently discarding them.
- [ ] Resolve diagnostics through the local content editor and add required program/group schedules, contacts, images, and registration targets from owner-approved values only.
- [x] Keep registration targets at program/group level; never add a registration action or target to a course or offering.
- [ ] Export deterministic, schema-valid JSON to `content/approved/catalog.json` only after explicit content-owner review and approval.
- [x] Update tests and documentation for the migrated catalog shape, expected entity counts, and any approved content assumptions.
- [ ] Run `npm run content:validate`, `npm run production:gate`, `git diff --check`, and relevant deterministic-output/content-boundary assertions.
- [ ] Review the diff for unrelated files, source excerpts, placeholder destinations, personal data, secrets, and accidental draft/editor/diagnostic artifacts.
- [ ] Record exact evidence, commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [ ] The approved catalog uses only the canonical strict schema and contains no legacy `groups`, scalar `academicYear`, unknown fields, or broken references.
- [ ] Every owner-approved course and contextual assignment from the designated baseline is represented exactly once or has a documented, owner-resolved diagnostic disposition.
- [ ] The public selection flow reaches every approved audience group and renders the correct non-empty course cluster and course details.
- [ ] Contacts, schedules, images, and enabled HTTPS registration targets are real owner-approved values; the technical seed and `.invalid` placeholders are absent.
- [ ] Registration information precedes every external registration link, and no course or offering contains a registration action or target.
- [ ] Approved JSON remains the sole production content input; baseline, draft, editor, and diagnostic artifacts do not enter `dist/`.
- [ ] Content validation, the complete production gate, and deterministic serialization checks pass with recorded entity counts and results.
- [ ] Explicit content-owner approval of the final approved JSON is recorded before the task is marked complete or merged.

## Completion evidence

- **Implementation:** In progress — added an immutable-hash-checked baseline migrator and direct editor migration for legacy `groups` JSON. The deterministic draft contains all 2 programs, 26 audience groups, 21 courses, and 123 offerings; structured diagnostics expose all unresolved schema/content blockers. Description sanitation remains behind the loopback API so Node-only dependencies never enter the browser bundle. Approved content remains unchanged.
- **Tests:** Partial acceptance — `npm run production:gate` passed against the unchanged approved seed: Astro checked 70 files twice with 0 diagnostics; Vitest passed 83/83 tests across 20 files; six Chromium flows passed, including direct legacy migration without a page error; five static pages built; and production verification passed 6 files, 5 HTML pages, and 22 links. The standalone editor bundle also succeeded without Node-module externalization warnings. Two consecutive migrations emitted identical draft SHA-256 `6f9fef95278706bd161dde6f4a0461e54d6df28c96413163ef930d219f3e3e6f` and diagnostics SHA-256 `61330c224cc6bdd355336cce5e07eec62aedb9130a3fb0a7814548de29d45481`. These gates prove migration tooling safety, not approval of the blocked migrated content.
- **Documentation:** Updated `README.md` and `artifacts/content-import.md` with the immutable baseline contract, command, output paths, editor behavior, diagnostics, and production exclusion.
- **Security/privacy:** The baseline is never a production input; generated drafts and diagnostics remain ignored and are excluded from `dist/`. Missing contacts and registration targets remain blocking diagnostics rather than invented values. Server-side migration and sanitation stay on the loopback-only editor boundary; no runtime public API or course/offering registration behavior was added.
- **Skill compliance:** In progress — development-lifecycle and git-task-workflow loaded; unrelated approved-catalog edits and untracked owner files remain unstaged.
- **Commits:** `e61cd72` (`TASK-034 guard legacy catalog editor imports`), `d3cbb55` (`TASK-034 migrate baseline catalog to canonical draft`); final content-resolution commit pending
- **Pull request:** [#42](https://github.com/idubi/sederot-course-catalog/pull/42), open directly to `main`; implementation remains in progress and is not approved for merge

## Completion record

- **Completed by:** Pending
- **Completed at:** Pending
- **Notes:** Do not treat an untracked or legacy-shaped baseline as approved production content until its provenance and final transformed output receive explicit owner approval.
