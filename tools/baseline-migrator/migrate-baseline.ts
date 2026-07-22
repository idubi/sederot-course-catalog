import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { validateCatalog } from '../../src/content/schema';
import type { Catalog } from '../../src/domain/catalog';

export const BASELINE_CATALOG_PATH = resolve(
  'content/baseline/catalog_2026-2027.json',
);
export const BASELINE_CATALOG_SHA256 =
  'cc7440cc19542e8a1aca012c1cba9ca79edbf437f26facc4138f10409755a5ca';
export const BASELINE_DRAFT_PATH = resolve(
  'content/draft/baseline/catalog.json',
);
export const BASELINE_DIAGNOSTICS_PATH = resolve(
  'content/diagnostics/baseline-migration.json',
);

type JsonRecord = Record<string, unknown>;

export interface BaselineDiagnostic {
  severity: 'error' | 'warning';
  code: string;
  message: string;
  path: PropertyKey[];
}

export interface BaselineMigration {
  catalog: Catalog;
  diagnostics: BaselineDiagnostic[];
}

function record(value: unknown, path: string): JsonRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${path} must be an object`);
  }
  return value as JsonRecord;
}

function records(value: unknown, path: string): JsonRecord[] {
  if (!Array.isArray(value)) throw new Error(`${path} must be an array`);
  return value.map((item, index) => record(item, `${path}[${index}]`));
}

function string(value: unknown, path: string): string {
  if (typeof value !== 'string') throw new Error(`${path} must be a string`);
  return value;
}

function stringArray(value: unknown, path: string): string[] {
  if (!Array.isArray(value)) throw new Error(`${path} must be an array`);
  return value.map((item, index) => {
    if (typeof item !== 'string' && typeof item !== 'number') {
      throw new Error(`${path}[${index}] must be a string or number`);
    }
    return String(item);
  });
}

function academicYearLabel(id: string): string {
  return id === '2026-2027' ? 'תשפ״ז' : id;
}

export async function readBaselineCatalog(): Promise<unknown> {
  const source = await readFile(BASELINE_CATALOG_PATH, 'utf8');
  const hash = createHash('sha256').update(source).digest('hex');
  if (hash !== BASELINE_CATALOG_SHA256) {
    throw new Error(
      `Baseline SHA-256 mismatch: expected ${BASELINE_CATALOG_SHA256}, received ${hash}`,
    );
  }
  return JSON.parse(source) as unknown;
}

export function migrateBaselineCatalog(input: unknown): BaselineMigration {
  const source = record(input, 'catalog');
  if (source.schemaVersion !== '1.0') {
    throw new Error('catalog.schemaVersion must be 1.0');
  }

  const academicYear = string(source.academicYear, 'catalog.academicYear');
  const sourcePrograms = records(source.programs, 'catalog.programs');
  const sourceGroups = records(source.groups, 'catalog.groups');
  const sourceCourses = records(source.courses, 'catalog.courses');
  const sourceOfferings = records(source.offerings, 'catalog.offerings');
  const sourceTargets = records(
    source.registrationTargets,
    'catalog.registrationTargets',
  );
  const sourceContacts = record(source.contacts, 'catalog.contacts');
  const diagnostics: BaselineDiagnostic[] = [];

  const programs = sourcePrograms.map((program, index) => {
    if ('registrationMode' in program) {
      diagnostics.push({
        severity: 'warning',
        code: 'legacy-registration-mode',
        message:
          'Legacy registrationMode was not migrated; registration must use an approved program/group target and information page.',
        path: ['programs', index, 'registrationMode'],
      });
    }
    return {
      id: string(program.id, `catalog.programs[${index}].id`),
      name: string(program.name, `catalog.programs[${index}].name`),
      category: string(
        program.category,
        `catalog.programs[${index}].category`,
      ) as Catalog['programs'][number]['category'],
    };
  });

  const audienceGroups = sourceGroups.map((group, index) => {
    const gradeValues = stringArray(
      group.gradeValues,
      `catalog.groups[${index}].gradeValues`,
    );
    return {
      id: string(group.id, `catalog.groups[${index}].id`),
      programId: string(group.programId, `catalog.groups[${index}].programId`),
      gradeGroupId: `grade-${gradeValues.join('-')}`,
      gradeLabels: [
        string(group.gradeLabel, `catalog.groups[${index}].gradeLabel`),
      ],
      gradeValues,
      gender: string(
        group.gender,
        `catalog.groups[${index}].gender`,
      ) as Catalog['audienceGroups'][number]['gender'],
      day: string(group.day, `catalog.groups[${index}].day`),
      startTime: string(group.startTime, `catalog.groups[${index}].startTime`),
      endTime: string(group.endTime, `catalog.groups[${index}].endTime`),
    };
  });

  const courses = sourceCourses.map((course, index) => ({
    id: string(course.id, `catalog.courses[${index}].id`),
    name: string(course.name, `catalog.courses[${index}].name`),
    shortName: string(course.shortName, `catalog.courses[${index}].shortName`),
    descriptionHtml: string(
      course.descriptionHtml,
      `catalog.courses[${index}].descriptionHtml`,
    ),
    instructors: stringArray(
      course.instructors,
      `catalog.courses[${index}].instructors`,
    ),
  }));

  const offerings = sourceOfferings.map((offering, index) => ({
    id: string(offering.id, `catalog.offerings[${index}].id`),
    courseId: string(offering.courseId, `catalog.offerings[${index}].courseId`),
    audienceGroupId: string(
      offering.groupId,
      `catalog.offerings[${index}].groupId`,
    ),
    semester: string(
      offering.semester,
      `catalog.offerings[${index}].semester`,
    ) as Catalog['offerings'][number]['semester'],
    displayOrder: Number(offering.displayOrder),
  }));

  const registrationTargets = sourceTargets.map((target, index) => ({
    id: string(target.id, `catalog.registrationTargets[${index}].id`),
    type: string(target.type, `catalog.registrationTargets[${index}].type`),
    label: string(target.label, `catalog.registrationTargets[${index}].label`),
    url: string(target.url, `catalog.registrationTargets[${index}].url`),
    enabled: target.enabled === true,
  }));

  const contacts = {
    phone: typeof sourceContacts.phone === 'string' ? sourceContacts.phone : '',
    whatsapp:
      typeof sourceContacts.whatsapp === 'string'
        ? sourceContacts.whatsapp
        : '',
    email: typeof sourceContacts.email === 'string' ? sourceContacts.email : '',
  };

  const catalog: Catalog = {
    schemaVersion: '1.0',
    academicYear: { id: academicYear, label: academicYearLabel(academicYear) },
    programs,
    audienceGroups,
    courses,
    offerings,
    registrationTargets,
    contacts,
  };

  const validation = validateCatalog(catalog);
  if (!validation.success) {
    diagnostics.push(
      ...validation.error.issues.map((issue) => ({
        severity: 'error' as const,
        code: 'schema-validation',
        message: issue.message,
        path: [...issue.path],
      })),
    );
  }

  return { catalog, diagnostics };
}
