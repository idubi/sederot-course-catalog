# TASK-002 — Authoritative documentation baseline

## Status

- [ ] Not started
- [x] In progress
- [x] Implementation complete
- [x] Tests complete
- [x] Documentation updated
- [x] Skill completion record updated
- [ ] Pull request to main created
- [ ] Pull request review complete
- [ ] Merged to main

## Branch

`task/002-documentation-baseline`

## Objective

Reconcile authoritative Markdown and DOCX sources, missing requirement/template paths, terminology, and traceability before code design.

## Context and source documents

Read `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file. Record conflicts rather than changing approved requirements silently.

## Dependencies

TASK-001

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`
- `.codex/skills/deployment/SKILL.md`
- `.codex/skills/brainstorming/SKILL.md`

## Scope

Expected changes: artifacts/SDD.md; artifacts planning/decision records.

## Out of scope

Unrelated backlog tasks, unapproved requirement changes, production data collection, and automatic PR merge. Content tasks must not modify the source DOCX; local tools must not enter the public build.

## Implementation checklist

- [x] Inventory design sources
- [x] record conflicts without silent decisions
- [x] establish requirement and UC traceability
- [x] Preserve unrelated work and keep the change within this task.
- [x] Update this checklist and the master checklist consistently.

## Testing checklist

- [x] Review traceability completeness and broken references
- [x] Run relevant regression checks and `git diff --check`.
- [x] Record exact commands and results under Completion evidence.

## Documentation checklist

- [x] Update authoritative artifacts only
- [x] Update authoritative artifacts for any approved behavior or contract change.
- [x] Update operator/user guidance when commands or workflows change.

## Acceptance criteria

- A reviewed baseline identifies sources, conflicts, and unresolved owner decisions.
- All implementation, test, documentation, and evidence checkboxes applicable to this task are satisfied.
- No unrelated changes, secrets, editor tooling, drafts, diagnostics, or source DOCX modifications leak into production.

## Completion evidence

- Branch: `task/002-documentation-baseline`
- Commit: Recorded in the task pull request after commit creation.
- Pull request (task to main): Pending creation after validation and commit.
- Tests executed: DOCX-to-baseline UC identifier comparison; DOCX NFR and acceptance-criterion counts; master task-link resolution; canonical SDD/stale-path search; source binary immutability check; `git diff --check`.
- Test result: Passed. UC source/baseline counts are 15/15 with no identifier difference; the SDD contains 12 NFRs and 15 acceptance criteria and the baseline records both complete ranges; task links resolve; source DOCX/PDF/image/shortcut files are unchanged; diff hygiene passes. The only `docs/SDD.md` occurrence is the deliberately recorded stale DOCX conflict GAP-004.
- Files changed: `artifacts/DOCUMENTATION_BASELINE.md`, `artifacts/SDD.md`, `.codex/skills/brainstorming/SKILL.md`, and this task form.
- Documentation changed: Added source inventory, gap/conflict registers, terminology and decision baselines, UC/backlog traceability, and a documented brainstorming decision; linked the baseline from the SDD and corrected the SDD path casing in the brainstorming skill.
- Risks or follow-up work: GAP-001 (missing Requirements v0.1/FR definitions) prevents independent FR audit. GAP-003 (missing actual תשפ״ז source DOCX) must be resolved before source-specific TASK-008 findings. JSON naming conflicts remain intentionally unresolved for TASK-005/006. No source/reference binaries were modified.

No task may be marked complete without evidence and an approved, reviewed task-to-main pull request. Do not merge automatically.
