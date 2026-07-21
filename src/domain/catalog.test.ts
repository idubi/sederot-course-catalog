import { describe, expect, expectTypeOf, it } from 'vitest';

import type { Catalog, Course, CourseOffering } from './catalog';

const catalogFixture = {
  schemaVersion: '1.0',
  academicYear: {
    id: '2026-2027',
    label: 'תשפ״ז',
  },
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
      registrationTargetId: 'gifted-grade-5-registration',
    },
  ],
  courses: [
    {
      id: 'debate',
      name: 'דיבייט',
      shortName: 'דיבייט',
      descriptionHtml: '<p>תיאור מאושר</p>',
      instructors: ['מורה לדוגמה'],
      defaultImage: {
        src: '/content/images/debate/general.webp',
        alt: 'תלמידים בקורס דיבייט',
      },
    },
  ],
  offerings: [
    {
      id: 'debate-gifted-grade-5-mixed',
      courseId: 'debate',
      audienceGroupId: 'gifted-grade-5-mixed',
      semester: 'annual',
      displayOrder: 1,
      imageOverride: {
        src: '/content/images/debate/mixed.webp',
        alt: 'קבוצת דיבייט מעורבת',
      },
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
    {
      id: 'gifted-grade-5-registration',
      type: 'registration',
      label: 'להרשמה ותשלום',
      url: 'https://example.test/register/grade-5',
      enabled: true,
    },
  ],
  contacts: {
    phone: '0800000000',
    whatsapp: '972800000000',
    email: 'catalog@example.test',
  },
} satisfies Catalog;

describe('catalog domain model', () => {
  it('represents contextual course membership through offerings', () => {
    const [offering] = catalogFixture.offerings;
    if (!offering) throw new Error('Expected an offering fixture');

    expect(offering.courseId).toBe('debate');
    expect(offering.audienceGroupId).toBe('gifted-grade-5-mixed');
  });

  it('keeps registration ownership off courses and offerings', () => {
    expectTypeOf<Course>().not.toHaveProperty('registrationTargetId');
    expectTypeOf<CourseOffering>().not.toHaveProperty('registrationTargetId');
  });

  it('supports group targets with a program default fallback', () => {
    const [program] = catalogFixture.programs;
    const [group] = catalogFixture.audienceGroups;
    if (!program || !group)
      throw new Error('Expected program and group fixtures');

    expect(group.registrationTargetId).toBe('gifted-grade-5-registration');
    expect(program.defaultRegistrationTargetId).toBe('gifted-registration');
  });
});
