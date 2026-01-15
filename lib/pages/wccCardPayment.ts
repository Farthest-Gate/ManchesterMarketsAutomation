import {Page,expect} from '@playwright/test'

export async function makeWccPayment(page: Page) 
{

const cardNum = page.getByRole('textbox', { name: 'Card Number' });
await cardNum.waitFor({ state: 'attached', timeout: 30000 });
await cardNum.fill('4242 4242 4242 4242');
const expiry = page.getByRole('textbox', { name: 'Expiry' });
await expiry.waitFor({ state: 'attached', timeout: 30000 });
await expiry.fill('05/29');

const cscNum= page.getByRole('textbox', { name: 'CSC' });
await cscNum.waitFor({ state: 'attached', timeout: 30000 });
await cscNum.fill('777');

const cardName = page.getByRole('textbox', { name: 'Name On Card' });
await cardName.waitFor({ state: 'attached', timeout: 30000 });
await cardName.fill('Test Card');



const processButton = page.locator('#process');
await processButton.waitFor({ state: 'visible', timeout: 30000 }); // wait until interactable
await processButton.click();

// Wait for Authenticate button by text

// Wait for the ACS challenge window to appear
const challengeWindow = page.locator('#challengeWindow');
await challengeWindow.waitFor({ state: 'visible', timeout: 30000 });
// Now find the Authenticate button inside the window
const authenticateButton = challengeWindow.locator('button', { hasText: 'Authenticate' });
await authenticateButton.waitFor({ state: 'visible', timeout: 30000 });

// Click it
await authenticateButton.click();



const coninuetoPage = page.locator('button', { hasText: 'Continue to Westminster City'});
await coninuetoPage.waitFor({ state: 'visible', timeout: 30000 });
await coninuetoPage.click();

const toApplication = page.getByRole('link', { name: 'To Application' });
await toApplication.waitFor({ state: 'visible', timeout: 30000 });
await toApplication.click();
}