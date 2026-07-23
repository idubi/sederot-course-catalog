import { describe, expect, it } from 'vitest';

import { readApprovedBlueprint } from '../source-reader/blueprint-reader';
import {
  NORMALIZED_DRAFT_PATH,
  normalizeBlueprint,
} from './normalize-blueprint';

describe('blueprint normalization', () => {
  it('creates stable program-first groups and traceable offerings', async () => {
    const draft = normalizeBlueprint(await readApprovedBlueprint());

    expect(NORMALIZED_DRAFT_PATH).toBe(
      'content/draft/import/normalized-catalog.json',
    );
    expect(draft.programs.map(({ id }) => id)).toEqual([
      'gifted',
      'excellence',
    ]);
    expect(draft.audienceGroups).toHaveLength(26);
    expect(draft.offerings).toHaveLength(151);
    expect(new Set(draft.audienceGroups.map(({ id }) => id)).size).toBe(26);
    expect(draft.offerings.every(({ source }) => source.raw.length > 0)).toBe(
      true,
    );
    expect(
      draft.offerings.every(({ audienceGroupId }) =>
        draft.audienceGroups.some(({ id }) => id === audienceGroupId),
      ),
    ).toBe(true);
  });

  it('deduplicates only exact normalized names and retains every assignment', async () => {
    const draft = normalizeBlueprint(await readApprovedBlueprint());
    const socialCourse = draft.courses.find(
      ({ name }) => name === 'הרצועה החברתית',
    );

    expect(socialCourse?.temporaryName).toBe(true);
    expect(socialCourse?.sourceNames).toHaveLength(24);
    expect(
      draft.offerings.filter(({ courseId }) => courseId === socialCourse?.id),
    ).toHaveLength(24);
    expect(draft.courses.some(({ name }) => name === 'תעלומות במוזיאון')).toBe(
      true,
    );
    expect(draft.courses.some(({ name }) => name === 'תעלומות המוזיאון')).toBe(
      true,
    );
  });

  it('preserves grade ranges, combined audiences, and unmatched source nodes', async () => {
    const draft = normalizeBlueprint(await readApprovedBlueprint());
    const rangeGroup = draft.audienceGroups.find(
      ({ gradeGroupId }) => gradeGroupId === 'grades-8-9',
    );

    expect(rangeGroup).toMatchObject({
      gender: 'mixed',
      rawAudienceLabel: 'בנים + בנות',
      gradeValues: ['8', '9'],
    });
    expect(draft.unmatchedNodes.length).toBeGreaterThan(0);
    expect(
      draft.unmatchedNodes.some(({ raw }) => raw.includes('בהנחיית')),
    ).toBe(true);
  });

  it('never creates registration data on courses or offerings', async () => {
    const draft = normalizeBlueprint(await readApprovedBlueprint());
    const serialized = JSON.stringify({
      courses: draft.courses,
      offerings: draft.offerings,
    });

    expect(serialized).not.toContain('registration');
  });

  it('normalizes both sides of a time range to HH:MM', async () => {
    const draft = normalizeBlueprint(await readApprovedBlueprint());

    expect(draft.audienceGroups[0]).toMatchObject({
      startTime: '08:15',
      endTime: '13:15',
    });
    expect(
      draft.audienceGroups.every(
        ({ startTime, endTime }) =>
          /^\d{2}:\d{2}$/u.test(startTime) && /^\d{2}:\d{2}$/u.test(endTime),
      ),
    ).toBe(true);
  });

  it('links course descriptions and instructor names from detail sections', async () => {
    const draft = normalizeBlueprint(await readApprovedBlueprint());
    const disney = draft.courses.find(({ name }) => name === 'האקדמיה לדיסני');
    const microcode = draft.courses.find(({ name }) => name === 'מיקרוקוד');

    expect(disney?.instructors).toEqual(['לבנת שלזינגר', 'רוני כהן']);
    expect(microcode?.instructors).toEqual(['אלכס גולוד']);
    expect(microcode?.descriptionHtml).toContain('<p>תכנות הוא');
    expect(
      draft.courses.find(({ name }) => name === 'תעלומות במוזיאון')
        ?.instructors,
    ).toEqual(['ענת וינשטיין ברקוביץ', 'אולגה אסיפוב']);
    expect(
      draft.courses.find(({ name }) => name === 'NLPפלייבק')?.instructors,
    ).toEqual(['ימית הוסטר']);
    expect(
      draft.courses.find(({ name }) => name === 'גנטיקה/שירלי')?.instructors,
    ).toEqual([`ד"ר שירלי גזית`]);
    expect(
      draft.courses.find(({ name }) => name === 'פיתוח VR')?.instructors,
    ).toEqual(['LoginVR']);
  });
});
