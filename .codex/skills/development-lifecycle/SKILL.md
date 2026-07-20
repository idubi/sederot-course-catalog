# Development Lifecycle

Use this skill for every implementation task in this repository.

## Workflow

1. Select one unchecked task from `artifacts/DEVELOPMENT_TASKS.md`; open its task file.
2. Verify all dependency task evidence and merged status. Stop and record any unmet dependency.
3. Confirm the worktree is understood, then create the task’s specified branch from updated `main`. Application work on `main` is prohibited.
4. Mark only “In progress” in both checklists and record assumptions or blockers.
5. Read the task’s source documents and load all required skills before implementation.
6. Implement only the stated scope; use brainstorming before ambiguous or architecture-changing decisions.
7. Run the task tests, relevant regression tests, content validation, and build gates proportional to risk.
8. Update authoritative documentation when behavior, contracts, operations, or decisions change.
9. Record exact completion evidence in the task file; no evidence means not complete.
10. Commit intentionally, push, and create one pull request using the git-task-workflow skill.
11. After review approval and merge, mark review/merged state and update the master checklist. Do not self-merge without approval.

## Closure rule

A task closes only when implementation, tests, documentation, skill completion record, PR, review, merge, evidence, and the master checklist agree.
