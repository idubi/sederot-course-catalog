import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { readApprovedBlueprint } from '../source-reader/blueprint-reader';
import {
  NORMALIZED_DRAFT_PATH,
  normalizeBlueprint,
} from './normalize-blueprint';

const draft = normalizeBlueprint(await readApprovedBlueprint());
const temporaryPath = `${NORMALIZED_DRAFT_PATH}.tmp`;

await mkdir(dirname(NORMALIZED_DRAFT_PATH), { recursive: true });
await writeFile(temporaryPath, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
await rename(temporaryPath, NORMALIZED_DRAFT_PATH);

console.log(
  `Wrote ${draft.programs.length} program(s), ${draft.audienceGroups.length} group(s), ${draft.courses.length} course(s), and ${draft.offerings.length} offering(s) to ${NORMALIZED_DRAFT_PATH}.`,
);
