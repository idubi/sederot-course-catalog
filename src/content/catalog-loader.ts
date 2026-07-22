import { readFileSync, realpathSync } from 'node:fs';
import {
  basename,
  dirname,
  isAbsolute,
  relative,
  resolve,
  sep,
} from 'node:path';

import approvedCatalogJson from '../../content/approved/catalog.json';
import type { Catalog } from '../domain';
import { catalogSchema } from './schema';

export const APPROVED_CATALOG_PATH = 'content/approved/catalog.json' as const;

function isOutside(root: string, candidate: string): boolean {
  const path = relative(root, candidate);
  return path === '..' || path.startsWith(`..${sep}`) || isAbsolute(path);
}

export function loadCatalogBootstrap(
  path: string,
  repositoryRoot = process.cwd(),
): Catalog {
  const contentsRoot = realpathSync(resolve(repositoryRoot, 'contents'));
  const bootstrapPath = realpathSync(path);
  if (
    basename(bootstrapPath) !== 'bootstrap.json' ||
    isOutside(contentsRoot, bootstrapPath) ||
    dirname(dirname(bootstrapPath)) !== contentsRoot
  ) {
    throw new Error(
      'Configured catalog data must be contents/<folder>/bootstrap.json',
    );
  }
  return catalogSchema.parse(
    JSON.parse(readFileSync(bootstrapPath, 'utf8')) as unknown,
  );
}

export function loadApprovedCatalog(): Catalog {
  const bootstrapPath = process.env.CATALOG_BOOTSTRAP_PATH;
  if (bootstrapPath) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('--data bootstrap catalogs are forbidden in production');
    }
    return loadCatalogBootstrap(bootstrapPath);
  }
  return catalogSchema.parse(approvedCatalogJson);
}
