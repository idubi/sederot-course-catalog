import { z } from 'zod';

const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const nonBlankString = z
  .string()
  .min(1)
  .refine((value) => value.trim().length > 0, 'Must contain visible text');

export const catalogIdSchema = z
  .string()
  .regex(idPattern, 'Must be a lowercase kebab-case ID');

const entityIdSchema = catalogIdSchema;

export const imageAssetSchema = z
  .object({
    src: nonBlankString,
    alt: z.string(),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    sourceNote: nonBlankString.optional(),
  })
  .strict();

export const academicYearSchema = z
  .object({
    id: nonBlankString,
    label: nonBlankString,
  })
  .strict();

export const programSchema = z
  .object({
    id: entityIdSchema,
    name: nonBlankString,
    category: z.enum(['gifted', 'excellence']),
    defaultRegistrationTargetId: entityIdSchema.optional(),
  })
  .strict();

export const audienceGroupSchema = z
  .object({
    id: entityIdSchema,
    programId: entityIdSchema,
    gradeGroupId: entityIdSchema,
    gradeLabels: z.array(nonBlankString).min(1),
    gradeValues: z.array(nonBlankString).min(1),
    gender: z.enum(['boys', 'girls', 'mixed']),
    day: nonBlankString,
    startTime: z.string().regex(timePattern, 'Must use 24-hour HH:MM format'),
    endTime: z.string().regex(timePattern, 'Must use 24-hour HH:MM format'),
    registrationTargetId: entityIdSchema.optional(),
  })
  .strict();

export const courseSchema = z
  .object({
    id: entityIdSchema,
    name: nonBlankString,
    shortName: nonBlankString,
    descriptionHtml: nonBlankString,
    instructors: z.array(nonBlankString).min(1),
    defaultImage: imageAssetSchema.optional(),
  })
  .strict();

export const courseOfferingSchema = z
  .object({
    id: entityIdSchema,
    courseId: entityIdSchema,
    audienceGroupId: entityIdSchema,
    semester: z.enum(['annual', 'first', 'second']),
    displayOrder: z.number().int().nonnegative(),
    imageOverride: imageAssetSchema.optional(),
  })
  .strict();

const httpsUrlSchema = z
  .url()
  .refine((value) => new URL(value).protocol === 'https:', 'Must use HTTPS');

export const registrationTargetSchema = z
  .object({
    id: entityIdSchema,
    type: nonBlankString,
    label: nonBlankString,
    url: httpsUrlSchema,
    enabled: z.boolean(),
  })
  .strict();

export const contactsSchema = z
  .object({
    phone: nonBlankString,
    whatsapp: nonBlankString,
    email: z.email(),
  })
  .strict();

const structuralCatalogSchema = z
  .object({
    schemaVersion: z.literal('1.0'),
    academicYear: academicYearSchema,
    programs: z.array(programSchema),
    audienceGroups: z.array(audienceGroupSchema),
    courses: z.array(courseSchema),
    offerings: z.array(courseOfferingSchema),
    registrationTargets: z.array(registrationTargetSchema),
    contacts: contactsSchema,
  })
  .strict();

type StructuralCatalog = z.output<typeof structuralCatalogSchema>;
type EntityCollectionName =
  | 'programs'
  | 'audienceGroups'
  | 'courses'
  | 'offerings'
  | 'registrationTargets';

function reportDuplicateIds(
  catalog: StructuralCatalog,
  collectionName: EntityCollectionName,
  context: z.RefinementCtx,
): void {
  const seenIds = new Set<string>();

  catalog[collectionName].forEach((entity, index) => {
    if (seenIds.has(entity.id)) {
      context.addIssue({
        code: 'custom',
        message: `Duplicate ${collectionName} ID: ${entity.id}`,
        path: [collectionName, index, 'id'],
      });
    }
    seenIds.add(entity.id);
  });
}

export const catalogSchema = structuralCatalogSchema.superRefine(
  (catalog, context) => {
    const programIds = new Set(catalog.programs.map(({ id }) => id));
    const groupIds = new Set(catalog.audienceGroups.map(({ id }) => id));
    const courseIds = new Set(catalog.courses.map(({ id }) => id));
    const targetsById = new Map(
      catalog.registrationTargets.map((target) => [target.id, target]),
    );

    const addMissingReferenceIssue = (
      path: PropertyKey[],
      entityName: string,
      id: string,
    ): void => {
      context.addIssue({
        code: 'custom',
        message: `Unknown ${entityName} reference: ${id}`,
        path,
      });
    };

    (
      [
        'programs',
        'audienceGroups',
        'courses',
        'offerings',
        'registrationTargets',
      ] as const
    ).forEach((collectionName) =>
      reportDuplicateIds(catalog, collectionName, context),
    );

    catalog.programs.forEach((program, index) => {
      const targetId = program.defaultRegistrationTargetId;
      if (!targetId) return;

      const target = targetsById.get(targetId);
      if (!target) {
        addMissingReferenceIssue(
          ['programs', index, 'defaultRegistrationTargetId'],
          'registration target',
          targetId,
        );
      } else if (!target.enabled) {
        context.addIssue({
          code: 'custom',
          message: `Registration target is disabled: ${targetId}`,
          path: ['programs', index, 'defaultRegistrationTargetId'],
        });
      }
    });

    catalog.audienceGroups.forEach((group, index) => {
      if (!programIds.has(group.programId)) {
        addMissingReferenceIssue(
          ['audienceGroups', index, 'programId'],
          'program',
          group.programId,
        );
      }

      const program = catalog.programs.find(({ id }) => id === group.programId);
      const targetId =
        group.registrationTargetId ?? program?.defaultRegistrationTargetId;

      if (!targetId) {
        context.addIssue({
          code: 'custom',
          message:
            'Audience group has no registration target or program fallback',
          path: ['audienceGroups', index, 'registrationTargetId'],
        });
        return;
      }

      const target = targetsById.get(targetId);
      if (!target) {
        addMissingReferenceIssue(
          ['audienceGroups', index, 'registrationTargetId'],
          'registration target',
          targetId,
        );
      } else if (!target.enabled) {
        context.addIssue({
          code: 'custom',
          message: `Registration target is disabled: ${targetId}`,
          path: ['audienceGroups', index, 'registrationTargetId'],
        });
      }
    });

    catalog.offerings.forEach((offering, index) => {
      if (!courseIds.has(offering.courseId)) {
        addMissingReferenceIssue(
          ['offerings', index, 'courseId'],
          'course',
          offering.courseId,
        );
      }
      if (!groupIds.has(offering.audienceGroupId)) {
        addMissingReferenceIssue(
          ['offerings', index, 'audienceGroupId'],
          'audience group',
          offering.audienceGroupId,
        );
      }
    });
  },
);

export type ValidatedCatalog = z.output<typeof catalogSchema>;

export function validateCatalog(input: unknown) {
  return catalogSchema.safeParse(input);
}
