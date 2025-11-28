import { test, expect } from '@playwright/test';
import { makeWccPayment } from '../pages/wccCardPayment';
import { licenceApproval } from '../pages/wccBOApproval';


test('test', async ({ page }) => {
  await page.goto('/sf/control/login');
  await page.getByRole('textbox', { name: 'Email' }).fill(process.env.EMAIL!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.goto('/sf/control/casualmarketapplication');
  
  await expect(page.getByRole('heading', { name: 'Casual trader licence' })).toBeVisible();
  await page.locator('div').filter({ hasText: /^YesNo$/ }).first().click();
  await page.getByRole('textbox', { name: 'I wish for the licence to' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'I wish for the licence to' }).fill('01/01/2026');

  await page.getByRole('checkbox', { name: 'Yes' }).first().check();
  await page.getByRole('combobox', { name: 'Where do you wish to trade? *' }).click();
  await page.locator('a').filter({ hasText: 'Market - Maida Hill W9' }).click();
  await page.getByRole('group', { name: 'Do you currently or have you' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Have you ever had a licence' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Have you ever surrendered' }).getByLabel('No').check();
  await page.getByRole('button', { name: 'Commodities' }).click();
  await page.getByRole('alert').getByRole('option', { name: 'Clothing and accessories' }).click();
  await page.getByRole('button', { name: 'Please select a commodity' }).click();
  await page.getByRole('alert').getByRole('option', { name: 'Childrens clothing and' }).click();
  await page.getByText('Select commoditiesClothing').click();
  await page.getByRole('alert').getByRole('option', { name: 'Hair accessories' }).click();
  await page.getByRole('textbox', { name: 'Please explain how the items' }).click();
  await page.getByRole('textbox', { name: 'Please explain how the items' }).fill('Test');
  await page.getByRole('textbox', { name: 'Please give the address where' }).fill('Test');
  await page.getByRole('textbox', { name: 'Please list the products/menu' }).fill('Test');

  await page.locator('.toggle.btn.btn-danger').first().click();
  await page.getByRole('button', { name: 'Add declaration' }).click();
  await page.getByRole('checkbox', { name: 'Confirmation *', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Confirmation **' }).check();
  await page.getByRole('button', { name: 'Add Declaration', exact: true }).click();
  await page.getByRole('button', { name: 'Pay & submit' }).click();


  await makeWccPayment(page);

  await expect(page.getByText('Validation required')).toBeVisible({ timeout: 50000 });
  console.log(page.url());

  await licenceApproval(page);


});