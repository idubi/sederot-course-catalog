import { realpath, stat } from 'node:fs/promises';
import path from 'node:path';

export const BOOTSTRAP_FILE_NAME = 'bootstrap.json';

export function parseDataArgument(args) {
  let data = null;
  const forwarded = [];

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument.startsWith('--data=')) {
      if (data !== null) throw new Error('--data may be provided only once');
      data = argument.slice('--data='.length);
      if (!data.trim()) throw new Error('--data requires a folder path');
      continue;
    }
    if (argument === '--data') {
      if (data !== null) throw new Error('--data may be provided only once');
      data = args[++index];
      if (!data?.trim()) throw new Error('--data requires a folder path');
      continue;
    }
    forwarded.push(argument);
  }

  return { data, forwarded };
}

function isOutside(root, candidate) {
  const relative = path.relative(root, candidate);
  return (
    relative === '..' ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  );
}

export async function resolveDataBootstrap(dataFolder, repositoryRoot) {
  const root = await realpath(repositoryRoot);
  const contentsRoot = path.join(root, 'contents');
  const folder = path.resolve(root, dataFolder);
  if (path.dirname(folder) !== contentsRoot) {
    throw new Error('--data folder must be a direct child of contents/');
  }
  if (!(await stat(folder).catch(() => null))?.isDirectory()) {
    throw new Error(`--data folder does not exist: ${dataFolder}`);
  }

  const bootstrap = await realpath(
    path.join(folder, BOOTSTRAP_FILE_NAME),
  ).catch(() => null);
  if (!bootstrap) {
    throw new Error(`Missing ${BOOTSTRAP_FILE_NAME} in ${dataFolder}`);
  }
  if (isOutside(contentsRoot, bootstrap)) {
    throw new Error(`${BOOTSTRAP_FILE_NAME} must stay inside contents/`);
  }
  return bootstrap;
}
