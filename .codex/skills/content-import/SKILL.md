# Sderot Content Import

Use for DOCX investigation/parsing, normalization, diagnostics, content validation, approved JSON, or the local editor.

Read `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, and `artifacts/content-import.md` first. Design Markdown files are requirements, never importer inputs.

## Non-negotiable rule

The existing תשפ״ז Word document remains unchanged. Never require restructuring, normalization, or reformatting; the importer adapts to the document.

## Pipeline

1. Read the DOCX read-only and retain stable paragraph/table/style/source-location references.
2. Extract program, audience/group, schedule, numbered-list, course, instructor, description, and registration clues without discarding unmatched text.
3. Normalize whitespace and known labels while retaining original text beside inferred values.
4. Separate `Course` from `CourseOffering`; retain one course’s assignments across multiple groups.
5. Emit deterministic draft JSON plus structured diagnostics with severity, code, message, source excerpt/location, confidence, and entity reference.
6. Correct and acknowledge uncertainty in the local HTML editor.
7. Validate references, schemas, sanitized HTML, URLs, images, and unresolved errors.
8. Export deterministic approved JSON. Only approved JSON feeds the Astro build; DOCX, importer, editor, drafts, and diagnostics stay outside production.

## Required edge cases

- Preserve duplicates until evidence supports merge; diagnose exact, normalized, and possible duplicates.
- Recognize instructor-label variations including `מורה`, `המורה`, and `בהנחיית`; retain unknown labels/text.
- Model single grades and grade ranges/groups without flattening the source meaning.
- Map boys, girls, mixed, and unknown gender explicitly; never infer silently from missing text.
- Preserve course assignments across multiple groups as offerings.
- Retain temporary course names and flag them for review rather than dropping them.
- Never silently lose a course, description, instructor, program, group, schedule, offering, or registration target.

## Failure behavior

Produce the closest valid draft and actionable diagnostics. Critical ambiguity blocks approval, not draft creation. The local editor must expose the original excerpt and allow correction without modifying the DOCX.
