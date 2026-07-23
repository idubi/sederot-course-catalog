import type { Catalog } from '../../../src/domain/catalog';

export type JsonCollection =
  | 'programs'
  | 'audienceGroups'
  | 'courses'
  | 'offerings'
  | 'registrationTargets';

export type JsonSelection = { collection: JsonCollection; id: string };
export type JsonReference = JsonSelection & { label: string };

export const jsonCollectionLabels: Record<JsonCollection, string> = {
  programs: 'תוכניות',
  audienceGroups: 'קבוצות',
  courses: 'קורסים',
  offerings: 'שיוכים',
  registrationTargets: 'יעדי רישום',
};

export function jsonObjectLabel(
  collection: JsonCollection,
  value: { id: string } & object,
) {
  if ('name' in value && typeof value.name === 'string') return value.name;
  if ('label' in value && typeof value.label === 'string') return value.label;
  return `${jsonCollectionLabels[collection]} · ${value.id}`;
}

export function catalogObjects(catalog: Catalog) {
  return (Object.keys(jsonCollectionLabels) as JsonCollection[]).flatMap(
    (collection) =>
      catalog[collection].map((value) => ({
        collection,
        id: value.id,
        label: jsonObjectLabel(collection, value),
        value,
      })),
  );
}

export function catalogReferences(
  catalog: Catalog,
  selection: JsonSelection,
): JsonReference[] {
  const refs: JsonReference[] = [];
  const add = (collection: JsonCollection, id: string, prefix: string) => {
    const value = catalog[collection].find((item) => item.id === id);
    if (value)
      refs.push({
        collection,
        id,
        label: `${prefix}: ${jsonObjectLabel(collection, value)}`,
      });
  };

  if (selection.collection === 'programs') {
    const program = catalog.programs.find(({ id }) => id === selection.id);
    catalog.audienceGroups
      .filter(({ programId }) => programId === selection.id)
      .forEach(({ id }) => add('audienceGroups', id, 'קבוצה'));
    if (program?.defaultRegistrationTargetId)
      add(
        'registrationTargets',
        program.defaultRegistrationTargetId,
        'יעד ברירת מחדל',
      );
  } else if (selection.collection === 'audienceGroups') {
    const group = catalog.audienceGroups.find(({ id }) => id === selection.id);
    if (group) {
      add('programs', group.programId, 'תוכנית');
      if (group.registrationTargetId)
        add('registrationTargets', group.registrationTargetId, 'יעד רישום');
    }
    catalog.offerings
      .filter(({ audienceGroupId }) => audienceGroupId === selection.id)
      .forEach(({ id }) => add('offerings', id, 'שיוך'));
  } else if (selection.collection === 'courses') {
    catalog.offerings
      .filter(({ courseId }) => courseId === selection.id)
      .forEach(({ id }) => add('offerings', id, 'שיוך'));
  } else if (selection.collection === 'offerings') {
    const offering = catalog.offerings.find(({ id }) => id === selection.id);
    if (offering) {
      add('courses', offering.courseId, 'קורס');
      add('audienceGroups', offering.audienceGroupId, 'קבוצה');
    }
  } else {
    catalog.programs
      .filter(
        ({ defaultRegistrationTargetId }) =>
          defaultRegistrationTargetId === selection.id,
      )
      .forEach(({ id }) => add('programs', id, 'תוכנית'));
    catalog.audienceGroups
      .filter(
        ({ registrationTargetId }) => registrationTargetId === selection.id,
      )
      .forEach(({ id }) => add('audienceGroups', id, 'קבוצה'));
  }

  return refs;
}
