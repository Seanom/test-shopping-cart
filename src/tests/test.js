import { expect, test } from '@playwright/test';

test('Basket page has expected h1', async ({ page }) => {
	await page.goto('http://localhost:3000/cart');
	expect(await page.textContent('h1')).toBe('Your Basket');
});

test('Logo links fontpage', async ({ page }) => {
	await page.goto('http://localhost:3000/cart');
	await expect(page.locator('.logo a').first()).toHaveAttribute('href', '/');
});

test('Cart page contains 5 products', async ({ page }) => {
	await page.goto('http://localhost:3000/cart');
	await expect(page.locator('.🛒__items li')).toHaveCount(5);
});

test("First item count to be intially 10, no more and can't be < 0", async ({ page }) => {
	await page.goto('http://localhost:3000/cart');
	let value = await page.inputValue('.quantity__value');
	expect(value).toBe('10');

	await page.locator('ol > li:nth-child(1) button.quantity__decrease').click();
	expect(await page.inputValue('.quantity__value')).toBe('9');

	//Product has a maxStock so this should be 10, not 11
	await page.locator('ol > li:nth-child(1) button.quantity__increase').click({ clickCount: 2 });
	expect(await page.inputValue('.quantity__value')).toBe('10');
});

test('Attempt to set the value to negative', async ({ page }) => {
	await page.goto('http://localhost:3000/cart');
	await page.fill('//*[@id="content"]/div/div/ol/li[1]/div[3]/div/input', '-10');
	await page
		.locator('//*[@id="content"]/div/div/ol/li[1]/div[3]/div/input')
		.evaluate((e) => e.blur());
	await expect(await page.locator('//*[@id="content"]/div/div/ol/li[1]/div[4]')).toHaveText(
		'£0.00'
	);
	expect(await page.inputValue('//*[@id="content"]/div/div/ol/li[1]/div[3]/div/input')).toBe('0');
});

test('Changing quantity affects the item price', async ({ page }) => {
	await page.goto('http://localhost:3000/cart');
	await page.fill('//*[@id="content"]/div/div/ol/li[1]/div[3]/div/input', '5');
	await expect(await page.locator('//*[@id="content"]/div/div/ol/li[1]/div[4]')).toHaveText(
		'£54.95'
	);
	await expect(await page.locator('//*[@id="content"]/div/div/div[2]/div[3]/div[2]')).toHaveText(
		'£104.30'
	);
});

test('Can add more products to the basket', async ({ page }) => {
	await page.goto('http://localhost:3000/products');
	await expect(page).toHaveTitle('💡 My App - Products');
	await page.locator('text=Add to basket').first().click();
	await expect(page.locator('text=Added:').first()).toBeVisible();
});

test('Clicking delete removes a product row', async ({ page }) => {
	await page.goto('http://localhost:3000/cart');
	await page.locator('.product__actions button').first().click();
	await expect(page.locator('//*[@id="content"]/div/div/ol/li[1]')).toHaveCount(1);
});

test('Removing all items from basket disables the buy now button', async ({ page }) => {
	await page.goto('http://localhost:3000/cart');
	const removeProductButton = await page.locator('.🛒__remove');
	const count = await removeProductButton.count();

	for (let i = 0; i < count; i++) {
		//Clicking the button removes it from the dom so we always click the first item
		await removeProductButton.nth(0).click();
	}
	await expect(page.locator('text=Buy now')).toBeDisabled();
});
