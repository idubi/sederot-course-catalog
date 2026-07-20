# TASK-001 — Repository and lifecycle bootstrap

## Status

- [ ] Not started
- [x] In progress
- [x] Implementation complete
- [x] Tests complete
- [x] Documentation updated
- [x] Skill completion record updated
- [x] Task pull request to dev created
- [x] Task pull request review complete
- [x] Merged to dev
- [x] Promotion pull request from dev to main created
- [x] Promotion pull request review complete
- [x] Merged to main

## Branch

`task/001-repository-bootstrap`

## Objective

Establish the repository governance, task system, skills, and planning baseline without implementing product features.

## Context and source documents

Read `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.docx`, current task file. Record conflicts rather than changing approved requirements silently.

## Dependencies

None

## Required skills

- `.codex/skills/development-lifecycle/SKILL.md`
- `.codex/skills/git-task-workflow/SKILL.md`
- `.codex/skills/deployment/SKILL.md`

## Scope

Expected changes: AGENTS.md; artifacts/CODEX_BOOTSTRAP.md; artifacts/DEVELOPMENT_TASKS.md; tasks/; .codex/skills/.

## Out of scope

Unrelated backlog tasks, unapproved requirement changes, production data collection, and automatic PR merge. Content tasks must not modify the source DOCX; local tools must not enter the public build.

## Implementation checklist

- [x] Inspect repository
- [x] reconcile paths and conflicts
- [x] create lifecycle artifacts
- [x] validate plan links
- [x] Preserve unrelated work and keep the change within this task.
- [x] Update this checklist and the master checklist consistently.

## Testing checklist

- [x] Validate all plan invariants and diff hygiene
- [x] Run relevant regression checks and `git diff --check`.
- [x] Record exact commands and results under Completion evidence.

## Documentation checklist

- [x] Record baseline paths, conflicts, and workflow
- [x] Update authoritative artifacts for any approved behavior or contract change.
- [x] Update operator/user guidance when commands or workflows change.

## Acceptance criteria

- All requested governance files exist and validations pass.
- All implementation, test, documentation, and evidence checkboxes applicable to this task are satisfied.
- No unrelated changes, secrets, editor tooling, drafts, diagnostics, or source DOCX modifications leak into production.

## Completion evidence

- Branch: `task/001-repository-bootstrap`
- Commit: `fd0de4e08e828408e096fd20cea835ad1b664df3`, `e62aa79d775b0f29ceace7a25719f643a0551ab7`, `41904882456ad88755540642d76caaf02b9b943c`
- Task pull request (task to dev): [PR #2](https://github.com/idubi/sederot-course-catalog/pull/2), merged as `d1c4cc71ba676982f4900af63b98d39482bc2a30`; evidence update [PR #4](https://github.com/idubi/sederot-course-catalog/pull/4), merged as `843656f3506583b3d783f42ff81bdf09367b1077`
- Promotion pull request (dev to main): [PR #3](https://github.com/idubi/sederot-course-catalog/pull/3), merged as `bdf0856c8989daf5932cb4d6b76b8fc70f7e8305`
- Tests executed: task/master count comparison; task-link resolution; unique task-ID and branch checks; dependency existence and ordering checks; required-section and status-field counts; canonical `artifacts/SDD.md` path check; staged secret scan; `git diff --cached --check`
- Test result: Passed. All 32 task files link from the master backlog, all dependencies resolve and precede dependents, required sections are present, no staged secrets were found, and diff hygiene passed.
- Files changed: `AGENTS.md`, `bootstrap-codex.md`, `.gitattributes`, five project skills, `artifacts/CODEX_BOOTSTRAP.md`, `artifacts/DEVELOPMENT_TASKS.md`, `artifacts/SDD.md`, `artifacts/content-import.md`, 32 task forms, and the approved complete artifact/reference set.
- Documentation changed: repository rules, Codex bootstrap, development backlog, individual task forms, content-import guidance, and branch/deployment workflow.
- Risks or follow-up work: PR #1 was merged directly to `main` before the new `dev` workflow was established. PR #2 synchronized TASK-001 into `dev`; PR #3 promoted the workflow corrections to `main`; PR #4 synchronized detailed evidence into `dev`. The unrelated local `.gitignore`, `.vscode/`, and root shortcut remain untracked and excluded.

No task may be marked complete without evidence and approved, reviewed task-to-dev and dev-to-main pull requests. Do not merge automatically.
