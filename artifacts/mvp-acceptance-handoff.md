# MVP acceptance and handoff

## Release decision

**Technical preview: accepted. Public-content release: not approved.**

The validated static application is deployed at
`https://idubi.github.io/sederot-course-catalog/`. The committed production input
is still the explicit TASK-007 seed fixture: its academic-year label and course
description say it is demonstration content, its contacts are placeholders, and
its registration target uses the reserved `.invalid` domain. The temporary URL
must not be presented as the council’s approved catalog until a content owner
reviews and exports real approved JSON.

TASK-032’s council-subdomain dependency was explicitly deferred by the project
owner on 2026-07-22. The temporary HTTPS URL remains the supported technical
preview while the hostname and DNS authority are unavailable.

## Must-use-case evidence

| Use case | Evidence | Result |
| --- | --- | --- |
| UC-001 selection | TASK-021, TASK-028, TASK-029 browser flow | Technical pass |
| UC-002 program/course cluster | TASK-022, TASK-028, TASK-029 browser flow | Technical pass |
| UC-003 contextual course/back | TASK-023, TASK-029 browser flow and live smoke | Technical pass |
| UC-004 registration information/external target | TASK-024, TASK-029 browser flow and live smoke | Technical pass with placeholder target; business approval pending |
| UC-007 source import | TASK-008–TASK-012; current Markdown source decision supersedes the missing DOCX input | Tooling pass |
| UC-008 local editing | TASK-013–TASK-017 and TASK-029 editor flow | Technical pass |
| UC-009 image management | TASK-018 | Technical pass |
| UC-010 validation/export | TASK-014 and TASK-019 | Technical pass |
| UC-011 content approval | Committed catalog identifies itself as non-production seed content | **Blocked** |
| UC-012 production build | TASK-030 and merged-main production workflow | Pass |
| UC-013 temporary deployment | TASK-031, workflow run `29882478536`, automated and independent HTTPS smoke | Pass |
| UC-015 post-publication update | Editor → approved JSON → reviewed PR → gated deployment runbook | Process accepted; no real-content update executed |

## Accessibility, RTL, mobile, and print

- TASK-027 records responsive RTL and accessibility implementation evidence.
- TASK-028 provides unit/component coverage for semantic and boundary behavior.
- TASK-029 passes the 320px, keyboard-basics, public-flow, editor, and print
  browser scenarios.
- TASK-031’s live smoke confirms home, group, course, registration-information,
  and print routes over HTTPS.
- Formal standards certification and manual Safari/Edge assistive-technology
  review are not claimed.

## Operational handoff

- Build and deployment gate: `npm run production:gate`
- Local editor: `npm run editor` at `http://127.0.0.1:4333`
- Live smoke: `npm run deployment:smoke -- <https-url>`
- Deployment/rollback: `artifacts/deployment-runbook.md`
- Approved production input: `content/approved/catalog.json`
- Drafts/diagnostics: local-only under `content/draft/` and
  `content/diagnostics/`

## Required content-owner actions

1. Load the imported draft or source-derived JSON in the local editor.
2. Resolve all diagnostics and replace every demonstration/placeholder value,
   including academic year, programs/groups/courses, contacts, images, and real
   enabled HTTPS registration targets.
3. Export validated JSON to `content/approved/catalog.json` and review its Git
   diff with the center’s content owner.
4. Record explicit business approval, run the complete production gate, merge a
   reviewed PR, and verify the resulting Pages deployment.
5. Re-run this acceptance record; only then mark UC-011 and TASK-033 complete.
