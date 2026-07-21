import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '.astro/',
      '.codex/',
      '.vscode/',
      'artifacts/',
      'dist/',
      'node_modules/',
      'tasks/',
      'tools/content-editor/.local-dist/',
      'index.html',
      'instractions',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },
];
