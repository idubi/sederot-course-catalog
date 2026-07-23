import type { Catalog } from '../../../src/domain/catalog';

export type ImportDiagnostic = {
  code: string;
  confidence?: number;
  entityRef?: string;
  message: string;
  path: PropertyKey[];
  severity: 'error' | 'warning' | 'info';
  sourceExcerpt?: string;
  sourceFile?: string;
  sourceLocation?: {
    line: number;
    column: number;
    startOffset: number;
    endOffset: number;
  };
};

export type DiagnosticState = 'active' | 'resolved' | 'stale' | 'duplicate';
export type DiagnosticEntity = {
  id: string;
  tab: 'courses' | 'groups' | 'programs';
};

export function diagnosticKey(
  diagnostic: ImportDiagnostic,
  occurrence = 0,
): string {
  return [
    diagnostic.code,
    diagnostic.entityRef ?? '',
    diagnostic.path.join('.'),
    diagnostic.sourceFile ?? '',
    diagnostic.sourceLocation?.line ?? '',
    occurrence,
  ].join('|');
}

export function diagnosticEntity(
  diagnostic: ImportDiagnostic,
  catalog: Catalog,
): DiagnosticEntity | null {
  const refs = diagnostic.entityRef?.split('|') ?? [];
  const course = refs.find((id) =>
    catalog.courses.some((value) => value.id === id),
  );
  if (course) return { id: `course-${course}`, tab: 'courses' };
  const group = refs.find((id) =>
    catalog.audienceGroups.some((value) => value.id === id),
  );
  if (group) return { id: `group-${group}`, tab: 'groups' };
  const program = refs.find((id) =>
    catalog.programs.some((value) => value.id === id),
  );
  return program ? { id: `program-${program}`, tab: 'programs' } : null;
}

export function diagnosticState(
  diagnostic: ImportDiagnostic,
  catalog: Catalog,
  duplicate = false,
): DiagnosticState {
  if (duplicate) return 'duplicate';
  const refs = diagnostic.entityRef?.split('|') ?? [];
  const allIds = new Set([
    ...catalog.courses.map(({ id }) => id),
    ...catalog.audienceGroups.map(({ id }) => id),
    ...catalog.programs.map(({ id }) => id),
  ]);
  if (refs.length > 0 && refs.every((id) => !allIds.has(id))) return 'stale';

  const [courseId, groupId] = refs;
  const course = catalog.courses.find(({ id }) => id === courseId);
  const assigned =
    courseId && groupId
      ? catalog.offerings.some(
          (offering) =>
            offering.courseId === courseId &&
            offering.audienceGroupId === groupId,
        )
      : false;
  if (
    diagnostic.code === 'COURSE_WITHOUT_PROGRAM' &&
    courseId &&
    catalog.offerings.some((offering) => offering.courseId === courseId)
  )
    return 'resolved';
  if (
    diagnostic.code === 'COURSE_DETAILS_UNRESOLVED' &&
    course &&
    course.descriptionHtml.trim() &&
    course.instructors.length > 0
  )
    return 'resolved';
  if (diagnostic.code === 'COURSE_TABLE_ASSIGNMENT_MISSING' && assigned)
    return 'resolved';
  if (
    diagnostic.code === 'PROGRAM_LIST_ASSIGNMENT_MISSING_FROM_COURSE_TABLE' &&
    !assigned
  )
    return 'resolved';
  return 'active';
}

export function classifyDiagnostics(
  diagnostics: ImportDiagnostic[],
  catalog: Catalog,
) {
  return diagnostics.map((diagnostic, index) => {
    const baseKey = diagnosticKey(diagnostic);
    const occurrence = diagnostics
      .slice(0, index)
      .filter((candidate) => diagnosticKey(candidate) === baseKey).length;
    const duplicate = occurrence > 0;
    return {
      diagnostic,
      entity: diagnosticEntity(diagnostic, catalog),
      key: diagnosticKey(diagnostic, occurrence),
      state: diagnosticState(diagnostic, catalog, duplicate),
    };
  });
}
