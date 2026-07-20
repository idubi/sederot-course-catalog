# TASK-031 — Council subdomain preparation and operations

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

`task/031-subdomain-operations`

## Objective

Prepare DNS/SSL handoff, monitoring-free operations, content updates, incident response, and rollback documentation without premature DNS changes.

## Context and source documents

Read `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`. Record conflicts rather than changing approved requirements silently.

## Dependencies

TASK-030

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`
- `.codex/skills/brainstorming/SKILL.md`

## Scope

Expected changes: artifacts operational runbook; hosting metadata config.

## Out of scope

Unrelated backlog tasks, unapproved requirement changes, production data collection, and automatic PR merge. Content tasks must not modify the source DOCX; local tools must not enter the public build.

## Implementation checklist

- [ ] Document DNS values/owners
- [ ] SSL and mixed-content checks
- [ ] release/update/rollback
- [ ] support contacts
- [ ] approval gates
- [ ] Preserve unrelated work and keep the change within this task.
- [ ] Update this checklist and the master checklist consistently.

## Testing checklist

- [ ] Dry-run checklist
- [ ] verify site URL configurability and no hard-coded temporary host
- [ ] Run relevant regression checks and `git diff --check`.
- [ ] Record exact commands and results under Completion evidence.

## Documentation checklist

- [ ] Complete operator and council handoff docs
- [ ] Update authoritative artifacts for any approved behavior or contract change.
- [ ] Update operator/user guidance when commands or workflows change.

## Acceptance criteria

- Council can attach a subdomain without architectural change; external approval remains explicit.
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
