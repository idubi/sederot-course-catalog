import { describe, expect, it } from 'vitest';

import { sanitizeDescriptionHtml } from './sanitize-html';

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
});
