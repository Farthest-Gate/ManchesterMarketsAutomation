import { test, expect } from '@playwright/test';
import { makePayment } from '../pages/thmCardPayment';

test('test', async ({ page }) => {
// await page.goto('https://lbth-markets-test.farthestgate.co.uk/sf/control/dashboard');
// await page.getByRole('textbox', { name: 'Email' }).click();
// await page.getByRole('textbox', { name: 'Email' }).fill('frant_ofis_test+normal_user_88@outlook.com');
await page.goto('https://10.4.49.4:7443/sf/control/login');
  
  await page.getByRole('textbox', { name: 'Email' }).fill('frant_ofis_test+normal_user_71@outlook.com');
await page.getByRole('textbox', { name: 'Password' }).fill('Dipa123!');
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByRole('button', { name: 'Licence application' }).click();
await page.getByRole('link', { name: 'Casual trader licence' }).click();
//await page.getByText('No').first().click();
await page.getByRole('button', { name: 'confirm' }).first().click();


await page.getByRole('textbox', {name: 'Application start date'}).click();
await page.getByRole('textbox', {name: 'Application start date'}).fill('01/01/2026');
await page.getByRole('textbox', { name: 'Please select your date of' }).click();

await page.getByRole('textbox', { name: 'Please select your date of' }).fill('01/01/2006');
await page.getByRole('button', { name: 'Commodities' }).click();
await page.getByRole('alert').getByRole('option', { name: 'Mens Outerwear' }).click();
await page.getByRole('button', { name: 'Please select a commodity' }).click();
await page.getByRole('alert').getByRole('option', { name: 'Mens Outerwear' }).click();
await page.getByRole('textbox', { name: 'Please explain how the items' }).click();
await page.getByRole('textbox', { name: 'Please explain how the items' }).fill('test test');
await page.getByRole('textbox', { name: 'Please give the address where' }).click();
await page.getByRole('textbox', { name: 'Please give the address where' }).fill('test');
await page.getByRole('textbox', { name: 'Please list the products/menu' }).click();
await page.getByRole('textbox', { name: 'Please list the products/menu' }).fill('test');
await page.getByRole('textbox', { name: 'Vehicle Registration' }).click();
await page.getByRole('textbox', { name: 'Vehicle Registration' }).fill('TESt');
await page.getByRole('textbox', { name: 'Vehicle Registration' }).press('Tab');
await page.getByRole('textbox', { name: 'Driving Licence' }).fill('test');
await page.getByRole('textbox', { name: 'Driving Licence' }).press('Tab');
await page.getByRole('textbox', { name: 'Vehicle Make' }).fill('test');
await page.getByRole('textbox', { name: 'Vehicle Make' }).press('Tab');
await page.getByRole('textbox', { name: 'Vehicle Model' }).fill('test');
await page.getByRole('button', { name: 'Add vehicle' }).click();
await page.getByText('No', { exact: true }).nth(3).click();
await page.getByRole('button', { name: 'Add declaration' }).click();
await page.getByRole('checkbox', { name: 'Confirmation *', exact: true }).check();
await page.getByRole('checkbox', { name: 'Confirmation **' }).check();
await page.getByRole('button', { name: 'Add Declaration', exact: true }).click();
await page.getByRole('button', { name: 'Pay & submit' }).click();
await page.pause();

//await makePayment(page);


//await page.getByText('Validation required', { exact: true }).waitFor({ state: 'visible', timeout: 30000 });
//await expect(page.getByText('Validation required', { exact: true })).toBeVisible();

//console.log(page.url());

});