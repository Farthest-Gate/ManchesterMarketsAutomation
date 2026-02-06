import { test } from '@playwright/test';
import { LoginPage } from '../../lib/pages/login.page';
import { MarketApplicationPage } from '../../lib/pages/marketApplicationPage';
import { expect } from '@playwright/test';
import { AddressModalPage } from '../../lib/pages/addressModalPage';
import {marketApplicationData} from '../../lib/datafactory/marketApplicationData';
import {userData} from '../../lib/datafactory/userData';
import path from 'path';

let savedBOUrl: string;
let savedCustomerUrl: string;

test('Create markets rights application', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(userData.email, userData.password);

    const marketPage = new MarketApplicationPage(page);
    const addressModal = new AddressModalPage(page);

    await marketPage.open();
    await page.waitForLoadState('networkidle');
    //Visual test for form fields
    //await expect(page).toHaveScreenshot('market-rights-application-form.png', {fullPage: true});

    await marketPage.fillPreviousMarketDetails();

    await marketPage.selectMarketType(marketApplicationData.marketDetails.marketType);
    await marketPage.setMarketName(marketApplicationData.marketDetails.marketname);
    await marketPage.selectCommodities(marketApplicationData.marketDetails.commodity1, marketApplicationData.marketDetails.commodity2);
    await marketPage.verifySelectedCommodities(marketApplicationData.marketDetails.commodity1, marketApplicationData.marketDetails.commodity2);
   // await marketPage.alcoholDetails(marketApplicationData.marketDetails.premiseNumber);
    await marketPage.marketTimings(marketApplicationData.timings);

    await marketPage.marketCapacity(marketApplicationData.marketDetails);    
    await marketPage.selectTypeofSpace(marketApplicationData.marketDetails.stallTypes);

    const filePath = path.join(__dirname, '../../data/check.png');
    await marketPage.uploadLayoutPlan(filePath);
   
    await marketPage.tradingSpaceRent(marketApplicationData.marketDetails);   
    await marketPage.selectNatureofMarket(marketApplicationData.marketDetails.natureOfMarket);
    await marketPage.purposeAndBenifits(marketApplicationData.marketDetails);
    await addressModal.marketAddress(marketApplicationData.address.postcode);
    await marketPage.marketLocation(marketApplicationData.marketDetails.location)
    await marketPage.otherActivitiesAndChageables();
    await marketPage.otherPermissions();
    await marketPage.confirmTermsAndConditions(marketApplicationData.marketDetails.terms);
    await marketPage.submitApplication();
    //await page.waitForLoadState('networkidle');
    //await page.pause();
    await expect(page.getByLabel('Status: Validation required')).toBeVisible();
    const currentURL = page.url();
    console.log(currentURL);
    savedCustomerUrl = currentURL;

    const replaceToBO = currentURL.replace("/sf/", "/sfbo/");
    console.log(replaceToBO);
    savedBOUrl = replaceToBO;
});

test('BO send offer', async ({ page }) => {
await page.goto(savedBOUrl);
await page.getByRole('textbox', { name: 'Username' }).fill('dipashah');
await page.getByRole('textbox', { name: 'Password' }).fill('Dipa123!');
await page.getByRole('button', { name: 'Submit' }).click();

await page.getByRole('button', { name: 'Change status' }).click();
await page.getByRole('alert').getByRole('option', { name: 'Preapproval' }).click();
await page.getByRole('button', { name: 'Update Status' }).click();
await page.getByRole('textbox', { name: 'Please provide your' }).click();
await page.getByRole('textbox', { name: 'Please provide your' }).fill('Email text to test');
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.getByText('Status', { exact: true })).toBeVisible();
await expect(page.getByLabel('Status: Awaiting Payment')).toContainText('Awaiting Payment');
const currentBOURL = page.url();
console.log(currentBOURL);

});

test.skip('Customer accepts the offer', async ({ page }) => {
  await page.goto(savedCustomerUrl);
 await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('frant_ofis_test+mcc_dipa2@outlook.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Dipa123!');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Pay outstading fee' })).toBeVisible();
  await page.getByRole('button', { name: 'Pay outstading fee' }).click();
  const modal = page.locator('.modal-body');

await modal.locator('#formbuilder-1_panel_1_component_0_accept_terms_accepted_0').check();
await modal.locator('#formbuilder-1_panel_1_component_0_accept_terms_accepted_draft_1').check();
await page.getByRole('button', { name: 'Submit' }).click();


  await page.getByRole('textbox', { name: 'Name on card' }).isVisible({ timeout: 140000 });
  await page.getByRole('textbox', { name: 'Name on card' }).fill('Dipa Shah');
  await page.getByRole('textbox', { name: 'Card number' }).isVisible();
  await page.getByRole('textbox', { name: 'Card number' }).fill('4929000000006');
  await page.getByRole('textbox', { name: 'CVC number This is the 3 or 4' }).click();
  await page.getByRole('textbox', { name: 'CVC number This is the 3 or 4' }).fill('123');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('frant_ofis_test+mcc_dipa2@outlook.com');
  await page.getByRole('button', { name: 'Pay Now' }).isVisible();
  await page.getByRole('button', { name: 'Pay Now' }).click();
  await page.getByRole('button', { name: 'Pay Now' }).isVisible();
 
  await page.locator('h1').isVisible();
  await expect(page.locator('h1')).toContainText('Payment');
  await expect(page.locator('#container')).toContainText('Thank you for your payment');
  await expect(page.locator('#container')).toContainText('To Application');
  await page.getByRole('link', { name: 'To Application' }).click();
  await expect(page.getByText('Status', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Status: Preapproval')).toContainText('Preapproval');
});

test('Customer Declines the offer', async ({ page }) => {
  await page.goto(savedCustomerUrl);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('frant_ofis_test+mcc_dipa2@outlook.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Dipa123!');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Pay outstading fee' })).toBeVisible();
  await page.getByRole('button', { name: 'Pay outstading fee' }).click();
  await page.getByRole('checkbox', { name: 'accept_terms' }).first().check();
  await page.getByTitle("I have read and accept the terms and conditions of the draft market rights licence").check();
  await page.getByRole('button', { name: 'Decline' }).click();

  

  await expect(page.getByLabel('Status: Withdrawn')).toContainText('Withdrawn');
});