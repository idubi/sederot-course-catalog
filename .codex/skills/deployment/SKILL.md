# Deployment and Branch Promotion

Use this skill whenever publishing a task branch, merging to integration, promoting to release, or deploying an artifact.

## Branch model

- `dev` is the persistent integration branch.
- `main` is the protected release branch.
- Create each `task/NNN-short-name` branch from updated `dev`.
- Never implement or commit directly on `dev` or `main`.

## Required promotion sequence

1. Validate the task branch and push it.
2. Open a focused pull request from `task/NNN-short-name` to `dev`.
3. Wait for required checks and explicit human review approval. Never auto-merge.
4. Merge the approved task PR into `dev`.
5. Validate the integrated `dev` state and open a separate promotion PR from `dev` to `main` for the task/release increment.
6. Wait for required checks and explicit human review approval. Never auto-merge.
7. Merge the approved promotion PR into `main`.
8. Deploy only an identified, validated commit/artifact from `main`, then record smoke-test and rollback evidence.

## Evidence

Record the task branch, task → `dev` PR and merge commit, `dev` → `main` PR and merge commit, checks, approvals, deployed commit/artifact, environment/URL, smoke results, and rollback reference. A task is not closed merely because it reached `dev`.

## Safety

- Never force-push shared `dev` or `main`.
- Do not combine unrelated tasks in a promotion PR unless the user explicitly approves a grouped release.
- Do not merge, deploy, change DNS, or publish externally without explicit authorization.
