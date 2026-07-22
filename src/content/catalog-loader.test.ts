import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, expectTypeOf, it } from 'vitest';

import approved from '../../content/approved/catalog.json';
import type { Catalog } from '../domain';
import {
  APPROVED_CATALOG_PATH,
  loadApprovedCatalog,
  loadCatalogBootstrap,
} from './catalog-loader';

describe('approved catalog loader', () => {
  it('loads and validates the committed approved seed', () => {
    const catalog = loadApprovedCatalog();

    expectTypeOf(catalog).toEqualTypeOf<Catalog>();
    expect(catalog.academicYear.id).toBe('seed-2026-2027');
    expect(catalog.programs).toHaveLength(1);
    expect(catalog.audienceGroups).toHaveLength(1);
    expect(catalog.courses).toHaveLength(1);
    expect(catalog.offerings).toHaveLength(1);
  });

  it('exposes only the approved production input path', () => {
    expect(APPROVED_CATALOG_PATH).toBe('content/approved/catalog.json');
    expect(APPROVED_CATALOG_PATH).not.toContain('/draft/');
    expect(APPROVED_CATALOG_PATH).not.toContain('/diagnostics/');
  });

  it('loads a schema-valid bootstrap only from contents/<folder>', async () => {
    const root = await mkdtemp(join(tmpdir(), 'catalog-loader-'));
    const folder = join(root, 'contents', 'year');
    await mkdir(folder, { recursive: true });
    const bootstrapPath = join(folder, 'bootstrap.json');
    await writeFile(bootstrapPath, JSON.stringify(approved));

    expect(loadCatalogBootstrap(bootstrapPath, root)).toEqual(approved);
    const outsidePath = join(root, 'bootstrap.json');
    await writeFile(outsidePath, JSON.stringify(approved));
    expect(() => loadCatalogBootstrap(outsidePath, root)).toThrow(
      'contents/<folder>/bootstrap.json',
    );
  });

  it('contains no offering-level registration target', () => {
    const catalog = loadApprovedCatalog();

    expect(
      catalog.offerings.every(
        (offering) => !('registrationTargetId' in offering),
      ),
    ).toBe(true);
  });
});
