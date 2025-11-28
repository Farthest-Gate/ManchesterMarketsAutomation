import { test, expect } from '@playwright/test';
import { makeWccPayment } from '../pages/wccCardPayment';
import { licenceApproval } from '../pages/wccBOApproval';

test('test', async ({ page }) => {
  await page.goto('/sf/control/login');
  await page.getByRole('textbox', { name: 'Email' }).fill(process.env.EMAIL!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.goto('/sf/control/marketapplication');
  

  await page.getByRole('button', { name: 'confirm' }).first().click();

  await page.getByRole('textbox', { name: 'I wish for the licence to' }).fill('01/01/2026');

  await page.getByRole('textbox', { name: 'End date' }).fill('12/12/2026');
  await page.getByLabel('Applicant is over').getByText('Yes').click();
  await page.getByRole('group', { name: 'Did you start this business' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Are you currently trading at' }).getByLabel('No').check();
  await page.getByRole('radio', { name: 'Neither' }).check();
  await page.getByRole('combobox', { name: 'Where do you wish to trade? *' }).click();
  await page.locator('a').filter({ hasText: 'Market - Maida Hill W9' }).click();
  await page.getByRole('checkbox', { name: 'Mon' }).check();
  await page.getByRole('combobox', { name: 'Select the pitch you wish to trade on' }).click();

  await page.locator('li[role="option"]:visible').first().click();
  //await page.locator('a').filter({ hasText: '1160' }).click();
  await page.getByRole('group', { name: 'Do you hold any other' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Have you ever had a licence' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Have you ever surrendered' }).getByLabel('No').check();
  await page.getByRole('button', { name: 'Commodities' }).click();
  await page.getByRole('alert').getByRole('option', { name: 'Clothing and accessories' }).click();
  await page.getByRole('button', { name: 'Please select a commodity' }).click();
  await page.getByRole('alert').getByRole('option', { name: 'Childrens clothing and' }).click();
  await page.getByRole('button', { name: 'Clothing and accessories' }).click();
  await page.getByRole('alert').getByRole('option', { name: 'Exhibition commodities' }).click();
  await page.getByRole('button', { name: 'Please select a commodity' }).click();
  await page.getByRole('alert').getByRole('option', { name: 'Sell own art' }).click();
  await page.getByRole('textbox', { name: 'Please explain how the items' }).click();
  await page.locator('div').filter({ hasText: /^Please explain how the items are unique and special$/ }).click();
  await page.locator('div').filter({ hasText: /^Please explain how the items are unique and special$/ }).click();
  await page.getByRole('textbox', { name: 'Please explain how the items' }).fill('Please explain how the items are unique and special');
  await page.getByRole('textbox', { name: 'Please give the address where' }).click();
  await page.getByRole('textbox', { name: 'Please give the address where' }).fill('Address - out of hours storage');
  await page.getByRole('textbox', { name: 'Please list the products/menu' }).click();
  await page.getByRole('textbox', { name: 'Please list the products/menu' }).fill('Kids Clothing');
  /* 
  //Add Assistant
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).fill('First Name Assistant');
  await page.getByRole('textbox', { name: 'Last name *' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).fill('Last Name Assistant');
  await page.getByRole('textbox', { name: 'National insurance number:' }).click();
  await page.getByRole('textbox', { name: 'National insurance number:' }).fill('ni10110101010');
  await page.getByRole('textbox', { name: 'National insurance number:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'National insurance number:' }).fill('ng042345');
  await page.getByRole('textbox', { name: 'National insurance number:' }).press('Tab');
  await page.getByRole('textbox', { name: 'Date of birth *' }).fill('20/02/2000');
  await page.getByRole('textbox', { name: 'Search market assistant by' }).click();
  await page.getByRole('textbox', { name: 'Search market assistant by' }).fill('nw91gg');
  await page.getByRole('button', { name: ' Search postcode' }).click();
  await page.getByRole('textbox', { name: 'Search market assistant by' }).click();
  await page.getByRole('textbox', { name: 'Search market assistant by' }).click();
  await page.getByRole('textbox', { name: 'Search market assistant by' }).click();
  await page.getByRole('textbox', { name: 'Search market assistant by' }).fill('');
  await page.getByRole('dialog', { name: 'Postcode missing' }).nth(1).click();
  await page.getByRole('dialog', { name: 'Postcode missing' }).click();
  await page.getByRole('textbox', { name: 'Search market assistant by' }).click();
  await page.getByRole('textbox', { name: 'Search market assistant by' }).fill('ha3oue');
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  */
  await page.locator('.toggle.btn.btn-danger').first().click();
  await page.getByRole('button', { name: 'Add declaration' }).click();
  await page.getByRole('checkbox', { name: 'I confirm the information I' }).check();
  await page.getByRole('checkbox', { name: 'Confirmation *' }).check();
  await page.getByRole('button', { name: 'Add Declaration', exact: true }).click();
  const payButton = page.getByRole('button', { name: 'Pay & Submit' });
  await payButton.waitFor({ state: 'attached' });
  await payButton.click(); // trigger navigation
  await makeWccPayment(page);
  await expect(page.getByText('Validation required')).toBeVisible({ timeout: 50000 });
  console.log(page.url());

  await licenceApproval(page);
});