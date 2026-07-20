# Sderot Courses Catalog — Documentation Baseline

**Status:** Development baseline for review

**Task:** TASK-002

**Scope:** Documentation inventory, conflicts, terminology, and traceability only

## 1. Purpose and authority

`artifacts/` is the authoritative documentation directory. This baseline describes what is actually present and prevents missing or conflicting material from being interpreted silently.

Use this reading order for implementation work:

1. `AGENTS.md` and the active task form define repository process.
2. `artifacts/SDD.md` is the current Markdown architecture summary (version 1.1).
3. The applicable version 1.0 SDD, detailed-design, and use-case DOCX files provide approved detail.
4. `artifacts/content-import.md` adds the non-negotiable import constraints.
5. This file identifies conflicts and routes them to an owner task.

No source automatically overrides a conflicting source merely because it appears earlier above. When two documents disagree, use the conflict register and obtain/record the owner decision in the assigned task before implementing the disputed contract.

## 2. Source inventory

| Source | Version/status | Role | Treatment |
|---|---|---|---|
| `artifacts/SDD.md` | 1.1 | Current architecture summary | Required for every implementation task. |
| `artifacts/Sderot_Courses_SDD_v1.0_final.docx` | 1.0, baseline dated 2026-07-19 | Full architecture, decisions, NFRs, acceptance criteria, contracts | Read-only authoritative design source. |
| `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx` | 1.0, dated 2026-07-19 | Components, routes, algorithms, editor/importer design, tests | Read-only authoritative detailed design. |
| `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx` | 1.0 | UC-001 through UC-015 and business rules | Read-only authoritative behavior source. |
| `artifacts/content-import.md` | Undated supplemental design | DOCX preservation/import rules and local correction workflow | Required for content-related tasks. |
| `artifacts/CODEX_BOOTSTRAP.md` | Current governance | Session/task workflow | Process guidance, not product requirements. |
| `artifacts/DEVELOPMENT_TASKS.md` and `tasks/` | Current plan | Ordered delivery and evidence checklists | Planning/traceability, not authority to add product scope. |
| `artifacts/חוברת דיגיטלית פתיחת שנה מצטיינים 2025-2026.pdf` | 2025–2026 reference | Prior/public course booklet reference | Source/reference only; not the תשפ״ז importer input. |
| `artifacts/WhatsApp Image 2026-07-14 at 21.29.34.jpg` | Reference image | Visual/source reference | No inferred rights, mapping, or production use. |
| `artifacts/פרוייקט רישום לקורסים - Shortcut.lnk` | Local Windows shortcut | Pointer to external/local material | Not a portable design or build input. |
| `README.md` and `index.html` | Current legacy questionnaire | Existing static questionnaire and GitHub Pages site | Preserve until migration is explicitly performed; not the target Astro contract. |

## 3. Missing sources and broken references

| ID | Gap | Evidence | Effect | Owner/follow-up |
|---|---|---|---|---|
| GAP-001 | No standalone requirements file or `artifacts/requirements/` directory exists. | The DOCX files refer to a requirements baseline; UC traceability cites `FR-002..FR-022`, but their definitions are not present as a repository source. | FR-level completeness cannot be independently verified. Do not invent FR text. | Product owner supplies/identifies the baseline, or TASK-002 follow-up records an approved decision that the SDD/UC text is sufficient. |
| GAP-002 | No `artifacts/templates/` directory exists. | Repository inventory. | No template may be assumed. This is not an MVP blocker because the SDD makes a controlled Word template optional/future. | Revisit only if explicitly requested. |
| GAP-003 | The actual תשפ״ז source DOCX referenced as `content-source/תשפז - חוברת קורסים פתיחת שנה(2).docx` / `courses-tashpaz.docx` is absent. | Repository inventory contains design DOCX files and a prior-year PDF, not the course-source DOCX. | TASK-008 can design an investigation procedure but cannot establish real source counts/patterns until the file is supplied at an approved path. | TASK-008; source remains unchanged when provided. |
| GAP-004 | Version 1.0 DOCX guidance points to `docs/requirements.md`, `docs/SDD.md`, and a `docs/` tree. | SDD and detailed-design repository guidance sections. | Those paths are stale and conflict with repository rules. | Resolved operationally: `artifacts/` is authoritative and `artifacts/SDD.md` is canonical; DOCX files remain read-only historical sources. |
| GAP-005 | The questionnaire answers and the referenced Requirements v0.1 are not available as discrete files. | SDD/Detailed Design provenance statements; current `index.html` contains the questionnaire application. | Do not derive new approved requirements from unanswered questionnaire UI. | Product owner or TASK-002 follow-up if provenance is required. |

## 4. Conflict register

| ID | Topic | Conflicting forms | Current handling | Decision owner |
|---|---|---|---|---|
| CON-001 | Catalog collection names | SDD v1.0 example: `groups`; detailed design: `audienceGroups`; Markdown SDD names `AudienceGroup`. | Unresolved contract detail. Use no production schema until owner task decides and documents migration/import impact. | TASK-005 and TASK-006. |
| CON-002 | Offering group reference | SDD v1.0: `groupId`; detailed design: `audienceGroupId`. | Unresolved; must align domain type, schema, importer, editor, and routes together. | TASK-005 and TASK-006. |
| CON-003 | Course image property | SDD v1.0/Markdown algorithm: `image`; detailed design: `defaultImage`. | Semantic rule is approved (`override → course default → none`); property name remains unresolved. | TASK-005. |
| CON-004 | Image location property | SDD v1.0: `path`; detailed design schema/view model: `src`. | Unresolved contract name; image files remain local project assets. | TASK-005, TASK-006, TASK-018. |
| CON-005 | Academic-year shape | SDD v1.0: string; detailed design: `{ id, label }`. | Unresolved schema shape. | TASK-005 and TASK-006. |
| CON-006 | Importer location | SDD/detailed sections mention `scripts/import-docx.ts`; repository target and Markdown SDD use `tools/docx-importer/`. | Prefer no implementation until TASK-008 records actual structure; TASK-009 records the approved location. | TASK-008 and TASK-009. |
| CON-007 | Required production gates | Markdown SDD lists validate/check/test/build; detailed design additionally lists link check, E2E, and preview smoke. | Treat the broader list as planned verification, but command availability is created incrementally. No deployment until TASK-029 records the final fail-closed gate. | TASK-004, TASK-028, TASK-029. |
| CON-008 | Current product vs target product | `README.md`/`index.html` describe a dependency-free questionnaire; SDD defines an Astro catalog. | Preserve the questionnaire until migration tasks deliberately replace it. Do not claim Astro commands exist before TASK-003. | TASK-003 and documentation updates in later UI tasks. |
| CON-009 | `Course.image` wording in Markdown SDD | Architecture bullet names `Course.image`, while detailed design uses `Course.defaultImage`. | Same semantic conflict as CON-003; no silent rename. | TASK-005. |

## 5. Approved terminology baseline

These meanings are consistent across the sources even where final JSON property names remain open:

| Term | Meaning |
|---|---|
| Catalog | Root approved content set used by the static build. |
| Program | A program such as gifted, excellence, or an approved city program. |
| AudienceGroup | Program-specific grade/age, gender, day, and schedule grouping. |
| Course | Reusable course identity and shared descriptive content. |
| CourseOffering | A course assignment to an audience group with semester/order and optional target/image overrides. Public results and details are offering-specific. |
| RegistrationTarget | An approved external HTTPS destination with `DIRECT_REGISTRATION` or `FORM_REDIRECT` behavior. |
| Draft JSON | Deterministic importer/editor work product; never a production build source. |
| Approved JSON | Validated, manually reviewed, committed sole input to the Astro production build. |
| Diagnostic | Structured, source-located parsing/validation issue; uncertainty is visible and never silently discarded. |
| Local content editor | Loopback-only correction and approval tool excluded from public production output. |

Normative cross-cutting rules:

- Hebrew-only UI and RTL.
- Filtering combines selected Program, Grade/Age Group, and Gender values using AND; an empty dimension means All.
- Images resolve offering override, then course default, then no image.
- The site stores no PII and adds no auth, backend, runtime database, analytics, tracking, or application cookies.
- The current-format תשפ״ז DOCX is read-only; the importer adapts to it.

## 6. Decision baseline

The full SDD records `SDD-DEC-001..003` and closed decisions `OPEN-001..010`:

| IDs | Baseline |
|---|---|
| SDD-DEC-001..003 | Approved JSON-only production build; provider-neutral hosting; Local Development + Production only. |
| OPEN-001..002 | One any-order filter screen; minimal card plus offering details. |
| OPEN-003..006 | Hebrew only; basic accessibility; no policies page in MVP; no course status. |
| OPEN-007..010 | Temporary URL then council subdomain; approved external registration modes; source-specific DOCX importer; no analytics/events. |

The use-case document additionally attributes the local editor to `DEC-011`; no standalone decision register defining DEC-004..010/DEC-011 is present. Treat the editor behavior in the SDD/use case as approved, while preserving the provenance gap in GAP-001/GAP-005.

## 7. Requirements and use-case traceability

### 7.1 Non-functional and acceptance baseline

The full SDD defines NFR-01..NFR-12 and AC-01..AC-15. They cover performance, responsive behavior, RTL, basic accessibility, availability, maintainability, portability, security, privacy, recovery, content integrity, printability, filtering, details, images, registration, editor exclusion, import, validation, approved JSON, and hosting.

### 7.2 Use cases to source and backlog

| Use case | Source linkage recorded in UC specification | Delivery tasks |
|---|---|---|
| UC-001 Filter and list offerings | FR-002..007, FR-020..021; OPEN-001 | TASK-020, 021, 022, 026, 028 |
| UC-002 Offering details | FR-008..012; OPEN-002 | TASK-023, 024, 026, 028 |
| UC-003 Direct registration | FR-011..016; OPEN-008 | TASK-017, 024, 028 |
| UC-004 City-program form | FR-011..016; OPEN-008 | TASK-017, 024, 028 |
| UC-005 Contextual contact | FR-017..018 | TASK-024, 028 |
| UC-006 Print selected courses | FR-019 | TASK-025, 028 |
| UC-007 DOCX import | FR-022; OPEN-009 | TASK-008..012 |
| UC-008 Local content editing | Local Editor; DEC-011 | TASK-013..016 |
| UC-009 Image management | Image requirements/override clarification | TASK-018, 019 |
| UC-010 Validate/export approved JSON | Build gates; DOCX → JSON | TASK-006, 014, 019 |
| UC-011 Business content approval | Business ownership/center approval | TASK-014, 032 |
| UC-012 Production build | NFR-10..012 | TASK-029 |
| UC-013 Temporary deployment | Infrastructure; OPEN-007 | TASK-030 |
| UC-014 Council subdomain | Domain/SSL; OPEN-007 | TASK-031 |
| UC-015 Post-release content update | Maintenance/Git workflow | TASK-014, 019, 029, 030 |

The UC-to-FR references above are preserved exactly as identifiers/ranges; GAP-001 means their underlying FR definitions cannot yet be audited.

## 8. Brainstorming and decision record

- **Problem:** Multiple authoritative files use conflicting paths and contract examples, while referenced requirements and the source course DOCX are missing.
- **Constraints:** Do not alter DOCX files, invent requirements, move documentation to `docs/`, or choose disputed schema names before their owner tasks.
- **Assumptions:** Version labels reflect chronology, but chronology alone does not approve a conflicting contract. The existing questionnaire remains available until an explicit migration task.
- **Alternatives considered:** (A) consolidate/overwrite all designs now; (B) select one source as universally dominant; (C) keep sources read-only, create a conflict/gap register, and route decisions to owning tasks.
- **Trade-offs:** A/B look simpler but risk silent requirement loss. C adds explicit review work while preserving provenance and parallel source detail.
- **Recommendation/decision:** Use option C. This is a documentation-control decision, not approval of any unresolved product/schema choice.
- **SDD impact:** Adds a link to this baseline; no architecture behavior changes.
- **Task impact:** TASK-005/006 own schema conflicts; TASK-008/009 own source/importer location; TASK-029 owns final gates. GAP-001 and GAP-003 remain visible blockers for their affected work.
- **Owner/approval:** TASK-002 recommendation pending PR review by the repository owner. Final approval is the reviewed merge of this task PR.

## 9. Review checklist

- [ ] Confirm whether a standalone Requirements v0.1 exists outside the repository and should be added under `artifacts/`.
- [ ] Confirm/provide the actual תשפ״ז source DOCX before TASK-008 needs source-specific findings.
- [ ] Review conflict owners and terminology; do not resolve contract names inside this baseline without an approved design decision.
