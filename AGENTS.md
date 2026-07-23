# Codex Project Instructions

## Session initialization

1. Read this file and `README.md`.
2. Run `git status --short --branch` and preserve existing work.
3. Read `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, the applicable detailed-design and use-case Markdown files, applicable requirements, and the current `tasks/{construction,bug-fix}/TASK-*.md` file before changing code.
4. Load every skill named by the current task from `.codex/skills/<skill>/SKILL.md`.

## Permanent repository rules

- `artifacts/` is the authoritative documentation directory. Do not create documentation under `docs/` unless explicitly requested.
- `main` is the sole base and pull-request target. Ignore `dev` for task work.
- Every development task starts from updated `main`, uses its own `task/NNN-short-name` branch and individual Markdown checklist, and opens one pull request directly to `main`. Never implement directly on `main`.
- Task records are categorized: TASK-001 through TASK-033 are construction records under `tasks/construction/`; TASK-034 and later corrective tasks belong under `tasks/bug-fix/`. Preserve these directories and the matching master-list sections.
- Verify dependencies before starting. Do not mix unrelated tasks in one branch or pull request.
- A task is complete only after relevant tests, documentation, evidence, its PR to `main`, review, and approved merge are recorded.
- Do not automatically merge pull requests; merge to `main` only after human approval.
- Preserve user changes, unrelated uncommitted files, mobile-first RTL behavior, print behavior, and secrets such as `.env`.
- Keep the public application free of authentication, databases, analytics, tracking, and runtime APIs unless approved requirements change.
- For public navigation or registration, read `artifacts/registration process described heb.md`. Registration belongs to the selected program group, never an individual course; registration information must precede the external link.

## Content import rules

- The existing תשפ״ז DOCX must remain unchanged and must never be reformatted for the importer. The importer adapts to the actual DOCX.
- Preserve original source text and report parsing uncertainty through structured diagnostics and the closest valid draft JSON. Never silently discard content or assignments.
- Resolve uncertain values in the local HTML content editor. Approved, validated JSON is the sole Astro build input; production must never parse DOCX.
- The local content editor and draft/diagnostic tooling must never be included in the public production build.

## Completion workflow

- Keep the current task checklist and `artifacts/DEVELOPMENT_TASKS.md` master checklist synchronized.
- Record branch, commit, PR, commands, results, changed files, documentation, and risks in the task’s completion-evidence section.
- Run `git diff --check` plus all task-specific tests and build gates before requesting review.
