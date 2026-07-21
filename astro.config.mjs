import { defineConfig } from 'astro/config';

const configuredBase = process.env.PUBLIC_BASE_PATH || '/';
const base = configuredBase.endsWith('/')
  ? configuredBase
  : `${configuredBase}/`;

export default defineConfig({
  output: 'static',
  base,
  build: {
    format: 'directory',
  },
  server: {
    host: '127.0.0.1',
  },
});
