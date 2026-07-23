import type {
  AudienceGroup,
  Catalog,
  Course,
  CourseOffering,
  Program,
  RegistrationTarget,
  ImageAsset,
} from '../../src/domain/catalog';

export function resolveOfferingImage(
  course: Course,
  offering: CourseOffering,
): ImageAsset | undefined {
  return offering.imageOverride ?? course.defaultImage;
}

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

export function updateCourse(
  catalog: Catalog,
  courseId: string,
  update: Course,
): Catalog {
  return {
    ...catalog,
    courses: catalog.courses.map((course) =>
      course.id === courseId ? update : course,
    ),
    offerings: catalog.offerings.map((offering) =>
      offering.courseId === courseId
        ? { ...offering, courseId: update.id }
        : offering,
    ),
  };
}

export function updateOffering(
  catalog: Catalog,
  offeringId: string,
  update: CourseOffering,
): Catalog {
  return {
    ...catalog,
    offerings: catalog.offerings.map((offering) =>
      offering.id === offeringId ? update : offering,
    ),
  };
}

export function setCourseGroupAssignment(
  catalog: Catalog,
  courseId: string,
  audienceGroupId: string,
  assigned: boolean,
): Catalog {
  const existing = catalog.offerings.filter(
    (offering) =>
      offering.courseId === courseId &&
      offering.audienceGroupId === audienceGroupId,
  );
  if (!assigned) {
    return existing.length === 0
      ? catalog
      : {
          ...catalog,
          offerings: catalog.offerings.filter(
            (offering) => !existing.includes(offering),
          ),
        };
  }
  if (existing.length > 0) return catalog;
  const displayOrder = catalog.offerings
    .filter((offering) => offering.audienceGroupId === audienceGroupId)
    .reduce(
      (highest, offering) => Math.max(highest, offering.displayOrder),
      -1,
    );
  return {
    ...catalog,
    offerings: [
      ...catalog.offerings,
      {
        id: `offering-${courseId}-${audienceGroupId}`,
        courseId,
        audienceGroupId,
        semester: 'annual',
        displayOrder: displayOrder + 1,
      },
    ],
  };
}

export function addCourse(catalog: Catalog): Catalog {
  const suffix = String(catalog.courses.length + 1).padStart(2, '0');
  return {
    ...catalog,
    courses: [
      ...catalog.courses,
      {
        id: `course-new-${suffix}`,
        name: 'קורס חדש',
        shortName: 'קורס חדש',
        descriptionHtml: '<p>יש להזין תיאור</p>',
        instructors: ['יש להזין מנחה'],
      },
    ],
  };
}

export function removeCourse(catalog: Catalog, courseId: string): Catalog {
  return {
    ...catalog,
    courses: catalog.courses.filter(({ id }) => id !== courseId),
    offerings: catalog.offerings.filter(
      (offering) => offering.courseId !== courseId,
    ),
  };
}

export function addProgram(catalog: Catalog): Catalog {
  const suffix = String(catalog.programs.length + 1).padStart(2, '0');
  return {
    ...catalog,
    programs: [
      ...catalog.programs,
      {
        id: `program-new-${suffix}`,
        name: 'תוכנית חדשה',
        category: 'excellence',
      },
    ],
  };
}

export function removeProgram(catalog: Catalog, programId: string): Catalog {
  const groupIds = new Set(
    catalog.audienceGroups
      .filter(({ programId: id }) => id === programId)
      .map(({ id }) => id),
  );
  return {
    ...catalog,
    programs: catalog.programs.filter(({ id }) => id !== programId),
    audienceGroups: catalog.audienceGroups.filter(
      ({ programId: id }) => id !== programId,
    ),
    offerings: catalog.offerings.filter(
      ({ audienceGroupId }) => !groupIds.has(audienceGroupId),
    ),
  };
}

export function addAudienceGroup(catalog: Catalog): Catalog {
  const programId = catalog.programs[0]?.id ?? 'program-required';
  const suffix = String(catalog.audienceGroups.length + 1).padStart(2, '0');
  return {
    ...catalog,
    audienceGroups: [
      ...catalog.audienceGroups,
      {
        id: `group-new-${suffix}`,
        programId,
        gradeGroupId: `grade-new-${suffix}`,
        gradeLabels: ['יש להזין שכבה'],
        gradeValues: ['pending'],
        gender: 'mixed',
        day: 'יש להזין יום',
        startTime: '08:00',
        endTime: '13:00',
      },
    ],
  };
}

export function removeAudienceGroup(
  catalog: Catalog,
  groupId: string,
): Catalog {
  return {
    ...catalog,
    audienceGroups: catalog.audienceGroups.filter(({ id }) => id !== groupId),
    offerings: catalog.offerings.filter(
      ({ audienceGroupId }) => audienceGroupId !== groupId,
    ),
  };
}

export function reorderOffering(
  catalog: Catalog,
  offeringId: string,
  direction: -1 | 1,
): Catalog {
  const current = catalog.offerings.find(({ id }) => id === offeringId);
  if (!current) return catalog;
  const peers = catalog.offerings
    .filter(
      ({ audienceGroupId }) => audienceGroupId === current.audienceGroupId,
    )
    .sort((a, b) => a.displayOrder - b.displayOrder);
  const index = peers.findIndex(({ id }) => id === offeringId);
  const target = index + direction;
  if (target < 0 || target >= peers.length) return catalog;
  const other = peers[target]!;
  return {
    ...catalog,
    offerings: catalog.offerings.map((offering) => {
      if (offering.id === current.id)
        return { ...offering, displayOrder: other.displayOrder };
      if (offering.id === other.id)
        return { ...offering, displayOrder: current.displayOrder };
      return offering;
    }),
  };
}

export function updateRegistrationTarget(
  catalog: Catalog,
  targetId: string,
  update: RegistrationTarget,
): Catalog {
  return {
    ...catalog,
    registrationTargets: catalog.registrationTargets.map((target) =>
      target.id === targetId ? update : target,
    ),
    programs: catalog.programs.map((program) =>
      program.defaultRegistrationTargetId === targetId
        ? { ...program, defaultRegistrationTargetId: update.id }
        : program,
    ),
    audienceGroups: catalog.audienceGroups.map((group) =>
      group.registrationTargetId === targetId
        ? { ...group, registrationTargetId: update.id }
        : group,
    ),
  };
}

function uniqueRegistrationTargetId(catalog: Catalog, base: string) {
  if (!catalog.registrationTargets.some(({ id }) => id === base)) return base;
  let suffix = 2;
  while (
    catalog.registrationTargets.some(({ id }) => id === `${base}-${suffix}`)
  ) {
    suffix += 1;
  }
  return `${base}-${suffix}`;
}

function registrationTargetReferenceCount(catalog: Catalog, targetId: string) {
  return (
    catalog.programs.filter(
      ({ defaultRegistrationTargetId }) =>
        defaultRegistrationTargetId === targetId,
    ).length +
    catalog.audienceGroups.filter(
      ({ registrationTargetId }) => registrationTargetId === targetId,
    ).length
  );
}

function registrationTarget(id: string, url: string): RegistrationTarget {
  return {
    id,
    type: 'registration',
    label: 'להרשמה ותשלום',
    url,
    enabled: true,
  };
}

export function setProgramRegistrationUrl(
  catalog: Catalog,
  programId: string,
  url: string,
): Catalog {
  const program = catalog.programs.find(({ id }) => id === programId);
  if (!program) return catalog;
  const targetId = program.defaultRegistrationTargetId;
  const current = catalog.registrationTargets.find(({ id }) => id === targetId);

  if (!url) {
    const update = { ...program };
    delete update.defaultRegistrationTargetId;
    return updateProgram(catalog, programId, update);
  }
  if (current && registrationTargetReferenceCount(catalog, current.id) === 1) {
    return updateRegistrationTarget(catalog, current.id, { ...current, url });
  }

  const id = uniqueRegistrationTargetId(catalog, `${programId}-registration`);
  return {
    ...catalog,
    programs: catalog.programs.map((value) =>
      value.id === programId
        ? { ...value, defaultRegistrationTargetId: id }
        : value,
    ),
    registrationTargets: [
      ...catalog.registrationTargets,
      registrationTarget(id, url),
    ],
  };
}

export function setAudienceGroupRegistrationUrl(
  catalog: Catalog,
  groupId: string,
  url: string,
): Catalog {
  const group = catalog.audienceGroups.find(({ id }) => id === groupId);
  if (!group) return catalog;
  const targetId = group.registrationTargetId;
  const current = catalog.registrationTargets.find(({ id }) => id === targetId);

  if (!url) {
    const update = { ...group };
    delete update.registrationTargetId;
    return updateAudienceGroup(catalog, groupId, update);
  }
  if (current && registrationTargetReferenceCount(catalog, current.id) === 1) {
    return updateRegistrationTarget(catalog, current.id, { ...current, url });
  }

  const id = uniqueRegistrationTargetId(catalog, `${groupId}-registration`);
  return {
    ...catalog,
    audienceGroups: catalog.audienceGroups.map((value) =>
      value.id === groupId ? { ...value, registrationTargetId: id } : value,
    ),
    registrationTargets: [
      ...catalog.registrationTargets,
      registrationTarget(id, url),
    ],
  };
}

export function resolveRegistrationTarget(catalog: Catalog, groupId: string) {
  const group = catalog.audienceGroups.find(({ id }) => id === groupId);
  const program = catalog.programs.find(({ id }) => id === group?.programId);
  const targetId =
    group?.registrationTargetId ?? program?.defaultRegistrationTargetId;
  return catalog.registrationTargets.find(({ id }) => id === targetId);
}
