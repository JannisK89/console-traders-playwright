import { type Locator, type Page } from '@playwright/test'

type category =
  | 'All Products'
  | 'Laptops'
  | 'Controllers'
  | 'Desktop'
  | 'Mobiles'
  | 'Monitors'

export class Header {
  private readonly page: Page
  private readonly searchBar: Locator

  constructor(page: Page) {
    this.page = page
    this.searchBar = this.page.getByPlaceholder(
      'Search by product name or search by image'
    )
  }

  async navigateTo(category: category) {
    await this.page.getByRole('link', { name: category }).first().click()
  }

  async search(input: string) {
    this.searchBar.fill(input)
  }
}
