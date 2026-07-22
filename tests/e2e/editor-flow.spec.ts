import { expect, test } from '@playwright/test';

test.use({ baseURL: 'http://127.0.0.1:4333' });

test('editor loads approved JSON and validates without writing files', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await expect(
    page.getByRole('heading', { level: 1, name: 'עורך התוכן' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'טעינת מאושר' }).click();
  await expect(page.getByRole('status')).toContainText('התוכן המאושר נטען');
  await expect(page.getByLabel('קטלוג JSON')).toContainText(
    '"schemaVersion": "1.0"',
  );

  await page.getByRole('button', { name: 'אימות' }).click();
  await expect(page.getByRole('status')).toContainText('התוכן תקין');
});

test('editor keeps a legacy groups catalog editable without crashing structured forms', async ({
  page,
}) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', (error) => pageErrors.push(error));

  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByLabel('מהמחשב או מכונן מסונכרן').setInputFiles({
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

  await expect(page.getByRole('status')).toContainText('legacy-catalog.json');
  await expect(page.getByRole('alert')).toContainText('groups');
  await expect(page.getByLabel('קטלוג JSON')).toContainText('"groups"');
  await expect(
    page.getByRole('heading', { name: 'תוכניות וקבוצות קהל' }),
  ).toHaveCount(0);
  expect(pageErrors).toEqual([]);
});
