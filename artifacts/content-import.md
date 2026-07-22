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

Run `npm run content:import-draft` to write the closest normalized draft to `content/draft/import/draft-catalog.json` and actionable diagnostics to `content/diagnostics/import-diagnostics.json`. Every diagnostic contains severity, code, message, capped source excerpt, full source location, confidence, and an entity reference when known. Full unmatched raw text remains in the draft even when its diagnostic excerpt is capped.

Importer regression fixtures live under `tests/fixtures/importer/`. They are synthetic, contain no production registration destination or personal data, and protect numbered/bulleted lists, shared assignments, instructor-label variants, temporary/missing values, ambiguity, raw-text retention, deterministic output, and the course/offering registration boundary.

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

The editor autosaves the current JSON text in browser Local Storage and exposes explicit repository writes through its loopback-only API. Draft save is confined to `content/draft/editor/catalog.json`; approved export is confined to `content/approved/catalog.json`. Both writes are atomic. Approved export uses the shared catalog schema, blocks all errors, requires explicit acknowledgement when warnings are supplied, and serializes identical input byte-for-byte identically.

The approved JSON, not the DOCX, is the direct input to the Astro build.

## Repository content boundaries

- `content/baseline/catalog_2026-2027.json` is the owner-designated immutable JSON baseline for academic year 2026–2027. Its approved filename and SHA-256 `cc7440cc19542e8a1aca012c1cba9ca79edbf437f26facc4138f10409755a5ca` are enforced by `npm run content:migrate-baseline`; it is never a production build input.
- Baseline migration writes only to ignored `content/draft/baseline/catalog.json` and `content/diagnostics/baseline-migration.json`. It maps legacy structural fields deterministically, preserves every course and offering, and reports missing or unsafe values instead of inventing production content.
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
