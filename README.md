# Sauce Demo – Playwright (TypeScript)

Small end-to-end test project for https://www.saucedemo.com using Playwright Test and the Page Object Model.

## Setup

```bash
npm install
npx playwright install      # downloads Chromium and Firefox
```

Requires Node.js 18 or newer.

## Run

```bash
npm test                          # all tests, headless, both browsers
npm run test:headed               # watch the browser
npm run test:ui                   # Playwright UI mode
npx playwright test --project=chromium
npx playwright test tests/login.spec.ts
npx playwright test -g "purchase" # filter by test name
npm run report                    # open the HTML report
npm run typecheck
```

## Structure

```
pages/       Page objects (LoginPage, InventoryPage, CartPage, CheckoutPage)
fixtures/    Custom test fixtures and test data
tests/       Specs: login, inventory, checkout
playwright.config.ts
```

- `fixtures/index.ts` extends Playwright's `test` so each spec receives ready-made page objects. The `loggedInInventory` fixture logs in as the standard user first.
- Locators use `getByTestId` with `testIdAttribute: 'data-test'` (set in the config), because Sauce Demo exposes `data-test` attributes.
- Test users and products live in `fixtures/test-data.ts`.

## Ideas to extend

- Add `problem_user` / `performance_glitch_user` scenarios
- Save login state with `storageState` to skip the UI login
- Add GitHub Actions to run the suite on every push
- Add visual comparisons with `toHaveScreenshot()`
