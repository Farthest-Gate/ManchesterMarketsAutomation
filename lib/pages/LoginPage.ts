import {Page} from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) 
    {

    }

    async open() 
    {
        await this.page.goto('https://mcc-markets-live.farthestgate.co.uk/sf/control/application?code=mar_rights');
    }

    async login(email: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }
}