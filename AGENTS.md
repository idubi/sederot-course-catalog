# Codex Project Instructions

## Session initialization

1. Read this file and `README.md`.
2. Run `git status --short --branch` and preserve existing work.
3. Read `artifacts/SDD.md`, the applicable detailed-design and use-case documents under `artifacts/`, applicable requirements, and the current `tasks/TASK-*.md` file before changing code.
4. Load every skill named by the current task from `.codex/skills/<skill>/SKILL.md`.

## Permanent repository rules

- `artifacts/` is the authoritative documentation directory. Do not create documentation under `docs/` unless explicitly requested.
- Every development task uses its own `task/NNN-short-name` branch and individual Markdown checklist. Never implement directly on `main`.
- Verify dependencies before starting. Do not mix unrelated tasks in one branch or pull request.
- A completed task requires relevant tests, documentation updates, recorded completion evidence, and a pull request. Do not automatically merge pull requests; merge only after human approval.
- Preserve user changes, unrelated uncommitted files, mobile-first RTL behavior, print behavior, and secrets such as `.env`.
- Keep the public application free of authentication, databases, analytics, tracking, and runtime APIs unless approved requirements change.

## Content import rules

- The existing תשפ״ז DOCX must remain unchanged and must never be reformatted for the importer. The importer adapts to the actual DOCX.
- Preserve original source text and report parsing uncertainty through structured diagnostics and the closest valid draft JSON. Never silently discard content or assignments.
- Resolve uncertain values in the local HTML content editor. Approved, validated JSON is the sole Astro build input; production must never parse DOCX.
- The local content editor and draft/diagnostic tooling must never be included in the public production build.

## Completion workflow

- Keep the current task checklist and `artifacts/DEVELOPMENT_TASKS.md` master checklist synchronized.
- Record branch, commit, PR, commands, results, changed files, documentation, and risks in the task’s completion-evidence section.
- Run `git diff --check` plus all task-specific tests and build gates before requesting review.
