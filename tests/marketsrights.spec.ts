import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

test('test', async ({ page }) => {
await page.goto('https://mcc-markets-live.farthestgate.co.uk/sf/control/application?code=mar_rights');
await page.getByRole('textbox', { name: 'Email' }).fill('frant_ofis_test+mcc_dipa2@outlook.com');
await page.getByRole('textbox', { name: 'Password' }).fill('Dipa123!');
await page.getByRole('button', { name: 'Submit' }).click();
await page.goto('https://mcc-markets-live.farthestgate.co.uk/sf/control/application?code=mar_rights');
await page.getByRole('group', { name: 'Have you or your business/' }).getByLabel('Yes').check();
await page.getByRole('textbox', { name: 'Please provide brief details' }).fill('Previous Market Details');
await page.getByRole('radio', { name: 'Car boot sale (can include' }).check();
await page.getByRole('textbox', { name: 'Name of your market *' }).fill('Flower Market');
//await page.getByRole('radio', { name: 'Market (can include car boot and tabletop sales where sellers are traders)' }).check();

await page.getByRole('combobox', { name: 'Please select what' }).click();
await page.locator('a').filter({ hasText: 'Street food' }).click();
await page.getByRole('combobox', { name: 'Please select what' }).click();
await page.locator('a').filter({ hasText: 'Hot and soft drinks' }).click();
await page.getByRole('paragraph').filter({ hasText: 'Street food' }).click();
await expect(page.getByRole('paragraph').filter({ hasText: 'Street food' })).toBeVisible();
await page.getByRole('paragraph').filter({ hasText: 'Hot and soft drinks' }).click();



await page.getByRole('group', { name: 'Will there be alcohol sold on the market?' }).getByLabel('Yes').check();
await page.getByRole('group', { name: 'Do you have a premises licence or temporary event notice' }).getByLabel('Yes').check();
await page.getByRole('textbox', { name: 'Please enter the Premises licence or temporary event notice number *' }).fill('PNoticeNum');


//await page.getByRole('textbox', { name: 'Please explain how the items' }).fill('Gift items');
//await page.getByRole('textbox', { name: 'Please give the address where' }).fill('Address of the out of hours storage');
await page.getByRole('textbox', { name: 'Start Date' }).fill('01/02/2025');
await page.getByRole('textbox', { name: 'End Date' }).fill('20/02/2025');
await page.getByRole('textbox', { name: 'Start Hour' }).fill('10:00');
await page.getByRole('textbox', { name: 'End Hour' }).fill('19:00');
await page.getByRole('spinbutton', { name: 'What is the capacity of your' }).fill('50');
//await page.getByRole('spinbutton', { name: 'How many of these trading' }).click();
await page.getByRole('spinbutton', { name: 'How many of these trading' }).fill('100');

await page.getByRole('checkbox', { name: 'Demountable stalls' }).check();
await page.getByRole('checkbox', { name: 'Stands' }).check();
await page.getByRole('checkbox', { name: 'Vehicles' }).check();

// Use setInputFiles directly. Playwright will find the hidden input element
const path = require('path');

const filePath = path.join(__dirname, 'check.png');

// Set the file in the input
await page.setInputFiles('#layout_plan_input', filePath);

// Manually trigger the 'change' event in case the page relies on it
await page.evaluate(() => {
const input = document.querySelector('#layout_plan_input');
if (input) {
const event = new Event('change', { bubbles: true });
input.dispatchEvent(event);
}
});




await page.getByRole('button', { name: 'Upload', exact: true }).click();

await page.getByRole('textbox', { name: 'What is the charge to rent a' }).fill('200');
await page.getByRole('checkbox', { name: 'Commercial' }).check();
//await page.getByRole('checkbox', { name: 'Other (Please specifiy)' }).check();
// await page.getByRole('textbox', { name: 'Other natures of market *' }).fill('Private event');
await page.getByRole('textbox', { name: 'Please provide more details about the purpose' }).fill('purpose and benifits');
await page.getByRole('group', { name: 'Is your market part of a' }).getByLabel('No').check();
await page.pause();
await page.getByRole('button', { name: 'Search for address' }).click();
await page.getByRole('textbox', { name: 'Postcode lookup' }).fill('m1 1db');

await page.getByRole('button', { name: 'Search postcode' }).isVisible();
await page.getByRole('button', { name: 'Search postcode' }).click();


// Wait until the address text changes from the default
const modal1 = page.locator('.modal-dialog.modal-md');
const addressDropdown = modal1.locator('.filter-option.pull-left');

// Wait until the text changes from "Select Address"
await expect(addressDropdown).not.toHaveText('Select Address');



// Using a more robust selector for the "Select address" button in the modal
// Wait for the modal to be visible
await page.waitForSelector('.modal-dialog.modal-md', { state: 'visible' });
const modal = page.locator('.modal-dialog.modal-md');
const selectAddressButton = modal.locator('.modal-footer >> text=Select address');
await expect(selectAddressButton).toBeVisible();
await selectAddressButton.click();




await page.getByRole('checkbox', { name: 'In a pedestrianised street' }).check();
await page.getByRole('group', { name: 'Will there be any other' }).getByLabel('No').check();
await page.getByRole('group', { name: 'Are there any customer entry' }).getByLabel('No').check();
// This was checking No then Yes immediately. I've kept only the final intended state.
await page.getByRole('group', { name: 'Do you own the premises where' }).getByLabel('Yes').check();
await page.getByRole('group', { name: 'Do you have any other' }).getByLabel('No').check();
await page.getByRole('group', { name: 'Have you undertaken any' }).getByLabel('No').check();
await page.getByRole('group', { name: 'Is the market due to take' }).getByLabel('Yes').check();
await page.getByRole('group', { name: 'Is there any other' }).getByLabel('No').check();
//await page.locator('//div[@id="formbuilder-1_panel_2"]//input[@type="checkbox" and @value="Yes"]').check()
//await page.getByRole('checkbox', { name: 'Yes' }).check(); //terms and conditions
await expect(page.getByText('Please confirm you have read')).toBeVisible();
await expect(page.getByRole('checkbox', { name: 'Yes' })).toBeVisible();
await page.getByRole('checkbox', { name: 'Yes' }).check();

await page.getByRole('button', { name: 'Add Declaration' }).click();
await page.getByRole('group', { name: 'I agree' }).getByLabel('Yes').check();
await page.locator('#btnSave').click();
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.getByRole('document', { name: 'Status: Validation required' })).toBeVisible();
});