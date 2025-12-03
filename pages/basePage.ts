import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async click(locator: Locator, options?: { timeout?: number }): Promise<void> {
        await expect(locator).toBeVisible({ timeout: options?.timeout || 5000 });
        await locator.click();
    }

    async fill(selector: string, value: string): Promise<void> {
        await this.page.fill(selector, value);
    }

    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) ?? "";
    }

    async isVisible(selector: string): Promise<boolean> {
        return await this.page.isVisible(selector);
    }

    async waitForSelector(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
    }
}
