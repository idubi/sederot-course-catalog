# TASK-008 Course-Source Investigation

**Investigated:** 2026-07-21  
**Decision:** Go for TASK-009 using the explicitly approved replacement contract below.

## Expected source

The canonical import rules name this read-only input:

`content-source/תשפז - חוברת קורסים פתיחת שנה(2).docx`

That path and file are absent. No `.doc` or `.docx` file exists elsewhere in the repository. The source must not be recreated from design documents or reformatted to suit the importer.

## Source inventory

| Item | Repository status | Intended role | Import decision |
| --- | --- | --- | --- |
| `content-source/תשפז - חוברת קורסים פתיחת שנה(2).docx` | Missing | Current-format תשפ״ז course source | Required unless a replacement contract is explicitly approved |
| `artifacts/2027 cources details - blueprint.md` | Present; SHA-256 `27fbfdee80ea72b02968e8ed68ee5aef04a994b97379fe6b04956e9d85850606` | Current course/program content reference | Requirements/reference only; prohibited as an implicit importer substitute |
| `artifacts/2026 registration anual.pdf` | Present; 12-page PDF; SHA-256 `28ee2e5edb28551a47c0a5785175a0bce54741f691834ee4c6bbef99c061a7ae` | Prior-year registration reference | Not current course-source input |
| `artifacts/registration process described heb.md` | Present | Authoritative registration-flow requirements | Requirements only; not importer input |
| `artifacts/פרוייקט רישום לקורסים - Shortcut.lnk` | Present; Windows directory shortcut | External source-location clue | Points outside the repository to a OneDrive directory; not a source document |
| `פרוייקט רישום לקורסים.lnk` | Untracked user file; Windows directory shortcut | External source-location clue | Preserved unchanged; points outside the repository; not a source document |
| Design Markdown under `artifacts/` | Present | Architecture, detailed design, and use cases | Requirements only; explicitly prohibited as importer input |

The two shortcuts are distinct files and expose only an external directory location. They do not embed or provide the expected DOCX. The untracked root shortcut, `.vscode/`, and all other user work were left unchanged.

## Expected structural map

TASK-009 must map the supplied current-format source using source-specific evidence rather than assuming that the blueprint reproduces its Word structure. The known semantic targets are:

| Source signal | Target or treatment |
| --- | --- |
| Program section | `Program` |
| Grade and gender/audience heading | `AudienceGroup`, retaining explicit boys, girls, mixed, or unknown values |
| Day and time text | Audience-group schedule fields plus original text |
| Numbered or ordered course list | Ordered `CourseOffering` assignments; never discard unmatched entries |
| Course heading and later description | Shared `Course` content linked without losing source locations |
| `מורה`, `המורה`, or `בהנחיית` label | Instructor clue plus original label/text |
| One course listed in several groups | One course with multiple offerings; do not collapse assignments |
| Temporary name or inconsistent spelling | Preserve source text and emit a review diagnostic |
| Registration clue | Candidate program/group registration information only; never attach a target to a course or offering |

The 2027 blueprint is useful for later comparison: it describes 14 gifted-program group pages and 12 excellence-program group pages, schedules, ordered course lists, course summaries, instructor labels, repeated assignments, and temporary names. Those semantics do not prove the absent DOCX's paragraph, table, list, style, relationship, or location structure.

## Gaps and required evidence

The following cannot be established without the actual DOCX:

- exact filename, byte hash, provenance, modification date, and business-owner approval;
- Word paragraph, table, style, numbering, hyperlink, image, header/footer, and section structure;
- stable source-location scheme for diagnostics;
- whether visible course lists and later descriptions match completely;
- whether registration links or other relationships are embedded in the package;
- representative anomalies needed for deterministic reader fixtures.

If the DOCX is supplied, preserve it byte-for-byte, record its hash and provenance, and inspect it read-only. Do not commit it unless the owner separately approves repository storage.

## Approved replacement input contract

The business owner explicitly approved `artifacts/2027 cources details - blueprint.md` in the project conversation on 2026-07-21. It permanently replaces the missing DOCX for the current תשפ״ז import pipeline unless the owner records a later decision.

- **Canonical path:** `artifacts/2027 cources details - blueprint.md`
- **SHA-256 at approval:** `27fbfdee80ea72b02968e8ed68ee5aef04a994b97379fe6b04956e9d85850606`
- **Format:** UTF-8, line-oriented Markdown with bold headings, list items, paragraphs, tables, and embedded Markdown images.
- **Locations:** one-based line and column plus zero-based UTF-16 string offsets; every extracted node retains its exact raw source line.
- **Semantics:** program/group schedule sentences introduce ordered course lists; later bold headings introduce course summaries; `מורה`, `המורה`, and `בהנחיית` are instructor clues; tables describe repeated group assignments; temporary names and unmatched text remain present for diagnostics.
- **Preservation:** the source is read-only, every line is retained, and the reader must reconstruct the original text exactly. Normalization and entity mapping happen only in later tasks.
- **Registration:** registration clues may only become program/group candidates; never course/offering targets.
- **Determinism/privacy:** identical bytes produce identical reader output; embedded content and unmatched text remain local and must never enter the production artifact automatically.
- **Fixtures/acceptance:** TASK-009 tests the approved source hash, byte-for-byte reconstruction, stable locations, all 26 group headings, lists, course headings, instructor labels, tables, and the embedded image. TASK-010 through TASK-012 must retain raw evidence and diagnose ambiguity rather than discard it.

## Go/no-go decision

**Go:** TASK-009 may implement a source-specific, read-only Markdown reader against the approved path and hash. It must not infer or emulate absent Word structure.

This decision does not block independent tasks whose dependency graph does not require TASK-008 or the importer sequence.
