import { test, expect } from '@playwright/test';

test('Create and Delete Party', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('New Party').click();
  await page.locator('input[name="description"]').click();
  await page.locator('input[name="userName"]').click();
  await page.locator('input[name="userName"]').fill('Felix');
  await page.locator('input[name="userName"]').press('Tab');
  await page.locator('input[name="userEmail"]').fill('Test');
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.locator('input[name="description"]').click();
  await page.locator('input[name="description"]').fill(':)');
  await page.getByRole('button', { name: 'Ok' }).click();
  await expect(page.getByText('Details', { exact: true })).toBeVisible();
  await page.getByLabel('Delete Party').click();
  await page.waitForURL("/")
});
