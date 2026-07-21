import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import { saveImageUpload } from './image-files';

const roots: string[] = [];
afterEach(async () =>
  Promise.all(
    roots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  ),
);

describe('editor image storage', () => {
  it('writes an allowed image to a deterministic public path', async () => {
    const root = await mkdtemp(join(tmpdir(), 'sderot-image-'));
    roots.push(root);
    const image = Buffer.concat([
      Buffer.from('RIFF0000WEBP'),
      Buffer.from('image'),
    ]);
    const result = await saveImageUpload(
      {
        dataBase64: image.toString('base64'),
        entityId: 'course-one',
        kind: 'course',
        mimeType: 'image/webp',
      },
      root,
    );
    expect(result.src).toBe('/content/images/course-one-course.webp');
    expect(
      await readFile(
        join(root, 'public/content/images/course-one-course.webp'),
      ),
    ).toEqual(image);
  });

  it('rejects unsafe IDs and unsupported types', async () => {
    await expect(
      saveImageUpload(
        {
          dataBase64: 'YQ==',
          entityId: '../escape',
          kind: 'course',
          mimeType: 'image/png',
        },
        '/tmp',
      ),
    ).rejects.toThrow('Invalid');
    await expect(
      saveImageUpload(
        {
          dataBase64: 'YQ==',
          entityId: 'safe-id',
          kind: 'course',
          mimeType: 'image/svg+xml',
        },
        '/tmp',
      ),
    ).rejects.toThrow('JPEG');
  });
});
