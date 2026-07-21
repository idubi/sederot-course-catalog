import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import {
  BLUEPRINT_SNAPSHOT_PATH,
  readApprovedBlueprint,
} from './blueprint-reader';

const document = await readApprovedBlueprint();
const serialized = `${JSON.stringify(document, null, 2)}\n`;
const temporaryPath = `${BLUEPRINT_SNAPSHOT_PATH}.tmp`;

await mkdir(dirname(BLUEPRINT_SNAPSHOT_PATH), { recursive: true });
await writeFile(temporaryPath, serialized, 'utf8');
await rename(temporaryPath, BLUEPRINT_SNAPSHOT_PATH);

console.log(
  `Wrote ${document.nodes.length} source node(s) to ${BLUEPRINT_SNAPSHOT_PATH} from ${document.path} (${document.sha256}).`,
);
