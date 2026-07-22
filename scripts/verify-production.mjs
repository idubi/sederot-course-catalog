import console from 'node:console';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { URL } from 'node:url';

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, 'dist');
const configuredBase = process.env.PUBLIC_BASE_PATH || '/';
const base = configuredBase.endsWith('/')
  ? configuredBase
  : `${configuredBase}/`;

const forbiddenPathSegments = new Set([
  'artifacts',
  'content-source',
  'diagnostics',
  'draft',
  'tests',
  'tools',
]);
const forbiddenExtensions = new Set([
  '.astro',
  '.doc',
  '.docx',
  '.map',
  '.md',
  '.ts',
  '.tsx',
]);
const forbiddenMarkers = [
  'content/diagnostics',
  'content/draft',
  'tools/content-editor',
  'tools/source-',
  '/api/catalog/',
  '/api/diagnostics',
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(entryPath)));
    else if (entry.isFile()) files.push(entryPath);
  }

  return files;
}

function routeToFile(pathname) {
  let route = decodeURIComponent(pathname);
  if (base !== '/') {
    if (!route.startsWith(base)) return null;
    route = `/${route.slice(base.length)}`;
  }

  const relativeRoute = route.replace(/^\/+/, '');
  return path.join(
    distRoot,
    relativeRoute.endsWith('/') || relativeRoute === ''
      ? relativeRoute
      : path.extname(relativeRoute)
        ? relativeRoute
        : `${relativeRoute}/`,
    relativeRoute.endsWith('/') || relativeRoute === '' ? 'index.html' : '',
  );
}

async function assertInternalTarget(rawTarget, sourceFile, sourceHtml) {
  const sourceLabel = path
    .relative(distRoot, sourceFile)
    .replaceAll(path.sep, '/');
  const target = rawTarget.replaceAll('&amp;', '&');
  if (target.startsWith('#')) {
    const anchor = decodeURIComponent(target.slice(1));
    if (anchor && !sourceHtml.includes(`id="${anchor}"`)) {
      throw new Error(`${sourceLabel}: missing anchor target ${target}`);
    }
    return;
  }

  if (/^(mailto:|tel:)/u.test(target)) return;
  if (/^http:\/\//u.test(target)) {
    throw new Error(`${sourceLabel}: insecure external URL ${target}`);
  }
  if (/^https:\/\//u.test(target)) return;
  if (/^[a-z][a-z\d+.-]*:/iu.test(target)) {
    throw new Error(`${sourceLabel}: unsupported URL scheme ${target}`);
  }

  const sourceRoute =
    `/${path.relative(distRoot, sourceFile).replaceAll(path.sep, '/')}`.replace(
      /index\.html$/u,
      '',
    );
  const resolved = new URL(target, `https://production.invalid${sourceRoute}`);
  const targetFile = routeToFile(resolved.pathname);
  if (!targetFile || !(await stat(targetFile).catch(() => null))) {
    throw new Error(`${sourceLabel}: missing internal target ${target}`);
  }
}

async function main() {
  const distStats = await stat(distRoot).catch(() => null);
  if (!distStats?.isDirectory()) {
    throw new Error('dist/ does not exist; run the production build first');
  }

  const files = await walk(distRoot);
  if (!files.some((file) => path.relative(distRoot, file) === 'index.html')) {
    throw new Error('dist/index.html is missing');
  }

  const catalog = JSON.parse(
    await readFile(
      path.join(projectRoot, 'content/approved/catalog.json'),
      'utf8',
    ),
  );
  const registrationUrls = new Set(
    catalog.registrationTargets
      .filter((target) => target.enabled)
      .map((target) => target.url),
  );
  let checkedLinks = 0;
  let htmlFiles = 0;

  for (const file of files) {
    const relative = path.relative(distRoot, file).replaceAll(path.sep, '/');
    const segments = relative.split('/');
    const extension = path.extname(file).toLowerCase();
    if (
      segments.some((segment) => forbiddenPathSegments.has(segment)) ||
      forbiddenExtensions.has(extension)
    ) {
      throw new Error(`Forbidden local/source artifact in dist: ${relative}`);
    }

    if (extension !== '.html') continue;
    htmlFiles += 1;
    const html = await readFile(file, 'utf8');
    for (const marker of forbiddenMarkers) {
      if (html.includes(marker)) {
        throw new Error(`${relative}: forbidden production marker ${marker}`);
      }
    }

    if (relative.includes('/courses/')) {
      for (const registrationUrl of registrationUrls) {
        if (html.includes(registrationUrl)) {
          throw new Error(
            `${relative}: course output contains a registration target`,
          );
        }
      }
    }

    const links = html.matchAll(/\b(?:href|src)="([^"]+)"/gu);
    for (const match of links) {
      checkedLinks += 1;
      await assertInternalTarget(match[1], file, html);
    }
  }

  console.log(
    `Production artifact verified: ${files.length} files, ${htmlFiles} HTML pages, ${checkedLinks} links.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
