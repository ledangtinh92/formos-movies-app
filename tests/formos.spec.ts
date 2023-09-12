import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.locator('div').filter({ hasText: /^menu$/ }).locator('span').click();
  await page.getByText('Popular').click();
  await page.getByText('MEG 2: THE TRENCH').click();
  await page.getByRole('img', { name: 'Jason Statham' }).click();
  await page.getByText('Jason Statham (born July 26, 1967) is an English actor. He is known for portrayi').click();


});
