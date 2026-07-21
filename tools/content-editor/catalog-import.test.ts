import { describe, expect, it } from 'vitest';

import { formatImportedJson, validateWebCatalogUrl } from './catalog-import';

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
});
