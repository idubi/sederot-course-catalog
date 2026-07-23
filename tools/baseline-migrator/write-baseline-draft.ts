import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import {
  BASELINE_DIAGNOSTICS_PATH,
  BASELINE_DRAFT_PATH,
  migrateBaselineCatalog,
  readBaselineCatalog,
} from './migrate-baseline';

async function writeJsonAtomically(
  path: string,
  value: unknown,
): Promise<void> {
  const temporaryPath = `${path}.tmp`;
  await mkdir(dirname(path), { recursive: true });
  await writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await rename(temporaryPath, path);
}

const migration = migrateBaselineCatalog(await readBaselineCatalog());
await writeJsonAtomically(BASELINE_DRAFT_PATH, migration.catalog);
await writeJsonAtomically(BASELINE_DIAGNOSTICS_PATH, migration.diagnostics);

console.log(
  `Wrote ${migration.catalog.programs.length} program(s), ${migration.catalog.audienceGroups.length} group(s), ${migration.catalog.courses.length} course(s), ${migration.catalog.offerings.length} offering(s), and ${migration.diagnostics.length} diagnostic(s).`,
);
