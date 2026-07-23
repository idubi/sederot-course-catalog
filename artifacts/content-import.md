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

The editor accepts canonical or legacy JSON, DOCX, and Markdown/text blueprint documents. DOCX extraction runs only in the loopback editor API, reads the uploaded bytes in memory without modifying the source file, and preserves headings, paragraphs, lists, and table rows for the existing parser. A document import produces the closest canonical editable draft and structured diagnostics; it never silently treats missing values as approved. The editor autosaves the current JSON text in browser Local Storage and exposes explicit repository writes through its loopback-only API. Draft save is confined to `content/draft/editor/catalog.json`; approved export is confined to `content/approved/catalog.json`. Both writes are atomic. Approved export uses the shared catalog schema, blocks all errors, requires explicit acknowledgement when warnings are supplied, and serializes identical input byte-for-byte identically.

Course/group relationships are represented only by canonical offerings. The editor exposes the same relationships in both directions: every course has a program tablist whose active tab shows only that program's group checkboxes, while attached-course lists remain visible on every program and audience group. The tabs use selected/tab-panel semantics and RTL arrow-key navigation; changing a tab never changes assignments. During source import, the group course lists are compared with each course detail table. A missing relationship in either direction is a warning; a course with no program/group relationship is also a warning.

The editor starts empty rather than restoring a previously edited profile into the visible workspace. A successful JSON, DOCX, Markdown, or text import reveals separate Courses, Groups, and Programs tabs based on the approved editor wireframes under `artifacts/editor forms/`. Each tab uses a master-detail layout: an adjacent, keyboard-accessible browser lists every entity while exactly one selected entity card is rendered. On narrow viewports the browser stacks above the card. Creation selects the new entity, deletion selects a safe neighbor, ID changes preserve selection, and diagnostic navigation selects the referenced entity before focusing its card. Entity cards support explicit creation and deletion; cascading helpers remove dependent offerings when a course, group, or program is deleted. Each program card directly edits its required external HTTPS registration/payment URL and its optional safe pre-registration HTML. Each group card directly edits optional URL and HTML overrides; leaving either override blank inherits the corresponding program value. Legacy catalogs without either HTML field use the built-in safety notice. The former global list of every group's links is not rendered in the Programs tab. No course-level registration action or information field is introduced.

After a manual entity edit, the explicit entity-save action writes the current catalog atomically to the editor draft only. The error-rescan action calls the shared catalog validator, lists every returned Schema field path and message, and marks those results as stale as soon as the editor content changes again. Loading another source clears the previous scan.

Imported diagnostics retain their source file, line, excerpt, confidence, and entity reference when available. The editor localizes severity and classifies each diagnostic as active, resolved by the current catalog, stale because its referenced entity no longer exists, or duplicate. Every diagnostic receives a deterministic identity derived from its code, entity, source path/location, and duplicate occurrence. Filters expose each state, and linked diagnostics navigate to the affected structured entity card. An editor can pin a specific diagnostic in local browser storage, filter to saved diagnostics, navigate to its entity, and return to that exact diagnostic later. Pins are recognized when the same source is imported again, while the visible editor still starts empty after reload. Only currently active warning diagnostics are sent to draft/approved/Bootstrap validation for acknowledgement; resolved, stale, duplicate, and informational source evidence remains visible without masquerading as an active warning.

The editor renders Schema scan results, relationship warnings, and imported diagnostics only inside its dedicated Errors and Warnings tab. Entity tabs do not render diagnostic panels above their active card. A rescan opens the diagnostics tab automatically; entity navigation leaves it for the referenced card, and the return action reopens the tab at the originating diagnostic.

Any imported error, warning, or informational diagnostic can be explicitly approved and closed. Approval is stored in browser Local Storage by the diagnostic's deterministic identity, removes it from active-warning acknowledgement and saved-return state, and survives reloading and importing the same source again. Approved diagnostics use a green presentation in the Approved/all filters and can be reopened by cancelling approval.

For an isolated development dataset, the editor can explicitly export a schema-valid catalog to `contents/<folder-name>/bootstrap.json`. Run it with `npm run dev -- --data=./contents/<folder-name>`. The development launcher accepts only a folder beneath this repository's `contents/` directory, requires the exact `bootstrap.json` filename, and rejects path traversal and symlink escape. This export never changes approved content. The override is forbidden when `NODE_ENV=production`; normal builds continue to consume approved JSON only.

The approved JSON, not the DOCX, is the direct input to the Astro build.

## Repository content boundaries

- `content/baseline/catalog_2026-2027.json` is the owner-designated immutable JSON baseline for academic year 2026–2027. Its approved filename and SHA-256 `cc7440cc19542e8a1aca012c1cba9ca79edbf437f26facc4138f10409755a5ca` are enforced by `npm run content:migrate-baseline`; it is never a production build input.
- Baseline migration writes only to ignored `content/draft/baseline/catalog.json` and `content/diagnostics/baseline-migration.json`. It maps legacy structural fields deterministically, preserves every course and offering, and reports missing or unsafe values instead of inventing production content.
- `content/approved/catalog.json` is committed and is the only catalog input imported by production code.
- `content/draft/` contains local importer/editor working files. Its directory policy ignores every payload.
- `content/diagnostics/` contains local structured diagnostics and source excerpts. Its directory policy ignores every payload.
- `contents/<folder-name>/bootstrap.json` is an explicit editor export for an isolated local development run. It is not a production input and must not enter `dist/`.
- `src/content/catalog-loader.ts` statically imports approved content by default and permits the validated `contents/` override only through the local development launcher.
- `npm run content:validate` parses the approved catalog with the shared schema and is invoked before every Astro build.

The committed catalog is a technical seed marked “not for publication.” Reserved `.invalid` contact and registration destinations prevent accidental live use. It must be replaced by business-approved content before deployment.




## Documentation location

The authoritative system design is located at:

`artifacts/SDD.md`

Additional use-case, detailed-design, requirement and template files are located
under `artifacts/`.

Do not create duplicate documentation under `docs/` unless a task explicitly
requires it.
