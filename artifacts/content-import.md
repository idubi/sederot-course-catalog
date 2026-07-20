# DOCX Import Rules

## Source document

The source Word document is:

`artifacts/תשפז - חוברת קורסים פתיחת שנה.docx`

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




## Documentation location

The authoritative system design is located at:

`artifacts/SDD.md`

Additional use-case, detailed-design, requirement and template files are located
under `artifacts/`.

Do not create duplicate documentation under `docs/` unless a task explicitly
requires it.
