# TASK-026 — Responsive, RTL, and accessibility baseline

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

`task/026-responsive-accessibility`

## Objective

Harden all public flows for mobile-first layouts, keyboard use, focus, semantics, contrast, and reduced motion.

## Context and source documents

Read `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.docx`. Record conflicts rather than changing approved requirements silently.

## Dependencies

TASK-021, TASK-023, TASK-024, TASK-025

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`
- `.codex/skills/deployment/SKILL.md`

## Scope

Expected changes: global styles and public components.

## Out of scope

Unrelated backlog tasks, unapproved requirement changes, production data collection, and automatic PR merge. Content tasks must not modify the source DOCX; local tools must not enter the public build.

## Implementation checklist

- [ ] Audit 320px+
- [ ] RTL logical properties
- [ ] focus order/rings
- [ ] labels/headings/live regions
- [ ] reduced motion
- [ ] touch targets
- [ ] Preserve unrelated work and keep the change within this task.
- [ ] Update this checklist and the master checklist consistently.

## Testing checklist

- [ ] Manual keyboard/mobile/zoom/contrast checks and automated accessibility scan
- [ ] Run relevant regression checks and `git diff --check`.
- [ ] Record exact commands and results under Completion evidence.

## Documentation checklist

- [ ] Record accessibility checklist, known limitations, device matrix
- [ ] Update authoritative artifacts for any approved behavior or contract change.
- [ ] Update operator/user guidance when commands or workflows change.

## Acceptance criteria

- Critical public flows work without clipping and with keyboard/screen-reader fundamentals.
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
