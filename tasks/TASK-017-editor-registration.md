# TASK-017 — Registration-target editing

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

`task/017-editor-registration`

## Objective

Implement target and fallback editing for direct registration and form redirects with HTTPS/domain validation.

## Context and source documents

Read `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/content-import.md`, actual תשפ״ז source DOCX when present. Record conflicts rather than changing approved requirements silently.

## Dependencies

TASK-016

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`
- `.codex/skills/content-import/SKILL.md`

## Scope

Expected changes: editor target forms; shared registration validation.

## Out of scope

Unrelated backlog tasks, unapproved requirement changes, production data collection, and automatic PR merge. Content tasks must not modify the source DOCX; local tools must not enter the public build.

## Implementation checklist

- [ ] CRUD targets
- [ ] modes/labels/URLs/enabled
- [ ] program default and offering override
- [ ] allowlist feedback
- [ ] Preserve unrelated work and keep the change within this task.
- [ ] Update this checklist and the master checklist consistently.

## Testing checklist

- [ ] Test resolution precedence, modes, invalid URLs/domains, missing/disabled targets
- [ ] Run relevant regression checks and `git diff --check`.
- [ ] Record exact commands and results under Completion evidence.

## Documentation checklist

- [ ] Document approval and verification procedure
- [ ] Update authoritative artifacts for any approved behavior or contract change.
- [ ] Update operator/user guidance when commands or workflows change.

## Acceptance criteria

- Every offering resolves to an approved target before export.
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
