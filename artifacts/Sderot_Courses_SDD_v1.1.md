# Sderot Courses Catalog — SDD v1.1 Extension

This extension is incorporated into the consolidated `artifacts/SDD.md`. The full baseline remains `artifacts/Sderot_Courses_SDD_v1.0_final.md`.

## Superseding registration decision

`artifacts/registration process described heb.md` is authoritative for the public registration journey and supersedes baseline descriptions of offering-level registration.

```text
Program -> Grade -> Gender/Audience (self-declared)
-> Program Group / Course Cluster
-> optional Course Detail -> back to Program Group
-> Registration Information -> approved external payment/registration link
```

- Registration belongs to the selected program/audience group, not a course offering.
- Course cards and details contain no registration action.
- Registration begins only on the selected program-group page.
- An internal registration-information page must appear before an external link.
- Back/close returns to the selected program-group page.
- Gender/audience is not verified against identity and is not retained as personal data.

## Superseding data decision

`AudienceGroup.registrationTargetId` overrides `Program.defaultRegistrationTargetId`. `CourseOffering.registrationTargetId` is retired.

```ts
const targetId =
  group.registrationTargetId ??
  program.defaultRegistrationTargetId ??
  null;
```

Only enabled HTTPS targets from approved JSON may be rendered.

Registration-information content follows the same ownership boundary:
`AudienceGroup.registrationInfoHtml` overrides
`Program.registrationInfoHtml`. Both fields are optional safe HTML; catalogs
without either value retain the built-in information notice. Courses and
offerings do not own registration-information content.

## Superseding routes

- `/` — program/grade/gender selection
- `/programs/[groupId]` — program group and course cluster
- `/programs/[groupId]/courses/[offeringId]` — contextual course detail
- `/programs/[groupId]/registration` — information before external registration
- `/print`
- `/404`

## Source and build contract

Design sources are Markdown:

- `artifacts/Sderot_Courses_SDD_v1.0_final.md`
- `artifacts/Sderot_Courses_SDD_v1.1.md`
- `artifacts/Sderot_Courses_Detailed_Design_v1.0.md`
- `artifacts/Sderot_Courses_Use_Case_Specification_v1.0.md`

Any DOCX reference now applies only to course-content importing. The importer must adapt to an existing course-source Word document without changing it. TASK-008 must locate that source or obtain an explicit replacement input decision before parser implementation. Approved JSON remains the only production input.

## Acceptance additions

- Correct group is reached from program, grade, and self-declared audience selection.
- Course detail returns only to its program context.
- No course or offering registration CTA exists.
- Registration information is always shown before external navigation.
- Back/close from registration information returns to the program group.
