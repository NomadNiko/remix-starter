import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Remix Starter/);

    // Check main heading
    await expect(page.locator('h1')).toContainText('Welcome to Remix Starter');

    // Check feature cards
    await expect(page.locator('text=Remix')).toBeVisible();
    await expect(page.locator('text=MongoDB')).toBeVisible();
    await expect(page.locator('text=JWT Auth')).toBeVisible();
    await expect(page.locator('text=Shadcn/ui')).toBeVisible();
  });

  test('should show login and register buttons when not authenticated', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('a:has-text("Login")')).toBeVisible();
    await expect(page.locator('a:has-text("Register")')).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    await page.click('a:has-text("Login")');

    await expect(page).toHaveURL('/login');
    await expect(page.locator('h3')).toContainText('Login');
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/');
    await page.click('a:has-text("Register")');

    await expect(page).toHaveURL('/register');
    await expect(page.locator('h3')).toContainText('Create an account');
  });
});
