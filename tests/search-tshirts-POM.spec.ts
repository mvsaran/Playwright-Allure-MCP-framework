import { test } from '@playwright/test';
import { HomePage } from './page-objects/HomePage';
import { SearchResultsPage } from './page-objects/SearchResultsPage';

test('Search for T-shirts and verify product', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await homePage.goto();
  await homePage.searchFor('T-shirts');
  await searchResultsPage.expectProductVisible('Faded Short Sleeve T-shirts');
});
