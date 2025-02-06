// tests/simpleTest.spec.js
import { test, expect } from '@playwright/test';

test('sample test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  const title = await page.title();
  expect(title).toBe('Swag Labs');
});

export default class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async fillUsername(username) {
    await this.page.fill('#user-name', username);
  }

  async fillPassword(password) {
    await this.page.fill('#password', password);
  }

  async submitLogin() {
    await this.page.click('#login-button');
  }

  async getErrorMessage() {
    return await this.page.locator('[data-test="error"]');
  }
}
