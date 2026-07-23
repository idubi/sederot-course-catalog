import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';

import type { Catalog } from '../domain/catalog';
import type {
  OfferingViewModel,
  ProgramGroupViewModel,
  RegistrationViewModel,
} from '../domain/public-catalog';
import ContactActions from './ContactActions.astro';
import CourseCard from './CourseCard.astro';
import SelectionFunnel from './SelectionFunnel.astro';
import RegistrationPage from '../pages/programs/[groupId]/registration.astro';

const catalog: Catalog = {
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
      day: 'ראשון',
      startTime: '08:15',
      endTime: '13:15',
    },
  ],
  courses: [],
  offerings: [],
  registrationTargets: [
    {
      id: 'gifted-registration',
      type: 'registration',
      label: 'רישום מאושר',
      url: 'https://example.test/register',
      enabled: true,
    },
  ],
  contacts: {
    phone: '0800000000',
    whatsapp: '972500000000',
    email: 'catalog@example.test',
  },
};

const offering: OfferingViewModel = {
  audienceGroupId: 'gifted-grade-5-mixed',
  courseId: 'creative-writing',
  courseName: 'כתיבה יוצרת',
  descriptionHtml: '<p>תיאור מאושר</p>',
  displayOrder: 1,
  instructors: ['מנחה לדוגמה'],
  offeringId: 'creative-writing-gifted-grade-5-mixed',
  semester: 'annual',
  shortName: 'כתיבה',
};

const group: ProgramGroupViewModel = {
  day: 'ראשון',
  endTime: '13:15',
  gender: 'mixed',
  gradeGroupId: 'grade-5',
  gradeLabels: ['כיתה ה׳'],
  groupId: 'gifted-grade-5-mixed',
  offerings: [offering],
  programId: 'gifted',
  programName: 'מחוננים',
  startTime: '08:15',
};

describe('public Astro components', () => {
  let container: AstroContainer;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it('renders a course card with contextual details and no registration action', async () => {
    const html = await container.renderToString(CourseCard, {
      props: { offering, groupId: group.groupId, base: '/' },
    });

    expect(html).toContain('כתיבה יוצרת');
    expect(html).toContain(
      '/programs/gifted-grade-5-mixed/courses/creative-writing-gifted-grade-5-mixed/',
    );
    expect(html).not.toMatch(
      /הרשמה|registrationTarget|example\.test\/register/,
    );
    expect(html).not.toContain('<img');
  });

  it('renders resolved image metadata when a card has an image', async () => {
    const html = await container.renderToString(CourseCard, {
      props: {
        offering: {
          ...offering,
          image: {
            src: '/content/images/course.webp',
            alt: 'תלמידים כותבים',
          },
        },
        groupId: group.groupId,
        base: '/catalog/',
      },
    });

    expect(html).toContain('src="/catalog/content/images/course.webp"');
    expect(html).toContain('alt="תלמידים כותבים"');
  });

  it('renders labelled selection controls and the self-declaration notice', async () => {
    const html = await container.renderToString(SelectionFunnel, {
      props: { catalog },
    });

    expect(html).toContain('for="program-selection"');
    expect(html).toContain('role="status"');
    expect(html).toContain('אינה נשמרת');
    expect(html).not.toContain('registrationTargetId');
  });

  it('renders encoded contextual contacts without a form or storage', async () => {
    const html = await container.renderToString(ContactActions, {
      props: {
        contacts: catalog.contacts,
        programName: group.programName,
        gradeLabels: group.gradeLabels,
        courseName: offering.courseName,
      },
    });

    expect(html).toContain('https://wa.me/972500000000?text=');
    expect(html).toContain('mailto:catalog@example.test?subject=');
    expect(html).not.toContain('<form');
    expect(html).not.toMatch(/localStorage|sessionStorage/);
  });

  it('renders registration information before the sole safe external CTA', async () => {
    const registration: RegistrationViewModel = {
      groupId: group.groupId,
      gradeLabels: group.gradeLabels,
      programName: group.programName,
      registrationInfoHtml:
        '<p><strong>נוהל תשלום ייעודי</strong></p><p>פנייה לצוות התוכנית.</p>',
      targetLabel: 'רישום מאושר',
      targetType: 'registration',
      targetUrl: 'https://example.test/register',
    };
    const html = await container.renderToString(RegistrationPage, {
      props: { registration },
    });

    expect(html.indexOf('מידע לפני הרשמה')).toBeLessThan(
      html.indexOf('https://example.test/register'),
    );
    expect(html.indexOf('נוהל תשלום ייעודי')).toBeLessThan(
      html.indexOf('https://example.test/register'),
    );
    expect(html).toContain('פנייה לצוות התוכנית');
    expect(html).toContain('/programs/gifted-grade-5-mixed/');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).not.toMatch(/courseId|offeringId/);
  });
});
