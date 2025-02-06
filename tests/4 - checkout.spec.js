import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import { validPassword, productDetails, shippingInfo } from '../utils/constants';

test.describe('Checkout Tests', () => {
  test('Fluxo completo de checkout com validações', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Navegar para a página de login e fazer login
    await loginPage.navigate();
    await loginPage.loginWithCredentials('standard_user', validPassword);

    // Adicionar produto ao carrinho
    await productsPage.addProductToCart(productDetails.name);

    // Navegar para o carrinho
    await productsPage.goToCart();

    // Iniciar checkout
    await cartPage.startCheckout();

    // Verificar título da página de checkout
    await checkoutPage.verifyPageTitle('Checkout: Your Information');

   // Tentar continuar sem preencher informações e verificar mensagem de erro para First Name
   await checkoutPage.clickContinue();
   await checkoutPage.verifyErrorMessage('Error: First Name is required');

   // Preencher First Name
   await checkoutPage.fillFirstName(shippingInfo.firstName);

   // Tentar continuar e verificar mensagem de erro para Last Name
   await checkoutPage.clickContinue();
   await checkoutPage.verifyErrorMessage('Error: Last Name is required');

   // Preencher Last Name
   await checkoutPage.fillLastName(shippingInfo.lastName);

   // Tentar continuar e verificar mensagem de erro para Postal Code
   await checkoutPage.clickContinue();
   await checkoutPage.verifyErrorMessage('Error: Postal Code is required');

   // Preencher Postal Code
   await checkoutPage.fillPostalCode(shippingInfo.postalCode);


// Continuar para a próxima etapa
await checkoutPage.clickContinue();

    // Verificar detalhes na página de overview
    await checkoutPage.verifyOverviewDetails(
      productDetails.name,
      productDetails.description,
      productDetails.price,
      '15.99',
      '1.28',
      '17.27'
    );

    // Finalizar o pedido
    await checkoutPage.finishCheckout();

    // Verificar se foi redirecionado para a página de confirmação
    await checkoutPage.verifyPageTitle('Checkout: Complete!');
  });
});