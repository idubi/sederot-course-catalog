import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { readApprovedBlueprint } from '../source-reader/blueprint-reader';
import {
  buildImportArtifacts,
  IMPORT_DIAGNOSTICS_PATH,
  IMPORT_DRAFT_PATH,
} from './build-diagnostics';

async function writeJsonAtomically(
  path: string,
  value: unknown,
): Promise<void> {
  const temporaryPath = `${path}.tmp`;
  await mkdir(dirname(path), { recursive: true });
  await writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await rename(temporaryPath, path);
}

const artifacts = buildImportArtifacts(await readApprovedBlueprint());
await writeJsonAtomically(IMPORT_DRAFT_PATH, artifacts.draft);
await writeJsonAtomically(IMPORT_DIAGNOSTICS_PATH, artifacts.diagnostics);

console.log(
  `Wrote draft to ${IMPORT_DRAFT_PATH} and ${artifacts.diagnostics.length} diagnostic(s) to ${IMPORT_DIAGNOSTICS_PATH}.`,
);
