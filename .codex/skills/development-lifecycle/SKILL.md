---
name: development-lifecycle
description: Run repository development tasks from selection through a reviewed task-branch pull request directly to main, with tests, documentation, evidence, and checklist closure.
---

# Development Lifecycle

> **Branch rule:** Ignore `dev`. Create every task branch from updated `main` and open one PR directly to `main`.

Use this skill for every implementation task in this repository.

## Workflow

1. Select one unchecked task from `artifacts/DEVELOPMENT_TASKS.md`; open its task file.
2. Verify all dependency task evidence and merged status. Stop and record any unmet dependency.
3. Confirm the worktree is understood, update local `main`, then create the task’s specified branch from `main`. Direct application work on `main` is prohibited.
4. Mark only “In progress” in both checklists and record assumptions or blockers.
5. Read the task’s source documents and load all required skills before implementation.
6. Implement only the stated scope; use brainstorming before ambiguous or architecture-changing decisions.
7. Run the task tests, relevant regression tests, content validation, and build gates proportional to risk.
8. Update authoritative documentation when behavior, contracts, operations, or decisions change.
9. Record exact completion evidence in the task file; no evidence means not complete.
10. Commit intentionally, push, and create the task pull request targeting `main` using the git-task-workflow skill.
11. After explicit review approval and merge to `main`, mark the review/merge states and update the master checklist. Do not self-merge without approval.

## Closure rule

A task closes only when implementation, tests, documentation, skill completion record, the task → `main` PR, review/merge, evidence, and the master checklist agree.
