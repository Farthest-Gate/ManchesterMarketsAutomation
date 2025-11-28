import {Page, expect } from '@playwright/test';

export async function licenceApproval(page: Page) {

 let sfurl = page.url();
  let sfbourl = sfurl.replace("/sf/","/sfbo/");
  await page.goto(sfbourl);
  console.log(sfbourl);

  // let sfbourl= "https://wcc-licensing-staging.farthestgate.co.uk/sfbo/control/login";
  //  let sfbourl1= "https://wcc-licensing-staging.farthestgate.co.uk/sfbo/control/viewapplication?oid=LICO78042";
  await page.goto(sfbourl, { waitUntil: 'domcontentloaded' });
  await page.getByRole('textbox', { name: 'USERNAME' }).fill(process.env.BOEMAIL!);
  await page.getByRole('textbox', { name: 'PASSWORD' }).fill(process.env.BOPASSWORD!);
  await page.getByRole('button', { name: 'Submit' }).click();
// Wait for navigation AFTER submit instead of calling goto again
await page.goto(sfbourl, { waitUntil: 'domcontentloaded' });



// Make sure we’re on the correct page/state first
await page.getByRole('button', { name: '4' }).click();

// If the UI requires opening a status panel/dropdown, do that:
await page.getByRole('button', { name: 'Status', exact: true}).click();

// Use the accessible combobox instead of the raw #status_select
const statusCombobox = page.getByRole('combobox', { name: 'Status' });
await expect(statusCombobox).toBeVisible();

// Now select by visible label
await statusCombobox.selectOption({ label: 'Approved' });

// Update
await page.getByRole('button', { name: 'Update status' }).click();
await page.getByRole('button', { name: 'Confirm', exact: true}).click();
await expect(page.getByRole('heading', { name: 'Application details' })).toBeVisible();
await page.waitForLoadState('networkidle');
const status = page.locator('.application_modal_status').first();
await expect(status).toHaveText(/Approved\s*-\s*Live/);
 
 
}
  
