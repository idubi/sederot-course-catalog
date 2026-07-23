import { describe, expect, it } from 'vitest';

import {
  catalogShapeMessage,
  formatImportedJson,
  isEditableCatalog,
  isLegacyCatalog,
  validateWebCatalogUrl,
} from './catalog-import';

describe('catalog JSON import', () => {
  it('parses and formats a selected JSON document', () => {
    expect(formatImportedJson('{"schemaVersion":"1.0"}')).toBe(
      '{\n  "schemaVersion": "1.0"\n}\n',
    );
  });

  it('rejects malformed JSON before replacing editor content', () => {
    expect(() => formatImportedJson('{')).toThrow();
  });

  it('allows HTTPS web sources only', () => {
    expect(
      validateWebCatalogUrl('https://example.test/catalog.json').href,
    ).toBe('https://example.test/catalog.json');
    expect(() =>
      validateWebCatalogUrl('http://example.test/catalog.json'),
    ).toThrow('https://');
  });

  it('rejects legacy groups from structured editing without rejecting the JSON text', () => {
    const legacy = {
      schemaVersion: '1.0',
      academicYear: '2026-2027',
      programs: [],
      groups: [],
      courses: [],
      offerings: [],
      registrationTargets: [],
      contacts: {},
    };

    expect(isEditableCatalog(legacy)).toBe(false);
    expect(isLegacyCatalog(legacy)).toBe(true);
    expect(catalogShapeMessage(legacy)).toContain('groups');
  });

  it('recognizes the canonical top-level editor shape', () => {
    expect(
      isEditableCatalog({
        schemaVersion: '1.0',
        academicYear: { id: '2026-2027', label: 'תשפ״ז' },
        programs: [],
        audienceGroups: [],
        courses: [],
        offerings: [],
        registrationTargets: [],
        contacts: {},
      }),
    ).toBe(true);
  });
});
