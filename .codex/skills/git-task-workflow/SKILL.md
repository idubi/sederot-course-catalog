# Git Task Workflow

Use this skill whenever starting, committing, publishing, reviewing, or closing a development task.

## Rules

- One task, one branch, one focused pull request. Never mix unrelated tasks.
- Branch names are `task/NNN-short-name` and must match the task file.
- Never implement directly on `main`; start only after checking `git status --short --branch` and accounting for all existing changes.
- Do not overwrite, discard, stash, or commit unrelated user work.
- Make small, intentional commits with the task ID and an imperative summary. Never commit secrets, `.env`, generated caches, or unapproved artifacts.
- Before push, run task tests and `git diff --check`, inspect the diff, and update completion evidence.
- Push the task branch and create an individual pull request that states scope, tests, documentation, risks, dependencies, and acceptance evidence.
- Address review on the same branch when it remains in scope. New unrelated work gets a new task.
- Merge only after required checks, review, and explicit human approval. Never automatically merge a pull request.
- After an approved merge, synchronize task and master statuses and begin the next task from updated `main`.
