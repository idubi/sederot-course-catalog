import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

import { buildImportArtifacts } from '../../tools/source-diagnostics/build-diagnostics';
import { normalizeBlueprint } from '../../tools/source-normalizer/normalize-blueprint';
import {
  parseBlueprint,
  reconstructBlueprint,
} from '../../tools/source-reader/blueprint-reader';

const fixturePath = 'tests/fixtures/importer/edge-cases.md';

async function readFixture() {
  const source = await readFile(fixturePath, 'utf8');
  return parseBlueprint(source, fixturePath);
}

describe('importer edge-case fixture', () => {
  it('reconstructs headings, numbered lists, and instructor labels exactly', async () => {
    const document = await readFixture();
    const numberedCourseItems = document.nodes.filter(
      ({ kind, raw }) => kind === 'list-item' && /^\d+[.)]\s/.test(raw),
    );

    expect(reconstructBlueprint(document)).toBe(document.source);
    expect(numberedCourseItems).toHaveLength(5);
    expect(
      ['מורה:', 'המורה:', 'בהנחיית:'].every((label) =>
        document.nodes.some(
          ({ kind, text }) => kind === 'heading' && text.includes(label),
        ),
      ),
    ).toBe(true);
  });

  it('keeps a shared course once and retains both group assignments', async () => {
    const draft = normalizeBlueprint(await readFixture());
    const sharedCourse = draft.courses.find(
      ({ name }) => name === 'קורס משותף',
    );

    expect(draft.programs).toHaveLength(2);
    expect(draft.audienceGroups).toHaveLength(2);
    expect(draft.courses).toHaveLength(4);
    expect(draft.offerings).toHaveLength(5);
    expect(sharedCourse?.sourceNames).toHaveLength(2);
    expect(
      draft.offerings.filter(({ courseId }) => courseId === sharedCourse?.id),
    ).toHaveLength(2);
  });

  it('diagnoses temporary, missing, duplicate, and unmatched source values', async () => {
    const artifacts = buildImportArtifacts(await readFixture());
    const codes = new Set(artifacts.diagnostics.map(({ code }) => code));

    expect(codes).toEqual(
      new Set([
        'TEMPORARY_COURSE_NAME',
        'COURSE_DETAILS_UNRESOLVED',
        'POSSIBLE_DUPLICATE_COURSE',
        'UNMATCHED_SOURCE_NODE',
      ]),
    );
    expect(
      artifacts.diagnostics.some(({ sourceExcerpt }) =>
        sourceExcerpt.includes('לא ידוע'),
      ),
    ).toBe(true);
    expect(
      artifacts.draft.unmatchedNodes.some(({ raw }) =>
        raw.includes('טקסט שאינו משויך'),
      ),
    ).toBe(true);
  });

  it('is deterministic and never adds registration to courses or offerings', async () => {
    const document = await readFixture();
    const first = buildImportArtifacts(document);
    const second = buildImportArtifacts(document);

    expect(second).toEqual(first);
    expect(
      JSON.stringify({
        courses: first.draft.courses,
        offerings: first.draft.offerings,
      }),
    ).not.toContain('registration');
  });
});
