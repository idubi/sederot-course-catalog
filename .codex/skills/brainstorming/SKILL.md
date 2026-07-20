# Brainstorming and Decision Control

Run this skill before ambiguous work or any change to architecture, public behavior, data contracts, security boundaries, deployment, or approved scope.

## Required record

Create a concise decision record in the current task or applicable artifact covering:

1. Problem definition and decision deadline.
2. Confirmed constraints and authoritative requirements.
3. Explicit assumptions and unanswered questions.
4. At least two viable alternatives when they exist.
5. Trade-offs: correctness, maintainability, accessibility, security, performance, operations, and delivery risk.
6. Recommended option and why it best satisfies current evidence.
7. Impact on `artifacts/SDD.md` and `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`.
8. Impact on backlog tasks, dependencies, tests, and acceptance criteria.
9. Decision owner, approval state, and where the final decision is recorded.

## Guardrails

- Brainstorming does not approve a requirement change and must not silently alter approved requirements.
- Record conflicts instead of choosing silently. Obtain owner approval for scope or architecture changes, then update authoritative documents and affected tasks before implementation.
