import { expect, test } from '@playwright/test';

const groupPath = '/programs/gifted-grade-5-mixed/';
const coursePath = `${groupPath}courses/seed-course-gifted-grade-5-mixed/`;

test('selection opens the group, course details, and same-group return', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByLabel('תוכנית', { exact: true }).selectOption('gifted');
  await page.getByLabel('שכבה', { exact: true }).selectOption('grade-5');
  await page.getByLabel('קהל', { exact: true }).selectOption('mixed');
  await page.getByRole('button', { name: 'הצגת אשכול הקורסים' }).click();

  await expect(page).toHaveURL(new RegExp(`${groupPath}$`));
  await expect(
    page.getByRole('heading', { level: 2, name: 'אשכול הקורסים' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'פרטי הקורס' }).click();
  await expect(page).toHaveURL(new RegExp(`${coursePath}$`));
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'קורס הדגמה',
  );
  await expect(page.getByRole('link', { name: /הרשמה/ })).toHaveCount(0);

  await page
    .getByRole('link', { name: 'חזרה לאשכול הקורסים של התוכנית' })
    .click();
  await expect(page).toHaveURL(new RegExp(`${groupPath}$`));
});

test('registration information precedes the external target and closes to the group', async ({
  page,
}) => {
  await page.goto(groupPath);
  await page.getByRole('link', { name: 'מידע והרשמה לתוכנית' }).click();

  await expect(page).toHaveURL(new RegExp(`${groupPath}registration/$`));
  await expect(
    page.getByRole('heading', { level: 1, name: 'מידע לפני הרשמה' }),
  ).toBeVisible();
  const external = page.getByRole('link', {
    name: /המשך לאתר הרישום החיצוני/,
  });
  await expect(external).toHaveAttribute(
    'href',
    'https://registration.example.invalid/seed',
  );
  await expect(external).toHaveAttribute('rel', 'noopener noreferrer');

  await page.getByRole('link', { name: 'סגירה וחזרה לתוכנית' }).click();
  await expect(page).toHaveURL(new RegExp(`${groupPath}$`));
});

test('critical public flow remains usable at 320px without horizontal overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');

  const hasOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);

  await page.getByLabel('תוכנית', { exact: true }).focus();
  await expect(page.getByLabel('תוכנית', { exact: true })).toBeFocused();
  await expect(
    page.getByRole('link', { name: 'דילוג לתוכן הראשי' }),
  ).toBeAttached();
});

test('print view resolves approved group content without registration controls', async ({
  page,
}) => {
  await page.goto('/print/?group=gifted-grade-5-mixed');

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'מחוננים',
  );
  await expect(
    page.getByRole('button', { name: 'הדפסה או שמירה כ-PDF' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /הרשמה/ })).toHaveCount(0);
});
