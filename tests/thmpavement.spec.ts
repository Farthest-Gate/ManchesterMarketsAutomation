import { test, expect } from '@playwright/test';
import { makePayment } from '../pages/thmCardPayment';
import { thmLicenceApproval } from '../pages/thmBOApproval';

test('test', async ({ page }) => {

    await page.goto('https://10.4.49.4:7443/sf/control/login');
  
  await page.getByRole('textbox', { name: 'Email' }).fill('frant_ofis_test+normal_user_71@outlook.com');
// await page.goto('https://lbth-markets-test.farthestgate.co.uk/sf/control/dashboard');
// await page.getByRole('textbox', { name: 'Email' }).click();
// await page.getByRole('textbox', { name: 'Email' }).fill('frant_ofis_test+d2603@outlook.com');

await page.getByRole('textbox', { name: 'Password' }).fill('Dipa123!');
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByRole('button', { name: 'Licence application' }).click();
await page.getByRole('link', { name: 'Pavement licence' }).click();
await page.getByRole('button', { name: 'confirm' }).first().click();

await page.getByRole('textbox', { name: 'All correct on date of' }).click();
await page.getByRole('textbox', { name: 'All correct on date of' }).fill('01/02/2026');
await page.getByText('validate inputs Application').click();
await page.getByRole('checkbox', { name: 'Please select how you intend' }).check();
await page.getByRole('checkbox', { name: 'Displaying/Placing of food or' }).check();
await page.getByRole('spinbutton', { name: 'Number of people seated *' }).click();
await page.getByRole('spinbutton', { name: 'Number of people seated *' }).fill('22');
await page.getByRole('button', { name: '0' }).nth(3).click();
await page.getByRole('alert').getByRole('option', { name: '18' }).click();
await page.getByRole('button', { name: '0', exact: true }).click();
await page.getByRole('alert').getByRole('option', { name: '4', exact: true }).click();
await page.getByRole('button', { name: 'Width' }).click();
await page.getByRole('alert').getByRole('option', { name: '2.5m', exact: true }).click();
await page.getByRole('button', { name: 'Depth' }).click();
await page.getByRole('alert').getByRole('option', { name: '2.5m', exact: true }).click();
await page.locator('input[name="footpath_area"]').click();
await page.locator('input[name="footpath_area"]').fill('Chrisp Street');
await page.locator('#minimum-clear').getByText('No', { exact: true }).click();
await page.locator('#no-obstruction').getByText('No', { exact: true }).click();
await page.locator('#tm_no_details').click();
await page.locator('#tm_no_details').fill('details');
await page.locator('.col-xs-6 > .form-group > .toggle').first().click();
await page.getByRole('button', { name: 'Add declaration' }).click();
await page.getByRole('checkbox', { name: 'Confirm you have permission' }).check();
await page.getByRole('textbox', { name: 'Confirm name' }).click();
await page.getByRole('textbox', { name: 'Confirm name' }).fill('Test full name');
await page.getByRole('textbox', { name: 'Confirm name' }).press('Tab');
await page.getByRole('textbox', { name: 'Confirm company name' }).fill('Test company Name');
await page.getByRole('textbox', { name: 'Confirm your position' }).click();
await page.getByRole('textbox', { name: 'Confirm your position' }).fill('Test Position');
await page.getByRole('button', { name: 'Add Declaration', exact: true }).click();
await page.getByRole('button', { name: 'Pay & Submit' }).click();
await page.pause();
// await makePayment(page);

// await page.getByText('Validation required', { exact: true }).waitFor({ state: 'visible', timeout: 30000 });
// await expect(page.getByText('Validation required', { exact: true })).toBeVisible();

// console.log(page.url());

// await thmLicenceApproval(page);


});