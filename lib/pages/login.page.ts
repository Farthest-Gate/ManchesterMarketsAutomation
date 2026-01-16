import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
    readonly page:Page;
    readonly emailInput:Locator;
    readonly passwordInput:Locator;
    readonly submitButton:Locator;
    readonly assertLogin:Locator;

    constructor(page: Page) 
    {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.assertLogin = page.getByLabel('Log out');
    }
    async open() 
    {
        await this.page.goto('https://mcc-markets-live.farthestgate.co.uk/sf/control/application?code=mar_rights');
    }
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        await this.assertLogin.isVisible();
    
    }
}