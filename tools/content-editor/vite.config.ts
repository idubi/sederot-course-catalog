import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

import { handleLocalApi } from './local-api';

export const EDITOR_HOST = '127.0.0.1' as const;
export const EDITOR_PORT = 4333 as const;

function localApiPlugin(): Plugin {
  return {
    name: 'sderot-loopback-editor-api',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        void handleLocalApi(request, response).then((handled) => {
          if (!handled) next();
        });
      });
    },
  };
}

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react(), localApiPlugin()],
  server: {
    host: EDITOR_HOST,
    port: EDITOR_PORT,
    strictPort: true,
  },
  preview: {
    host: EDITOR_HOST,
    port: EDITOR_PORT,
    strictPort: true,
  },
  build: {
    outDir: '.local-dist',
    emptyOutDir: true,
  },
});
