// page-objects/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_query_top');
    this.searchButton = page.locator('button[name="submit_search"]');
  }

  async goto() {
    await this.page.goto('http://www.automationpractice.pl/index.php');
  }

  async searchFor(text: string) {
    await this.searchInput.fill(text);
    await this.searchButton.click();
  }
}
