import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import { validPassword, productDetails } from '../utils/constants';

test.describe('Cart Tests', () => {
  test('Adicionar item ao carrinho e remover', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Navegar para a página de login e fazer login
    await loginPage.navigate();
    await loginPage.loginWithCredentials('standard_user', validPassword);

    // Adicionar produto ao carrinho
    await productsPage.addProductToCart(productDetails.name);

    // Navegar para o carrinho
    await productsPage.goToCart();

    // Verificar detalhes do item no carrinho
    await cartPage.verifyCartItemDetails(
      productDetails.name,
      productDetails.description,
      productDetails.price
    );

    // Remover item do carrinho
    await cartPage.removeProductFromCart(productDetails.name);

    // Verificar se o badge do carrinho não está mais visível
    const cartBadge = await page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveCount(0);
  });
});
