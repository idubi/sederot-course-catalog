import { validateCatalog } from '../../src/content/schema';
import type { Catalog } from '../../src/domain/catalog';
import { buildImportArtifacts } from '../source-diagnostics/build-diagnostics';
import { parseBlueprint } from '../source-reader/blueprint-reader';

export interface EditorImportDiagnostic {
  code: string;
  message: string;
  path: PropertyKey[];
  severity: 'error' | 'warning' | 'info';
}

export function importBlueprintDocument(
  source: string,
  fileName: string,
): { catalog: Catalog; diagnostics: EditorImportDiagnostic[] } {
  const artifacts = buildImportArtifacts(parseBlueprint(source, fileName));
  const catalog: Catalog = {
    schemaVersion: '1.0',
    academicYear: { id: 'pending', label: 'דורש השלמה' },
    programs: artifacts.draft.programs.map(({ id, name, category }) => ({
      id,
      name,
      category,
    })),
    audienceGroups: artifacts.draft.audienceGroups.map(
      ({
        id,
        programId,
        gradeGroupId,
        gradeLabels,
        gradeValues,
        gender,
        day,
        startTime,
        endTime,
      }) => ({
        id,
        programId,
        gradeGroupId,
        gradeLabels,
        gradeValues,
        gender,
        day,
        startTime,
        endTime,
      }),
    ),
    courses: artifacts.draft.courses.map(({ id, name }) => ({
      id,
      name,
      shortName: name,
      descriptionHtml: '',
      instructors: [],
    })),
    offerings: artifacts.draft.offerings.map(
      ({ id, courseId, audienceGroupId, semester, displayOrder }) => ({
        id,
        courseId,
        audienceGroupId,
        semester,
        displayOrder,
      }),
    ),
    registrationTargets: [],
    contacts: { phone: '', whatsapp: '', email: '' },
  };

  const diagnostics: EditorImportDiagnostic[] = artifacts.diagnostics.map(
    ({ code, message, severity, sourceLocation }) => ({
      code,
      message,
      severity,
      path: ['source', sourceLocation.line],
    }),
  );
  const validation = validateCatalog(catalog);
  if (!validation.success) {
    diagnostics.push(
      ...validation.error.issues.map((issue) => ({
        code: 'schema-validation',
        message: issue.message,
        path: [...issue.path],
        severity: 'error' as const,
      })),
    );
  }
  return { catalog, diagnostics };
}
