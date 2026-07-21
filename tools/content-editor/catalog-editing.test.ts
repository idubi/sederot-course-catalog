import { describe, expect, it } from 'vitest';

import catalogFixture from '../../content/approved/catalog.json';
import type { Catalog } from '../../src/domain/catalog';
import {
  moveAudienceGroup,
  updateAudienceGroup,
  updateProgram,
} from './catalog-editing';

const catalog = catalogFixture as Catalog;

describe('program and audience-group editing', () => {
  it('cascades a program ID change to its groups', () => {
    const program = catalog.programs[0]!;
    const updated = updateProgram(catalog, program.id, {
      ...program,
      id: 'program-updated',
    });
    expect(updated.audienceGroups[0]?.programId).toBe('program-updated');
  });

  it('cascades a group ID change to its offerings', () => {
    const group = catalog.audienceGroups[0]!;
    const updated = updateAudienceGroup(catalog, group.id, {
      ...group,
      id: 'group-updated',
    });
    expect(updated.offerings[0]?.audienceGroupId).toBe('group-updated');
  });

  it('keeps order unchanged when a group cannot move', () => {
    expect(moveAudienceGroup(catalog, catalog.audienceGroups[0]!.id, -1)).toBe(
      catalog,
    );
  });
});
