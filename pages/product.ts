import { expect, type Locator, type Page } from '@playwright/test'
import { Product } from '../models/product'

export class ProductPage {
  private readonly page: Page
  private readonly product: Product
  private readonly detailSection: Locator
  private readonly amountInput: Locator
  private readonly quantityIncrease: Locator
  private readonly addBtn: Locator

  constructor(page: Page, product: Product) {
    this.page = page
    this.product = product
    this.detailSection = this.page.locator('.detailsection')
    this.amountInput = this.detailSection.getByRole('textbox')
    this.quantityIncrease = this.detailSection.getByRole('button', {
      name: '+',
    })
    this.addBtn = this.detailSection.getByRole('button', { name: 'Add To Bag' })
  }

  private async chooseAmount() {
    for (let i = 0; i < this.product.amount - 1; i++) {
      await this.quantityIncrease.click()
    }
    const value = await this.amountInput.inputValue()
    expect(Number(value)).toBe(this.product.amount)
  }

  async addToCart() {
    await this.chooseAmount()
    await this.addBtn.click()
  }
}
