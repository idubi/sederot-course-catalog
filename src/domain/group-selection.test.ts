import { describe, expect, it } from 'vitest';
import approved from '../../content/approved/catalog.json';
import type { Catalog } from './catalog';
import { resolveGroupSelection } from './group-selection';

const catalog = approved as Catalog;

describe('program group selection', () => {
  it('resolves program, grade, and self-declared audience to one group', () => {
    const group = catalog.audienceGroups[0]!;
    expect(
      resolveGroupSelection(catalog, {
        programId: group.programId,
        gradeGroupId: group.gradeGroupId,
        gender: group.gender,
      }),
    ).toBe(group.id);
  });

  it('does not resolve incomplete or unavailable selections', () => {
    expect(
      resolveGroupSelection(catalog, {
        programId: '',
        gradeGroupId: '',
        gender: '',
      }),
    ).toBeUndefined();
    expect(
      resolveGroupSelection(catalog, {
        programId: 'missing',
        gradeGroupId: 'grade-5',
        gender: 'mixed',
      }),
    ).toBeUndefined();
  });
});
