import { test, expect } from '../fixtures';
import { products } from '../fixtures/test-data';

test.describe('Inventory', () => {
  test('shows six products', async ({ loggedInInventory }) => {
    await expect(loggedInInventory.items).toHaveCount(6);
  });

  test('sorts by name A to Z and Z to A', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('az');
    const az = await loggedInInventory.getNames();
    expect(az).toEqual([...az].sort());

    await loggedInInventory.sortBy('za');
    const za = await loggedInInventory.getNames();
    expect(za).toEqual([...za].sort().reverse());
  });

  test('sorts by price low to high and high to low', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('lohi');
    const asc = await loggedInInventory.getPrices();
    expect(asc).toEqual([...asc].sort((a, b) => a - b));

    await loggedInInventory.sortBy('hilo');
    const desc = await loggedInInventory.getPrices();
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
  });

  test('cart badge updates when adding and removing items', async ({ loggedInInventory }) => {
    await loggedInInventory.addToCart(products.backpack);
    await expect(loggedInInventory.cartBadge).toHaveText('1');

    await loggedInInventory.addToCart(products.bikeLight);
    await expect(loggedInInventory.cartBadge).toHaveText('2');

    await loggedInInventory.removeFromCart(products.backpack);
    await expect(loggedInInventory.cartBadge).toHaveText('1');

    await loggedInInventory.removeFromCart(products.bikeLight);
    await expect(loggedInInventory.cartBadge).toBeHidden();
  });
});
