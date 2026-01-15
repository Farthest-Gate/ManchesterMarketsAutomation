import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

test('test', async ({ page }) => {
await page.goto('https://mcc-markets-live.farthestgate.co.uk/sfbo/control/login');
await page.getByRole('textbox', { name: 'Username' }).fill('dipashah');
await page.getByRole('textbox', { name: 'Password' }).fill('Dipa123!');
await page.getByRole('button', { name: 'Submit' }).click();

await page.getByRole('button', { name: 'Licences - Live' }).click();
  await page.getByRole('alert').getByRole('option', { name: 'Licences - Awaiting validation' }).click();
  await page.getByRole('gridcell', { name: 'Markets rights' }).click();
  await page.getByRole('gridcell', { name: 'Application date: activate to' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'View' }).first().click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Change status' }).click();
  await page1.getByRole('alert').getByRole('option', { name: 'Preapproval' }).click();
  await page1.getByRole('button', { name: 'Update Status' }).click();
  await page1.getByRole('textbox', { name: 'Please provide your' }).click();
  await page1.getByRole('textbox', { name: 'Please provide your' }).fill('Email text to test');
  await page1.getByRole('button', { name: 'Submit' }).click();
  await expect(page1.getByText('Status', { exact: true })).toBeVisible();
  await expect(page1.getByLabel('Status: Awaiting Payment')).toContainText('Awaiting Payment');


//await expect(page.getByRole('document', { name: 'Status: Validation required' })).toBeVisible();
});