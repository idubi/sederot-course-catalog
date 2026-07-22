# Sderot Course Catalog — Development Tasks

This backlog implements the current Markdown design and authoritative program-level registration flow. TASK-001 is complete and remains unchanged in scope. Every unfinished task uses one task branch and one reviewed pull request directly to `main`.

## Required flow

`Program → Grade → Gender/Audience (self-declared) → Program Group/Course Cluster → optional Course Detail → back to Program Group → Registration Information → approved external registration/payment link`

Course cards and course details never initiate registration.

## Task index

- [x] [TASK-001: Repository bootstrap](../tasks/TASK-001-repository-bootstrap.md)
- [ ] [TASK-002: Reconcile authoritative documentation and registration flow](../tasks/TASK-002-documentation-baseline.md)
- [ ] [TASK-003: Create Astro static-site foundation](../tasks/TASK-003-astro-foundation.md) — Ready for review
- [ ] [TASK-004: Establish TypeScript and quality gates](../tasks/TASK-004-typescript-quality.md)
- [ ] [TASK-005: Define program-first catalog domain model](../tasks/TASK-005-json-domain-model.md)
- [x] [TASK-006: Implement schemas and reference validation](../tasks/TASK-006-zod-schemas.md)
- [x] [TASK-007: Create approved content structure and seed fixture](../tasks/TASK-007-approved-content.md)
- [x] [TASK-008: Identify and map the current course-content source](../tasks/TASK-008-source-content-investigation.md)
- [x] [TASK-009: Implement source-specific document reader](../tasks/TASK-009-docx-reader-parser.md)
- [x] [TASK-010: Normalize programs, groups, courses, and offerings](../tasks/TASK-010-import-normalization.md)
- [x] [TASK-011: Produce draft content and structured diagnostics](../tasks/TASK-011-import-diagnostics.md)
- [x] [TASK-012: Add importer fixtures and regression tests](../tasks/TASK-012-importer-tests.md)
- [x] [TASK-013: Create local-only content editor foundation](../tasks/TASK-013-editor-foundation.md)
- [x] [TASK-014: Implement editor JSON load, save, and export](../tasks/TASK-014-editor-json-io.md)
- [x] [TASK-015: Edit programs and audience groups](../tasks/TASK-015-editor-program-groups.md)
- [x] [TASK-016: Edit courses and contextual offerings](../tasks/TASK-016-editor-courses-offerings.md)
- [x] [TASK-017: Edit program-level registration information](../tasks/TASK-017-editor-registration.md)
- [x] [TASK-018: Manage general and offering-specific images](../tasks/TASK-018-editor-images.md)
- [x] [TASK-019: Finalize sanitation and production content validation](../tasks/TASK-019-content-validation.md)
- [x] [TASK-020: Build the public application shell and view models](../tasks/TASK-020-catalog-foundation.md)
- [x] [TASK-021: Implement program, grade, and audience selection](../tasks/TASK-021-selection-funnel.md)
- [x] [TASK-022: Implement program group and course-cluster page](../tasks/TASK-022-program-group-page.md) — Complete
- [x] [TASK-023: Implement contextual course cards and details](../tasks/TASK-023-course-details.md) — Complete
- [x] [TASK-024: Implement registration-information and external-link flow](../tasks/TASK-024-registration-information.md) — Complete
- [x] [TASK-025: Implement contextual contact actions](../tasks/TASK-025-contact-actions.md) — Complete
- [x] [TASK-026: Implement RTL print and PDF support](../tasks/TASK-026-print-support.md) — Complete
- [x] [TASK-027: Complete responsive RTL and accessibility behavior](../tasks/TASK-027-responsive-accessibility.md) — Complete
- [ ] [TASK-028: Add unit and component coverage](../tasks/TASK-028-unit-component-tests.md) — Ready for review
- [ ] [TASK-029: Add end-to-end program and editor flows](../tasks/TASK-029-end-to-end-tests.md)
- [ ] [TASK-030: Enforce production build and content gates](../tasks/TASK-030-production-gates.md)
- [ ] [TASK-031: Deploy validated main to temporary hosting](../tasks/TASK-031-temporary-deployment.md)
- [ ] [TASK-032: Connect council subdomain and operations](../tasks/TASK-032-subdomain-operations.md)
- [ ] [TASK-033: Complete MVP acceptance and handoff](../tasks/TASK-033-mvp-acceptance.md)

## Execution rules

- Execute tasks in dependency order.
- Start each task branch from current `main`.
- Check completion in the task form and record evidence before opening the PR.
- Open one reviewed PR directly to `main`; do not use `dev` and do not auto-merge.
- Approved JSON is the only production content input.
- For import work, identify and preserve the actual course source and follow `artifacts/content-import.md`; design Markdown files are not importer inputs.
