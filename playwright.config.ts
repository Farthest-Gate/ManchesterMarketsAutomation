import { defineConfig } from '@playwright/test';

import * as dotenv from 'dotenv';
import path from 'path';
const ENV = process.env.ENV || 'development'; // Default to 'development' if ENV is not set
dotenv.config({ path: path.resolve(__dirname, `.env.${ENV}`), debug: true });


export default defineConfig({
  testDir: './tests',         // folder where your tests are
  timeout: 70000,             // max time per test
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    headless: false,          // show browser, good for debugging
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      slowMo: 1000,
    },
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'always' }]],
});
