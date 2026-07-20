# TASK-020 — Catalog page and view-model foundation

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

`task/020-catalog-foundation`

## Objective

Build the Hebrew RTL catalog shell and derive stable Offering view models solely from approved JSON.

## Context and source documents

Read `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`. Record conflicts rather than changing approved requirements silently.

## Dependencies

TASK-007, TASK-019

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`
- `.codex/skills/deployment/SKILL.md`

## Scope

Expected changes: src/pages/index.astro; layouts; view-model helpers.

## Out of scope

Unrelated backlog tasks, unapproved requirement changes, production data collection, and automatic PR merge. Content tasks must not modify the source DOCX; local tools must not enter the public build.

## Implementation checklist

- [ ] Load approved data
- [ ] derive/sort view models
- [ ] header/intro/results/footer/empty shell
- [ ] semantic RTL markup
- [ ] Preserve unrelated work and keep the change within this task.
- [ ] Update this checklist and the master checklist consistently.

## Testing checklist

- [ ] Unit-test derivation/sort and page build with valid content
- [ ] Run relevant regression checks and `git diff --check`.
- [ ] Record exact commands and results under Completion evidence.

## Documentation checklist

- [ ] Document page/data boundaries
- [ ] Update authoritative artifacts for any approved behavior or contract change.
- [ ] Update operator/user guidance when commands or workflows change.

## Acceptance criteria

- Catalog statically builds and represents every approved offering.
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
