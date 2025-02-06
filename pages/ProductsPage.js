class ProductsPage {
    constructor(page) {
      this.page = page;
      this.title = page.locator('[data-test="title"]');
    }
  
    async getTitleText() {
      return this.title.innerText();
    }
  }
  
  module.exports = ProductsPage;