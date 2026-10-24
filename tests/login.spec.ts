import { test, expect } from '../fixtures';
import { users } from '../fixtures/test-data';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();

  });

  test('standard user can log in', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.login(users.locked.username, users.locked.password);
    await loginPage.expectError(/locked out/i);
  });

  test('invalid credentials show an error', async ({ loginPage }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await loginPage.expectError(/do not match/i);
  });

  test('empty username shows a required error', async ({ loginPage }) => {
    await loginPage.password.fill(users.standard.password);
    await loginPage.loginButton.click();
    await loginPage.expectError('Username is required');
  });

  test('empty password shows a required error', async ({ loginPage }) => {
    await loginPage.username.fill(users.standard.username);
    await loginPage.loginButton.click();
    await loginPage.expectError('Password is required');
  });

  test('user can log out', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();
    await inventoryPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('cannot open inventory without logging in', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await expect(loginPage.error).toContainText(/only access '\/inventory\.html' when you are logged in/i);
  });
});
