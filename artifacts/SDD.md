# Sderot Courses Catalog — Software Design Description

**Version:** 1.2 (consolidated current design)
**Language:** Hebrew UI, RTL
**Architecture:** Astro static site + source-content importer + local content editor
**Environments:** Local development and Production only

## 1. Scope and authoritative sources

The production system is a public, program-first course catalog. It does not authenticate users, store personal information, process payments, or receive registration callbacks.

Read the authoritative sources in this order:

1. `artifacts/SDD.md` — consolidated current design
2. `artifacts/Sderot_Courses_SDD_v1.0_final.md` — full baseline
3. `artifacts/Sderot_Courses_SDD_v1.1.md` — current extension and decisions
4. `artifacts/Sderot_Courses_Detailed_Design_v1.0.md` — detailed implementation design
5. `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md` — use cases
6. `artifacts/registration process described heb.md` — authoritative public registration flow
7. `artifacts/2027 cources details - blueprint.md` — course/program content reference

The former design DOCX files are retired. References to DOCX in this design apply only to the existing course-content import source, when that source is present.

## 2. Public user flow

```text
Choose program (gifted/excellence)
-> choose grade
-> choose boys/girls/mixed (self-declared; never identity-verified)
-> open the matching program-group page and its course cluster
   -> optionally open one course detail
   -> return only to the same program-group page
-> open registration-information page from the program-group page
-> follow its approved external registration/payment link
```

Rules:

- Registration is for the selected program/group, never for an individual course or offering.
- Course cards and course-detail pages do not expose a registration CTA.
- Course details preserve the selected program context and provide a return action to that program.
- The internal registration-information page is mandatory before any external registration/payment destination.
- Closing or going back from registration information returns to the selected program.
- Gender/audience choice is a navigation preference supplied by the parent and is not checked against identity data.
- Course clusters may overlap across boys, girls, and mixed groups.

## 3. Content workflow

```text
Existing course-content source -> dedicated importer -> draft JSON
-> local browser editor -> validation -> approved catalog.json
-> Git -> Astro build -> production hosting
```

The importer adapts to the source; it never requires an existing source Word document to be reformatted. Uncertain values retain their source text, produce structured diagnostics, and remain editable locally. Approved JSON is the sole production-build input. The public application and local tools never modify the source document.

The current repository contains Markdown/PDF content references. Before importer implementation, TASK-008 must identify the actual current-format course-source DOCX or formally record an approved replacement input contract; design Markdown files must never be treated as importer input.

## 4. Architecture decisions

- Astro generates a dependency-light static public site from approved JSON.
- Hebrew only, full RTL, mobile first, printable, and accessible by keyboard.
- No policies page, course status, analytics, tracking, staging, backend, database, or authentication.
- The selection funnel is Program -> Grade -> Gender/Audience.
- Public results are a program-group/course-cluster page, not a flat offering search result.
- Registration targets belong to `AudienceGroup`, with an optional `Program` default fallback.
- Every external registration link is mediated by an internal registration-information page.
- The local editor runs only in local development and binds its API to `127.0.0.1`.
- `CourseOffering.imageOverride` overrides `Course.image`; otherwise the image is optional.

## 5. Runtime architecture and routes

```text
Public user -> HTTPS static hosting -> Astro static site
                                  -> approved external registration/payment site
                                  -> phone / WhatsApp / email
```

No runtime API is required.

Required routes:

- `/` — program, grade, and gender/audience selection
- `/programs/[groupId]` — selected program-group page and course cluster
- `/programs/[groupId]/courses/[offeringId]` — course detail in program context
- `/programs/[groupId]/registration` — registration information and external CTA
- `/print` — printable selected-program view
- `/404` — static not-found page

## 6. Data model

- `Catalog`
- `Program`
- `AudienceGroup`
- `Course`
- `CourseOffering`
- `RegistrationTarget`
- `ImageAsset`
- `Contacts`

Key relations:

- `AudienceGroup.programId -> Program.id`
- `CourseOffering.groupId -> AudienceGroup.id`
- `CourseOffering.courseId -> Course.id`
- `AudienceGroup.registrationTargetId? -> RegistrationTarget.id`
- `Program.defaultRegistrationTargetId? -> RegistrationTarget.id`
- `AudienceGroup.registrationInfoHtml?` overrides
  `Program.registrationInfoHtml?` for the internal registration-information
  page.

An offering does not own a registration target.

Canonical TypeScript/JSON field names for the v1 contract are:

- `Catalog`: `schemaVersion`, structured `academicYear`, `programs`, `audienceGroups`, `courses`, `offerings`, `registrationTargets`, and `contacts`.
- `AudienceGroup`: `programId`, stable `gradeGroupId`, `gradeLabels`, `gradeValues`, `gender`, schedule fields, and optional `registrationTargetId`.
- `Program` and `AudienceGroup` may contain safe `registrationInfoHtml`.
  Audience-group content wins, program content is the parent fallback, and
  legacy catalogs without either field use the built-in safety notice.
- `Course`: shared content and optional `defaultImage`; `CourseOffering`: `courseId`, `audienceGroupId`, semester/order, and optional `imageOverride`.
- `ImageAsset` uses `src` and `alt`, with optional dimensions and source note.
- `RegistrationTarget.type` is an opaque classification string until an approved value set exists; validation must not invent an enum.

Older examples using `groups`, scalar `academicYear`, `groupId`, `image.path`, or `siteConfig` are normalized at import boundaries and are not aliases in approved JSON. This single shape avoids ambiguous downstream contracts.

```ts
function resolveRegistration(program, group, targets) {
  const id = group.registrationTargetId
    ?? program.defaultRegistrationTargetId
    ?? null;
  return id ? targets[id] ?? null : null;
}
```

Only enabled HTTPS targets from approved JSON may be rendered. Missing required group targets fail content validation and never degrade to an offering-level link.

Runtime validation uses strict Zod objects and reports issues at the closest entity/field path. It rejects malformed or duplicate lowercase-kebab IDs, unknown program/course/group/registration-target references, disabled effective targets, groups without either a group target or program fallback, non-HTTPS registration URLs, invalid schedule/dimension/order values, and unknown legacy fields. In particular, `CourseOffering.registrationTargetId` is an unknown field and fails structural validation. Structural parsing and cross-reference checks share one `catalogSchema`; draft tooling may use `safeParse` to retain all reported issues, while approved-content builds must treat any issue as fatal.

## 7. Main components

1. Selection funnel
2. Program-group/course-cluster page
3. Course card and contextual course details
4. Registration-information page and group registration resolver
5. Image resolver
6. Contact actions
7. Print renderer
8. Source-specific content importer
9. Local content editor and loopback-only API
10. Shared schema and referential validator
11. Static build and deployment pipeline

## 8. Local editor

The editor under `tools/content-editor` must:

- load imported draft or approved JSON;
- edit programs, audience groups, courses, offerings, contacts, and registration information;
- associate registration targets with groups/program defaults, never offerings;
- edit safe pre-registration HTML on programs and optional audience-group
  overrides, showing the parent-program inheritance behavior;
- preview selection, program, course, and registration-information screens;
- manage course images and offering overrides;
- expose importer diagnostics and source text;
- validate references, safe URLs, and required program registration data;
- save drafts and export approved JSON.

## 9. Repository structure

```text
.
├── AGENTS.md
├── README.md
├── artifacts/                       # authoritative design and source references
│   ├── SDD.md
│   ├── Sderot_Courses_SDD_v1.0_final.md
│   ├── Sderot_Courses_SDD_v1.1.md
│   ├── Sderot_Courses_Detailed_Design_v1.0.md
│   ├── Sderot_Courses_Use_Case_Specification_v1.0.md
│   └── registration process described heb.md
├── content/approved/catalog.json    # only production content input
├── content/draft/                   # local-only working content
├── content/diagnostics/             # importer/editor diagnostics
├── public/content/images/
├── src/
├── tools/docx-importer/
├── tools/content-editor/
├── tasks/
│   ├── construction/                # TASK-001–TASK-033 construction records
│   └── bug-fix/                     # TASK-034+ corrective work
└── tests/
```

## 10. Production gate

```bash
npm run content:validate
npm run astro:check
npm run test
npm run build
```

Deployment is prohibited if any step fails. Local tooling, draft content, diagnostics containing source excerpts, and source documents must not appear in `dist/`.

## 11. Acceptance highlights

- Program, grade, and gender/audience choices lead to the correct program group.
- The program page shows the correct course cluster for the chosen group.
- Course details return to the selected program and contain no registration CTA.
- Registration starts only from a program page.
- Registration information always precedes the approved external payment/registration link.
- Closing registration information returns to the selected program.
- Gender/audience choice is never identity-verified or stored as personal data.
- Approved JSON is the only production-build source.
- Content uncertainty is preserved as diagnostics for local correction.
- No personal data, analytics, tracking, cookies, authentication, or runtime database is introduced.
