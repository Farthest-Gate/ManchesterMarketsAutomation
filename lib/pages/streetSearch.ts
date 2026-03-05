import { Page, expect } from '@playwright/test';

export class streetSearch {
    constructor(private page: Page) {}

    async streetAddress(streetInitials: string,streetInitials1: string) {
  

        const searchStreet = this.page.getByPlaceholder("Type to search for streets...");
        await expect(searchStreet).toBeVisible();
        await searchStreet.click();

        await this.page.getByPlaceholder("Type to search for streets...").click();
        await this.page.getByPlaceholder("Type to search for streets...").fill(streetInitials);
        await this.page.getByPlaceholder("Type to search for streets...").fill(streetInitials1);


        await this.page.getByRole('option', {
        name: 'BUCKHURST ROAD'
        }).first().click();

        // wait for dropdown to populate
       
       await expect(
       this.page.locator('.break', { hasText: 'BUCKHURST ROAD' })
       ).toHaveCount(1);
         
      
    }
}

