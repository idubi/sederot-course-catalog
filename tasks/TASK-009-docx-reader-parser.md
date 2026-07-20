# TASK-009 — DOCX reader and structure parser

## Status

- [ ] Not started
- [ ] In progress
- [ ] Implementation complete
- [ ] Tests complete
- [ ] Documentation updated
- [ ] Skill completion record updated
- [ ] Pull request created
- [ ] Review complete
- [ ] Merged

## Branch

`task/009-docx-reader-parser`

## Objective

Implement read-only DOCX extraction and raw structural parsing tailored to investigated source patterns.

## Context and source documents

Read `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present. Record conflicts rather than changing approved requirements silently.

## Dependencies

TASK-008

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`
- `.codex/skills/content-import/SKILL.md`

## Scope

Expected changes: tools/docx-importer reader/parser.

## Out of scope

Unrelated backlog tasks, unapproved requirement changes, production data collection, and automatic PR merge. Content tasks must not modify the source DOCX; local tools must not enter the public build.

## Implementation checklist

- [ ] Read paragraphs/tables/styles
- [ ] preserve source locations/text
- [ ] detect raw program/group/course blocks
- [ ] retain unmatched content
- [ ] Preserve unrelated work and keep the change within this task.
- [ ] Update this checklist and the master checklist consistently.

## Testing checklist

- [ ] Unit-test reader/parser against sanitized fixtures and source baseline
- [ ] Run relevant regression checks and `git diff --check`.
- [ ] Record exact commands and results under Completion evidence.

## Documentation checklist

- [ ] Document supported structures and limitations
- [ ] Update authoritative artifacts for any approved behavior or contract change.
- [ ] Update operator/user guidance when commands or workflows change.

## Acceptance criteria

- Every source block is represented or diagnosed; DOCX is never written.
- All implementation, test, documentation, and evidence checkboxes applicable to this task are satisfied.
- No unrelated changes, secrets, editor tooling, drafts, diagnostics, or source DOCX modifications leak into production.

## Completion evidence

- Branch:
- Commit:
- Pull request:
- Tests executed:
- Test result:
- Files changed:
- Documentation changed:
- Risks or follow-up work:

No task may be marked complete without evidence and an approved, reviewed pull request. Do not merge automatically.
