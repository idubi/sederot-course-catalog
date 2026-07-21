import { describe, expect, it } from 'vitest';

import {
  APPROVED_BLUEPRINT_PATH,
  APPROVED_BLUEPRINT_SHA256,
  BLUEPRINT_SNAPSHOT_PATH,
  parseBlueprint,
  readApprovedBlueprint,
  reconstructBlueprint,
} from './blueprint-reader';

describe('approved blueprint reader', () => {
  it('uses the dedicated local-only reconstruction location', () => {
    expect(BLUEPRINT_SNAPSHOT_PATH).toBe(
      'content/draft/source-reader/blueprint-document.json',
    );
  });

  it('reads the approved artifact losslessly with stable locations', async () => {
    const document = await readApprovedBlueprint();

    expect(document.path).toBe(APPROVED_BLUEPRINT_PATH);
    expect(document.sha256).toBe(APPROVED_BLUEPRINT_SHA256);
    expect(reconstructBlueprint(document)).toBe(document.source);
    expect(document.nodes.at(-1)?.location.endOffset).toBe(
      document.source.length,
    );

    for (const [index, node] of document.nodes.entries()) {
      expect(node.location.line).toBe(index + 1);
      expect(
        document.source.slice(
          node.location.startOffset,
          node.location.endOffset,
        ),
      ).toBe(node.raw);
    }
  });

  it('exposes every approved structural primitive without semantic normalization', async () => {
    const { nodes } = await readApprovedBlueprint();
    const groupHeadings = nodes.filter(
      ({ kind, text }) =>
        kind === 'list-item' &&
        /^כיתה .+ תוכנית (מחוננים|מצטיינים) /.test(text),
    );

    expect(groupHeadings).toHaveLength(26);
    expect(nodes.some(({ kind }) => kind === 'heading')).toBe(true);
    expect(nodes.some(({ kind }) => kind === 'list-item')).toBe(true);
    expect(nodes.some(({ kind }) => kind === 'paragraph')).toBe(true);
    expect(nodes.some(({ kind }) => kind === 'table-row')).toBe(true);
    expect(nodes.some(({ kind }) => kind === 'image')).toBe(true);
    expect(
      nodes.some(
        ({ kind, raw }) => kind === 'image' && raw.endsWith('**מבנה**'),
      ),
    ).toBe(true);
    expect(
      nodes.some(
        ({ kind, text }) => kind === 'heading' && text.includes('בהנחיית'),
      ),
    ).toBe(true);
    expect(nodes.some(({ text }) => text.includes('שם זמני'))).toBe(true);
  });

  it('preserves unknown and nested lines instead of dropping them', () => {
    const source = '**כותרת**\n  - פריט\nטקסט לא מזוהה\n';
    const document = parseBlueprint(source, 'fixture.md');

    expect(document.nodes.map(({ kind }) => kind)).toEqual([
      'heading',
      'list-item',
      'paragraph',
      'blank',
    ]);
    expect(document.nodes[1]?.listDepth).toBe(1);
    expect(reconstructBlueprint(document)).toBe(source);
  });
});
