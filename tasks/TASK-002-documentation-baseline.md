# TASK-002 — Authoritative documentation baseline

## Status

- [ ] Not started
- [x] In progress
- [x] Implementation complete
- [x] Tests complete
- [x] Documentation updated
- [x] Skill completion record updated
- [x] Pull request to main created
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
- Commit: `24621a56fe68fef322c97b482606c5d18edf8975`
- Pull request (task to main): [PR #8](https://github.com/idubi/sederot-course-catalog/pull/8), open for review.
- Tests executed: DOCX-to-baseline UC identifier comparison; DOCX NFR and acceptance-criterion counts; master task-link resolution; canonical SDD/stale-path search; source binary immutability check; supplied DOCX/PPTX OOXML ZIP integrity and SHA-256 checks; `git diff --check`.
- Test result: Passed. UC source/baseline counts are 15/15 with no identifier difference; the SDD contains 12 NFRs and 15 acceptance criteria and the baseline records both complete ranges; task links resolve; existing source binaries are unchanged; the supplied source DOCX and PPTX are valid OOXML with recorded checksums; diff hygiene passes. The only `docs/SDD.md` occurrence is the deliberately recorded stale DOCX conflict GAP-004.
- Files changed: `.gitattributes`, `artifacts/DOCUMENTATION_BASELINE.md`, `artifacts/SDD.md`, `artifacts/content-import.md`, `AGENTS.md`, `.codex/skills/brainstorming/SKILL.md`, this task form, canonical source `artifacts/תשפז - חוברת קורסים פתיחת שנה.docx`, and reference `artifacts/2027 registration presentation.pptx`.
- Documentation changed: Added source inventory, gap/conflict registers, terminology and decision baselines, UC/backlog traceability, and a documented brainstorming decision; linked the baseline from the SDD, corrected the SDD path casing in the brainstorming skill, and recorded the exact canonical DOCX path/checksum.
- Risks or follow-up work: GAP-001 (missing Requirements v0.1/FR definitions) prevents independent FR audit. GAP-003 is resolved: TASK-008 can inspect the now-present canonical תשפ״ז DOCX read-only. JSON naming conflicts remain intentionally unresolved for TASK-005/006. Existing source/reference binaries were not modified; the supplied DOCX is added unchanged.

No task may be marked complete without evidence and an approved, reviewed task-to-main pull request. Do not merge automatically.
