import { defineConfig } from 'vitest/config';

/**
 * @stryker-mutator/vitest-runner crashes (circular JSON in resolvedProjects/viteConfig)
 * against vitest.config.ts's `test.projects`. This flat config covers the same tests
 * without that field, for Stryker's use only. `npm test` still uses vitest.config.ts.
 */
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.ts'],
  },
});
