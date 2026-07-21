import type { AudienceGender, Catalog } from './catalog';

export interface GroupSelection {
  gender: AudienceGender | '';
  gradeGroupId: string;
  programId: string;
}

export function resolveGroupSelection(
  catalog: Catalog,
  selection: GroupSelection,
): string | undefined {
  if (!selection.programId || !selection.gradeGroupId || !selection.gender)
    return undefined;
  return catalog.audienceGroups.find(
    (group) =>
      group.programId === selection.programId &&
      group.gradeGroupId === selection.gradeGroupId &&
      group.gender === selection.gender,
  )?.id;
}
