import type { AudienceGroup, Catalog, Program } from '../../src/domain/catalog';

export function updateProgram(
  catalog: Catalog,
  programId: string,
  update: Program,
): Catalog {
  return {
    ...catalog,
    programs: catalog.programs.map((program) =>
      program.id === programId ? update : program,
    ),
    audienceGroups: catalog.audienceGroups.map((group) =>
      group.programId === programId
        ? { ...group, programId: update.id }
        : group,
    ),
  };
}

export function updateAudienceGroup(
  catalog: Catalog,
  groupId: string,
  update: AudienceGroup,
): Catalog {
  return {
    ...catalog,
    audienceGroups: catalog.audienceGroups.map((group) =>
      group.id === groupId ? update : group,
    ),
    offerings: catalog.offerings.map((offering) =>
      offering.audienceGroupId === groupId
        ? { ...offering, audienceGroupId: update.id }
        : offering,
    ),
  };
}

export function moveAudienceGroup(
  catalog: Catalog,
  groupId: string,
  direction: -1 | 1,
): Catalog {
  const groups = [...catalog.audienceGroups];
  const index = groups.findIndex(({ id }) => id === groupId);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= groups.length) return catalog;
  [groups[index], groups[target]] = [groups[target]!, groups[index]!];
  return { ...catalog, audienceGroups: groups };
}
