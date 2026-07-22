---
name: git-task-workflow
description: Publish categorized construction or bug-fix work through one focused task branch and one reviewed pull request directly to main without automatic merging.
---

# Git Task Workflow

> **Branch rule:** Ignore `dev`. Create every task branch from updated `main` and open one PR directly to `main`.

Use this skill whenever starting, committing, publishing, reviewing, or closing a development task.

## Rules

- `main` is the sole task base and pull-request target.
- One task, one branch, one focused task pull request. Never mix unrelated tasks.
- Store TASK-001 through TASK-033 under `tasks/construction/`; store TASK-034 and later corrective tasks under `tasks/bug-fix/` unless a future category is explicitly established.
- Branch names are `task/NNN-short-name` and must match the categorized task filename.
- Create every task branch from updated `main`. Never implement or commit directly on `main`; start only after checking `git status --short --branch` and accounting for all existing changes.
- Do not overwrite, discard, stash, or commit unrelated user work.
- Make small, intentional commits with the task ID and an imperative summary. Never commit secrets, `.env`, generated caches, or unapproved artifacts.
- Before push, run task tests and `git diff --check`, inspect the diff, and update completion evidence.
- Push the task branch and create an individual pull request targeting `main` that states scope, tests, documentation, risks, dependencies, and acceptance evidence.
- Address review on the same branch when it remains in scope. New unrelated work gets a new task.
- Merge the task PR into `main` only after required checks, review, and explicit human approval. Never automatically merge.
- After the approved merge, synchronize task and master statuses and begin the next task from updated `main`.
