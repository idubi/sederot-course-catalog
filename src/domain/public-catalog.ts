import type { AudienceGender, Catalog, ImageAsset, Semester } from './catalog';

export interface OfferingViewModel {
  audienceGroupId: string;
  courseId: string;
  courseName: string;
  descriptionHtml: string;
  displayOrder: number;
  image?: ImageAsset | undefined;
  instructors: string[];
  offeringId: string;
  semester: Semester;
  shortName: string;
}

export interface ProgramGroupViewModel {
  day: string;
  endTime: string;
  gender: AudienceGender;
  gradeGroupId: string;
  gradeLabels: string[];
  groupId: string;
  offerings: OfferingViewModel[];
  programId: string;
  programName: string;
  startTime: string;
}

export interface ProgramSummaryViewModel {
  category: 'gifted' | 'excellence';
  groupCount: number;
  id: string;
  name: string;
  offeringCount: number;
}

export interface RegistrationViewModel {
  groupId: string;
  gradeLabels: string[];
  programName: string;
  registrationInfoHtml: string;
  targetLabel: string;
  targetType: string;
  targetUrl: string;
}

export const DEFAULT_REGISTRATION_INFO_HTML =
  '<ul><li>המשך ההרשמה והתשלום מתבצע באתר חיצוני.</li><li>האתר הנוכחי אינו אוסף או שומר פרטי רישום ותשלום.</li><li>אפשר לחזור כעת לאשכול הקורסים בלי לעבור לאתר החיצוני.</li></ul>';

export function buildRegistrationPages(
  catalog: Catalog,
): RegistrationViewModel[] {
  const programs = new Map(
    catalog.programs.map((program) => [program.id, program]),
  );
  const targets = new Map(
    catalog.registrationTargets.map((target) => [target.id, target]),
  );

  return catalog.audienceGroups.map((group) => {
    const program = programs.get(group.programId)!;
    const targetId =
      group.registrationTargetId ?? program.defaultRegistrationTargetId!;
    const target = targets.get(targetId)!;

    return {
      groupId: group.id,
      gradeLabels: group.gradeLabels,
      programName: program.name,
      registrationInfoHtml:
        group.registrationInfoHtml ??
        program.registrationInfoHtml ??
        DEFAULT_REGISTRATION_INFO_HTML,
      targetLabel: target.label,
      targetType: target.type,
      targetUrl: target.url,
    };
  });
}

export function buildProgramGroups(catalog: Catalog): ProgramGroupViewModel[] {
  const programs = new Map(
    catalog.programs.map((program) => [program.id, program]),
  );
  const courses = new Map(catalog.courses.map((course) => [course.id, course]));
  return catalog.audienceGroups.map((group) => {
    const program = programs.get(group.programId)!;
    const offerings = catalog.offerings
      .filter(({ audienceGroupId }) => audienceGroupId === group.id)
      .map((offering) => {
        const course = courses.get(offering.courseId)!;
        return {
          audienceGroupId: group.id,
          courseId: course.id,
          courseName: course.name,
          descriptionHtml: course.descriptionHtml,
          displayOrder: offering.displayOrder,
          image: offering.imageOverride ?? course.defaultImage,
          instructors: course.instructors,
          offeringId: offering.id,
          semester: offering.semester,
          shortName: course.shortName,
        };
      })
      .sort(
        (a, b) =>
          a.displayOrder - b.displayOrder ||
          a.offeringId.localeCompare(b.offeringId),
      );
    return {
      day: group.day,
      endTime: group.endTime,
      gender: group.gender,
      gradeGroupId: group.gradeGroupId,
      gradeLabels: group.gradeLabels,
      groupId: group.id,
      offerings,
      programId: program.id,
      programName: program.name,
      startTime: group.startTime,
    };
  });
}

export function buildProgramSummaries(
  catalog: Catalog,
): ProgramSummaryViewModel[] {
  const groups = buildProgramGroups(catalog);
  return catalog.programs.map((program) => {
    const programGroups = groups.filter(
      ({ programId }) => programId === program.id,
    );
    return {
      category: program.category,
      groupCount: programGroups.length,
      id: program.id,
      name: program.name,
      offeringCount: programGroups.reduce(
        (sum, group) => sum + group.offerings.length,
        0,
      ),
    };
  });
}
