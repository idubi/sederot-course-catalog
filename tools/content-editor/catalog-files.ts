import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateCatalog } from '../../src/content/schema';
import { sanitizeCatalogHtml } from '../../src/content/sanitize-html';
import type { Catalog } from '../../src/domain/catalog';

export interface EditorPaths {
  approved: string;
  draft: string;
}

export const REPOSITORY_ROOT = resolve(
  fileURLToPath(new URL('../..', import.meta.url)),
);

export const EDITOR_PATHS: EditorPaths = {
  approved: resolve(REPOSITORY_ROOT, 'content/approved/catalog.json'),
  draft: resolve(REPOSITORY_ROOT, 'content/draft/editor/catalog.json'),
};

export interface ValidationIssue {
  message: string;
  path: string;
}

export interface ValidationResult {
  errors: ValidationIssue[];
  valid: boolean;
  warnings: string[];
}

export function validateEditorCatalog(
  catalog: unknown,
  warnings: string[] = [],
): ValidationResult {
  const candidate = Array.isArray((catalog as Catalog | undefined)?.courses)
    ? sanitizeCatalogHtml(catalog as Catalog)
    : catalog;
  const result = validateCatalog(candidate);
  return {
    valid: result.success,
    errors: result.success
      ? []
      : result.error.issues.map((issue) => ({
          message: issue.message,
          path: issue.path.join('.'),
        })),
    warnings: [...warnings],
  };
}

export function serializeCatalog(catalog: unknown): string {
  const sanitized = sanitizeCatalogHtml(catalog as Catalog);
  const parsed = validateCatalog(sanitized);
  if (!parsed.success) {
    throw new Error('Catalog validation failed');
  }
  return `${JSON.stringify(parsed.data, null, 2)}\n`;
}

async function writeAtomic(path: string, content: string): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  const temporaryPath = `${path}.tmp`;
  await writeFile(temporaryPath, content, 'utf8');
  await rename(temporaryPath, path);
}

export async function loadCatalog(
  source: 'approved' | 'draft',
  paths: EditorPaths = EDITOR_PATHS,
): Promise<unknown> {
  return JSON.parse(await readFile(paths[source], 'utf8')) as unknown;
}

export async function saveDraft(
  catalog: unknown,
  paths: EditorPaths = EDITOR_PATHS,
): Promise<void> {
  await writeAtomic(paths.draft, `${JSON.stringify(catalog, null, 2)}\n`);
}

export async function exportApproved(
  catalog: unknown,
  warnings: string[],
  acknowledgeWarnings: boolean,
  paths: EditorPaths = EDITOR_PATHS,
): Promise<ValidationResult> {
  const validation = validateEditorCatalog(catalog, warnings);
  if (!validation.valid || (warnings.length > 0 && !acknowledgeWarnings)) {
    return validation;
  }
  await writeAtomic(paths.approved, serializeCatalog(catalog));
  return validation;
}
