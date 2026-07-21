export function formatImportedJson(source: string): string {
  const parsed = JSON.parse(source) as unknown;
  return `${JSON.stringify(parsed, null, 2)}\n`;
}

export function validateWebCatalogUrl(value: string): URL {
  const url = new URL(value);
  if (url.protocol !== 'https:') {
    throw new Error('כתובת אינטרנט חייבת להתחיל ב־https://');
  }
  return url;
}
