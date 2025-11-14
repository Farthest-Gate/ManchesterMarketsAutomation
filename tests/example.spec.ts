import { test, expect } from '@playwright/test';

test('check Playwright homepage title', async ({ page }) => {
  // Go to Playwright website
  await page.goto('https://playwright.dev');

  // Get page title
  const title = await page.title();
  console.log('Page Title:', title);

  // Assert the title contains 'Playwright'
  expect(title).toContain('Playwright');
});

test('search for documentation', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Click on the search icon
  await page.locator('button[aria-label="Search"]').click();

  // Type 'test' in the search box and press Enter
  await page.locator('input[placeholder="Search"]').fill('test');
  await page.keyboard.press('Enter');

  // Wait for results to appear
  await page.waitForSelector('.search-result');

  // Assert that at least one result is visible
  const results = await page.locator('.search-result').count();
  expect(results).toBeGreaterThan(0);
});
