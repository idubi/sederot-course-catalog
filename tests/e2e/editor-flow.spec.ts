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
