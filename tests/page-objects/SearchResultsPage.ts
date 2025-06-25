// page-objects/SearchResultsPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNames = page.locator('.product_list .product-name');
  }

  async expectProductVisible(productName: string) {
    await expect(this.productNames.filter({ hasText: productName })).toBeVisible();
  }
}
