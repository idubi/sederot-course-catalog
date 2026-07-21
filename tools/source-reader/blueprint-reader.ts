import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

export const APPROVED_BLUEPRINT_PATH =
  'artifacts/2027 cources details - blueprint.md';
export const APPROVED_BLUEPRINT_SHA256 =
  '27fbfdee80ea72b02968e8ed68ee5aef04a994b97379fe6b04956e9d85850606';
export const BLUEPRINT_SNAPSHOT_PATH =
  'content/draft/source-reader/blueprint-document.json';

export type BlueprintNodeKind =
  'blank' | 'heading' | 'image' | 'list-item' | 'paragraph' | 'table-row';

export interface SourceLocation {
  line: number;
  column: number;
  startOffset: number;
  endOffset: number;
}

export interface BlueprintNode {
  kind: BlueprintNodeKind;
  raw: string;
  text: string;
  location: SourceLocation;
  listDepth?: number;
}

export interface BlueprintDocument {
  path: string;
  sha256: string;
  source: string;
  nodes: BlueprintNode[];
}

function classifyLine(
  raw: string,
): Pick<BlueprintNode, 'kind' | 'text' | 'listDepth'> {
  if (raw.length === 0 || raw === '\r') {
    return { kind: 'blank', text: '' };
  }

  const image = raw.match(/^\s*!\[(?<alt>[^\]]*)\]\(/);
  if (image?.groups) {
    return { kind: 'image', text: image.groups.alt ?? '' };
  }

  const markdownHeading = raw.match(
    /^\s{0,3}#{1,6}\s+(?<text>.*?)\s*#*\s*\r?$/,
  );
  const boldHeading = raw.match(/^\s*\*\*(?<text>.+?)\*\*\s*\r?$/);
  const headingText =
    markdownHeading?.groups?.text ?? boldHeading?.groups?.text;
  if (headingText !== undefined) {
    return { kind: 'heading', text: headingText };
  }

  const listItem = raw.match(
    /^(?<indent>\s*)(?:[-*+]|\d+[.)])\s+(?<text>.*?)(?:\r)?$/,
  );
  if (listItem?.groups) {
    return {
      kind: 'list-item',
      text: listItem.groups.text ?? '',
      listDepth: Math.floor((listItem.groups.indent?.length ?? 0) / 2),
    };
  }

  if (/^\s*\|.*\|\s*\r?$/.test(raw)) {
    return { kind: 'table-row', text: raw.trim() };
  }

  return { kind: 'paragraph', text: raw.replace(/\r$/, '') };
}

export function parseBlueprint(
  source: string,
  path = APPROVED_BLUEPRINT_PATH,
): BlueprintDocument {
  const lines = source.split('\n');
  let startOffset = 0;
  const nodes = lines.map((raw, index) => {
    const classification = classifyLine(raw);
    const node: BlueprintNode = {
      ...classification,
      raw,
      location: {
        line: index + 1,
        column: 1,
        startOffset,
        endOffset: startOffset + raw.length,
      },
    };
    startOffset += raw.length + (index < lines.length - 1 ? 1 : 0);
    return node;
  });

  return {
    path,
    sha256: createHash('sha256').update(source).digest('hex'),
    source,
    nodes,
  };
}

export async function readApprovedBlueprint(): Promise<BlueprintDocument> {
  const source = await readFile(APPROVED_BLUEPRINT_PATH, 'utf8');
  const document = parseBlueprint(source);
  if (document.sha256 !== APPROVED_BLUEPRINT_SHA256) {
    throw new Error(
      `Approved blueprint hash mismatch: expected ${APPROVED_BLUEPRINT_SHA256}, received ${document.sha256}`,
    );
  }
  return document;
}

export function reconstructBlueprint(document: BlueprintDocument): string {
  return document.nodes.map(({ raw }) => raw).join('\n');
}
