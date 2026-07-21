import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { REPOSITORY_ROOT } from './catalog-files';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ENTITY_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export interface ImageUpload {
  dataBase64: string;
  entityId: string;
  kind: 'course' | 'offering';
  mimeType: string;
}

export async function saveImageUpload(
  upload: ImageUpload,
  root = REPOSITORY_ROOT,
): Promise<{ src: string }> {
  if (!ENTITY_ID.test(upload.entityId)) throw new Error('Invalid entity ID');
  const extension = EXTENSIONS[upload.mimeType];
  if (!extension)
    throw new Error('Only JPEG, PNG, and WebP images are allowed');
  const bytes = Buffer.from(upload.dataBase64, 'base64');
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES)
    throw new Error('Image must be between 1 byte and 5 MiB');
  const signatureMatches =
    (upload.mimeType === 'image/jpeg' &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8) ||
    (upload.mimeType === 'image/png' &&
      bytes
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) ||
    (upload.mimeType === 'image/webp' &&
      bytes.subarray(0, 4).toString() === 'RIFF' &&
      bytes.subarray(8, 12).toString() === 'WEBP');
  if (!signatureMatches)
    throw new Error('Image content does not match its declared type');

  const filename = `${upload.entityId}-${upload.kind}.${extension}`;
  const directory = resolve(root, 'public/content/images');
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, filename), bytes);
  return { src: `/content/images/${filename}` };
}
