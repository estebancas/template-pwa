import { expect, test } from '@playwright/test';

test('the counter loads and counts', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Counter' })).toBeVisible();
  await expect(page.locator('output')).toHaveText('0');
  await page.getByRole('button', { name: 'Increase' }).click();
  await expect(page.locator('output')).toHaveText('1');
});
