import { test, expect } from '@playwright/test';
import { makeWccPayment } from '../pages/wccCardPayment';

test('test', async ({ page }) => {
await page.goto('https://testwccmarkets.farthestgate.co.uk/sf/control/pavementapplication');
await page.getByRole('textbox', { name: 'Email' }).fill('frant_ofis_test+normal_user_88@outlook.com');
await page.getByRole('textbox', { name: 'Password' }).fill('Dipa123!');
await page.getByRole('button', { name: 'Submit' }).click();

await page.goto('https://testwccmarkets.farthestgate.co.uk/sf/control/pavementapplication');
await page.getByRole('button', { name: 'confirm' }).first().click();

await page.getByRole('checkbox', { name: 'Please select how you intend' }).check();
await page.getByRole('checkbox', { name: 'Displaying/Placing of food or' }).check();

await page.getByRole('spinbutton', { name: 'Number of people seated *' }).click();
await page.getByRole('spinbutton', { name: 'Number of people seated *' }).fill('20');
await page.getByRole('button', { name: '0' }).nth(1).click();
await page.getByRole('alert').getByRole('option', { name: '20' }).click();

await page.locator('#timed_road_closure_no').check();
await page.locator('#different_business_no').check();
await page.locator('#business_consent_no').check();
await page.getByRole('button', { name: 'Width' }).first().click();
await page.getByRole('button', { name: 'Depth' }).first().click();
await page.getByRole('alert').getByRole('option', { name: '2.5m', exact: true }).click();
await page.getByRole('button', { name: 'Width' }).first().click();
await page.getByRole('alert').getByRole('option', { name: '2.9m', exact: true }).click();
await page.getByRole('button', { name: 'Width' }).click();
await page.getByRole('alert').getByRole('option', { name: '3.0m', exact: true }).click();
await page.getByRole('button', { name: 'Depth' }).click();
await page.getByRole('alert').getByRole('option', { name: '4.3m', exact: true }).click();
await page.locator('#covid').getByText('No', { exact: true }).click();

await page.locator('#place_of_storage').click();
await page.locator('#place_of_storage').fill('test place of storage');
await page.locator('#place_of_storage_size').click();
await page.locator('#place_of_storage_size').fill('10');
await page.locator('#minimum-clear').getByText('No', { exact: true }).click();
await page.locator('div:nth-child(2) > .panel-body').click();
await page.getByText('Traffic management Please').click();
await page.locator('#minimum-clear-checkbox').check();

await page.locator('#no-obstruction .toggle-handle').click();
await page.locator('#no-obstruction-furn .toggle-handle').click();

await page.locator('#tc_data_protection1').locator('xpath=following-sibling::div//span[contains(@class,"toggle-handle")]').click();
await page.getByRole('button', { name: 'Add declaration' }).click();
await page.getByRole('checkbox', { name: 'Confirm you have permission' }).check();
await page.getByRole('textbox', { name: 'Confirm name' }).click();
await page.getByRole('textbox', { name: 'Confirm name' }).fill('test full name');
await page.getByRole('textbox', { name: 'Confirm name' }).press('Tab');
await page.getByRole('textbox', { name: 'Confirm company name' }).fill('test company');
await page.getByRole('textbox', { name: 'Confirm company name' }).press('Tab');
await page.getByRole('textbox', { name: 'Confirm your position' }).fill('position in company');
await page.getByRole('button', { name: 'Add Declaration', exact: true }).click();

const payButton = page.getByRole('button', { name: 'Pay & Submit' });
await payButton.waitFor({ state: 'attached' });
await payButton.click(); // trigger navigation

await makeWccPayment(page);

await expect(page.getByText('Validation required')).toBeVisible({ timeout: 50000 });
console.log(page.url());


});