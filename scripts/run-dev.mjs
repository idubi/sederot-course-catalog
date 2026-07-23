import { spawn } from 'node:child_process';
import process from 'node:process';

import { parseDataArgument, resolveDataBootstrap } from './catalog-data.mjs';

const { data, forwarded } = parseDataArgument(process.argv.slice(2));
const env = { ...process.env };
delete env.CATALOG_BOOTSTRAP_PATH;
if (data) {
  env.CATALOG_BOOTSTRAP_PATH = await resolveDataBootstrap(data, process.cwd());
  console.log(`Loading catalog data from ${env.CATALOG_BOOTSTRAP_PATH}`);
}

const child = spawn('astro', ['dev', ...forwarded], {
  env,
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error(`Unable to start Astro: ${error.message}`);
  process.exitCode = 1;
});
child.on('exit', (code, signal) => {
  process.exitCode = signal ? 1 : (code ?? 1);
});
