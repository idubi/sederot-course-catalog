import { describe, expect, it } from 'vitest';

import { docxHtmlToBlueprint } from './docx-import';

describe('DOCX editor import', () => {
  it('preserves headings, lists, paragraphs, and table rows as blueprint text', () => {
    expect(
      docxHtmlToBlueprint(
        '<h1>תוכנית</h1><p>כיתה ג׳</p><ul><li>קורס ראשון</li></ul><table><tr><td>יום</td><td>ראשון</td></tr></table>',
      ),
    ).toBe('# תוכנית\nכיתה ג׳\n- קורס ראשון\nיום | ראשון');
  });
});
