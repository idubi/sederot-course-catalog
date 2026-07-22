import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import approvedCatalog from '../../content/approved/catalog.json';
import {
  exportApproved,
  exportBootstrap,
  loadCatalog,
  saveDraft,
  type EditorPaths,
} from './catalog-files';

let directory: string;
let paths: EditorPaths;

beforeEach(async () => {
  directory = await mkdtemp(join(tmpdir(), 'sderot-editor-'));
  paths = {
    approved: join(directory, 'approved/catalog.json'),
    draft: join(directory, 'draft/catalog.json'),
  };
});

afterEach(async () => {
  await rm(directory, { recursive: true, force: true });
});

describe('editor catalog file service', () => {
  it('saves and reloads a draft inside its configured repository path', async () => {
    await saveDraft(approvedCatalog, paths);
    expect(await loadCatalog('draft', paths)).toEqual(approvedCatalog);
  });

  it('blocks invalid exports without touching approved content', async () => {
    await mkdir(join(directory, 'approved'), { recursive: true });
    await writeFile(paths.approved, 'original\n', 'utf8');
    const result = await exportApproved({}, [], true, paths);
    expect(result.valid).toBe(false);
    expect(await readFile(paths.approved, 'utf8')).toBe('original\n');
  });

  it('requires warning acknowledgement and exports deterministically', async () => {
    const blocked = await exportApproved(
      approvedCatalog,
      ['בדיקה ידנית'],
      false,
      paths,
    );
    expect(blocked.valid).toBe(true);
    await expect(readFile(paths.approved, 'utf8')).rejects.toThrow();

    await exportApproved(approvedCatalog, ['בדיקה ידנית'], true, paths);
    const first = await readFile(paths.approved, 'utf8');
    await exportApproved(approvedCatalog, ['בדיקה ידנית'], true, paths);
    expect(await readFile(paths.approved, 'utf8')).toBe(first);
    expect(first.endsWith('\n')).toBe(true);
  });

  it('sanitizes course HTML before approved export', async () => {
    const catalog = structuredClone(approvedCatalog);
    catalog.courses[0]!.descriptionHtml =
      '<p onclick="bad()">תיאור<script>bad()</script></p>';
    const result = await exportApproved(catalog, [], true, paths);
    expect(result.valid).toBe(true);
    expect(await readFile(paths.approved, 'utf8')).toContain(
      '"descriptionHtml": "<p>תיאור</p>"',
    );
  });

  it('exports a valid bootstrap into contents/<folder>/bootstrap.json', async () => {
    const result = await exportBootstrap(
      approvedCatalog,
      'school-year-2026-2027',
      [],
      true,
      directory,
    );
    expect(result.valid).toBe(true);
    expect(
      JSON.parse(
        await readFile(
          join(directory, 'contents/school-year-2026-2027/bootstrap.json'),
          'utf8',
        ),
      ),
    ).toEqual(approvedCatalog);
  });

  it('rejects unsafe bootstrap folder names', async () => {
    await expect(
      exportBootstrap(approvedCatalog, '../outside', [], true, directory),
    ).rejects.toThrow('Bootstrap folder');
  });
});
