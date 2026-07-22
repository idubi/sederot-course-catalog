# TASK-032: Connect council subdomain and operations

- **Status:** Deferred by owner — council hostname and DNS access unavailable
- **Phase:** Deployment
- **Branch:** `task/032-subdomain-operations`
- **Depends on:** `TASK-031`
- **Pull request target:** `main` (one reviewed PR; do not auto-merge)
- **Sources:** `AGENTS.md`, `artifacts/SDD.md`, `artifacts/Sderot_Courses_SDD_v1.0_final.md`, `artifacts/Sderot_Courses_SDD_v1.1.md`, `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`, `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`, `artifacts/registration process described heb.md`

## Objective

Configure DNS/TLS, provider-neutral security settings, monitoring-free operational checks, and rollback ownership.

## Implementation checklist

- [x] Re-read the task sources and record conflicts or missing inputs.
- [ ] Implement only this task's focused scope on its task branch.
- [x] Preserve RTL, mobile-first, static-output, approved-JSON, privacy, and program-level registration constraints.
- [x] Add or update tests and documentation proportional to the change.
- [x] Run relevant validation and record exact evidence below.
- [x] Review the diff for unrelated files and secrets.
- [x] Commit, push, and open one reviewed pull request directly to `main`.

## Acceptance criteria

- [ ] Council URL serves the validated static release over HTTPS.
- [x] No individual course or offering gains a registration action or target.
- [x] Referenced files and task dependencies exist and use canonical Markdown paths.

## Completion evidence

- **Implementation:** No DNS, custom-domain, TLS, application, or hosting change was made. The owner explicitly deferred the council subdomain because the exact hostname and DNS access are not currently available; the validated temporary Pages URL remains the supported release endpoint.
- **Tests:** TASK-031’s merged-main automated deployment smoke and independent HTTPS smoke passed home, group, course, registration-information, and print at `https://idubi.github.io/sederot-course-catalog/`. Council DNS, certificate, mixed-content, and council-URL smoke criteria remain intentionally unexecuted and unchecked.
- **Documentation:** Recorded the owner-approved deferral, retained the existing provider-neutral DNS/TLS and rollback runbook, and synchronized TASK-031’s live deployment evidence and the master checklist. When resumed, the task requires the exact council hostname, DNS owner/contact, authorization to change records, and an agreed maintenance window.
- **Security/privacy:** No DNS or external-system mutation occurred. The temporary release remains HTTPS-only, static, monitoring-free at the application layer, and free of authentication, analytics, tracking, or course/offering registration targets.
- **Skill compliance:** Followed deployment and development-lifecycle constraints by refusing to guess a municipal hostname or change DNS without explicit details and authority. The documented SDD fallback applies: keep the temporary HTTPS URL active while council DNS is pending.
- **Commit:** `8ab00d0` (`TASK-032 record subdomain deferral`)
- **Pull request:** [#40](https://github.com/idubi/sederot-course-catalog/pull/40)

## Completion record

- **Completed by:** Deferred by project owner
- **Completed at:** Not completed — deferred on 2026-07-22
- **Notes:** Deferred at the owner’s direction on 2026-07-22. This task may be resumed later without changing the application architecture; its council-URL acceptance criterion remains unmet.
