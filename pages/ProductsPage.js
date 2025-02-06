import { expect } from '@playwright/test';

class ProductsPage {
    constructor(page) {
      this.page = page;
      this.title = page.locator('.title');
      this.cartBadge = page.locator('.shopping_cart_badge');
    }
  
    async verifyPageTitle(expectedTitle) {
      await expect(this.title).toHaveText(expectedTitle);
    }
  
    async verifyProductDetails(name, description, price) {
      // Localiza o título do produto
      const productTitle = await this.page.locator('.inventory_item_name', { hasText: name });
      await expect(productTitle).toBeVisible();
    
      // Localiza a descrição do produto
      const productDescription = await this.page.locator('.inventory_item_desc', { hasText: description });
      await expect(productDescription).toBeVisible();
    
      // Localiza o preço do produto
      const productPrice = await this.page.locator('.inventory_item_price', { hasText: price }).first();  // Aqui usamos .first() para garantir que pega o primeiro elemento
      await expect(productPrice).toHaveText(price);
    }
  
    async verifyCartBadgeCount(count) {
      if (count === 0) {
        await expect(this.cartBadge).toHaveCount(0);
      } else {
        await expect(this.cartBadge).toHaveText(count.toString());
      }
    }
  
    async addProductToCart(productName) {
      const addToCartButton = await this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}"]`);
      await addToCartButton.click();
    }
  
    async goToCart() {
      const cartIcon = await this.page.locator('.shopping_cart_container');
      await cartIcon.click();
    }
  }
  
  module.exports = ProductsPage;