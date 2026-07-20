You are working in this repository:

C:\Users\idobi\projects\SEDEROT\sederot-course-catalog

Your task is to create the complete development execution plan for the
Sderot course-catalog application.

Do not implement application features yet.

FIRST: inspect the repository.

Read all relevant files under:

- ./artifacts/
- ./artifacts/templates/
- ./artifacts/requirements/
- the repository root
- any existing AGENTS.md
- any existing .codex/skills/ or skills/ directories

Treat ./artifacts/ as the authoritative documentation directory.

Do not assume that ./docs/ exists.
Do not create duplicate documentation under ./docs/.

IMPORTANT SOURCE-DOCUMENT RULE

The existing תשפ״ז Word course document must remain unchanged.

The application importer must adapt to the current Word document structure.
The user must not be required to restructure or reformat the Word document.

When parsing is uncertain:

1. Preserve the original source content.
2. Produce structured diagnostics.
3. Produce the closest valid draft JSON.
4. Allow correction through the local HTML content editor.
5. Never silently discard a course, description, instructor, group,
   schedule, program, or registration target.

The approved JSON produced after manual review is the direct source used
to build the Astro website.

CREATE THE FOLLOWING FILES

1. ./artifacts/CODEX_BOOTSTRAP.md

This file must explain:

- how to start Codex in this repository
- which documents Codex must read
- how skills must be loaded
- the task lifecycle
- the branch-per-task workflow
- commit requirements
- pull-request requirements
- testing requirements
- documentation-update requirements
- completion-evidence requirements
- how the master checklist is updated
- that application implementation must not begin directly on main

Include a complete initial prompt that can be pasted into Codex to start
the implementation process.

2. ./artifacts/DEVELOPMENT_TASKS.md

Create the complete ordered development backlog.

Each task must include:

- task ID
- title
- objective
- dependencies
- branch name
- required skills
- source documents to read
- files or components expected to change
- implementation checklist
- test checklist
- documentation checklist
- acceptance criteria
- completion evidence
- pull-request requirement
- status checkbox

The file must also contain a master checklist linking to every individual
task file.

3. ./tasks/

Create one Markdown file per development task.

Use this naming convention:

./tasks/TASK-001-<short-name>.md
./tasks/TASK-002-<short-name>.md
...

Each task file must include:

# TASK-XXX — Title

## Status

- [ ] Not started
- [ ] In progress
- [ ] Implementation complete
- [ ] Tests complete
- [ ] Documentation updated
- [ ] Skill completion record updated
- [ ] Pull request created
- [ ] Review complete
- [ ] Merged

## Branch

Use a unique branch for each task, such as:

task/001-repository-bootstrap

## Objective

## Context and source documents

## Dependencies

## Required skills

## Scope

## Out of scope

## Implementation checklist

Use detailed Markdown checkboxes for every implementation action.

## Testing checklist

## Documentation checklist

## Acceptance criteria

## Completion evidence

- Branch:
- Commit:
- Pull request:
- Tests executed:
- Test result:
- Files changed:
- Documentation changed:
- Risks or follow-up work:

No task may be marked complete without evidence.

4. ./AGENTS.md

Create or update AGENTS.md with these permanent repository rules:

- ./artifacts/ is the authoritative documentation directory.
- Read the SDD, detailed design, use cases, requirements, and current task
  before changing code.
- Do not create documentation under ./docs/ unless explicitly requested.
- Every development task uses its own branch.
- Never implement directly on main.
- Every task requires an individual Markdown checklist.
- Every completed task requires tests, documentation updates, evidence,
  and a pull request.
- Do not automatically merge pull requests.
- The existing תשפ״ז DOCX must not be reformatted.
- The importer adapts to the DOCX.
- Parsing uncertainty is resolved through diagnostics and the local editor.
- Approved JSON is the Astro build source.
- The local content editor must never be included in the public production
  build.

5. Project-specific Codex skills

Inspect the existing skill-directory convention before creating files.
Use the convention already present in the repository.

Create or update these skills:

- development-lifecycle
- git-task-workflow
- brainstorming
- content-import

Each skill must contain a SKILL.md file.

DEVELOPMENT-LIFECYCLE SKILL

Must define:

- task selection
- dependency verification
- branch creation
- checklist activation
- implementation
- testing
- documentation
- evidence recording
- pull-request creation
- task closure
- master-checklist update

GIT-TASK-WORKFLOW SKILL

Must define:

- one branch per task
- branch naming
- clean working-tree verification
- commits
- push
- pull request
- review
- merge performed only after approval
- prohibition against direct work on main
- prohibition against mixing unrelated tasks

BRAINSTORMING SKILL

Must run before architecture-changing or ambiguous work.

It must require:

- problem definition
- constraints
- assumptions
- alternatives
- trade-offs
- recommendation
- impact on the SDD
- impact on tasks
- decision recording

It must not allow brainstorming to silently change approved requirements.

CONTENT-IMPORT SKILL

Must define the non-negotiable rule that the existing Word document remains
unchanged and the importer adapts to it.

It must also define:

- DOCX parsing stages
- preservation of original text
- diagnostic output
- draft JSON
- manual correction in the local HTML editor
- validated approved JSON
- Astro build input
- duplicate handling
- instructor-label variations
- grade-group handling
- gender handling
- course assignments across multiple groups
- temporary course names
- no silent data loss

DEVELOPMENT BACKLOG COVERAGE

At minimum, evaluate and create tasks for:

- repository inspection and bootstrap
- documentation baseline
- Astro project foundation
- TypeScript and quality configuration
- JSON domain model
- Zod schemas
- approved-content structure
- DOCX parser investigation
- DOCX importer
- import diagnostics
- importer fixtures and tests
- local HTML content-editor foundation
- local JSON import/export
- course editing
- audience-group and offering editing
- registration-target editing
- image management and image overrides
- HTML sanitization
- content validation
- catalog page
- filter UI
- course cards
- course detail page
- registration flows
- contact actions
- print support
- accessibility basics
- responsive/mobile behavior
- unit tests
- end-to-end tests
- build gates
- production build
- temporary hosting deployment
- council subdomain preparation
- operational documentation
- final MVP acceptance review

Split large items into smaller tasks when they cannot reasonably be
implemented and reviewed in one pull request.

TASK ORDERING

Order tasks by dependency.

Do not allow UI tasks to begin before the data model and approved JSON
contracts are established.

Do not allow the full DOCX importer to begin before a parser-investigation
task has documented the actual Word structure.

Do not allow production deployment before tests and build gates are complete.

Do not add requirements that are not supported by the existing artifacts.
When documents conflict, record the conflict instead of silently deciding.

VALIDATION

After creating the files:

1. Check every link between DEVELOPMENT_TASKS.md and the task files.
2. Check that every task has a unique ID and branch.
3. Check that dependencies reference existing task IDs.
4. Check that every task has checklists and acceptance criteria.
5. Check that AGENTS.md refers to ./artifacts/, not ./docs/.
6. Search for stale references to docs/SDD.md.
7. Run git diff --check.
8. Show a concise summary containing:
   - files created
   - files updated
   - number of tasks
   - task phases
   - validation results

Do not commit or push until I review the generated plan.
