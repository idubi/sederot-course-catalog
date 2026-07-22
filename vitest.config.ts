import { getViteConfig } from 'astro/config';

const testConfig = {
  plugins: [],
  test: {
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts', 'tools/**/*.test.ts'],
  },
};

export default getViteConfig(testConfig);
