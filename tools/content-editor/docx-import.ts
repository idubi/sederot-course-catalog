import mammoth from 'mammoth';

function decodeHtml(value: string): string {
  const entities: Record<string, string> = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
  };
  return value
    .replace(/&#(\d+);/gu, (_, code: string) =>
      String.fromCodePoint(Number(code)),
    )
    .replace(/&#x([\da-f]+);/giu, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(
      /&([a-z]+);/giu,
      (entity, name: string) => entities[name.toLowerCase()] ?? entity,
    );
}

function plainText(html: string): string {
  return decodeHtml(
    html
      .replace(/<br\s*\/?\s*>/giu, '\n')
      .replace(/<[^>]+>/gu, '')
      .replace(/[\t ]+/gu, ' ')
      .trim(),
  );
}

export function docxHtmlToBlueprint(html: string): string {
  const lines: string[] = [];
  const blockPattern = /<(h[1-6]|li|p|tr)\b[^>]*>([\s\S]*?)<\/\1>/giu;
  for (const match of html.matchAll(blockPattern)) {
    const tag = match[1]!.toLowerCase();
    const block = match[2]!;
    let value = plainText(block);
    if (!value) continue;
    if (tag === 'li') value = `- ${value}`;
    if (tag.startsWith('h')) value = `${'#'.repeat(Number(tag[1]))} ${value}`;
    if (tag === 'tr') {
      const cells = [...block.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/giu)]
        .map((cell) => plainText(cell[1]!))
        .filter(Boolean);
      value = cells.join(' | ') || value;
    }
    lines.push(value);
  }
  return lines.join('\n');
}

export async function extractDocxBlueprint(buffer: Buffer): Promise<{
  messages: string[];
  source: string;
}> {
  const result = await mammoth.convertToHtml(
    { buffer },
    {
      convertImage: mammoth.images.imgElement(async () => ({ src: '' })),
      includeDefaultStyleMap: true,
    },
  );
  return {
    messages: result.messages.map(({ message }) => message),
    source: docxHtmlToBlueprint(result.value),
  };
}
