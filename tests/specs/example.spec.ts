import { test, expect } from '@playwright/test';
import { SearchPage, DisplayResults } from "../helpers/citySearch"

declare global {
  interface Window {
    hotInstance: any;
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
test.afterEach(async ({ page }) => {
  await page.close();
});

test('Has search input', async ({ page }) => {
  await expect(page.locator("#search")).toBeVisible();
  await expect(page.locator("#btn")).toBeVisible();
});

test('Search for city', async ({ page }) => {
  const searchPage = new SearchPage(page);
  const cities = await searchPage.search('Kraków');

  await expect(cities.first()).toBeVisible();
});


test('Display Results', async ({ page }) => {
  const searchPage = new SearchPage(page);
  const cities = (await searchPage.search('Kraków')).first();

  const displayResults = new DisplayResults(page, cities)
  const results = await displayResults.testDisplay()

  await expect(results.city).toBeEmpty();
  const count = await results.table.count();
  expect(count).toBeGreaterThan(0);
});

test('Search for city again', async ({ page }) => {
  const searchPage = new SearchPage(page);
  const cities = (await searchPage.search('Kraków')).first();

  const displayResults = new DisplayResults(page, cities)
  const results = await displayResults.testDisplay()

  await expect(results.city).toBeEmpty();

  const citiesAgain = await searchPage.search('Kielce');
  await expect(citiesAgain.first()).toBeVisible();
});

test('Display results again', async ({ page }) => {
  const searchPage = new SearchPage(page);
  const cities = (await searchPage.search('Kraków')).first();

  const displayResults = new DisplayResults(page, cities)
  await displayResults.testDisplay();
  await searchPage.search('Kielce');


  const newResults = await displayResults.testDisplay();
  const results = newResults.data.daily.temperature_2m_max;

  const data = await page.evaluate(() => {
    return window.hotInstance.getData();
  });

  const temperature = data.map((row: any[]) => row[1]);

  await expect(temperature).toEqual(results)

});