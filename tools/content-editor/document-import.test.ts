import { describe, expect, it } from 'vitest';

import { importBlueprintDocument } from './document-import';

describe('editor blueprint document import', () => {
  it('creates an editable canonical draft with diagnostics', () => {
    const result = importBlueprintDocument(
      [
        '# קטלוג',
        "- כיתה ג' מעורב תוכנית מחוננים לומדים ביום ראשון בין 08:00 ל-12:00",
        '- קורס ניסוי',
      ].join('\n'),
      'blueprint.md',
    );

    expect(result.catalog.programs).toHaveLength(1);
    expect(result.catalog.audienceGroups).toHaveLength(1);
    expect(result.catalog.audienceGroups[0]).toMatchObject({
      startTime: '08:00',
      endTime: '12:00',
    });
    expect(result.catalog.courses).toHaveLength(1);
    expect(result.catalog.offerings).toHaveLength(1);
    expect(
      result.diagnostics.some(({ severity }) => severity === 'error'),
    ).toBe(true);
  });
});
