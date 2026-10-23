import { test, expect } from '../fixtures';
import { products, customer } from '../fixtures/test-data';

test.describe('Cart and checkout', () => {
  test('cart lists the items that were added', async ({ loggedInInventory, cartPage }) => {
    await loggedInInventory.addToCart(products.backpack);
    await loggedInInventory.addToCart(products.boltShirt);
    await loggedInInventory.openCart();

    await cartPage.expectLoaded();
    const names = await cartPage.getItemNames();
    expect(names).toEqual(expect.arrayContaining([products.backpack, products.boltShirt]));
    expect(names).toHaveLength(2);
  });

  test('item can be removed from the cart', async ({ loggedInInventory, cartPage }) => {
    await loggedInInventory.addToCart(products.backpack);
    await loggedInInventory.openCart();
    await cartPage.removeItem(products.backpack);
    await expect(cartPage.items).toHaveCount(0);
  });

  test('checkout requires customer information', async ({ loggedInInventory, cartPage, checkoutPage }) => {
    await loggedInInventory.addToCart(products.backpack);
    await loggedInInventory.openCart();
    await cartPage.checkout();

    await checkoutPage.continueButton.click();
    await expect(checkoutPage.error).toContainText('First Name is required');
  });

  test('user can complete a purchase end to end', async ({ loggedInInventory, cartPage, checkoutPage }) => {
    await loggedInInventory.addToCart(products.backpack);
    await loggedInInventory.addToCart(products.bikeLight);
    await loggedInInventory.openCart();
    await cartPage.checkout();

    await checkoutPage.fillInfo(customer.firstName, customer.lastName, customer.postalCode);
    await expect(checkoutPage.subtotal).toContainText('Item total: $39.98');
    await checkoutPage.finish();

    await checkoutPage.expectOrderComplete();
  });
});
