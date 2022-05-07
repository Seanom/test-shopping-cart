export type iBasket = {
	products: iBasketItem[];
	totalSum: number;
	totalVat: number;
	totalCost: number;
	basketContainsOOSItem: boolean;
};

export type iBasketItem = {
	product: iProduct;
	quantity?: number;
	totalPrice: number;
};

export type iProduct = {
	sku: string;
	name: string;
	price: number;
	size?: string;
	stockLevel?: number;
};
