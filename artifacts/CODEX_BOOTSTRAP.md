# Codex Development Bootstrap

This guide starts and governs implementation of the Sderot course catalog. It does not authorize direct feature work on `main`; `dev` is ignored.

## Starting Codex in this repository

1. Open the repository root: `C:\Users\idobi\projects\SEDEROT\sederot-course-catalog` (WSL: `/mnt/c/Users/idobi/projects/SEDEROT/sederot-course-catalog`).
2. Start Codex with the repository root as the working directory.
3. Ask Codex to follow `AGENTS.md`, select one task from `artifacts/DEVELOPMENT_TASKS.md`, and use its linked task file.
4. Before any change, Codex reads `AGENTS.md` and `README.md`, runs `git status --short --branch`, accounts for uncommitted work, and verifies it is not implementing on `main`.

## Required reading order

For every task, read:

1. `AGENTS.md` and `README.md`.
2. `artifacts/SDD.md` (the canonical Markdown SDD).
3. `artifacts/Sderot_Courses_SDD_v1.0_final.md` and `artifacts/Sderot_Courses_SDD_v1.1.md` for baseline and extension decisions.
4. `artifacts/Sderot_Courses_Detailed_Design_v1.0.md` when detailed component or test design applies.
5. `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md` when public/editor/deployment behavior applies.
6. `artifacts/registration process described heb.md` for public navigation or registration behavior.
7. `artifacts/content-import.md` for importer, normalization, validation, approved JSON, or editor work.
8. `artifacts/DEVELOPMENT_TASKS.md` and the selected categorized task under `tasks/construction/` or `tasks/bug-fix/`.
9. Any task-specific specification, decision record, requirement, fixture description, or template under `artifacts/`.

The repository currently has no `artifacts/templates/` or `artifacts/requirements/` directory and no standalone requirements Markdown file. The design Markdown files reference a requirements baseline that is not present as a separate repository file. Codex must record the gap and must not invent missing requirements. The canonical consolidated SDD is `artifacts/SDD.md`. Never create a duplicate under `docs/`.

## Loading skills

Read each skill named in the task completely before acting:

- `.codex/skills/development-lifecycle/SKILL.md` for every task.
- `.codex/skills/git-task-workflow/SKILL.md` for every task.
- `.codex/skills/deployment/SKILL.md` whenever publishing, merging to `main`, or deploying.
- `.codex/skills/brainstorming/SKILL.md` before ambiguous or architecture-changing work.
- `.codex/skills/content-import/SKILL.md` for DOCX, normalization, diagnostics, content contracts/validation, approved JSON, or editor work.

If a named skill is missing or contradicts authoritative requirements, stop, record the issue, and request direction. A skill never silently changes approved scope.

## Task lifecycle

1. Select the next dependency-ready unchecked task from the master checklist.
2. Verify dependency task files contain merge and completion evidence.
3. Update local `main` safely, confirm a clean/understood worktree, and create the exact task branch from `main`.
4. Mark “In progress” in the task file and master backlog; load required sources and skills.
5. Use brainstorming and record a decision before resolving ambiguity or changing architecture.
6. Implement only the task scope and keep its checklist current.
7. Run task tests, relevant regressions, and required build/content gates.
8. Update authoritative documentation and operational guidance in the same task.
9. Record exact evidence: branch, commit, PR, commands/results, changed files/docs, risks, and follow-ups.
10. Commit intentionally, push the task branch, and open one focused pull request targeting `main`.
11. After explicit approval, merge into `main`. Never merge automatically. Mark the task and master checklist complete only after the PR is approved and merged.

## Branch, commit, and pull-request rules

- `main` is the sole base and pull-request target; ignore `dev`.
- Application implementation must not begin directly on `main`.
- Use one branch per task with the exact `task/NNN-short-name` name in its task file, created from updated `main`.
- Do not mix tasks, unrelated cleanup, existing user changes, generated caches, `.env`, or secrets.
- Commits identify the task and state an intentional outcome. Before committing, inspect the diff and run `git diff --check` plus task checks.
- Every task requires one individual PR targeting `main`. Its description lists scope, dependency evidence, tests, documentation, acceptance evidence, risks, screenshots/artifacts when useful, and rollback considerations. Required checks and human review must pass. Merge only after explicit approval; never enable or perform automatic merge.

### Workflow decision: direct task PRs to main

- **Problem:** The temporary `task → dev → main` process added duplicate PRs without a current integration-stage requirement.
- **Constraints:** Keep one branch per task, preserve review and tests, prohibit direct implementation on `main`, and never auto-merge.
- **Alternatives:** Keep the two-stage `dev` promotion model, or use one task PR directly to `main`.
- **Trade-off:** Direct PRs reduce overhead but remove a separate integration buffer that is not currently needed.
- **Decision:** The owner approved direct `task/*` → `main` PRs. Ignore `dev`; do not delete it without separate authorization.
- **Impact:** No SDD/product architecture change. Lifecycle, Git/deployment skills, backlog task forms, and bootstrap instructions use the direct-main workflow.

## Testing and production gates

Each task runs its own checklist and proportional regression tests. Before deployment, all of these must pass on approved JSON:

```bash
npm run content:validate
npm run links:check
npm run astro:check
npm run test
npm run test:e2e
npm run build
```

The exact scripts are established by their backlog tasks. A production artifact must be inspected to confirm that the local editor, local API, importer, source DOCX, drafts, diagnostics, test fixtures, secrets, and development-only source are absent. Failed gates prohibit deployment.

## Documentation and completion evidence

- Update `artifacts/` when approved requirements, architecture, contracts, decisions, deployment, or operations change. Do not create parallel documentation under `docs/`.
- Record conflicts and owner decisions explicitly. Brainstorming is not approval.
- Update README/operator guidance when setup or commands change.
- No checkbox is completed on assertion alone. Put exact evidence in the task file, including the commit and PR, tests with results, files and documentation changed, plus risks/follow-ups.
- The master checkbox links to the task file and is checked only after the task PR is approved and merged into `main`. Task and master status must agree.

## Content-source invariant

The existing תשפ״ז Word document remains unchanged. Investigation and import are read-only. The importer preserves original text, produces structured diagnostics and the closest valid draft JSON, and never silently drops content. Uncertainty is corrected in the local HTML editor. Validated approved JSON is the sole Astro build source, and local editing/import tooling never enters production.

## Initial implementation prompt

Paste the following into Codex after this bootstrap plan has been reviewed and approved:

```text
Work in C:\Users\idobi\projects\SEDEROT\sederot-course-catalog.

Follow AGENTS.md exactly. Initialize by reading AGENTS.md and README.md, running
git status --short --branch, and preserving all existing work. Read
artifacts/SDD.md, artifacts/DEVELOPMENT_TASKS.md, and the source documents named
by the selected task. Load every required skill from .codex/skills/<name>/SKILL.md.

Select the first dependency-ready, unmerged task in the master checklist. Verify
its dependencies and completion evidence. Update main and create the exact task
branch from main. Ignore dev and do not implement directly on main. Mark the task in progress in its
individual checklist and the master backlog.

Implement only that single task. If work is ambiguous or architecture-changing,
run the brainstorming skill and record alternatives, trade-offs, SDD/task impact,
and required approval before changing approved behavior. Do not invent missing
requirements or silently resolve document conflicts.

For DOCX, parsing, normalization, diagnostics, content validation, approved JSON,
or editor work, load the content-import skill. The existing תשפ״ז Word document
must remain unchanged; the importer adapts to it. Preserve original content,
produce structured diagnostics and the closest valid draft, resolve uncertainty
in the local HTML editor, and use validated approved JSON as the sole Astro build
input. Never include the editor/importer/drafts/diagnostics in production.

Run every test in the task checklist, relevant regressions, and git diff --check.
Update authoritative documentation under artifacts/ and user/operator guidance
when applicable. Record exact completion evidence in the task file: branch,
commit, PR, test commands/results, changed files/docs, and risks/follow-ups.

Commit intentionally and push only the task branch, then create one focused pull
request targeting main with scope, tests, documentation, acceptance evidence, and
risks. Do not automatically merge. Update the master checkbox only after the PR
is approved and merged.
```
