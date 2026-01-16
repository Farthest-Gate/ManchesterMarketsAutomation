import { test } from '@playwright/test';
import { LoginPage } from '../../lib/pages/login.page';
import { MarketApplicationPage } from '../../lib/pages/marketApplicationPage';
import { expect } from '@playwright/test';
import { AddressModalPage } from '../../lib/pages/addressModalPage';
import {marketApplicationData} from '../../lib/datafactory/marketApplicationData';
import {userData} from '../../lib/datafactory/userData';
import path from 'path';

test('Create markets rights application', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(userData.email, userData.password);

    const marketPage = new MarketApplicationPage(page);
    const addressModal = new AddressModalPage(page);

    await marketPage.open();

    await marketPage.fillPreviousMarketDetails();

    await marketPage.selectMarketType(marketApplicationData.marketDetails.marketType);
    await marketPage.setMarketName(marketApplicationData.marketDetails.marketname);
    await marketPage.selectCommodities(marketApplicationData.marketDetails.commodity1, marketApplicationData.marketDetails.commodity2);
    await marketPage.verifySelectedCommodities(marketApplicationData.marketDetails.commodity1, marketApplicationData.marketDetails.commodity2);

    await marketPage.alcoholDetails(marketApplicationData.marketDetails.premiseNumber);

    const filePath = path.join(__dirname, '../../data/check.png');
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
