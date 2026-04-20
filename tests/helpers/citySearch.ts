import { Page, Locator } from '@playwright/test';

type ResponseType = {
    city: Locator;
    table: Locator;
    data: any;
};

export class SearchPage {
    page: Page;
    searchInput: Locator;
    button: Locator;
    cities: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search');
        this.button = page.locator('#btn');
        this.cities = page.locator('#cities .city');
    }

    async search(city: string) {
        await this.searchInput.fill(city);

        await Promise.all([
            this.page.waitForResponse(res =>
                res.url().includes('search') &&
                res.status() === 200
            ),
            this.button.click()
        ]);

        return this.cities;
    }
}

export class DisplayResults {
    page: Page;
    locator: Locator;
    city: Locator;
    table: Locator;
    response: ResponseType;

    constructor(page: Page, locator: Locator) {
        this.page = page;
        this.locator = locator;
        this.city = page.locator('#cities');
        this.table = page.locator('#table');
        this.response = { city: this.city, table: this.table, data: null }
    }

    async testDisplay(): Promise<ResponseType> {
        let apiData: any;
        await Promise.all([
            this.page.waitForResponse(async res => {
                if (res.url().includes('archive') &&
                    res.status() === 200) {
                    apiData = await res.json();
                    return true;
                }
                return false;
            }),
            this.locator.click()
        ]);

        this.response = {city: this.city, table: this.table, data: apiData}
        return this.response;
    }
}