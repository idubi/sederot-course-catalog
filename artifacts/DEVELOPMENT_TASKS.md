# Development Tasks

This is the ordered master backlog for the Sderot course catalog. The status checkbox is updated only after the linked task’s evidence, review, and merge are complete. Requirements and designs under `artifacts/` remain authoritative; conflicts are recorded, not silently resolved.

## Execution constraints

- Start every task from updated `dev`; never implement directly on `dev` or `main`.
- Verify dependencies are merged before activating a task.
- Load every required skill and follow the linked task checklist.
- Each task needs a reviewed `task/*` → `dev` PR followed by a separately reviewed `dev` → `main` promotion PR. Neither merge is automatic.
- UI work starts only after contracts; importer work starts only after DOCX investigation; deployment starts only after production gates.

## Master checklist


### Phase 1 — Governance and baseline

- [x] [TASK-001 — Repository and lifecycle bootstrap](../tasks/TASK-001-repository-bootstrap.md)
- [ ] [TASK-002 — Authoritative documentation baseline](../tasks/TASK-002-documentation-baseline.md)

### Phase 2 — Foundation and contracts

- [ ] [TASK-003 — Astro project foundation](../tasks/TASK-003-astro-foundation.md)
- [ ] [TASK-004 — TypeScript and quality configuration](../tasks/TASK-004-typescript-quality.md)
- [ ] [TASK-005 — JSON domain model](../tasks/TASK-005-json-domain-model.md)
- [ ] [TASK-006 — Zod schemas and referential validation](../tasks/TASK-006-zod-schemas.md)
- [ ] [TASK-007 — Approved-content structure and seed fixture](../tasks/TASK-007-approved-content.md)

### Phase 3 — DOCX import

- [ ] [TASK-008 — DOCX parser investigation](../tasks/TASK-008-docx-investigation.md)
- [ ] [TASK-009 — DOCX reader and structure parser](../tasks/TASK-009-docx-reader-parser.md)
- [ ] [TASK-010 — Importer normalization and deduplication](../tasks/TASK-010-import-normalization.md)
- [ ] [TASK-011 — Structured import diagnostics](../tasks/TASK-011-import-diagnostics.md)
- [ ] [TASK-012 — Importer fixtures and regression tests](../tasks/TASK-012-importer-tests.md)

### Phase 4 — Local content operations

- [ ] [TASK-013 — Local content-editor foundation](../tasks/TASK-013-editor-foundation.md)
- [ ] [TASK-014 — Editor JSON import, autosave, and export](../tasks/TASK-014-editor-json-io.md)
- [ ] [TASK-015 — Course editing and rich descriptions](../tasks/TASK-015-editor-courses.md)
- [ ] [TASK-016 — Program, audience-group, and offering editing](../tasks/TASK-016-editor-offerings.md)
- [ ] [TASK-017 — Registration-target editing](../tasks/TASK-017-editor-registration.md)
- [ ] [TASK-018 — Image management and overrides](../tasks/TASK-018-editor-images.md)
- [ ] [TASK-019 — HTML sanitization and content validation](../tasks/TASK-019-content-validation.md)

### Phase 5 — Public catalog

- [ ] [TASK-020 — Catalog page and view-model foundation](../tasks/TASK-020-catalog-foundation.md)
- [ ] [TASK-021 — Accessible filter UI](../tasks/TASK-021-filter-ui.md)
- [ ] [TASK-022 — Course cards and selection](../tasks/TASK-022-course-cards.md)
- [ ] [TASK-023 — Course detail routes](../tasks/TASK-023-course-details.md)
- [ ] [TASK-024 — Registration and contact actions](../tasks/TASK-024-registration-contact.md)
- [ ] [TASK-025 — Print and PDF support](../tasks/TASK-025-print-support.md)
- [ ] [TASK-026 — Responsive, RTL, and accessibility baseline](../tasks/TASK-026-responsive-accessibility.md)

### Phase 6 — Verification and production gates

- [ ] [TASK-027 — Comprehensive unit and component tests](../tasks/TASK-027-unit-tests.md)
- [ ] [TASK-028 — End-to-end critical-flow tests](../tasks/TASK-028-end-to-end-tests.md)
- [ ] [TASK-029 — Build gates and production artifact](../tasks/TASK-029-production-gates.md)

### Phase 7 — Deployment and operations

- [ ] [TASK-030 — Temporary HTTPS deployment](../tasks/TASK-030-temporary-deployment.md)
- [ ] [TASK-031 — Council subdomain preparation and operations](../tasks/TASK-031-subdomain-operations.md)

### Phase 8 — Acceptance

- [ ] [TASK-032 — Final MVP acceptance review](../tasks/TASK-032-mvp-acceptance.md)

## Task specifications

### [TASK-001 — Repository and lifecycle bootstrap](../tasks/TASK-001-repository-bootstrap.md)

- **Status:** [ ] Complete
- **Objective:** Establish the repository governance, task system, skills, and planning baseline without implementing product features.
- **Dependencies:** None
- **Branch:** `task/001-repository-bootstrap`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file
- **Expected changes:** AGENTS.md; artifacts/CODEX_BOOTSTRAP.md; artifacts/DEVELOPMENT_TASKS.md; tasks/; .codex/skills/
- **Implementation checklist:** [ ] Inspect repository; [ ] reconcile paths and conflicts; [ ] create lifecycle artifacts; [ ] validate plan links
- **Test checklist:** [ ] Validate all plan invariants and diff hygiene
- **Documentation checklist:** [ ] Record baseline paths, conflicts, and workflow
- **Acceptance criteria:** All requested governance files exist and validations pass.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-002 — Authoritative documentation baseline](../tasks/TASK-002-documentation-baseline.md)

- **Status:** [ ] Complete
- **Objective:** Reconcile authoritative Markdown and DOCX sources, missing requirement/template paths, terminology, and traceability before code design.
- **Dependencies:** TASK-001
- **Branch:** `task/002-documentation-baseline`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, brainstorming
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file
- **Expected changes:** artifacts/SDD.md; artifacts planning/decision records
- **Implementation checklist:** [ ] Inventory design sources; [ ] record conflicts without silent decisions; [ ] establish requirement and UC traceability
- **Test checklist:** [ ] Review traceability completeness and broken references
- **Documentation checklist:** [ ] Update authoritative artifacts only
- **Acceptance criteria:** A reviewed baseline identifies sources, conflicts, and unresolved owner decisions.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-003 — Astro project foundation](../tasks/TASK-003-astro-foundation.md)

- **Status:** [ ] Complete
- **Objective:** Create the minimal Astro static-site foundation while preserving the legacy questionnaire as reference and keeping runtime hosting provider-neutral.
- **Dependencies:** TASK-002
- **Branch:** `task/003-astro-foundation`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file
- **Expected changes:** package configuration; astro config; src/; public/
- **Implementation checklist:** [ ] Scaffold Astro; [ ] define static output; [ ] establish RTL shell; [ ] preserve legacy artifact intentionally
- **Test checklist:** [ ] Install/build smoke test; [ ] direct route smoke check
- **Documentation checklist:** [ ] Update README setup and migration notes
- **Acceptance criteria:** A dependency-locked static Astro shell builds locally with no application features.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-004 — TypeScript and quality configuration](../tasks/TASK-004-typescript-quality.md)

- **Status:** [ ] Complete
- **Objective:** Configure strict TypeScript, formatting/lint policy, scripts, and reproducible local quality commands.
- **Dependencies:** TASK-003
- **Branch:** `task/004-typescript-quality`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file
- **Expected changes:** tsconfig; package scripts; quality configs
- **Implementation checklist:** [ ] Enable strict checks; [ ] add quality scripts; [ ] define supported runtime/tool versions; [ ] exclude generated output
- **Test checklist:** [ ] Run typecheck and quality commands on foundation
- **Documentation checklist:** [ ] Document commands and conventions
- **Acceptance criteria:** Strict checks pass and commands are deterministic.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-005 — JSON domain model](../tasks/TASK-005-json-domain-model.md)

- **Status:** [ ] Complete
- **Objective:** Define the approved domain model separating courses from offerings and covering programs, audience groups, targets, images, and contacts.
- **Dependencies:** TASK-002, TASK-004
- **Branch:** `task/005-json-domain-model`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, brainstorming
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file
- **Expected changes:** src/domain/; artifacts data-contract decision
- **Implementation checklist:** [ ] Model entities/enums/IDs; [ ] registration and image resolution contracts; [ ] document invariants
- **Test checklist:** [ ] Compile model and test representative type fixtures
- **Documentation checklist:** [ ] Update SDD contract details and traceability
- **Acceptance criteria:** Model supports all approved fields without adding unsupported status or runtime data.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-006 — Zod schemas and referential validation](../tasks/TASK-006-zod-schemas.md)

- **Status:** [ ] Complete
- **Objective:** Implement shared runtime schemas and cross-reference validation for the approved catalog contract.
- **Dependencies:** TASK-005
- **Branch:** `task/006-zod-schemas`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file
- **Expected changes:** src/content/ schemas and validators
- **Implementation checklist:** [ ] Implement entity/root schemas; [ ] IDs and enums; [ ] referential checks; [ ] actionable errors
- **Test checklist:** [ ] Test valid and invalid schemas, duplicate IDs, missing refs, disabled targets
- **Documentation checklist:** [ ] Document validation rules and error semantics
- **Acceptance criteria:** Invalid data fails clearly and valid fixtures parse deterministically.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-007 — Approved-content structure and seed fixture](../tasks/TASK-007-approved-content.md)

- **Status:** [ ] Complete
- **Objective:** Create repository locations, a valid non-production seed fixture, and a loader that makes approved JSON the sole build source.
- **Dependencies:** TASK-006
- **Branch:** `task/007-approved-content`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file
- **Expected changes:** content/approved/; content/draft/; content/diagnostics/; loader
- **Implementation checklist:** [ ] Create paths and ignore policy; [ ] seed minimal valid content; [ ] enforce approved-only loader
- **Test checklist:** [ ] Validate seed and prove draft/DOCX are not build inputs
- **Documentation checklist:** [ ] Document source-of-truth workflow
- **Acceptance criteria:** Build code can load only validated approved JSON.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-008 — DOCX parser investigation](../tasks/TASK-008-docx-investigation.md)

- **Status:** [ ] Complete
- **Objective:** Inspect the actual תשפ״ז DOCX structure read-only and record parser anchors, anomalies, counts, and uncertainty before importer implementation.
- **Dependencies:** TASK-002, TASK-005
- **Branch:** `task/008-docx-investigation`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, brainstorming, content-import
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present
- **Expected changes:** artifacts parser investigation report; read-only source document
- **Implementation checklist:** [ ] Locate actual source; [ ] inventory paragraphs/tables/styles/lists; [ ] sample programs/groups/descriptions; [ ] record uncertain patterns
- **Test checklist:** [ ] Run repeatable inspection and capture baseline counts/checksums without modifying DOCX
- **Documentation checklist:** [ ] Record findings, gaps, and parser strategy
- **Acceptance criteria:** Investigation proves source unchanged and gives enough evidence to design the parser.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-009 — DOCX reader and structure parser](../tasks/TASK-009-docx-reader-parser.md)

- **Status:** [ ] Complete
- **Objective:** Implement read-only DOCX extraction and raw structural parsing tailored to investigated source patterns.
- **Dependencies:** TASK-008
- **Branch:** `task/009-docx-reader-parser`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, content-import
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present
- **Expected changes:** tools/docx-importer reader/parser
- **Implementation checklist:** [ ] Read paragraphs/tables/styles; [ ] preserve source locations/text; [ ] detect raw program/group/course blocks; [ ] retain unmatched content
- **Test checklist:** [ ] Unit-test reader/parser against sanitized fixtures and source baseline
- **Documentation checklist:** [ ] Document supported structures and limitations
- **Acceptance criteria:** Every source block is represented or diagnosed; DOCX is never written.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-010 — Importer normalization and deduplication](../tasks/TASK-010-import-normalization.md)

- **Status:** [ ] Complete
- **Objective:** Normalize raw blocks into draft entities while preserving originals and handling duplicates, label variants, grade groups, gender, and multi-group assignments.
- **Dependencies:** TASK-006, TASK-009
- **Branch:** `task/010-import-normalization`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, content-import
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present
- **Expected changes:** tools/docx-importer normalizer/deduplicator
- **Implementation checklist:** [ ] Map entities; [ ] stable IDs/order; [ ] instructor variants; [ ] group/gender mapping; [ ] cautious duplicate candidates; [ ] temporary names
- **Test checklist:** [ ] Test deterministic normalization and required edge cases
- **Documentation checklist:** [ ] Document mapping and non-loss rules
- **Acceptance criteria:** Closest valid draft retains all content and assignments without silent merges.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-011 — Structured import diagnostics](../tasks/TASK-011-import-diagnostics.md)

- **Status:** [ ] Complete
- **Objective:** Implement stable diagnostics and draft output for ambiguous, missing, unmatched, or conflicting source content.
- **Dependencies:** TASK-010
- **Branch:** `task/011-import-diagnostics`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, content-import
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present
- **Expected changes:** tools/docx-importer diagnostics/writer; content diagnostics contract
- **Implementation checklist:** [ ] Define codes/severity/confidence/source refs; [ ] aggregate stage output; [ ] write deterministic draft/report; [ ] fail safely
- **Test checklist:** [ ] Golden-test diagnostics and deterministic output; [ ] verify one bad record does not erase others
- **Documentation checklist:** [ ] Publish diagnostic code reference
- **Acceptance criteria:** Ambiguity is actionable and approval-blocking where required, never silently discarded.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-012 — Importer fixtures and regression tests](../tasks/TASK-012-importer-tests.md)

- **Status:** [ ] Complete
- **Objective:** Build sanitized fixtures and regression coverage for known DOCX structures and non-loss guarantees.
- **Dependencies:** TASK-011
- **Branch:** `task/012-importer-tests`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, content-import
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present
- **Expected changes:** tests/importer/; fixture documentation
- **Implementation checklist:** [ ] Create minimal pattern fixtures; [ ] baseline source metrics; [ ] cover duplicates, labels, ranges, gender, multi-group, temporary names
- **Test checklist:** [ ] Run importer test suite twice and compare output; [ ] assert source checksum unchanged
- **Documentation checklist:** [ ] Document fixture provenance and update process
- **Acceptance criteria:** Regression suite detects entity loss and nondeterminism.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-013 — Local content-editor foundation](../tasks/TASK-013-editor-foundation.md)

- **Status:** [ ] Complete
- **Objective:** Create the local-only editor and loopback API boundary with explicit production exclusion.
- **Dependencies:** TASK-007
- **Branch:** `task/013-editor-foundation`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, content-import
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present
- **Expected changes:** tools/content-editor/; local API/config; production exclusion tests
- **Implementation checklist:** [ ] Scaffold editor; [ ] bind API to 127.0.0.1; [ ] constrain repository writes; [ ] dashboard and diagnostics shell; [ ] isolate dependencies
- **Test checklist:** [ ] Start locally; [ ] test bind/write restrictions; [ ] inspect production graph/output
- **Documentation checklist:** [ ] Document local startup and security boundary
- **Acceptance criteria:** Editor works locally and cannot become a public route or production artifact.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-014 — Editor JSON import, autosave, and export](../tasks/TASK-014-editor-json-io.md)

- **Status:** [ ] Complete
- **Objective:** Load draft/approved JSON safely, recover local edits, and export deterministic drafts/approved candidates with explicit error handling.
- **Dependencies:** TASK-011, TASK-013
- **Branch:** `task/014-editor-json-io`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, content-import
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present
- **Expected changes:** editor state, JSON IO, Local Storage
- **Implementation checklist:** [ ] Validate before load; [ ] no silent partial load; [ ] autosave/recovery; [ ] deterministic export; [ ] warnings acknowledgment/errors block approval
- **Test checklist:** [ ] Test malformed load, recovery, repeated export equality, and blocked invalid export
- **Documentation checklist:** [ ] Document backup/recovery and file workflow
- **Acceptance criteria:** Editor round-trips valid content and never silently loses invalid input.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-015 — Course editing and rich descriptions](../tasks/TASK-015-editor-courses.md)

- **Status:** [ ] Complete
- **Objective:** Implement editing for course identity, names, instructors, and sanitized rich-text descriptions.
- **Dependencies:** TASK-014
- **Branch:** `task/015-editor-courses`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, content-import
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present
- **Expected changes:** editor course forms/components
- **Implementation checklist:** [ ] Edit/add/remove courses safely; [ ] instructor lists; [ ] allowed rich-text controls; [ ] inline errors; [ ] deletion impact warning
- **Test checklist:** [ ] Component tests for CRUD, Hebrew text, sanitation, and referenced deletion
- **Documentation checklist:** [ ] Document editor course workflow
- **Acceptance criteria:** All approved Course fields are editable with clear validation.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-016 — Program, audience-group, and offering editing](../tasks/TASK-016-editor-offerings.md)

- **Status:** [ ] Complete
- **Objective:** Implement program/group/schedule and offering assignment editing, including reorder and semester behavior.
- **Dependencies:** TASK-014, TASK-015
- **Branch:** `task/016-editor-offerings`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, content-import
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present
- **Expected changes:** editor program/group/offering forms
- **Implementation checklist:** [ ] CRUD programs/groups/offerings; [ ] grade ranges; [ ] gender; [ ] schedule; [ ] multi-group assignments; [ ] reorder; [ ] reference guards
- **Test checklist:** [ ] Test CRUD, references, multiple groups, order stability, and keyboard use
- **Documentation checklist:** [ ] Document assignment workflow
- **Acceptance criteria:** Users can resolve imported group and offering uncertainty without editing JSON.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-017 — Registration-target editing](../tasks/TASK-017-editor-registration.md)

- **Status:** [ ] Complete
- **Objective:** Implement target and fallback editing for direct registration and form redirects with HTTPS/domain validation.
- **Dependencies:** TASK-016
- **Branch:** `task/017-editor-registration`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, content-import
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present
- **Expected changes:** editor target forms; shared registration validation
- **Implementation checklist:** [ ] CRUD targets; [ ] modes/labels/URLs/enabled; [ ] program default and offering override; [ ] allowlist feedback
- **Test checklist:** [ ] Test resolution precedence, modes, invalid URLs/domains, missing/disabled targets
- **Documentation checklist:** [ ] Document approval and verification procedure
- **Acceptance criteria:** Every offering resolves to an approved target before export.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-018 — Image management and overrides](../tasks/TASK-018-editor-images.md)

- **Status:** [ ] Complete
- **Objective:** Implement local image handling, metadata, and Course/Offering override previews without filename inference.
- **Dependencies:** TASK-016
- **Branch:** `task/018-editor-images`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, content-import
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present
- **Expected changes:** editor image UI; public/content/images/; asset validation
- **Implementation checklist:** [ ] Import/copy safely; [ ] edit alt; [ ] Course default; [ ] Offering override; [ ] no-image state; [ ] collision/path handling
- **Test checklist:** [ ] Test precedence, missing files, alt feedback, duplicate filenames, production path
- **Documentation checklist:** [ ] Document rights/optimization/operator steps
- **Acceptance criteria:** Preview and exported references follow override-default-none exactly.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-019 — HTML sanitization and content validation](../tasks/TASK-019-content-validation.md)

- **Status:** [ ] Complete
- **Objective:** Unify schema, reference, HTML, URL, and image validation for editor export and production gates.
- **Dependencies:** TASK-006, TASK-017, TASK-018
- **Branch:** `task/019-content-validation`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, content-import
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present
- **Expected changes:** shared sanitizer/validator; CLI
- **Implementation checklist:** [ ] Allowlist HTML; [ ] sanitize paste/save/build; [ ] validate URLs/domains/assets/refs; [ ] stable reports; [ ] approval blocking
- **Test checklist:** [ ] Security fixtures for scripts/events/unsafe URLs plus CLI/editor parity tests
- **Documentation checklist:** [ ] Document allowed HTML, severity, remediation
- **Acceptance criteria:** The same validator protects editor export and build with no unsafe markup.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-020 — Catalog page and view-model foundation](../tasks/TASK-020-catalog-foundation.md)

- **Status:** [ ] Complete
- **Objective:** Build the Hebrew RTL catalog shell and derive stable Offering view models solely from approved JSON.
- **Dependencies:** TASK-007, TASK-019
- **Branch:** `task/020-catalog-foundation`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** src/pages/index.astro; layouts; view-model helpers
- **Implementation checklist:** [ ] Load approved data; [ ] derive/sort view models; [ ] header/intro/results/footer/empty shell; [ ] semantic RTL markup
- **Test checklist:** [ ] Unit-test derivation/sort and page build with valid content
- **Documentation checklist:** [ ] Document page/data boundaries
- **Acceptance criteria:** Catalog statically builds and represents every approved offering.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-021 — Accessible filter UI](../tasks/TASK-021-filter-ui.md)

- **Status:** [ ] Complete
- **Objective:** Implement independent program, grade/group, and gender filters with AND semantics, URL state, result count, reset, and empty state.
- **Dependencies:** TASK-020
- **Branch:** `task/021-filter-ui`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** filter island/component; URL-state helpers
- **Implementation checklist:** [ ] Any-order filters; [ ] All behavior; [ ] valid option handling; [ ] query sync; [ ] reset; [ ] aria-live; [ ] no tracking
- **Test checklist:** [ ] Test combinations, invalid query, back/forward, reset, keyboard, no results
- **Documentation checklist:** [ ] Document query parameters and filter rules
- **Acceptance criteria:** All approved filter combinations return correct offerings and preserve shareable state.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-022 — Course cards and selection](../tasks/TASK-022-course-cards.md)

- **Status:** [ ] Complete
- **Objective:** Implement minimal offering cards, resolved optional images, details links, and local print selection.
- **Dependencies:** TASK-018, TASK-021
- **Branch:** `task/022-course-cards`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** CourseCard; image resolver; selection state
- **Implementation checklist:** [ ] Approved card fields; [ ] override/default/none; [ ] semantic links; [ ] selection; [ ] responsive grid; [ ] avoid duplicate IDs
- **Test checklist:** [ ] Test field mapping, image cases, repeated course offerings, selection persistence
- **Documentation checklist:** [ ] Document component contract
- **Acceptance criteria:** Each result is a distinct accessible offering card matching approved fields.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-023 — Course detail routes](../tasks/TASK-023-course-details.md)

- **Status:** [ ] Complete
- **Objective:** Generate offering-based detail routes with full sanitized content, metadata, image resolution, and filter-preserving back navigation.
- **Dependencies:** TASK-019, TASK-022
- **Branch:** `task/023-course-details`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** src/pages/courses/[offeringId].astro; details components
- **Implementation checklist:** [ ] Static paths by offering; [ ] full fields; [ ] sanitized description; [ ] image rules; [ ] breadcrumb/back; [ ] missing handling
- **Test checklist:** [ ] Test paths, content, no image, override, back context, invalid reference build failure
- **Documentation checklist:** [ ] Document routing and view model
- **Acceptance criteria:** Every approved offering has one correct static details page.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-024 — Registration and contact actions](../tasks/TASK-024-registration-contact.md)

- **Status:** [ ] Complete
- **Objective:** Implement both external registration modes and contextual phone, WhatsApp, and email actions safely.
- **Dependencies:** TASK-017, TASK-023
- **Branch:** `task/024-registration-contact`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** RegistrationButton; ContactActions; URL helpers
- **Implementation checklist:** [ ] Resolve override/default; [ ] mode labels; [ ] HTTPS anchors; [ ] rel safety; [ ] encoded Hebrew context; [ ] visible copyable contacts
- **Test checklist:** [ ] Test both modes/fallback/missing target and encoded tel/mailto/WhatsApp links
- **Documentation checklist:** [ ] Document external URL verification and no-callback behavior
- **Acceptance criteria:** Actions lead only to approved targets and collect no data.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-025 — Print and PDF support](../tasks/TASK-025-print-support.md)

- **Status:** [ ] Complete
- **Objective:** Implement selected-or-filtered print flow and print CSS for browser printing/PDF.
- **Dependencies:** TASK-022, TASK-024
- **Branch:** `task/025-print-support`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** src/pages/print.astro; print state/styles
- **Implementation checklist:** [ ] Transfer selection/filter state; [ ] define no-selection choice; [ ] render approved fields/date; [ ] hide interactions/heavy images; [ ] RTL pagination
- **Test checklist:** [ ] Test selected/all filtered flows, empty state, print snapshot, RTL page layout
- **Documentation checklist:** [ ] Document browser print workflow
- **Acceptance criteria:** Printable output is clear, local-only, and excludes interactive chrome.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-026 — Responsive, RTL, and accessibility baseline](../tasks/TASK-026-responsive-accessibility.md)

- **Status:** [ ] Complete
- **Objective:** Harden all public flows for mobile-first layouts, keyboard use, focus, semantics, contrast, and reduced motion.
- **Dependencies:** TASK-021, TASK-023, TASK-024, TASK-025
- **Branch:** `task/026-responsive-accessibility`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** global styles and public components
- **Implementation checklist:** [ ] Audit 320px+; [ ] RTL logical properties; [ ] focus order/rings; [ ] labels/headings/live regions; [ ] reduced motion; [ ] touch targets
- **Test checklist:** [ ] Manual keyboard/mobile/zoom/contrast checks and automated accessibility scan
- **Documentation checklist:** [ ] Record accessibility checklist, known limitations, device matrix
- **Acceptance criteria:** Critical public flows work without clipping and with keyboard/screen-reader fundamentals.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-027 — Comprehensive unit and component tests](../tasks/TASK-027-unit-tests.md)

- **Status:** [ ] Complete
- **Objective:** Complete fast regression coverage for pure algorithms, schemas, content rules, and UI components.
- **Dependencies:** TASK-019, TASK-026
- **Branch:** `task/027-unit-tests`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** tests/unit/; component test config
- **Implementation checklist:** [ ] Map detailed-design T-001..T-008 and component risks; [ ] isolate deterministic fixtures; [ ] coverage thresholds where justified
- **Test checklist:** [ ] Run suite clean and repeat; [ ] mutation/negative checks for critical validators
- **Documentation checklist:** [ ] Document test organization and command
- **Acceptance criteria:** Critical algorithms and validation failures have stable automated coverage.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-028 — End-to-end critical-flow tests](../tasks/TASK-028-end-to-end-tests.md)

- **Status:** [ ] Complete
- **Objective:** Automate catalog, detail, registration, print, keyboard, mobile, and local-editor approval flows.
- **Dependencies:** TASK-012, TASK-026, TASK-027
- **Branch:** `task/028-end-to-end-tests`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** tests/e2e/; test config
- **Implementation checklist:** [ ] Cover T-009..T-015; [ ] production preview; [ ] external links without navigation; [ ] editor invalid export; [ ] mobile/keyboard
- **Test checklist:** [ ] Run headless suite on clean build and capture failures/artifacts appropriately
- **Documentation checklist:** [ ] Document prerequisites, browser matrix, troubleshooting
- **Acceptance criteria:** Must use cases and critical alternative flows pass end to end.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-029 — Build gates and production artifact](../tasks/TASK-029-production-gates.md)

- **Status:** [ ] Complete
- **Objective:** Wire validation, link/assets checks, Astro checks, tests, and build into a fail-closed production pipeline and verify exclusions.
- **Dependencies:** TASK-012, TASK-019, TASK-028
- **Branch:** `task/029-production-gates`
- **Required skills:** development-lifecycle, git-task-workflow, deployment
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** package scripts; CI; build config; artifact inspection
- **Implementation checklist:** [ ] Ordered gates; [ ] clean build; [ ] scan secrets/source maps as applicable; [ ] exclude tools/drafts/diagnostics/DOCX/editor; [ ] reproducible artifact
- **Test checklist:** [ ] Run full gate twice; [ ] negative gate tests; [ ] inspect dist and dependency graph
- **Documentation checklist:** [ ] Document release gate and failure recovery
- **Acceptance criteria:** No deployable artifact is produced when a required gate fails; dist contains public assets only.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-030 — Temporary HTTPS deployment](../tasks/TASK-030-temporary-deployment.md)

- **Status:** [ ] Complete
- **Objective:** Deploy the approved production artifact to a provider-neutral temporary URL after approval, then smoke test it.
- **Dependencies:** TASK-029
- **Branch:** `task/030-temporary-deployment`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, brainstorming
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** hosting adapter/config; release record
- **Implementation checklist:** [ ] Use approved provider; [ ] configure HTTPS/cache/404/headers; [ ] deploy immutable artifact; [ ] smoke critical flows; [ ] record rollback
- **Test checklist:** [ ] Remote smoke on mobile/desktop; [ ] registration links; [ ] headers; [ ] no editor/tool exposure
- **Documentation checklist:** [ ] Document deployment, URL, rollback, ownership without secrets
- **Acceptance criteria:** Approved build is available at temporary HTTPS URL and passes smoke tests.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-031 — Council subdomain preparation and operations](../tasks/TASK-031-subdomain-operations.md)

- **Status:** [ ] Complete
- **Objective:** Prepare DNS/SSL handoff, monitoring-free operations, content updates, incident response, and rollback documentation without premature DNS changes.
- **Dependencies:** TASK-030
- **Branch:** `task/031-subdomain-operations`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, brainstorming
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** artifacts operational runbook; hosting metadata config
- **Implementation checklist:** [ ] Document DNS values/owners; [ ] SSL and mixed-content checks; [ ] release/update/rollback; [ ] support contacts; [ ] approval gates
- **Test checklist:** [ ] Dry-run checklist; [ ] verify site URL configurability and no hard-coded temporary host
- **Documentation checklist:** [ ] Complete operator and council handoff docs
- **Acceptance criteria:** Council can attach a subdomain without architectural change; external approval remains explicit.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.

### [TASK-032 — Final MVP acceptance review](../tasks/TASK-032-mvp-acceptance.md)

- **Status:** [ ] Complete
- **Objective:** Trace all Must/Should use cases and SDD constraints to evidence, obtain business approval, and record release readiness/follow-ups.
- **Dependencies:** TASK-030, TASK-031
- **Branch:** `task/032-mvp-acceptance`
- **Required skills:** development-lifecycle, git-task-workflow, deployment, brainstorming
- **Source documents:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`
- **Expected changes:** artifacts acceptance record; task/master status updates
- **Implementation checklist:** [ ] Audit UC/requirements; [ ] content sample and every registration target; [ ] exclusions/privacy; [ ] known risks; [ ] business sign-off; [ ] release decision
- **Test checklist:** [ ] Run full gates and final remote smoke; [ ] document exact versions/URLs/results
- **Documentation checklist:** [ ] Finalize acceptance, operations, release notes, and follow-up backlog
- **Acceptance criteria:** All Must criteria have evidence, owner approval is recorded, and no unresolved release blocker remains.
- **Completion evidence:** Record branch, commit, PR, exact tests/results, files/docs changed, and risks in the task file.
- **Pull requests:** Required; task branch to `dev`, then `dev` to `main`; neither is auto-merged.
