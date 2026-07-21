import { describe, expect, expectTypeOf, it } from 'vitest';

import type { Catalog } from '../domain';
import { catalogSchema, validateCatalog } from './schema';

function createValidCatalog(): Catalog {
  return {
    schemaVersion: '1.0',
    academicYear: { id: '2026-2027', label: 'תשפ״ז' },
    programs: [
      {
        id: 'gifted',
        name: 'מחוננים',
        category: 'gifted',
        defaultRegistrationTargetId: 'gifted-registration',
      },
    ],
    audienceGroups: [
      {
        id: 'gifted-grade-5-mixed',
        programId: 'gifted',
        gradeGroupId: 'grade-5',
        gradeLabels: ['כיתה ה׳'],
        gradeValues: ['5'],
        gender: 'mixed',
        day: 'sunday',
        startTime: '08:15',
        endTime: '13:15',
      },
    ],
    courses: [
      {
        id: 'debate',
        name: 'דיבייט',
        shortName: 'דיבייט',
        descriptionHtml: '<p>תיאור מאושר</p>',
        instructors: ['מורה לדוגמה'],
      },
    ],
    offerings: [
      {
        id: 'debate-gifted-grade-5-mixed',
        courseId: 'debate',
        audienceGroupId: 'gifted-grade-5-mixed',
        semester: 'annual',
        displayOrder: 0,
      },
    ],
    registrationTargets: [
      {
        id: 'gifted-registration',
        type: 'registration',
        label: 'להרשמה ותשלום',
        url: 'https://example.test/register',
        enabled: true,
      },
    ],
    contacts: {
      phone: '0800000000',
      whatsapp: '972800000000',
      email: 'catalog@example.test',
    },
  };
}

function issuePaths(input: unknown): string[] {
  const result = validateCatalog(input);
  if (result.success) return [];
  return result.error.issues.map(({ path }) => path.join('.'));
}

describe('catalog schema', () => {
  it('matches the canonical domain type and accepts a valid catalog', () => {
    const typedCatalog: Catalog = catalogSchema.parse(createValidCatalog());
    expectTypeOf(typedCatalog).toEqualTypeOf<Catalog>();
    expect(validateCatalog(createValidCatalog()).success).toBe(true);
  });

  it('rejects duplicate entity IDs with an exact path', () => {
    const catalog = createValidCatalog();
    catalog.courses.push({ ...catalog.courses[0]!, name: 'עותק' });

    expect(issuePaths(catalog)).toContain('courses.1.id');
  });

  it('rejects missing course and audience-group references', () => {
    const catalog = createValidCatalog();
    catalog.offerings[0]!.courseId = 'missing-course';
    catalog.offerings[0]!.audienceGroupId = 'missing-group';

    expect(issuePaths(catalog)).toEqual(
      expect.arrayContaining([
        'offerings.0.courseId',
        'offerings.0.audienceGroupId',
      ]),
    );
  });

  it('rejects missing program references', () => {
    const catalog = createValidCatalog();
    catalog.audienceGroups[0]!.programId = 'missing-program';

    expect(issuePaths(catalog)).toContain('audienceGroups.0.programId');
  });

  it('rejects HTTP registration URLs', () => {
    const catalog = createValidCatalog();
    catalog.registrationTargets[0]!.url = 'http://example.test/register';

    expect(issuePaths(catalog)).toContain('registrationTargets.0.url');
  });

  it('rejects disabled effective registration targets', () => {
    const catalog = createValidCatalog();
    catalog.registrationTargets[0]!.enabled = false;

    expect(issuePaths(catalog)).toEqual(
      expect.arrayContaining([
        'programs.0.defaultRegistrationTargetId',
        'audienceGroups.0.registrationTargetId',
      ]),
    );
  });

  it('rejects groups without a group target or program fallback', () => {
    const catalog = createValidCatalog();
    delete catalog.programs[0]!.defaultRegistrationTargetId;

    expect(issuePaths(catalog)).toContain(
      'audienceGroups.0.registrationTargetId',
    );
  });

  it('rejects offering-level registration data', () => {
    const catalog = createValidCatalog() as unknown as Record<string, unknown>;
    const offerings = catalog.offerings as Record<string, unknown>[];
    offerings[0]!.registrationTargetId = 'gifted-registration';

    expect(issuePaths(catalog)).toContain('offerings.0');
  });

  it('rejects images outside the approved public asset path', () => {
    const catalog = createValidCatalog();
    catalog.courses[0]!.defaultImage = {
      src: 'https://example.test/image.webp',
      alt: 'תמונה',
    };
    expect(issuePaths(catalog)).toContain('courses.0.defaultImage.src');
  });
});
