import { derived, get, readable, writable } from 'svelte/store';
import { iBasket, iBasketItem } from '../types';

// Don't allow decimals or negative numbers for the quantity
const getWholeNumber = (value) => Math.floor(Math.abs(value));

// Setup some data that we don't want to amend
export const basketInformation = readable({
	vatRate: 20
});

// Only used the first time, and would not usually be added to an actual project
// Flag added to prevent the initial load continually adding to the cart
export const firstRun = writable<Object>(true);

const initBasket = () => {
	let basketStore = writable<iBasket>({
		// Adding some initial dummy products in, though usually done by the user, however hardcoded for a direct visit to the cart page
		products: [
			{
				product: {
					sku: 'AWDT0001-S',
					name: 'Cotten T-Shirt',
					size: 'small',
					price: 10.99,
					stockLevel: 10
				},
				totalPrice: 54.95,
				quantity: 10
			},
			{
				product: {
					sku: 'AWDT0001-M',
					name: 'Cotten T-Shirt',
					size: 'medium',
					price: 10.99,
					stockLevel: 50
				},
				totalPrice: 10.99,
				quantity: 1
			},
			{
				product: {
					sku: 'AWDT0001-L',
					name: 'Cotten T-Shirt',
					size: 'large',
					price: 10.99,
					stockLevel: 0
				},
				totalPrice: 10.99,
				quantity: 0
			},
			{
				product: {
					sku: 'AWDT0002',
					name: 'Baseball cap',
					price: 5.99,
					stockLevel: 7
				},
				totalPrice: 5.99,
				quantity: 1
			},
			{
				product: {
					sku: 'AWDT0003-M',
					name: 'Shorts',
					price: 14.99,
					stockLevel: 100,
					size: 'medium'
				},
				totalPrice: 14.99,
				quantity: 1
			}
		],
		totalSum: 0,
		totalVat: 0,
		totalCost: 0,
		basketContainsOOSItem: false
	});

	// The following values are calculated based on amends from the current basket, as they are updated they update the store
	let updatedStore = derived(basketStore, (updatedBasketStore) => {
		updatedBasketStore.basketContainsOOSItem = false;
		updatedBasketStore.products.forEach((item) => {
			item.totalPrice = Number((item.product.price * getWholeNumber(item.quantity)).toFixed(2));
			if (item.product.stockLevel === 0) {
				updatedBasketStore.basketContainsOOSItem = true;
			}
		});

		updatedBasketStore.totalSum = updatedBasketStore.products.reduce(
			(sum, item) => Number((sum + item.product.price * getWholeNumber(item.quantity)).toFixed(2)),
			0
		);
		updatedBasketStore.totalVat = Number(
			(updatedBasketStore.totalSum * (get(basketInformation).vatRate / 100)).toFixed(2)
		);
		updatedBasketStore.totalCost = Number(
			(updatedBasketStore.totalSum + updatedBasketStore.totalVat).toFixed(2)
		);

		return updatedBasketStore;
	});

	return {
		addProduct: function (product) {
			// Populate the basket with items
			// let addedToBasket;
			if (this.findProduct(get(basketStore), product)) {
				// The item exists in the basket so increase the quantity
				basketStore.update((currentBasket) => {
					let currentItem: iBasketItem = this.findProduct(currentBasket, product);

					if (currentItem.quantity < product.stockLevel) {
						currentItem.quantity++;
					}
					// addedToBasket = {
					// 	currentProduct: currentItem,
					// 	quantity: currentItem.quantity,
					// 	addedToBasket: false
					// };
					return currentBasket;
				});
			} else {
				// The item has not been found so update the basket with the product as some extra details
				basketStore.update((basketStore) => {
					basketStore.products.push({
						product: product,
						totalPrice: product.price,
						quantity: product.stockLevel > 0 ? 1 : 0 // Don't add the product if out of stock
					});
					// addedToBasket = {
					// 	currentProduct: product,
					// 	addedToBasket: true
					// };
					return basketStore;
				});
			}
		},
		removeProduct: function (product) {
			if (this.findProduct(get(basketStore), product)) {
				basketStore.update((currentBasket) => {
					currentBasket.products = currentBasket.products.filter(
						(cartItem) => JSON.stringify(cartItem.product) != JSON.stringify(product)
					);
					return currentBasket;
				});
			}
		},

		// TODO review increasing the quantity here instead of within the component and binding the value
		// increaseQuantity: function (product) {
		// 	if (this.findProduct(get(basketStore), product)) {
		// 		basketStore.update((currentBasket) => {
		// 			let currentItem = this.findProduct(currentBasket, product);
		// 			if (currentItem.quantity < product.stockLevel) {
		// 				currentItem.quantity++;
		// 			}
		// 			return currentBasket;
		// 		});
		// 	}
		// },
		// decreaseQuantity: function (product) {
		// 	if (!this.findProduct(get(basketStore), product)) return;
		//
		// 	basketStore.update((currentBasket) => {
		// 		let currentItem = this.findProduct(currentBasket, product);
		// 		currentItem.quantity--;
		// 		return currentBasket;
		// 	});
		// },
		findProduct: (productArray, product) => {
			if (!productArray.products) return;

			return productArray.products.find((item) => {
				return JSON.stringify(item.product) === JSON.stringify(product);
			});
		},
		subscribe: updatedStore.subscribe,
		set: basketStore.set,
		addExtraProducts: function (products) {
			if (products !== undefined && products.length <= 0) return false;

			Array.prototype.forEach.call(products, (product) => {
				this.addProduct(product);
			});
		},
		checkout: () => get(updatedStore)
	};
};

export const basket = initBasket();
