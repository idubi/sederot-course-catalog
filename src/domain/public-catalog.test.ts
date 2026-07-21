import { describe, expect, it } from 'vitest';

import approved from '../../content/approved/catalog.json';
import type { Catalog } from './catalog';
import { buildProgramGroups, buildProgramSummaries } from './public-catalog';

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
});
