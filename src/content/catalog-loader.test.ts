import { describe, expect, expectTypeOf, it } from 'vitest';

import type { Catalog } from '../domain';
import { APPROVED_CATALOG_PATH, loadApprovedCatalog } from './catalog-loader';

describe('approved catalog loader', () => {
  it('loads and validates the committed approved seed', () => {
    const catalog = loadApprovedCatalog();

    expectTypeOf(catalog).toEqualTypeOf<Catalog>();
    expect(catalog.academicYear.id).toBe('seed-2026-2027');
    expect(catalog.programs).toHaveLength(1);
    expect(catalog.audienceGroups).toHaveLength(1);
    expect(catalog.courses).toHaveLength(1);
    expect(catalog.offerings).toHaveLength(1);
  });

  it('exposes only the approved production input path', () => {
    expect(APPROVED_CATALOG_PATH).toBe('content/approved/catalog.json');
    expect(APPROVED_CATALOG_PATH).not.toContain('/draft/');
    expect(APPROVED_CATALOG_PATH).not.toContain('/diagnostics/');
  });

  it('contains no offering-level registration target', () => {
    const catalog = loadApprovedCatalog();

    expect(
      catalog.offerings.every(
        (offering) => !('registrationTargetId' in offering),
      ),
    ).toBe(true);
  });
});
