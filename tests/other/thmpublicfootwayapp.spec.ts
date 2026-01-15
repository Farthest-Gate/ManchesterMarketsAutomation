import { test, expect } from '@playwright/test';
import { makePayment } from '../lib/pages/thmCardPayment';
import { thmLicenceApproval } from '../lib/pages/thmBOApproval';

test('test', async ({ page }) => {
  await page.goto('https://10.4.49.4:7443/sf/control/login');
  
  await page.getByRole('textbox', { name: 'Email' }).fill('frant_ofis_test+normal_user_71@outlook.com');

  await page.getByRole('textbox', { name: 'Password' }).fill('Dipa123!');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Licence application' }).click();
  await page.getByRole('link', { name: 'Public footway' }).click();
  await expect(page.getByRole('heading', { name: 'Public Footway Application' })).toBeVisible();
  await expect(page.getByText('Please confirm the above is')).toBeVisible();
  
  await page.getByRole('button', { name: 'confirm' }).first().click();
  await page.getByRole('button', { name: 'Please select' }).click();
  await page.getByRole('alert').getByRole('option', { name: 'Table and chairs' }).click();
  await page.getByRole('alert').getByRole('option', { name: 'Shopfronts display' }).click();
  await page.locator('div').filter({ hasText: 'Licence type: Shopfronts' }).nth(5).click();
  
  await page.getByRole('textbox', { name: 'Proposed licence start date: *' }).fill('01/02/2026');

  await page.getByRole('spinbutton', { name: 'Number of people seated *' }).fill('12');
  await page.locator('#form3 > div:nth-child(2) > div').first().click();
  await expect(page.locator('#form3 > div:nth-child(2) > div').first()).toBeVisible();
  await page.getByRole('button', { name: '0' }).nth(2).click();
  await page.getByRole('alert').getByRole('option', { name: '12' }).click();
  await page.getByRole('button', { name: 'Width' }).first().click();
  await page.getByRole('alert').getByRole('option', { name: '2.2m', exact: true }).click();
  await page.getByRole('button', { name: 'Depth' }).first().click();
  await page.getByRole('alert').getByRole('option', { name: '2.2m', exact: true }).click();
  await page.locator('input[name="tc_waddress_1"]').click();
  await page.locator('input[name="tc_waddress_1"]').fill('Bethnal Green Road');
  await page.getByRole('button', { name: 'Width' }).first().click();
  await page.getByRole('alert').getByRole('option', { name: '2.2m', exact: true }).click();
  await page.getByRole('button', { name: 'Depth' }).first().click();
  await page.getByRole('alert').getByRole('option', { name: '2.2m', exact: true }).click();
  await page.pause();
  await page.locator('input[name="tc_waddress_2"]').fill('Bethnal Green Road');
  await page.getByRole('button', { name: 'Width' }).nth(1).click();
   await page.getByRole('alert').getByRole('option', { name: '2.2m', exact: true }).click();
     await page.getByRole('button', { name: 'Depth' }).nth(1).click();
    await page.getByRole('alert').getByRole('option', { name: '2.2m', exact: true }).click();
  await page.locator('input[name="fc_waddress_1"]').fill('Bethnal Green Road');
  await page.getByRole('spinbutton', { name: 'Total distance of kerb edge' }).click();
  await page.getByRole('spinbutton', { name: 'Total distance of kerb edge' }).fill('4');
  await page.getByRole('textbox', { name: 'Goods to be displayed' }).click();
  await page.getByRole('textbox', { name: 'Goods to be displayed' }).fill('Test Goods');
  await page.locator('#defautLicenceLength').getByText('No', { exact: true }).click();
  await page.getByRole('button', { name: 'Add declaration' }).click();
  await page.getByRole('checkbox', { name: 'I have read and understood' }).check();
  await page.getByRole('textbox', { name: 'Full Name *' }).click();
  await page.getByRole('textbox', { name: 'Full Name *' }).fill('Full Name');
  await page.getByRole('button', { name: 'Add Declaration', exact: true }).click();
   await page.pause();
  await page.getByRole('button', { name: 'Pay and submit' }).click();
  
  // await makePayment(page);
  // await page.getByText('Validation required', { exact: true }).waitFor({ state: 'visible', timeout: 30000 });
  // await expect(page.getByText('Validation required', { exact: true })).toBeVisible();

  // console.log(page.url());

  // await thmLicenceApproval(page);

  
});