import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

async function expectNoViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations).toEqual([]);
}

test.describe('accessibility', () => {
  test('the initial page has no violations', async ({ page }) => {
    await page.goto('/');
    await expectNoViolations(page);
  });

  test('the page has no violations after counting', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Increase' }).click();
    await expectNoViolations(page);
  });
});
