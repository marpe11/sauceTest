import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { validPassword, userScenarios } from '../utils/constants';

test.describe('Sauce Demo Login Tests', () => {
  userScenarios.forEach(scenario => {
    test(`${scenario.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      // Navegar para a página de login
      await loginPage.navigate();

      // Preencher credenciais e fazer login
      await loginPage.loginWithCredentials(scenario.username, validPassword);

      // Validações baseadas no tipo de usuário
      switch (scenario.expectedResult) {
        case 'success':
          await loginPage.verifyRedirectToProductsPage();
          break;
        case 'locked':
          await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
          break;
      }
    });
  });

  test('Login with incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.loginWithCredentials('standard_user', 'wrong_password');
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });

  test('Login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.submitLogin();
    await loginPage.verifyErrorMessage('Epic sadface: Username is required');
  });
});