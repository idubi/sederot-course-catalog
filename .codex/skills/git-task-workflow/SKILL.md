# Git Task Workflow

Use this skill whenever starting, committing, publishing, reviewing, or closing a development task.

## Rules

- `dev` is the integration branch; `main` is the protected release branch.
- One task, one branch, one focused task pull request. Never mix unrelated tasks.
- Branch names are `task/NNN-short-name` and must match the task file.
- Create every task branch from updated `dev`. Never implement or commit directly on `dev` or `main`; start only after checking `git status --short --branch` and accounting for all existing changes.
- Do not overwrite, discard, stash, or commit unrelated user work.
- Make small, intentional commits with the task ID and an imperative summary. Never commit secrets, `.env`, generated caches, or unapproved artifacts.
- Before push, run task tests and `git diff --check`, inspect the diff, and update completion evidence.
- Push the task branch and create an individual pull request targeting `dev` that states scope, tests, documentation, risks, dependencies, and acceptance evidence.
- Address review on the same branch when it remains in scope. New unrelated work gets a new task.
- Merge the task PR into `dev` only after required checks, review, and explicit human approval.
- After the task reaches `dev`, open a separate promotion PR from `dev` to `main` for that task/release increment. Record both PR URLs in completion evidence.
- Merge the promotion PR into `main` only after required checks, review, and explicit human approval. Never automatically merge either pull request.
- After both approved merges, synchronize task and master statuses and begin the next task from updated `dev`.
