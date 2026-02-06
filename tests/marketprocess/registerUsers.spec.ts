import {test, expect} from "@playwright/test"
import { registerUser } from '../../lib/datafactory/createaccount';
import { LoginPage } from "../../lib/pages/login.page";

test('create account and login', async({page})=>{

 //   await registerUser();
   const email = `test${Date.now()}@test.com`;
  const password = "fjdWEdfs82@";
    
await page.goto('https://mcc-markets-live.farthestgate.co.uk/sf/control/createaccount');


await page.getByRole('textbox', { name: 'Email (Used to login) *' }).fill(email);
await page.getByRole('textbox', { name: 'Repeat Email *' }).fill(email);

await page.getByRole('textbox', { name: 'Password *', exact: true }).fill(password);
await page.getByRole('textbox', { name: 'Repeat Password *' }).fill(password);

await page.getByRole('button', { name: 'Create Account' }).click();
await expect(page.getByText(email)).toBeVisible();

const loginPage = new LoginPage(page);
await loginPage.open();
await loginPage.login(email, password);

})

