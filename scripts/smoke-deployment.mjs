import console from 'node:console';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';
import { URL } from 'node:url';

const [rawBaseUrl] = process.argv.slice(2);
const fetchPage = globalThis.fetch;
if (!rawBaseUrl) {
  throw new Error('Usage: npm run deployment:smoke -- https://host/base/');
}

const baseUrl = new URL(
  rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`,
);
if (baseUrl.protocol !== 'https:') {
  throw new Error(
    `Deployment smoke tests require HTTPS, received ${baseUrl.protocol}`,
  );
}

const catalog = JSON.parse(
  await readFile(
    path.join(process.cwd(), 'content/approved/catalog.json'),
    'utf8',
  ),
);
const group = catalog.audienceGroups[0];
const offering = catalog.offerings.find(
  (candidate) => candidate.audienceGroupId === group?.id,
);
const program = catalog.programs.find(
  (candidate) => candidate.id === group?.programId,
);
const targetId =
  group?.registrationTargetId ?? program?.defaultRegistrationTargetId;
const registrationTarget = catalog.registrationTargets.find(
  (candidate) => candidate.id === targetId && candidate.enabled,
);

if (!group || !offering || !registrationTarget) {
  throw new Error('Approved catalog has no complete group smoke-test path');
}

async function fetchWithRetry(relativePath) {
  const url = new URL(relativePath, baseUrl);
  let lastError;

  for (let attempt = 1; attempt <= 12; attempt += 1) {
    try {
      const response = await fetchPage(url, { redirect: 'follow' });
      if (response.ok) return { body: await response.text(), url };
      lastError = new Error(`${url} returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < 12) await delay(5_000);
  }

  throw lastError;
}

function requireText(page, expected, label) {
  if (!page.body.includes(expected)) {
    throw new Error(
      `${label} (${page.url}) is missing ${JSON.stringify(expected)}`,
    );
  }
}

const home = await fetchWithRetry('./');
const groupPage = await fetchWithRetry(`./programs/${group.id}/`);
const coursePage = await fetchWithRetry(
  `./programs/${group.id}/courses/${offering.id}/`,
);
const registrationPage = await fetchWithRetry(
  `./programs/${group.id}/registration/`,
);
const printPage = await fetchWithRetry(`./print/?group=${group.id}`);

for (const [label, page] of [
  ['home', home],
  ['group', groupPage],
  ['course', coursePage],
  ['registration', registrationPage],
  ['print', printPage],
]) {
  requireText(page, 'dir="rtl"', label);
  requireText(page, '<main', label);
}

requireText(groupPage, group.id, 'group');
requireText(coursePage, offering.id, 'course');
requireText(registrationPage, registrationTarget.url, 'registration');
requireText(printPage, group.id, 'print');

if (coursePage.body.includes(registrationTarget.url)) {
  throw new Error('Course page exposes the program registration target');
}

console.log(
  `HTTPS deployment smoke passed for ${baseUrl}: home, group, course, registration, and print.`,
);
