import { Locator, type Page } from '@playwright/test'
import { Product } from '../models/product'

export enum Brand {
  Microsoft = 'brand1',
  ASUS = 'brand2',
  Dell = 'brand3',
  Acer = 'brand4',
  OnePlus = 'brand5',
  HP = 'brand6',
  Lenovo = 'brand7',
  Samsung = 'brand8',
  Viewsonic = 'brand9',
  Zebronics = 'brand10',
}

export class Laptops {
  private readonly page: Page
  private readonly product: Product
  private readonly productName: Locator
  private readonly brand: Locator

  constructor(page: Page, product: Product) {
    this.page = page
    this.product = product
    this.productName = this.page.getByText(this.product.name)
    this.brand = this.page
      .getByRole('complementary')
      .locator(`[name='${this.product.brand}']`)
  }

  private async pickBrand() {
    await this.brand.check()
  }

  async chooseLaptop() {
    await this.pickBrand()
    await this.productName.click()
  }
}
