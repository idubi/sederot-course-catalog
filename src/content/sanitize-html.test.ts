import { describe, expect, it } from 'vitest';

import approved from '../../content/approved/catalog.json';
import type { Catalog } from '../domain';
import { sanitizeCatalogHtml, sanitizeDescriptionHtml } from './sanitize-html';

describe('course HTML sanitation', () => {
  it('keeps the approved rich-text allowlist', () => {
    expect(
      sanitizeDescriptionHtml('<p><strong>שלום</strong><br>עולם</p>'),
    ).toBe('<p><strong>שלום</strong><br />עולם</p>');
  });

  it('removes scripts, event handlers, styles, and unsafe links', () => {
    const result = sanitizeDescriptionHtml(
      '<p style="color:red" onclick="bad()">טקסט<script>bad()</script><a href="javascript:bad()">קישור</a></p>',
    );
    expect(result).toBe('<p>טקסט<a rel="noopener noreferrer">קישור</a></p>');
  });

  it('secures allowed HTTPS links', () => {
    expect(
      sanitizeDescriptionHtml('<a href="https://example.test">קישור</a>'),
    ).toBe(
      '<a href="https://example.test" rel="noopener noreferrer">קישור</a>',
    );
  });

  it('sanitizes program and group registration information', () => {
    const catalog = structuredClone(approved) as Catalog;
    catalog.programs[0]!.registrationInfoHtml =
      '<p onclick="bad()">מידע תוכנית</p>';
    catalog.audienceGroups[0]!.registrationInfoHtml =
      '<p>מידע קבוצה<script>bad()</script></p>';

    const sanitized = sanitizeCatalogHtml(catalog);

    expect(sanitized.programs[0]?.registrationInfoHtml).toBe(
      '<p>מידע תוכנית</p>',
    );
    expect(sanitized.audienceGroups[0]?.registrationInfoHtml).toBe(
      '<p>מידע קבוצה</p>',
    );
  });
});
