import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

import { handleLocalApi } from './local-api';

export const EDITOR_HOST = '127.0.0.1' as const;

function localApiPlugin(): Plugin {
  return {
    name: 'sderot-loopback-editor-api',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (!handleLocalApi(request, response)) {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react(), localApiPlugin()],
  server: {
    host: EDITOR_HOST,
    strictPort: true,
  },
  preview: {
    host: EDITOR_HOST,
    strictPort: true,
  },
  build: {
    outDir: '.local-dist',
    emptyOutDir: true,
  },
});
