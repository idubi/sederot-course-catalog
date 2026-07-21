# DOCX Import Rules

## Source document

The source Word document is:

`content-source/תשפז - חוברת קורסים פתיחת שנה(2).docx`

The source document must not be reformatted to satisfy the importer.

## Importer responsibility

The importer must recognize the existing document structure, including:

- program sections
- grade and gender group headings
- day and time descriptions
- numbered course lists
- course descriptions located later in the document
- instructor labels such as `מורה`, `המורה`, and `בהנחיית`
- courses assigned to multiple groups
- temporary names and minor formatting inconsistencies

## Error handling

Uncertain or incomplete parsing must produce diagnostics.

The local HTML editor is used to:

- correct imported values
- resolve duplicate courses
- complete missing fields
- change course assignments
- add images
- add registration targets

The approved JSON, not the DOCX, is the direct input to the Astro build.

## Repository content boundaries

- `content/approved/catalog.json` is committed and is the only catalog input imported by production code.
- `content/draft/` contains local importer/editor working files. Its directory policy ignores every payload.
- `content/diagnostics/` contains local structured diagnostics and source excerpts. Its directory policy ignores every payload.
- `src/content/catalog-loader.ts` has no configurable path and statically imports only the approved catalog.
- `npm run content:validate` parses the approved catalog with the shared schema and is invoked before every Astro build.

The committed catalog is a technical seed marked “not for publication.” Reserved `.invalid` contact and registration destinations prevent accidental live use. It must be replaced by business-approved content before deployment.




## Documentation location

The authoritative system design is located at:

`artifacts/SDD.md`

Additional use-case, detailed-design, requirement and template files are located
under `artifacts/`.

Do not create duplicate documentation under `docs/` unless a task explicitly
requires it.
