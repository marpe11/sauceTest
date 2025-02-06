import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
const CartPage = require('../pages/CartPage');
import { validPassword, userScenarios } from '../utils/constants'; // Importe as constantes

console.log("Arquivo login.spec.js carregado com sucesso");

test.describe('Sauce Demo Login Tests', () => {
  userScenarios.forEach(scenario => {
    test(`${scenario.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      // Navegar para a página de login
      await loginPage.navigate();

      // Preencher credenciais
      await loginPage.fillUsername(scenario.username);
      await loginPage.fillPassword(validPassword);
      await loginPage.submitLogin();

      // Validações baseadas no tipo de usuário
      switch(scenario.expectedResult) {
        case 'success':
          // Verificar se foi redirecionado para página de produtos
          await expect(productsPage.title).toHaveText('Products');
          break;
        
        case 'locked':
          // Verificar mensagem de erro para usuário bloqueado
          const errorMessage = await loginPage.getErrorMessage();
          await expect(errorMessage).toBeVisible();
          await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
          break;
      }
    });
  });

  test('Login with incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.fillUsername('standard_user');
    await loginPage.fillPassword('wrong_password');
    await loginPage.submitLogin();

    // Verificar mensagem de erro para senha incorreta
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.submitLogin();

    // Verificar mensagem de erro para campos vazios
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Username is required');
  });
});

test.describe.only('Validação de produto', () => {
  const validPassword = 'secret_sauce';

  test('Selecionar um produto, verificar o título, preço e descrição', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Navegar para a página de login
    await loginPage.navigate();

    // Preencher credenciais e fazer login
    await loginPage.fillUsername('standard_user');
    await loginPage.fillPassword(validPassword);
    await loginPage.submitLogin();

    // Verificar se foi redirecionado para a página de produtos
    await expect(productsPage.title).toHaveText('Products');

    // Verificar se o título do produto está visível
    const productTitle = await page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bolt T-Shirt' });
    await expect(productTitle).toBeVisible();

    // Verificar se a descrição do produto está visível
    const productDescription = await page.locator('.inventory_item_desc', { hasText: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.' });
    await expect(productDescription).toBeVisible();

    // Localizar o item pelo título
    const productItem = await page.locator('.inventory_item:has-text("Sauce Labs Bolt T-Shirt")');
    // Localizar o preço dentro do item
    const productPrice = await productItem.locator('.inventory_item_price');
    await expect(productPrice).toHaveText('$15.99');

    // Verificar se o badge do carrinho não está presente antes de adicionar o item
    const cartBadge = await page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveCount(0); // Espera que o badge não exista (count = 0)

    // Localizar o botão "Add to cart" para o item e clicar nele
    const addToCartButton = await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    await addToCartButton.click();

    // Verificar se o badge do carrinho mostra '1' indicando que o item foi adicionado
    const updatedCartBadge = await page.locator('.shopping_cart_badge');
    await expect(updatedCartBadge).toHaveText('1');


  });
  test('Adicionar ao Carrinho e Checkout com Validações', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Navegar para a página de login
    await loginPage.navigate();

    // Preencher credenciais e fazer login
    await loginPage.fillUsername('standard_user');
    await loginPage.fillPassword(validPassword);
    await loginPage.submitLogin();

    // Verificar se foi redirecionado para a página de produtos
    await expect(productsPage.title).toHaveText('Products');

    // Localizar o botão "Add to cart" para o item e clicar nele
    const addToCartButton = await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    await addToCartButton.click();

    // Verificar se o badge do carrinho mostra '1' indicando que o item foi adicionado
    const updatedCartBadge = await page.locator('.shopping_cart_badge');
    await expect(updatedCartBadge).toHaveText('1');

    // Clicar no ícone do carrinho
    const cartIcon = await page.locator('.shopping_cart_container');
    await cartIcon.click();

    // Verificar o nome do item no carrinho
    const inventoryItemName = await page.locator('.inventory_item_name');
    await expect(inventoryItemName).toHaveText('Sauce Labs Bolt T-Shirt');

    // Verificar a descrição do item no carrinho
    const inventoryItemDesc = await page.locator('.inventory_item_desc');
    await expect(inventoryItemDesc).toHaveText('Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.');

    // Verificar o preço do item no carrinho
    const inventoryItemPrice = await page.locator('.cart_item .inventory_item_price');
    await expect(inventoryItemPrice).toHaveText('$15.99');

    // Clicar no botão de checkout
    const checkoutButton = await page.locator('#checkout');
    await checkoutButton.click();

    // Verificar o título da página de checkout
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');

    // Tentar clicar no botão Continue sem preencher nenhum campo
    const checkoutButtonContinue = await page.locator('#continue');
    await checkoutButtonContinue.click();

    // Verificar mensagem de erro para First Name
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');

    // Preencher o First Name e tentar clicar no botão Continue novamente
    await page.locator('#first-name').fill('Marcus');
    await checkoutButtonContinue.click();

    // Verificar mensagem de erro para Last Name
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');

    // Preencher o Last Name e tentar clicar no botão Continue novamente
    await page.locator('#last-name').fill('Novo QA da Auvo');
    await checkoutButtonContinue.click();

    // Verificar mensagem de erro para Postal Code
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');

    // Preencher o Postal Code e clicar no botão Continue
    await page.locator('#postal-code').fill('88040001');
    await checkoutButtonContinue.click();

    // Verificar se foi redirecionado para a página de Checkout: Overview
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');

    // Verificar novamente o nome, descrição e preço do item no carrinho
    const overviewItemName = await page.locator('.cart_item .inventory_item_name');
    await expect(overviewItemName).toHaveText('Sauce Labs Bolt T-Shirt');

    const overviewItemDesc = await page.locator('.cart_item .inventory_item_desc');
    await expect(overviewItemDesc).toHaveText('Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.');

    const overviewItemPrice = await page.locator('.cart_item .inventory_item_price');
    await expect(overviewItemPrice).toHaveText('$15.99');

    // Verificar o subtotal, taxa e total na página de Checkout: Overview
    const subtotalLabel = await page.locator('.summary_subtotal_label');
    await expect(subtotalLabel).toHaveText('Item total: $15.99');

    const taxLabel = await page.locator('.summary_tax_label');
    await expect(taxLabel).toHaveText('Tax: $1.28');

    const totalLabel = await page.locator('.summary_total_label');
    await expect(totalLabel).toHaveText('Total: $17.27');

    // Clicar no botão Finish
    const finishButton = await page.locator('#finish');
    await finishButton.click();

    // Verificar se foi redirecionado para a página de Checkout: Complete
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');

    // Adicione outras verificações ou ações aqui, se necessário
});
  
});