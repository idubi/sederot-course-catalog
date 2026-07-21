import { access } from 'node:fs/promises';
import { resolve } from 'node:path';

import type { Catalog } from '../domain';

export async function missingCatalogAssets(
  catalog: Catalog,
  repositoryRoot = resolve('.'),
): Promise<string[]> {
  const sources = new Set<string>();
  catalog.courses.forEach(
    ({ defaultImage }) => defaultImage && sources.add(defaultImage.src),
  );
  catalog.offerings.forEach(
    ({ imageOverride }) => imageOverride && sources.add(imageOverride.src),
  );
  const missing: string[] = [];
  for (const source of sources) {
    try {
      await access(resolve(repositoryRoot, 'public', source.slice(1)));
    } catch {
      missing.push(source);
    }
  }
  return missing.sort();
}
