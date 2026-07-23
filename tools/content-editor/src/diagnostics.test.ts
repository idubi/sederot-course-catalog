import { describe, expect, it } from 'vitest';

import type { Catalog } from '../../../src/domain/catalog';
import {
  classifyDiagnostics,
  diagnosticEntity,
  diagnosticKey,
  diagnosticState,
  type ImportDiagnostic,
} from './diagnostics';

const catalog: Catalog = {
  schemaVersion: '1.0',
  academicYear: { id: '2026-2027', label: 'תשפ״ז' },
  programs: [{ id: 'program', name: 'תוכנית', category: 'gifted' }],
  audienceGroups: [
    {
      id: 'group',
      programId: 'program',
      gradeGroupId: 'grade-5',
      gradeLabels: ['ה׳'],
      gradeValues: ['5'],
      gender: 'mixed',
      day: 'sunday',
      startTime: '08:00',
      endTime: '12:00',
    },
  ],
  courses: [
    {
      id: 'course',
      name: 'קורס',
      shortName: 'קורס',
      descriptionHtml: '<p>תיאור</p>',
      instructors: ['מנחה'],
    },
  ],
  offerings: [
    {
      id: 'offering',
      courseId: 'course',
      audienceGroupId: 'group',
      semester: 'annual',
      displayOrder: 0,
    },
  ],
  registrationTargets: [],
  contacts: { phone: '', whatsapp: '', email: '' },
};

function diagnostic(code: string, entityRef = 'course'): ImportDiagnostic {
  return {
    code,
    entityRef,
    message: code,
    path: ['source', 2],
    severity: 'warning',
  };
}

describe('editor diagnostic state', () => {
  it('creates a stable key for returning to a specific diagnostic', () => {
    const value = diagnostic('COURSE_WITHOUT_PROGRAM');
    expect(diagnosticKey(value)).toBe(diagnosticKey({ ...value }));
    expect(diagnosticKey(value, 1)).not.toBe(diagnosticKey(value));
  });

  it('links entity diagnostics to the structured editor', () => {
    expect(diagnosticEntity(diagnostic('ANY'), catalog)).toEqual({
      id: 'course-course',
      tab: 'courses',
    });
  });

  it('marks corrected relationship and details warnings as resolved', () => {
    expect(diagnosticState(diagnostic('COURSE_WITHOUT_PROGRAM'), catalog)).toBe(
      'resolved',
    );
    expect(
      diagnosticState(diagnostic('COURSE_DETAILS_UNRESOLVED'), catalog),
    ).toBe('resolved');
    expect(
      diagnosticState(
        diagnostic('COURSE_TABLE_ASSIGNMENT_MISSING', 'course|group'),
        catalog,
      ),
    ).toBe('resolved');
  });

  it('distinguishes stale and duplicate diagnostics', () => {
    expect(diagnosticState(diagnostic('ANY', 'deleted'), catalog)).toBe(
      'stale',
    );
    const repeated = diagnostic('ANY');
    expect(classifyDiagnostics([repeated, repeated], catalog)[1]?.state).toBe(
      'duplicate',
    );
  });
});
