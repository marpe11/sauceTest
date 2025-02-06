import { expect } from '@playwright/test';

class CartPage {
    constructor(page) {
      this.page = page;
      this.cartItem = page.locator('.cart_item');
    }
  
    async verifyCartItemDetails(name, description, price) {
      const itemName = await this.cartItem.locator('.inventory_item_name');
      await expect(itemName).toHaveText(name);
  
      const itemDescription = await this.cartItem.locator('.inventory_item_desc');
      await expect(itemDescription).toHaveText(description);
  
      const itemPrice = await this.cartItem.locator('.inventory_item_price');
      await expect(itemPrice).toHaveText(price);
    }
  
    async removeProductFromCart(productName) {
      const removeButton = await this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/ /g, '-')}"]`);
      await removeButton.click();
    }
  
    async startCheckout() {
      const checkoutButton = await this.page.locator('#checkout');
      await checkoutButton.click();
    }
  }
  
  module.exports = CartPage;