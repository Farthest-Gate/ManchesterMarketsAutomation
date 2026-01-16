import { Page, expect } from '@playwright/test';
import { marketApplicationData, MarketDetails, MarketTimings } from '../datafactory/marketApplicationData';


export class MarketApplicationPage {
    constructor(private page: Page) {}

    async open() {
        await this.page.goto('https://mcc-markets-live.farthestgate.co.uk/sf/control/application?code=mar_rights');
    }

    async fillPreviousMarketDetails() {
        await this.page.getByRole('group', { name: 'Have you or your business/' })
            .getByLabel('Yes').check();

        await this.page.getByRole('textbox', { name: 'Please provide brief details' })
            .fill('Previous Market Details');
    }

    async selectMarketType(marketType: string) {
        await  this.page.getByRole('radio', { name: marketType }).check();
    }

    async setMarketName(name: string) {
        await this.page.getByRole('textbox', { name: 'Name of your market *' }).fill(name);
    }

    async selectCommodities(commodity1: string, commodity2: string) {
        await this.page.getByRole('combobox', { name: 'Please tell us what' }).click();
        await this.page.locator('a', { hasText: commodity1 }).click();

        await this.page.getByRole('combobox', { name: 'Please tell us what' }).click();
        await this.page.locator('a', { hasText: commodity2 }).click();
    }

    async verifySelectedCommodities(commodity1: string, commodity2: string) {
        await expect(this.page.getByRole('paragraph').filter({ hasText: commodity1})).toBeVisible();
        await expect(this.page.getByRole('paragraph').filter({ hasText: commodity2 })).toBeVisible();
    }
    async alcoholDetails(licenceNumber: string) {
        await this.page.getByRole('group', { name: 'Will there be alcohol sold on the market?' })
            .getByLabel('Yes').check();

        await this.page.getByRole('group', { name: 'Do you have a premises licence or temporary event notice' })
            .getByLabel('Yes').check();

        await this.page
            .getByRole('textbox', { name: 'Please enter the Premises licence or temporary event notice number *' })
            .fill(licenceNumber);
    }

    async uploadLayoutPlan(filePath: string) {
        await this.page.setInputFiles('#layout_plan_input', filePath);

        // ensure change event triggers
        await this.page.evaluate(() => {
            const input = document.querySelector('#layout_plan_input');
            input?.dispatchEvent(new Event('change', { bubbles: true }));
        });

        await this.page.getByRole('button', { name: 'Upload', exact: true }).click();
    }

  

async fillEventTimings(data : MarketTimings) {
    await this.page.getByRole('textbox', { name: 'Start Date' }).fill(data.startDate);
    await this.page.getByRole('textbox', { name: 'End Date' }).fill(data.endDate);
    await this.page.getByRole('textbox', { name: 'Start Hour' }).fill(data.startTime);
    await this.page.getByRole('textbox', { name: 'End Hour' }).fill(data.endTime);

}

async fillMarketCapacity(capacity: MarketDetails) {
    await this.page.getByRole('spinbutton', { name: 'What is the capacity of your' }).fill(capacity.marketcapacity);
    await this.page.getByRole('spinbutton', { name: 'How many of these trading' }).fill(capacity.occupiedspace);
}



 // Generic methods
async selectCheckbox(label: string) {
  const checkbox = this.page.getByRole('checkbox', { name: label });
  if (!(await checkbox.isChecked())) {
    await checkbox.check();
  }
}

async selectCheckboxes(labels: string[]) {
  for (const label of labels) {
    await this.selectCheckbox(label);
  }
}

// Use the data from marketApplicationData
async fillMarketCheckboxes(data: any) {
  await this.selectCheckboxes(data.stallTypes); // multiple checkboxes
  await this.selectCheckbox(data.natureOfMarket);   // single checkbox
  await this.selectCheckbox(data.terms);        // T&C
}





async fillStallCharge(stallCharge: MarketDetails) {
    await this.page.getByRole('textbox', { name: 'What is the charge to rent a' }).fill(stallCharge.stallCharge);
}
async fillPurpose(purpose: MarketDetails) {
  await this.page.getByRole('textbox', { name: 'Please provide more details about the purpose' }).fill(purpose.purpose);
}


}
