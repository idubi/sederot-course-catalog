import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, expect, it } from 'vitest';

import approved from '../../content/approved/catalog.json';
import type { Catalog } from '../domain';
import { missingCatalogAssets } from './validate-assets';

const roots: string[] = [];
afterEach(async () =>
  Promise.all(
    roots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  ),
);

it('reports referenced assets while allowing absent optional images', async () => {
  expect(await missingCatalogAssets(approved as Catalog)).toEqual([]);
  const root = await mkdtemp(join(tmpdir(), 'catalog-assets-'));
  roots.push(root);
  const catalog = structuredClone(approved) as Catalog;
  catalog.courses[0]!.defaultImage = {
    src: '/content/images/course.webp',
    alt: 'תמונה',
  };
  expect(await missingCatalogAssets(catalog, root)).toEqual([
    '/content/images/course.webp',
  ]);
  await mkdir(join(root, 'public/content/images'), { recursive: true });
  await writeFile(join(root, 'public/content/images/course.webp'), 'image');
  expect(await missingCatalogAssets(catalog, root)).toEqual([]);
});
