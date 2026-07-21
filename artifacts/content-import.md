# DOCX Import Rules

## Source document

The missing Word document was originally expected at:

`content-source/תשפז - חוברת קורסים פתיחת שנה(2).docx`

On 2026-07-21, the business owner explicitly approved this committed replacement input:

`artifacts/2027 cources details - blueprint.md`

Approved SHA-256: `27fbfdee80ea72b02968e8ed68ee5aef04a994b97379fe6b04956e9d85850606`

The replacement is the canonical current import input unless superseded by another explicit owner decision. It must remain unchanged during import. The reader preserves its Markdown lines and stable source locations; it does not pretend that Markdown has Word paragraph/style structure.

Run `npm run content:read-source` after an approved source addition or change. It atomically reconstructs the deterministic reader snapshot at `content/draft/source-reader/blueprint-document.json`. That generated location is ignored by Git and excluded from production; deleting it is safe because the approved source recreates it.

Run `npm run content:normalize-source` to create the deterministic program-first draft at `content/draft/import/normalized-catalog.json`. Normalization deduplicates only exact whitespace-normalized course names, retains every group assignment as a separate offering with raw source evidence, and leaves unconsumed nodes available for later diagnostics. The draft contains no registration field on courses or offerings and is not a production input.

For a future academic year, copy `artifacts/course-blueprint-template.md` to a new, year-specific source file and fill the copy. Never place real yearly data in the template or overwrite an earlier approved source. The new source path, owner, date, and SHA-256 must receive explicit approval before the reader contract is changed.

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
