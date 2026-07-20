# TASK-022 — Course cards and selection

## Status

- [ ] Not started
- [ ] In progress
- [ ] Implementation complete
- [ ] Tests complete
- [ ] Documentation updated
- [ ] Skill completion record updated
- [ ] Task pull request to dev created
- [ ] Task pull request review complete
- [ ] Merged to dev
- [ ] Promotion pull request from dev to main created
- [ ] Promotion pull request review complete
- [ ] Merged to main

## Branch

`task/022-course-cards`

## Objective

Implement minimal offering cards, resolved optional images, details links, and local print selection.

## Context and source documents

Read `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`. Record conflicts rather than changing approved requirements silently.

## Dependencies

TASK-018, TASK-021

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`
- `.codex/skills/deployment/SKILL.md`

## Scope

Expected changes: CourseCard; image resolver; selection state.

## Out of scope

Unrelated backlog tasks, unapproved requirement changes, production data collection, and automatic PR merge. Content tasks must not modify the source DOCX; local tools must not enter the public build.

## Implementation checklist

- [ ] Approved card fields
- [ ] override/default/none
- [ ] semantic links
- [ ] selection
- [ ] responsive grid
- [ ] avoid duplicate IDs
- [ ] Preserve unrelated work and keep the change within this task.
- [ ] Update this checklist and the master checklist consistently.

## Testing checklist

- [ ] Test field mapping, image cases, repeated course offerings, selection persistence
- [ ] Run relevant regression checks and `git diff --check`.
- [ ] Record exact commands and results under Completion evidence.

## Documentation checklist

- [ ] Document component contract
- [ ] Update authoritative artifacts for any approved behavior or contract change.
- [ ] Update operator/user guidance when commands or workflows change.

## Acceptance criteria

- Each result is a distinct accessible offering card matching approved fields.
- All implementation, test, documentation, and evidence checkboxes applicable to this task are satisfied.
- No unrelated changes, secrets, editor tooling, drafts, diagnostics, or source DOCX modifications leak into production.

## Completion evidence

- Branch:
- Commit:
- Task pull request (task to dev):
- Promotion pull request (dev to main):
- Tests executed:
- Test result:
- Files changed:
- Documentation changed:
- Risks or follow-up work:

No task may be marked complete without evidence and approved, reviewed task-to-dev and dev-to-main pull requests. Do not merge automatically.
