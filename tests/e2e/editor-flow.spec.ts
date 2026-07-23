import { expect, test } from '@playwright/test';

test.use({ baseURL: 'http://127.0.0.1:4333' });

test('editor loads approved JSON and validates without writing files', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await expect(
    page.getByRole('heading', { name: 'טעינת פרופיל מקובץ' }),
  ).toBeVisible();
  await expect(
    page.getByRole('navigation', { name: 'ישויות קטלוג' }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('heading', { level: 1, name: 'עורך התוכן' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'טעינת מאושר' }).click();
  await expect(page.getByRole('status')).toContainText('התוכן המאושר נטען');
  await expect(page.getByLabel('קטלוג JSON')).toContainText(
    '"schemaVersion": "1.0"',
  );
  await expect(
    page.getByRole('navigation', { name: 'ישויות קטלוג' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'קבוצות' }).click();
  await expect(page.getByRole('heading', { name: 'קבוצות קהל' })).toBeVisible();
  await page.getByRole('button', { name: 'תוכניות' }).click();
  await expect(page.getByRole('heading', { name: 'תוכניות' })).toBeVisible();

  await page.getByRole('button', { name: 'אימות' }).click();
  await expect(page.getByRole('status')).toContainText('התוכן תקין');
});

test('editor migrates a legacy groups catalog without crashing structured forms', async ({
  page,
}) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', (error) => pageErrors.push(error));

  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByLabel('בחירת קובץ').setInputFiles({
    name: 'legacy-catalog.json',
    mimeType: 'application/json',
    buffer: Buffer.from(
      JSON.stringify({
        schemaVersion: '1.0',
        academicYear: '2026-2027',
        programs: [],
        groups: [],
        courses: [],
        offerings: [],
        registrationTargets: [],
        contacts: {},
      }),
    ),
  });

  await expect(page.getByRole('status')).toContainText('הומר לטיוטת הסכמה');
  await expect(page.getByText(/אבחוני המרה/)).toBeVisible();
  await expect(page.getByLabel('קטלוג JSON')).toContainText('"audienceGroups"');
  await expect(page.getByLabel('קטלוג JSON')).not.toContainText('"groups"');
  await expect(
    page.getByRole('heading', { name: 'קורסים ושיוכים לקבוצות' }),
  ).toBeVisible();
  expect(pageErrors).toEqual([]);
});
