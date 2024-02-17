import { test, expect } from '@playwright/test';

test('Basic Task Creation Test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('New Party').click();
  await page.locator('input[name="description"]').click();
  await page.locator('input[name="userName"]').fill('Felix');
  await page.locator('input[name="userEmail"]').fill('felix');
  await page.getByRole('button', { name: 'Ok' }).press('Enter');

  await page.locator('input[name="description"]').fill(':)');
  await page.getByRole('button', { name: 'Ok' }).click();

  await page.getByLabel('Go Right').click();

  await page.getByRole('button', { name: '+' }).click();
  await page.locator('input[name="name"]').fill('Ben');
  await page.getByRole('button', { name: 'Ok' }).click();

  await page.getByRole('button', { name: '+' }).click();
  await page.locator('input[name="name"]').fill('Tim');
  await page.getByRole('button', { name: 'Ok' }).click();

  await page.getByRole('button', { name: '+' }).click();
  await page.locator('input[name="name"]').fill('John');
  await page.getByRole('button', { name: 'Ok' }).click();

  await page.getByLabel('Go Right').click();

  // Create Task
  await page.getByRole('button', { name: '+' }).click();
  await page.locator('input[name="title"]').fill('Buy Beer');
  await page.locator('input[name="description"]').click();
  await page.locator('input[name="description"]').fill('A lot of beer');
  // nobody should be the default option on task creation
  await expect(page.locator('select[name="assigneeId"]')).toHaveValue('Nobody');
  await page.getByRole('button', { name: 'Ok' }).click();

  await page.getByRole('link', { name: 'Buy Beer Todo' }).click();
  await page.locator('select[name="assigneeId"]').selectOption('Nobody');
  // all participants and nobody should be an option
  await expect(page.locator('select[name="assigneeId"]')).toContainText('Ben');
  await expect(page.locator('select[name="assigneeId"]')).toContainText('Tim');
  await expect(page.locator('select[name="assigneeId"]')).toContainText('John');
  await expect(page.locator('select[name="assigneeId"]')).toContainText('Nobody');
  // nobody should be also the selected assignee after task creation
  await expect(page.locator('select[name="assigneeId"]')).toHaveValue('-1');
  await page.getByRole('button', { name: 'Ok' }).click();

  await page.getByLabel('Go Left').click();
  await page.getByLabel('Go Left').click();

  await page.getByLabel('Delete Party').click();
  await page.waitForURL("/")
});
