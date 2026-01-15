import { test } from '@playwright/test';
import { LoginPage } from '../lib/pages/LoginPage';
import { MarketApplicationPage } from '../lib/pages/marketApplicationPage';
import { expect } from '@playwright/test';
import { AddressModalPage } from '../lib/pages/addressModalPage';
import {marketApplicationData} from '../lib/datafactory/marketApplicationData';
import {userData} from '../lib/datafactory/userData';
import path from 'path';

test('Markets Rights Application', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const marketPage = new MarketApplicationPage(page);
    const addressModal = new AddressModalPage(page);

    await loginPage.open();
    await loginPage.login(userData.email, userData.password);

    await marketPage.open();
    await marketPage.fillPreviousMarketDetails();
    await marketPage.selectCategory(marketApplicationData.marketDetails.category);
    await marketPage.setMarketName(marketApplicationData.marketDetails.marketname);

    await marketPage.selectCategories();
    await marketPage.verifySelectedCategories();

    await marketPage.alcoholDetails();

    const filePath = path.join(__dirname, '../data/check.png');
    await marketPage.uploadLayoutPlan(filePath);

   

    await marketPage.fillEventTimings(marketApplicationData.timings);
  
      // Example: select multiple checkboxes
    await marketPage.fillMarketCheckboxes(marketApplicationData.marketDetails);

    await marketPage.fillMarketCapacity(marketApplicationData.marketDetails);

    await marketPage.fillStallCharge(marketApplicationData.marketDetails);

    await marketPage.fillPurpose(marketApplicationData.marketDetails);


    // Example: select a single checkbox
    await marketPage.selectCheckbox('Commercial');

    await addressModal.searchAddress(marketApplicationData.address.postcode);

    // Continue adding interactions from your script...
});
