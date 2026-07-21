# TASK-008 Course-Source Investigation

**Investigated:** 2026-07-21  
**Decision:** No-go for TASK-009 until the current source DOCX is supplied or the business owner explicitly approves a replacement input contract.

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

## Replacement input contract

No replacement contract is approved by the available repository evidence. If the business owner chooses a replacement instead of supplying the named DOCX, the approval must identify:

1. the exact input artifact, version/date, owner, canonical location, and hash;
2. whether it replaces the DOCX once or permanently;
3. its structural primitives and a stable source-location scheme;
4. how programs, groups, schedules, course order, descriptions, instructors, repeated assignments, temporary names, unmatched text, and registration clues are represented;
5. the preservation, diagnostic, privacy, and deterministic-output rules;
6. representative fixtures and acceptance criteria for TASK-009 through TASK-012.

Approval must be explicit. The existing blueprint, PDF, shortcuts, design Markdown, and approved seed JSON do not constitute approval.

## Go/no-go decision

**No-go:** TASK-009 must not implement a source-specific reader against an absent format or infer Word structure from Markdown/PDF references.

**Unblock condition:** provide the named current-format DOCX for read-only inspection, or record an explicit business-owner-approved replacement contract satisfying the requirements above.

This decision does not block independent tasks whose dependency graph does not require TASK-008 or the importer sequence.
