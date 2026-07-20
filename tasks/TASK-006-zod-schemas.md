# TASK-006 — Zod schemas and referential validation

## Status

- [ ] Not started
- [ ] In progress
- [ ] Implementation complete
- [ ] Tests complete
- [ ] Documentation updated
- [ ] Skill completion record updated
- [ ] Pull request to main created
- [ ] Pull request review complete
- [ ] Merged to main

## Branch

`task/006-zod-schemas`

## Objective

Implement shared runtime schemas and cross-reference validation for the approved catalog contract.

## Context and source documents

Read `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file. Record conflicts rather than changing approved requirements silently.

## Dependencies

TASK-005

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`
- `.codex/skills/deployment/SKILL.md`

## Scope

Expected changes: src/content/ schemas and validators.

## Out of scope

Unrelated backlog tasks, unapproved requirement changes, production data collection, and automatic PR merge. Content tasks must not modify the source DOCX; local tools must not enter the public build.

## Implementation checklist

- [ ] Implement entity/root schemas
- [ ] IDs and enums
- [ ] referential checks
- [ ] actionable errors
- [ ] Preserve unrelated work and keep the change within this task.
- [ ] Update this checklist and the master checklist consistently.

## Testing checklist

- [ ] Test valid and invalid schemas, duplicate IDs, missing refs, disabled targets
- [ ] Run relevant regression checks and `git diff --check`.
- [ ] Record exact commands and results under Completion evidence.

## Documentation checklist

- [ ] Document validation rules and error semantics
- [ ] Update authoritative artifacts for any approved behavior or contract change.
- [ ] Update operator/user guidance when commands or workflows change.

## Acceptance criteria

- Invalid data fails clearly and valid fixtures parse deterministically.
- All implementation, test, documentation, and evidence checkboxes applicable to this task are satisfied.
- No unrelated changes, secrets, editor tooling, drafts, diagnostics, or source DOCX modifications leak into production.

## Completion evidence

- Branch:
- Commit:
- Pull request (task to main):
- Tests executed:
- Test result:
- Files changed:
- Documentation changed:
- Risks or follow-up work:

No task may be marked complete without evidence and an approved, reviewed task-to-main pull request. Do not merge automatically.
