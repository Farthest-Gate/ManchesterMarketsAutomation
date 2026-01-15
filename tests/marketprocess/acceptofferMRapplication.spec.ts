import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mcc-markets-live.farthestgate.co.uk/sfbo/control/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('dipashah');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Dipa123!');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Licences - Live' }).click();
  await page.getByRole('alert').getByRole('option', { name: 'Licences - Awaiting payment' }).click();
  await page.getByRole('gridcell', { name: 'Markets rights' }).click();
  await page.getByRole('gridcell', { name: 'Application date: activate to' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'View' }).first().click();
    const page1 = await page1Promise;
    await page1.pause();
   let sfbourl = page1.url();
   console.log(sfbourl);
  let sfurl = sfbourl.replace("/sfbo/","/sf/");

 
     await page1.goto(sfurl);
  console.log(sfurl);

  // let sfbourl= "https://wcc-licensing-staging.farthestgate.co.uk/sfbo/control/login";
  //  let sfbourl1= "https://wcc-licensing-staging.farthestgate.co.uk/sfbo/control/viewapplication?oid=LICO78042";
  //await page.goto(sfbourl, { waitUntil: 'domcontentloaded' });
 
  //await page1.goto('https://mcc-markets-live.farthestgate.co.uk/sf/control/viewapplication?oid=LICO51451');
  await page1.pause();
  await page1.getByRole('textbox', { name: 'Email' }).click();
  await page1.getByRole('textbox', { name: 'Email' }).fill('frant_ofis_test+mcc_dipa2@outlook.com');
  await page1.getByRole('textbox', { name: 'Password' }).fill('Dipa123!');
  await page1.getByRole('button', { name: 'Submit' }).click();
  await page1.getByRole('button', { name: 'Pay outstading fee' }).click();
  await page1.getByRole('checkbox', { name: 'I accept the terms and' }).check();
  await page1.getByRole('button', { name: 'Submit' }).click();

  await page1.getByRole('textbox', { name: 'Name on card' }).isVisible({ timeout: 100000 });
  await page1.getByRole('textbox', { name: 'Name on card' }).fill('Dipa Shah');
  await page1.getByRole('textbox', { name: 'Card number' }).isVisible();
  await page1.getByRole('textbox', { name: 'Card number' }).fill('4929000000006');
  await page1.getByRole('textbox', { name: 'CVC number This is the 3 or 4' }).click();
  await page1.getByRole('textbox', { name: 'CVC number This is the 3 or 4' }).fill('123');
  await page1.getByRole('textbox', { name: 'Email address' }).click();
  await page1.getByRole('textbox', { name: 'Email address' }).fill('frant_ofis_test+mcc_dipa2@outlook.com');
    await page1.getByRole('button', { name: 'Pay Now' }).isVisible();
  await page1.getByRole('button', { name: 'Pay Now' }).click();
  await page1.getByRole('button', { name: 'Pay Now' }).isVisible();
  //await page1.getByText('We are processing your').click();
  await page1.locator('h1').isVisible();
  await expect(page1.locator('h1')).toContainText('Payment');
  await expect(page1.locator('#container')).toContainText('Thank you for your payment');
  await expect(page1.locator('#container')).toContainText('To Application');
  await page1.getByRole('link', { name: 'To Application' }).click();
  await expect(page1.getByText('Status', { exact: true })).toBeVisible();
  await expect(page1.getByLabel('Status: Preapproval')).toContainText('Preapproval');
});