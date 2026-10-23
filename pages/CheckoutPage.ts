import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly error: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.error = page.getByTestId('error');
    this.subtotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.completeHeader = page.getByTestId('complete-header');
  }

  async fillInfo(first: string, last: string, zip: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
