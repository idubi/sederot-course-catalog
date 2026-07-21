import { describe, expect, it } from 'vitest';

import { readApprovedBlueprint } from '../source-reader/blueprint-reader';
import {
  buildImportArtifacts,
  IMPORT_DIAGNOSTICS_PATH,
  IMPORT_DRAFT_PATH,
} from './build-diagnostics';

describe('import draft diagnostics', () => {
  it('emits a closest program-first draft and structured diagnostics', async () => {
    const artifacts = buildImportArtifacts(await readApprovedBlueprint());

    expect(IMPORT_DRAFT_PATH).toBe('content/draft/import/draft-catalog.json');
    expect(IMPORT_DIAGNOSTICS_PATH).toBe(
      'content/diagnostics/import-diagnostics.json',
    );
    expect(artifacts.draft.offerings).toHaveLength(151);
    expect(artifacts.diagnostics.length).toBeGreaterThan(100);
    expect(
      artifacts.diagnostics.every(
        ({
          code,
          message,
          severity,
          sourceExcerpt,
          sourceLocation,
          confidence,
        }) =>
          code.length > 0 &&
          message.length > 0 &&
          ['error', 'warning', 'info'].includes(severity) &&
          sourceExcerpt.length > 0 &&
          sourceLocation.line > 0 &&
          confidence >= 0 &&
          confidence <= 1,
      ),
    ).toBe(true);
  });

  it('reports temporary names, unresolved details, duplicates, and unmatched text', async () => {
    const { diagnostics } = buildImportArtifacts(await readApprovedBlueprint());
    const codes = new Set(diagnostics.map(({ code }) => code));

    expect(codes).toEqual(
      new Set([
        'TEMPORARY_COURSE_NAME',
        'COURSE_DETAILS_UNRESOLVED',
        'POSSIBLE_DUPLICATE_COURSE',
        'UNMATCHED_SOURCE_NODE',
      ]),
    );
    expect(
      diagnostics.some(
        ({ code, message }) =>
          code === 'POSSIBLE_DUPLICATE_COURSE' &&
          message.includes('תעלומות במוזיאון') &&
          message.includes('תעלומות המוזיאון'),
      ),
    ).toBe(true);
  });

  it('retains every unmatched raw source node even when excerpts are capped', async () => {
    const { draft, diagnostics } = buildImportArtifacts(
      await readApprovedBlueprint(),
    );
    const substantiveUnmatched = draft.unmatchedNodes.filter(
      ({ raw }) => raw.trim().length > 0,
    );
    const unmatchedDiagnostics = diagnostics.filter(
      ({ code }) => code === 'UNMATCHED_SOURCE_NODE',
    );

    expect(unmatchedDiagnostics).toHaveLength(substantiveUnmatched.length);
    expect(draft.unmatchedNodes.some(({ raw }) => raw.length > 1000)).toBe(
      true,
    );
    expect(
      unmatchedDiagnostics.every(
        ({ sourceExcerpt }) => sourceExcerpt.length <= 240,
      ),
    ).toBe(true);
  });

  it('keeps registration fields off course and offering drafts', async () => {
    const { draft } = buildImportArtifacts(await readApprovedBlueprint());
    expect(
      JSON.stringify({ courses: draft.courses, offerings: draft.offerings }),
    ).not.toContain('registration');
  });
});
