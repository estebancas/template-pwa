import { expect, test } from '@playwright/test';

/**
 * Screenshots only render pixel-identically on the same OS and font stack as the committed
 * baselines (generated on Linux through the Playwright Docker image). Skipped outside Linux so
 * `npm run e2e` stays green on macOS; use `npm run e2e:visual` for a Docker run that matches CI.
 */
test.skip(process.platform !== 'linux', 'Visual baselines are Linux-only; see npm run e2e:visual.');

const VIEWPORTS = {
  phone: { width: 390, height: 844 },
  desktop: { width: 1280, height: 800 },
};

test.describe('visual regression', () => {
  for (const [name, viewport] of Object.entries(VIEWPORTS)) {
    test(`initial page, ${name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/');
      await expect(page).toHaveScreenshot(`initial-${name}.png`, { fullPage: true });
    });

    test(`after counting, ${name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/');
      await page.getByRole('button', { name: 'Increase' }).click();
      await expect(page).toHaveScreenshot(`counted-${name}.png`, { fullPage: true });
    });
  }
});
