---
name: deployment
description: Publish task branches through one reviewed pull request directly to main and deploy only validated main artifacts with recorded evidence and rollback details.
---

# Deployment and Pull Requests

> **Branch rule:** Ignore `dev`. Create every task branch from updated `main` and open one PR directly to `main`.

Use this skill whenever publishing a task branch, merging a pull request, or deploying an artifact.

## Required sequence

1. Update `main` and create `task/NNN-short-name` from it.
2. Validate and push the task branch.
3. Open one focused pull request from the task branch to `main`.
4. Wait for required checks and explicit human review approval. Never auto-merge.
5. Merge the approved PR into `main`.
6. Deploy only an identified, validated commit/artifact from `main`, then record smoke-test and rollback evidence.

## Evidence and safety

Record the task branch, PR URL, merge commit, checks, approval, deployed commit/artifact, environment/URL, smoke results, and rollback reference. Never force-push `main`, combine unrelated tasks, merge, deploy, change DNS, or publish externally without explicit authorization.
