import { describe, expect, it } from 'vitest';

import approved from '../../content/approved/catalog.json';
import type { Catalog } from './catalog';
import {
  buildProgramGroups,
  buildProgramSummaries,
  buildRegistrationPages,
} from './public-catalog';

const catalog = approved as Catalog;

describe('public catalog view models', () => {
  it('joins approved program, group, course, and offering data', () => {
    const group = buildProgramGroups(catalog)[0]!;
    expect(group.programName).toBe(catalog.programs[0]!.name);
    expect(group.offerings[0]?.courseName).toBe(catalog.courses[0]!.name);
    expect(group.offerings[0]).not.toHaveProperty('registrationTargetId');
  });

  it('summarizes groups and offerings by program', () => {
    expect(buildProgramSummaries(catalog)[0]).toMatchObject({
      groupCount: 1,
      offeringCount: 1,
    });
  });

  it('uses offering image override before course default', () => {
    const copy = structuredClone(catalog);
    copy.courses[0]!.defaultImage = {
      src: '/content/images/default.webp',
      alt: 'default',
    };
    copy.offerings[0]!.imageOverride = {
      src: '/content/images/override.webp',
      alt: 'override',
    };
    expect(buildProgramGroups(copy)[0]?.offerings[0]?.image?.alt).toBe(
      'override',
    );
  });

  it('uses the course image when there is no offering override', () => {
    const copy = structuredClone(catalog);
    copy.courses[0]!.defaultImage = {
      src: '/content/images/default.webp',
      alt: 'default',
    };
    delete copy.offerings[0]!.imageOverride;

    expect(buildProgramGroups(copy)[0]?.offerings[0]?.image?.alt).toBe(
      'default',
    );
  });

  it('keeps an image absent when neither image source exists', () => {
    const copy = structuredClone(catalog);
    delete copy.courses[0]!.defaultImage;
    delete copy.offerings[0]!.imageOverride;

    expect(buildProgramGroups(copy)[0]?.offerings[0]?.image).toBeUndefined();
  });

  it('sorts contextual offerings by display order and then stable ID', () => {
    const copy = structuredClone(catalog);
    const original = copy.offerings[0]!;
    copy.offerings = [
      { ...original, id: 'z-course', displayOrder: 2 },
      { ...original, id: 'b-course', displayOrder: 1 },
      { ...original, id: 'a-course', displayOrder: 1 },
    ];

    expect(
      buildProgramGroups(copy)[0]?.offerings.map(
        ({ offeringId }) => offeringId,
      ),
    ).toEqual(['a-course', 'b-course', 'z-course']);
  });

  it('resolves group registration targets before the program default', () => {
    const copy = structuredClone(catalog);
    copy.registrationTargets.push({
      id: 'group-registration',
      type: 'payment',
      label: 'Group target',
      url: 'https://example.com/group',
      enabled: true,
    });
    copy.audienceGroups[0]!.registrationTargetId = 'group-registration';

    expect(buildRegistrationPages(copy)[0]).toMatchObject({
      groupId: copy.audienceGroups[0]!.id,
      targetLabel: 'Group target',
      targetUrl: 'https://example.com/group',
    });
  });

  it('falls back to the program registration target without using offerings', () => {
    const registration = buildRegistrationPages(catalog)[0]!;
    expect(registration.targetUrl).toBe(catalog.registrationTargets[0]!.url);
    expect(registration).not.toHaveProperty('offeringId');
    expect(registration).not.toHaveProperty('courseId');
  });

  it('resolves group registration information before the program content', () => {
    const copy = structuredClone(catalog);
    copy.programs[0]!.registrationInfoHtml = '<p>מידע תוכנית</p>';
    copy.audienceGroups[0]!.registrationInfoHtml = '<p>מידע קבוצה</p>';

    expect(buildRegistrationPages(copy)[0]?.registrationInfoHtml).toBe(
      '<p>מידע קבוצה</p>',
    );
  });

  it('inherits program registration information when the group is blank', () => {
    const copy = structuredClone(catalog);
    copy.programs[0]!.registrationInfoHtml = '<p>מידע תוכנית</p>';
    delete copy.audienceGroups[0]!.registrationInfoHtml;

    expect(buildRegistrationPages(copy)[0]?.registrationInfoHtml).toBe(
      '<p>מידע תוכנית</p>',
    );
  });

  it('keeps the built-in safety notice for legacy catalogs', () => {
    const registration = buildRegistrationPages(catalog)[0]!;

    expect(registration.registrationInfoHtml).toContain(
      'המשך ההרשמה והתשלום מתבצע באתר חיצוני',
    );
  });
});
