import { describe, expect, it } from 'vitest';

import approvedCatalog from '../../../content/approved/catalog.json';
import type { Catalog } from '../../../src/domain/catalog';
import {
  catalogObjects,
  catalogReferences,
  jsonObjectOffset,
  jsonSelectionAtOffset,
} from './json-references';

const catalog = approvedCatalog as Catalog;

describe('JSON reference browser', () => {
  it('links a program to its group and registration target', () => {
    expect(
      catalogReferences(catalog, {
        collection: 'programs',
        id: 'gifted',
      }).map(({ collection, id }) => `${collection}:${id}`),
    ).toEqual([
      'audienceGroups:gifted-grade-5-mixed',
      'registrationTargets:seed-registration',
    ]);
  });

  it('links an offering back to its course and audience group', () => {
    expect(
      catalogReferences(catalog, {
        collection: 'offerings',
        id: 'seed-course-gifted-grade-5-mixed',
      }).map(({ collection, id }) => `${collection}:${id}`),
    ).toEqual(['courses:seed-course', 'audienceGroups:gifted-grade-5-mixed']);
  });

  it('maps raw JSON offsets to objects in both directions', () => {
    const text = `${JSON.stringify(catalog, null, 2)}\n`;
    const course = { collection: 'courses' as const, id: 'seed-course' };
    const offset = jsonObjectOffset(text, course);
    expect(offset).toBeGreaterThan(0);
    expect(
      jsonSelectionAtOffset(
        text,
        catalogObjects(catalog).map(({ collection, id }) => ({
          collection,
          id,
        })),
        offset + 20,
      ),
    ).toEqual(course);
  });
});
