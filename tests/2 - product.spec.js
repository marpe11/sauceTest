import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import { validPassword, productDetails } from '../utils/constants';

test.describe('Product Validation Tests', () => {
  test('Selecionar um produto, verificar o título, preço e descrição', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Navegar para a página de login e fazer login
    await loginPage.navigate();
    await loginPage.loginWithCredentials('standard_user', validPassword);

    // Verificar se foi redirecionado para a página de produtos
    await productsPage.verifyPageTitle('Products');

    // Verificar detalhes do produto
    await productsPage.verifyProductDetails(
      productDetails.name,
      productDetails.description,
      productDetails.price
    );

    // Verificar se o badge do carrinho não está presente antes de adicionar o item
    await productsPage.verifyCartBadgeCount(0);

    // Adicionar produto ao carrinho
    await productsPage.addProductToCart(productDetails.name);

    // Verificar se o badge do carrinho mostra '1'
    await productsPage.verifyCartBadgeCount(1);
  });
});