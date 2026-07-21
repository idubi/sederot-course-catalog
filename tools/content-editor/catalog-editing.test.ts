import { describe, expect, it } from 'vitest';

import catalogFixture from '../../content/approved/catalog.json';
import type { Catalog } from '../../src/domain/catalog';
import {
  moveAudienceGroup,
  reorderOffering,
  updateAudienceGroup,
  updateCourse,
  updateOffering,
  updateProgram,
  resolveRegistrationTarget,
  updateRegistrationTarget,
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

  it('cascades a course ID change to contextual offerings', () => {
    const course = catalog.courses[0]!;
    const updated = updateCourse(catalog, course.id, {
      ...course,
      id: 'course-updated',
    });
    expect(updated.offerings[0]?.courseId).toBe('course-updated');
  });

  it('updates an offering without registration data', () => {
    const offering = catalog.offerings[0]!;
    const updated = updateOffering(catalog, offering.id, {
      ...offering,
      semester: 'first',
    });
    expect(updated.offerings[0]?.semester).toBe('first');
    expect(JSON.stringify(updated.offerings)).not.toContain('registration');
  });

  it('keeps a lone offering in place', () => {
    expect(reorderOffering(catalog, catalog.offerings[0]!.id, 1)).toBe(catalog);
  });

  it('resolves a group target before the program default', () => {
    const defaultTarget = catalog.registrationTargets[0]!;
    const groupTarget = { ...defaultTarget, id: 'group-registration' };
    const withOverride: Catalog = {
      ...catalog,
      registrationTargets: [defaultTarget, groupTarget],
      audienceGroups: [
        { ...catalog.audienceGroups[0]!, registrationTargetId: groupTarget.id },
      ],
    };
    expect(
      resolveRegistrationTarget(
        withOverride,
        withOverride.audienceGroups[0]!.id,
      )?.id,
    ).toBe(groupTarget.id);
  });

  it('falls back to the program registration target', () => {
    expect(
      resolveRegistrationTarget(catalog, catalog.audienceGroups[0]!.id)?.id,
    ).toBe(catalog.programs[0]!.defaultRegistrationTargetId);
  });

  it('cascades a registration target ID without touching offerings', () => {
    const current = catalog.registrationTargets[0]!;
    const updated = updateRegistrationTarget(catalog, current.id, {
      ...current,
      id: 'registration-updated',
    });
    expect(updated.programs[0]?.defaultRegistrationTargetId).toBe(
      'registration-updated',
    );
    expect(JSON.stringify(updated.offerings)).not.toContain('registration');
  });
});
