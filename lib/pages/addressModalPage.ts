import { Page, expect } from '@playwright/test';

export class AddressModalPage {
    constructor(private page: Page) {}

    async marketAddress(postcode: string) {
        await this.page.getByRole('button', { name: 'Search for address' }).click();
        await this.page.getByRole('textbox', { name: 'Postcode lookup' }).fill(postcode);

        const searchButton = this.page.getByRole('button', { name: 'Search postcode' });
        await expect(searchButton).toBeVisible();
        await searchButton.click();
          
        const modal = this.page.locator('.modal-dialog.modal-md');

       const dropdown = modal.locator('.filter-option.pull-left');
       await dropdown.click();

        await this.page.getByRole('option', {
        name: 'ADVERTISING RIGHT BT INLINK OUTSIDE 9, STEVENSON SQUARE, MANCHESTER, M1 1DB'
        }).first().click();

        // wait for dropdown to populate
       
     
         
        await expect(dropdown).not.toHaveText('Select Address');

        const selectAddressButton = modal.locator('.modal-footer >> text=Select address');
        await expect(selectAddressButton).toBeVisible();
        await selectAddressButton.click();
    }
}
