import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',         // folder where your tests are
  timeout: 30000,             // max time per test
  use: {
    headless: false,          // show browser, good for debugging
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'always' }]],
});
