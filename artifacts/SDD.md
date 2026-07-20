# Sderot Courses Catalog — Software Design Description

**Version:** 1.1
**Language:** Hebrew UI, RTL
**Architecture:** Astro static site + DOCX importer + local content editor
**Environments:** Local development and Production only
**Hosting:** Provider-neutral; temporary managed URL first, council subdomain later

## Documentation authority

The reconciled source inventory, terminology baseline, traceability map, and unresolved conflicts are maintained in [`DOCUMENTATION_BASELINE.md`](DOCUMENTATION_BASELINE.md). Contract conflicts listed there remain open until the assigned owner task records an approved decision; this SDD must not be treated as silently resolving them.

## 1. Scope

The production system is a public course catalog. It does not authenticate users, store personal information, process payments, or receive registration callbacks.

The content workflow is:

```text
Current-format DOCX -> dedicated importer -> draft JSON -> local browser editor
-> validation -> approved catalog.json -> Git -> Astro build -> production hosting
```

### 1.1 Non-negotiable DOCX source rule

The existing תשפ״ז Word document is accepted in its current structure and must not be reformatted, normalized, or rewritten to satisfy the application. The importer is responsible for adapting to the existing document structure.

The importer must recognize, as far as technically possible:

- Program sections
- Grade and gender group headings
- Day and time descriptions
- Numbered course lists
- Course descriptions located later in the document
- Instructor labels such as `מורה`, `המורה`, and `בהנחיית`
- Courses assigned to multiple groups
- Temporary course names and minor formatting inconsistencies

When the importer cannot determine a value confidently, it must preserve the source text, create a structured diagnostic, and expose the uncertain value for correction in the local HTML editor. It must not silently discard a course, instructor, description, audience assignment, schedule, or registration target.

The source-of-truth hierarchy is:

1. Existing DOCX — source material for import
2. Draft JSON — importer output
3. Local HTML editor — manual correction and approval
4. Approved JSON — sole input to the Astro production build
5. Generated static site — public output

The application never modifies the source DOCX. A controlled Word template may be considered only as an optional future enhancement and is not an MVP requirement.

## 2. Architecture decisions

- DOCX is an editorial import source; production builds only from approved JSON.
- A single filter screen supports Program, Grade/Age Group, and Gender in any order.
- Hebrew only, full RTL.
- Basic accessibility: keyboard, labels, focus, semantic HTML, contrast.
- No policies page, course status, analytics, tracking, staging, backend, database, or auth.
- Registration modes: `DIRECT_REGISTRATION` and `FORM_REDIRECT`.
- Local editor runs only in the local development environment.
- Course image is optional. `CourseOffering.imageOverride` overrides `Course.image`; otherwise no image.

## 3. Runtime architecture

```text
Public user -> provider-neutral HTTPS static hosting -> Astro static site
                                                     -> direct registration/payment site
                                                     -> city-program intermediate form
                                                     -> phone / WhatsApp / email
```

All filtering occurs in the browser. No runtime API is required.

## 4. Main components

1. Astro pages and layouts
2. Client-side filter engine
3. Minimal course card
4. Course details view
5. Registration resolver
6. Image resolver
7. Contact actions
8. Print renderer
9. DOCX-specific importer
10. Local React content editor
11. Local Node API bound to `127.0.0.1`
12. Shared Zod/JSON schema validator
13. Static build pipeline

## 5. Data model

- `Catalog`
- `Program`
- `AudienceGroup`
- `Course`
- `CourseOffering`
- `RegistrationTarget`
- `ImageAsset`
- `Contacts`

### Image resolution

```ts
function resolveCourseImage(course, offering) {
  if (offering.imageOverride) return offering.imageOverride;
  if (course.image) return course.image;
  return null;
}
```

### Registration resolution

```ts
const targetId =
  offering.registrationTargetId ??
  program.defaultRegistrationTargetId ??
  null;
```

## 6. Local editor

The editor is a separate local-only tool under `tools/content-editor`.

Required features:

- Load imported draft JSON or approved JSON
- Edit all course fields
- Rich-text HTML description editing with sanitation
- Add/remove/reorder offerings
- Configure registration mode and approved URL
- Upload a general course image
- Upload an offering-specific image override
- Preview card/details in mobile and desktop widths
- Live validation and diagnostics
- Save draft and export approved JSON

The local API must bind to `127.0.0.1` only and write files inside the repository.

## 7. Repository structure

```text
sderot-courses/
├── AGENTS.md
├── artifacts/requirements.md
├── artifacts/SDD.md
├── artifacts/תשפז - חוברת קורסים פתיחת שנה.docx
├── content/approved/catalog.json
├── content/draft/catalog.imported.json
├── content/diagnostics/import-report.json
├── public/content/images/
├── src/
├── tools/docx-importer/
├── tools/content-editor/
└── tests/
```

## 8. Production gate

```bash
npm run content:validate
npm run astro:check
npm run test
npm run build
```

Deployment is prohibited if any step fails. The `tools/` and `content/draft/` trees must not be present in `dist/`.

## 9. Acceptance highlights

- Filters work in any order and combine using AND.
- Minimal course card matches the approved field set.
- Full details include all fields defined in questionnaire answer 29.
- Offering image overrides the general course image.
- Direct and form-based external registration flows work.
- No personal data, analytics, tracking, cookies, auth, or runtime database.
- Importer adapts to the existing DOCX structure without requiring source-document reformatting.
- Importer preserves uncertain source content and produces diagnostics for manual correction.
- Approved JSON is the only build source.
