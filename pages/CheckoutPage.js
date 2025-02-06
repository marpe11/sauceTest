import { expect } from '@playwright/test';

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.errorMessage = page.locator('[data-test="error"]');
        this.firstNameField = page.locator('#first-name'); // Locator para o campo First Name
        this.lastNameField = page.locator('#last-name');   // Locator para o campo Last Name
        this.postalCodeField = page.locator('#postal-code'); // Locator para o campo Postal Code
    }

    async verifyPageTitle(expectedTitle) {
        await expect(this.title).toHaveText(expectedTitle);
    }

    // Método para preencher o First Name
    async fillFirstName(firstName) {
        await this.firstNameField.fill(firstName);
    }

    // Método para preencher o Last Name
    async fillLastName(lastName) {
        await this.lastNameField.fill(lastName);
    }

    // Método para preencher o Postal Code
    async fillPostalCode(postalCode) {
        await this.postalCodeField.fill(postalCode);
    }

    // Método para preencher todos os campos de uma vez
    async fillShippingInformation(firstName, lastName, postalCode) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
    }

    async clickContinue() {
        await this.page.locator('#continue').click();
    }

    async verifyErrorMessage(message) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(message);
    }

    async verifyOverviewDetails(name, description, price, subtotal, tax, total) {
        const overviewItemName = await this.page.locator('.cart_item .inventory_item_name');
        await expect(overviewItemName).toHaveText(name);

        const overviewItemDesc = await this.page.locator('.cart_item .inventory_item_desc');
        await expect(overviewItemDesc).toHaveText(description);

        const overviewItemPrice = await this.page.locator('.cart_item .inventory_item_price');
        await expect(overviewItemPrice).toHaveText(price);

        const subtotalLabel = await this.page.locator('.summary_subtotal_label');
        await expect(subtotalLabel).toHaveText(`Item total: $${subtotal}`);

        const taxLabel = await this.page.locator('.summary_tax_label');
        await expect(taxLabel).toHaveText(`Tax: $${tax}`);

        const totalLabel = await this.page.locator('.summary_total_label');
        await expect(totalLabel).toHaveText(`Total: $${total}`);
    }

    async finishCheckout() {
        await this.page.locator('#finish').click();
    }
}

module.exports = CheckoutPage;