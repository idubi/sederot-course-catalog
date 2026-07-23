import type { Catalog } from '../../src/domain/catalog';

export function formatImportedJson(source: string): string {
  const parsed = JSON.parse(source) as unknown;
  return `${JSON.stringify(parsed, null, 2)}\n`;
}

export function isEditableCatalog(value: unknown): value is Catalog {
  if (!value || typeof value !== 'object') return false;
  const catalog = value as Record<string, unknown>;
  const academicYear = catalog.academicYear;

  return (
    catalog.schemaVersion === '1.0' &&
    !!academicYear &&
    typeof academicYear === 'object' &&
    Array.isArray(catalog.programs) &&
    Array.isArray(catalog.audienceGroups) &&
    Array.isArray(catalog.courses) &&
    Array.isArray(catalog.offerings) &&
    Array.isArray(catalog.registrationTargets) &&
    !!catalog.contacts &&
    typeof catalog.contacts === 'object'
  );
}

export function isLegacyCatalog(
  value: unknown,
): value is Record<string, unknown> {
  return (
    !!value &&
    typeof value === 'object' &&
    Array.isArray((value as Record<string, unknown>).groups) &&
    !Array.isArray((value as Record<string, unknown>).audienceGroups)
  );
}

export function catalogShapeMessage(value: unknown): string | null {
  if (isEditableCatalog(value)) return null;
  if (value && typeof value === 'object' && isLegacyCatalog(value)) {
    return 'הקובץ נטען כטקסט, אך הוא משתמש במבנה הישן groups. יש להמיר אותו ל־audienceGroups ולסכמת הקטלוג הנוכחית לפני עריכה מובנית.';
  }
  return 'הקובץ נטען כטקסט, אך אינו תואם למבנה הבסיסי של סכמת הקטלוג הנוכחית. אפשר להפעיל אימות לקבלת פרטים.';
}

export function validateWebCatalogUrl(value: string): URL {
  const url = new URL(value);
  if (url.protocol !== 'https:') {
    throw new Error('כתובת אינטרנט חייבת להתחיל ב־https://');
  }
  return url;
}
