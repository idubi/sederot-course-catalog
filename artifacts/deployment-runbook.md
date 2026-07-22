# Temporary deployment and rollback runbook

## Temporary environment

- **Provider:** GitHub Pages
- **URL:** `https://idubi.github.io/sederot-course-catalog/`
- **Source:** a successful `Production gates` run for a push to `main`
- **Artifact:** `dist/`, rebuilt from the exact gated commit with
  `PUBLIC_BASE_PATH=/sderot-course-catalog/`
- **Runtime:** static HTTPS files only; no editor, API, database, authentication,
  analytics, or tracking

The deployment jobs are skipped for pull requests. A push to `main` must first
pass the `production-gates` job. The Pages build then checks out that same commit,
rebuilds and verifies its static artifact, deploys it to the protected
`github-pages` environment, and runs the remote HTTPS smoke test.

After the deployment workflow is reviewed and merged, the repository’s Pages
publishing source must be changed once from the legacy `main` root build to
GitHub Actions (`build_type: workflow`). This replaces the hosted questionnaire
with the validated catalog artifact but does not delete or modify the preserved
root `index.html` source file.

## Release evidence

For every deployment, record in the applicable task:

- reviewed pull request and merge commit;
- successful `Production gates` workflow run URL;
- deployed commit and Pages deployment URL;
- remote smoke result for home, program group, contextual course, registration
  information/external target, and print;
- previous successful deployment run and commit as the rollback reference.

## Rollback

1. Open the most recent known-good `Production gates` workflow run in GitHub
   Actions and confirm its commit was previously reviewed, merged to `main`, and
   passed all gates.
2. Use **Re-run all jobs** on that known-good run. Its Pages jobs rebuild and
   redeploy the exact recorded commit, then repeat the HTTPS smoke test.
3. Confirm the `github-pages` environment reports the expected commit and URL.
4. Create a focused revert/fix pull request against `main`, run the complete gate,
   obtain human approval, and merge it so the durable branch state matches the
   restored release.
5. Record the failed release, rollback run, restored commit, smoke result, and
   follow-up pull request in the task evidence.

Do not roll back by force-pushing `main`, editing generated Pages files, bypassing
the gate, or deploying a task-branch artifact.
