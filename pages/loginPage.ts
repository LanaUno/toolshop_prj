import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';


export class LoginPage extends BasePage {

    signInLink: Locator;
    loginModal: Locator;
    registerLink: Locator;
    
    constructor(page: Page) {
        super(page);

        this.signInLink = page.locator('[data-test="nav-sign-in"]');
        this.loginModal = page.locator('[class="col-lg-6 auth-form"]');
        this.registerLink = page.locator('[data-test="register-link"]');
  }

  async clickSignInLink() {
    await this.signInLink.click()
  }

  async clickRegisterLink() {
    await this.click(this.registerLink)
  }
}