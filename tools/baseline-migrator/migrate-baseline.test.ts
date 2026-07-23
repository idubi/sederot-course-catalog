import { describe, expect, it } from 'vitest';

import {
  BASELINE_CATALOG_SHA256,
  migrateBaselineCatalog,
  readBaselineCatalog,
} from './migrate-baseline';

describe('2026-2027 baseline migration', () => {
  it('reads the owner-designated immutable baseline', async () => {
    expect(BASELINE_CATALOG_SHA256).toHaveLength(64);
    await expect(readBaselineCatalog()).resolves.toBeTruthy();
  });

  it('preserves every course and assignment in canonical collections', async () => {
    const source = (await readBaselineCatalog()) as {
      courses: Array<{ id: string; descriptionHtml: string }>;
      offerings: Array<{ id: string; groupId: string }>;
    };
    const migration = migrateBaselineCatalog(source);

    expect(migration.catalog).toMatchObject({
      academicYear: { id: '2026-2027', label: 'תשפ״ז' },
      programs: expect.any(Array),
      audienceGroups: expect.any(Array),
      courses: expect.any(Array),
      offerings: expect.any(Array),
    });
    expect(migration.catalog.programs).toHaveLength(2);
    expect(migration.catalog.audienceGroups).toHaveLength(26);
    expect(migration.catalog.courses).toHaveLength(21);
    expect(migration.catalog.offerings).toHaveLength(123);
    expect(migration.catalog.courses.map(({ id }) => id)).toEqual(
      source.courses.map(({ id }) => id),
    );
    expect(
      migration.catalog.courses.map(({ descriptionHtml }) => descriptionHtml),
    ).toEqual(source.courses.map(({ descriptionHtml }) => descriptionHtml));
    expect(
      migration.catalog.offerings.map(({ audienceGroupId }) => audienceGroupId),
    ).toEqual(source.offerings.map(({ groupId }) => groupId));
  });

  it('reports unresolved registration and contact values instead of inventing them', async () => {
    const migration = migrateBaselineCatalog(await readBaselineCatalog());

    expect(migration.catalog.registrationTargets).toEqual([]);
    expect(migration.catalog.contacts).toEqual({
      phone: '',
      whatsapp: '',
      email: '',
    });
    expect(
      migration.diagnostics.filter(({ severity }) => severity === 'error'),
    ).not.toHaveLength(0);
    expect(
      migration.diagnostics.filter(
        ({ code }) => code === 'legacy-registration-mode',
      ),
    ).toHaveLength(2);
  });
});
