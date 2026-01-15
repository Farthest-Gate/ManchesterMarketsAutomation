import {Page, expect} from '@playwright/test'

export async function makePayment(page: Page) {
  await page.locator('#scp_cardPage_cardNumber_input').waitFor({ state: 'visible', timeout: 60000});
  await page.locator('#scp_cardPage_cardNumber_input').fill('4242424242424242');
  
  await page.locator('#scp_cardPage_expiryDate_input').fill('12');      // Month
  await page.locator('#scp_cardPage_expiryDate_input2').fill('29');     // Year
  await page.locator('#scp_cardPage_csc_input').fill('123');            // Security Code
  
  await page.locator('#scp_cardPage_buttons_continue_button').click();
  
  
  
  // Wait for the button to be visible and clickable
  await page.locator('#scp_view_inner').waitFor({ state: 'visible', timeout: 60000 });
  
  const continueButton = page.locator('#scp_tdsv2AdditionalInfoPage_buttons_continue_button');
  await continueButton.waitFor({ state: 'visible', timeout: 60000 }); // wait up to 60s
  await continueButton.click({force: true});
  
  
  await expect(page.getByRole('button', { name: 'Make PaymentButton' })).toBeVisible({ timeout: 100000 });
  await page.getByRole('button', { name: 'Make PaymentButton' }).click();
  // Wait for the iframe to appear and get its frame
  const frameHandle = await page.frameLocator('iframe[title="3D-Secure Authentication"]');
  
  // Wait for the button inside the iframe to be visible and enabled
  const authButton = frameHandle.getByRole('button', { name: 'Authenticated', exact: true });
  
  await Promise.all([
  page.waitForURL('**/scp/flow/start_flow**', { timeout: 120000 }), // wait for the redirect URL pattern
  authButton.click({ force: true }) // click triggers the navigation
  ]);
  const toAppLink = page.getByRole('link', { name: 'To Application' });
  page.pause();
  toAppLink.click();
  

}