import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should show validation error for empty login form', async ({ page }) => {
    await page.goto('/login');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // HTML5 validation should prevent submission
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toBeFocused();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });

  test('should validate password length on registration', async ({ page }) => {
    await page.goto('/register');

    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'short');

    // HTML5 validation for minLength=8
    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toHaveAttribute('minlength', '8');
  });

  test('should show all required fields on register page', async ({ page }) => {
    await page.goto('/register');

    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText('Create account');
  });

  test('should have link to login from register page', async ({ page }) => {
    await page.goto('/register');

    await page.click('a:has-text("Login")');
    await expect(page).toHaveURL('/login');
  });

  test('should have link to register from login page', async ({ page }) => {
    await page.goto('/login');

    await page.click('a:has-text("Register")');
    await expect(page).toHaveURL('/register');
  });
});
