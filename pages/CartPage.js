// /pages/CartPage.js
class CartPage {
    constructor(page) {
      this.page = page;
      this.cartItemNameLocator = '.inventory_item_name'; // Nome do item
      this.cartItemPriceLocator = '.inventory_item_price'; // Preço do item
      this.cartItemDescriptionLocator = '.inventory_item_desc'; // Descrição do item
      this.cartTotalLocator = '.cart_total_label'; // Total do carrinho, se disponível
    }
  
    // Método para obter o nome do item no carrinho
    async getCartItemName() {
      const itemName = await this.page.locator(this.cartItemNameLocator);
      return itemName.textContent();
    }
  
    // Método para obter o preço do item no carrinho
    async getCartItemPrice() {
      const itemPrice = await this.page.locator(this.cartItemPriceLocator);
      return itemPrice.textContent();
    }
  
    // Método para obter a descrição do item no carrinho
    async getCartItemDescription() {
      const itemDescription = await this.page.locator(this.cartItemDescriptionLocator);
      return itemDescription.textContent();
    }
  
    // Método para obter o total do carrinho
    async getCartTotal() {
      const cartTotal = await this.page.locator(this.cartTotalLocator);
      return cartTotal.textContent();
    }
  
    // Método para remover um item do carrinho
    async removeItemFromCart() {
      const removeButton = await this.page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]');
      await removeButton.click();
    }
  }
  
  module.exports = CartPage;
  