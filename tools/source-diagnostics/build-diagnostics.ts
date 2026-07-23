import type {
  BlueprintDocument,
  SourceLocation,
} from '../source-reader/blueprint-reader';
import {
  normalizeBlueprint,
  type NormalizedBlueprintDraft,
  type NormalizedCourse,
  type SourceEvidence,
} from '../source-normalizer/normalize-blueprint';

export const IMPORT_DRAFT_PATH = 'content/draft/import/draft-catalog.json';
export const IMPORT_DIAGNOSTICS_PATH =
  'content/diagnostics/import-diagnostics.json';

export type DiagnosticSeverity = 'error' | 'warning' | 'info';

export interface ImportDiagnostic {
  severity: DiagnosticSeverity;
  code: string;
  message: string;
  sourceExcerpt: string;
  sourceLocation: SourceLocation;
  confidence: number;
  entityRef?: string | undefined;
}

export interface ImportArtifacts {
  draft: NormalizedBlueprintDraft;
  diagnostics: ImportDiagnostic[];
}

function excerpt(raw: string): string {
  const visible = raw.trim();
  return visible.length <= 240 ? visible : `${visible.slice(0, 237)}...`;
}

function diagnostic(
  evidence: SourceEvidence,
  fields: Omit<ImportDiagnostic, 'sourceExcerpt' | 'sourceLocation'>,
): ImportDiagnostic {
  return {
    ...fields,
    sourceExcerpt: excerpt(evidence.raw),
    sourceLocation: evidence.location,
  };
}

function duplicateComparisonName(name: string): string {
  return name
    .normalize('NFKC')
    .toLocaleLowerCase('he')
    .replace(/[\s\-–—:.,/'״׳"]/g, '');
}

function editDistance(left: string, right: string): number {
  const previous = Array.from(
    { length: right.length + 1 },
    (_, index) => index,
  );
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = previous[0] ?? 0;
    previous[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const above = previous[rightIndex] ?? 0;
      const cost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      previous[rightIndex] = Math.min(
        above + 1,
        (previous[rightIndex - 1] ?? 0) + 1,
        diagonal + cost,
      );
      diagonal = above;
    }
  }
  return previous[right.length] ?? 0;
}

function possibleDuplicatePairs(
  courses: NormalizedCourse[],
): Array<[NormalizedCourse, NormalizedCourse]> {
  const pairs: Array<[NormalizedCourse, NormalizedCourse]> = [];
  for (let firstIndex = 0; firstIndex < courses.length; firstIndex += 1) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < courses.length;
      secondIndex += 1
    ) {
      const first = courses[firstIndex];
      const second = courses[secondIndex];
      if (!first || !second) continue;
      const left = duplicateComparisonName(first.name);
      const right = duplicateComparisonName(second.name);
      const longest = Math.max(left.length, right.length);
      if (longest >= 8 && editDistance(left, right) <= 2)
        pairs.push([first, second]);
    }
  }
  return pairs;
}

export function buildImportArtifacts(
  document: BlueprintDocument,
): ImportArtifacts {
  const draft = normalizeBlueprint(document);
  const diagnostics: ImportDiagnostic[] = [];

  draft.courses.forEach((course) => {
    const firstSource = course.sourceNames[0];
    if (!firstSource) return;
    if (course.temporaryName) {
      diagnostics.push(
        diagnostic(firstSource, {
          severity: 'warning',
          code: 'TEMPORARY_COURSE_NAME',
          message: `Course name requires owner review: ${course.name}`,
          confidence: 1,
          entityRef: course.id,
        }),
      );
    }
    if (!course.descriptionHtml || course.instructors.length === 0) {
      diagnostics.push(
        diagnostic(firstSource, {
          severity: 'warning',
          code: 'COURSE_DETAILS_UNRESOLVED',
          message: `Course description and instructors are not yet linked: ${course.name}`,
          confidence: 1,
          entityRef: course.id,
        }),
      );
    }
  });

  possibleDuplicatePairs(draft.courses).forEach(([first, second]) => {
    const firstSource = first.sourceNames[0];
    if (!firstSource) return;
    diagnostics.push(
      diagnostic(firstSource, {
        severity: 'warning',
        code: 'POSSIBLE_DUPLICATE_COURSE',
        message: `Review possible duplicate courses: “${first.name}” and “${second.name}”.`,
        confidence: 0.65,
        entityRef: `${first.id}|${second.id}`,
      }),
    );
  });

  draft.unmatchedNodes
    .filter(({ raw }) => raw.trim().length > 0)
    .forEach((source) => {
      diagnostics.push(
        diagnostic(source, {
          severity: 'info',
          code: 'UNMATCHED_SOURCE_NODE',
          message:
            'Source content remains unmatched and is retained in the draft for later mapping.',
          confidence: 1,
        }),
      );
    });

  return { draft, diagnostics };
}
