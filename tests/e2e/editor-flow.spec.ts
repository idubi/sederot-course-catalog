import { readFile } from 'node:fs/promises';

import { expect, test } from '@playwright/test';

test.use({ baseURL: 'http://127.0.0.1:4334' });

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
  await expect(
    page.getByRole('heading', { name: 'תוכניות', exact: true }),
  ).toBeVisible();

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

test('editor browser pinpoints one entity card at a time', async ({ page }) => {
  const catalog = JSON.parse(
    await readFile('content/approved/catalog.json', 'utf8'),
  ) as {
    audienceGroups: Array<Record<string, unknown>>;
    courses: Array<Record<string, unknown>>;
    offerings: Array<Record<string, unknown>>;
    programs: Array<Record<string, unknown>>;
  };
  const firstProgram = catalog.programs[0]!;
  const firstGroup = catalog.audienceGroups[0]!;
  const firstCourse = catalog.courses[0]!;
  const firstOffering = catalog.offerings[0]!;
  catalog.programs.push({
    ...firstProgram,
    id: 'second-program',
    name: 'תוכנית שנייה',
  });
  catalog.audienceGroups.push({
    ...firstGroup,
    id: 'second-group',
    programId: 'second-program',
    gradeGroupId: 'second-grade',
    gradeLabels: ['כיתה ו׳'],
    gradeValues: ['6'],
  });
  catalog.courses.push({
    ...firstCourse,
    id: 'second-course',
    name: 'קורס שני',
    shortName: 'שני',
  });
  catalog.offerings.push({
    ...firstOffering,
    id: 'second-course-offering',
    courseId: 'second-course',
    displayOrder: 1,
  });

  await page.goto('/');
  await page.getByLabel('בחירת קובץ').setInputFiles({
    name: 'two-courses.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(catalog)),
  });

  const browser = page.getByRole('navigation', { name: 'דפדפן הקורסים' });
  await expect(browser.getByRole('button')).toHaveCount(2);
  await expect(page.locator('.entity-detail > fieldset')).toHaveCount(1);
  await browser.getByRole('button', { name: /קורס שני/u }).click();
  await expect(
    browser.getByRole('button', { name: /קורס שני/u }),
  ).toHaveAttribute('aria-current', 'true');
  await expect(
    page.locator('.entity-detail > fieldset').getByRole('textbox', {
      name: 'שם',
      exact: true,
    }),
  ).toHaveValue('קורס שני');

  await page.getByRole('button', { name: 'קבוצות' }).click();
  const groupBrowser = page.getByRole('navigation', { name: 'דפדפן הקבוצות' });
  await expect(groupBrowser.getByRole('button')).toHaveCount(2);
  await groupBrowser.getByRole('button', { name: /כיתה ו׳/u }).click();
  await expect(page.locator('.entity-detail > fieldset')).toHaveCount(1);
  await expect(page.getByLabel('שכבות')).toHaveValue('כיתה ו׳');

  await page.getByRole('button', { name: 'תוכניות' }).click();
  const programBrowser = page.getByRole('navigation', {
    name: 'דפדפן התוכניות',
  });
  await expect(programBrowser.getByRole('button')).toHaveCount(2);
  await programBrowser.getByRole('button', { name: /תוכנית שנייה/u }).click();
  await expect(page.locator('.entity-detail > fieldset')).toHaveCount(1);
  await expect(
    page.getByRole('textbox', { name: 'שם', exact: true }),
  ).toHaveValue('תוכנית שנייה');
});

test('editor saves a specific warning and returns to it later', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByLabel('בחירת קובץ').setInputFiles({
    name: 'warning-source.md',
    mimeType: 'text/markdown',
    buffer: Buffer.from(
      [
        '# קטלוג',
        "- כיתה ג' מעורב תוכנית מחוננים לומדים ביום ראשון בין 08:00 ל-12:00",
        '- קורס זמני',
      ].join('\n'),
    ),
  });

  const diagnostic = page
    .locator('.diagnostic')
    .filter({ has: page.getByRole('button', { name: 'מעבר לישות' }) })
    .first();
  await diagnostic.getByRole('button', { name: 'שמירה לחזרה מאוחרת' }).click();
  await expect(
    diagnostic.getByRole('button', { name: 'הסרה מהשמורים' }),
  ).toHaveAttribute('aria-pressed', 'true');
  await diagnostic.getByRole('button', { name: 'מעבר לישות' }).click();
  await expect(
    page.getByRole('button', { name: 'חזרה לאבחון האחרון' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'חזרה לאבחון האחרון' }).click();
  await expect(page.getByLabel('סינון אבחונים')).toHaveValue('saved');
  await expect(
    page.getByRole('button', { name: 'הסרה מהשמורים' }),
  ).toBeVisible();
});
