import { mkdir, mkdtemp, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  parseDataArgument,
  resolveDataBootstrap,
} from '../scripts/catalog-data.mjs';

describe('catalog data arguments', () => {
  it('extracts data while forwarding Astro options', () => {
    expect(
      parseDataArgument(['--data=./contents/year', '--host', '127.0.0.1']),
    ).toEqual({
      data: './contents/year',
      forwarded: ['--host', '127.0.0.1'],
    });
    expect(parseDataArgument(['--data', './contents/year'])).toEqual({
      data: './contents/year',
      forwarded: [],
    });
  });

  it('resolves only an in-repository bootstrap.json', async () => {
    const root = await mkdtemp(join(tmpdir(), 'catalog-data-'));
    const folder = join(root, 'contents', 'year');
    await mkdir(folder, { recursive: true });
    await writeFile(join(folder, 'bootstrap.json'), '{}');

    await expect(resolveDataBootstrap('./contents/year', root)).resolves.toBe(
      join(folder, 'bootstrap.json'),
    );
    await expect(resolveDataBootstrap('../outside', root)).rejects.toThrow(
      'direct child of contents',
    );
    await expect(
      resolveDataBootstrap('./contents/year/nested', root),
    ).rejects.toThrow('direct child of contents');
  });

  it('rejects a bootstrap symlink outside the repository', async () => {
    const root = await mkdtemp(join(tmpdir(), 'catalog-data-root-'));
    const outside = await mkdtemp(join(tmpdir(), 'catalog-data-outside-'));
    const folder = join(root, 'contents', 'year');
    await mkdir(folder, { recursive: true });
    await writeFile(join(outside, 'bootstrap.json'), '{}');
    await symlink(
      join(outside, 'bootstrap.json'),
      join(folder, 'bootstrap.json'),
    );

    await expect(resolveDataBootstrap('./contents/year', root)).rejects.toThrow(
      'inside contents',
    );
  });
});
