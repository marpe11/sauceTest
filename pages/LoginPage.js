import { expect } from '@playwright/test';

class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameField = page.locator('#user-name');
      this.passwordField = page.locator('#password');
      this.loginButton = page.locator('#login-button');
      this.errorMessage = page.locator('[data-test="error"]');
    }
  
    async navigate() {
      await this.page.goto('https://www.saucedemo.com/');
    }
  
    async fillUsername(username) {
      await this.usernameField.fill(username);
    }
  
    async fillPassword(password) {
      await this.passwordField.fill(password);
    }
  
    async submitLogin() {
      await this.loginButton.click();
    }
  
    async loginWithCredentials(username, password) {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.submitLogin();
    }
  
    async verifyErrorMessage(message) {
      await expect(this.errorMessage).toBeVisible();
      await expect(this.errorMessage).toHaveText(message);
    }
  
    async verifyRedirectToProductsPage() {
      await expect(this.page).toHaveURL(/inventory.html/);
    }
  }
  
  module.exports = LoginPage;