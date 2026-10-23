import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShopping: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShopping = page.getByTestId('continue-shopping');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async removeItem(productName: string) {
    await this.items
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
