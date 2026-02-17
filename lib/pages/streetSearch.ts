import { Page, expect } from '@playwright/test';

export class streetSearch {
    constructor(private page: Page) {}

    async streetAddress(streetInitials: string,streetInitials1: string) {
  

        const searchStreet = this.page.getByTitle("Nothing selected");
        await expect(searchStreet).toBeVisible();
        await searchStreet.click();

        await this.page.getByRole('textbox', { name: 'Search' }).click();
        await this.page.getByRole('textbox', { name: 'Search' }).fill(streetInitials);
        await this.page.getByRole('textbox', { name: 'Search' }).fill(streetInitials1);


        await this.page.getByRole('option', {
        name: 'BUCKHURST ROAD'
        }).first().click();

        // wait for dropdown to populate
       
       await expect(
       this.page.locator('.break', { hasText: 'BUCKHURST ROAD' })
       ).toHaveCount(1);
         
      
    }
}

