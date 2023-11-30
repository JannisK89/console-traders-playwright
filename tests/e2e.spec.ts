import { test, expect } from '@playwright/test'
import { Header } from '../pages/header'
import { Laptops, Brand } from '../pages/laptops'
import { Product } from '../models/product'
import { ProductPage } from '../pages/product'

test('Buy a laptop', async ({ page }) => {
  const productsToBuy: Product[] = [
    {
      brand: Brand.ASUS,
      name: 'ASUS TUF Gaming F15 (2021), 15.6"',
      amount: 2,
    },
    {
      brand: Brand.Microsoft,
      name: 'Microsoft Surface Laptop 3',
      amount: 3,
    },
  ]

  await page.goto('/')
  await expect(page).toHaveTitle('Contoso Traders')

  const header = new Header(page)
  await header.navigateTo('Laptops')

  for await (const product of productsToBuy) {
    const laptops = new Laptops(page, product)
    await laptops.chooseLaptop()

    const productPage = new ProductPage(page, product)
    await productPage.addToCart()
    await header.navigateTo('Laptops')
  }
})
