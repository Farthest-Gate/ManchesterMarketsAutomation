import { Page, expect } from '@playwright/test';

export class AddressModalPage {
    constructor(private page: Page) {}

    async searchAddress(postcode: string) {
        await this.page.getByRole('button', { name: 'Search for address' }).click();
        await this.page.getByRole('textbox', { name: 'Postcode lookup' }).fill(postcode);

        const searchButton = this.page.getByRole('button', { name: 'Search postcode' });
        await expect(searchButton).toBeVisible();
        await searchButton.click();

        // wait for dropdown to populate
        const modal = this.page.locator('.modal-dialog.modal-md');
        const dropdown = modal.locator('.filter-option.pull-left');

        await expect(dropdown).not.toHaveText('Select Address');

        const selectAddressButton = modal.locator('.modal-footer >> text=Select address');
        await expect(selectAddressButton).toBeVisible();
        await selectAddressButton.click();
    }
}
