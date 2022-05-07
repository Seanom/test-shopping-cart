<script lang="ts">
	import Quantity from './Quantity.svelte';
	import Button from './Button.svelte';
	import { get } from 'svelte/store';

	export let basket;
	export let basketInformation;

	const checkoutProcess = () => {
		const basketData = basket.checkout();
		fetch('https://62707b8f6a36d4d62c19bb34.mockapi.io/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(basketData)
		})
			.then((response) => {
				if (response.ok) {
					console.log('Data posted', basketData);
					console.log(response);
					alert('Order Successfully received: ');
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const formatCurrency = (value) => {
		return new Intl.NumberFormat('en-GB', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(value);
	};

	let itemCount;
	const countItems = () => {
		let count = 0;
		Array.prototype.forEach.call(get(basket).products, (product) => {
			count = count + product.quantity;
		});
		return count;
	};

	$: {
		itemCount = countItems();
	}
</script>

<svelte:head>
	<title>💡 My App - Basket</title>
	<meta name="title" content="Basket contains {itemCount} items" />
</svelte:head>

<div class="🛒">
	<div class="🛒__header">
		<div class="🛒__title">Product</div>
		<div class="🛒__title text-right">Price</div>
		<div class="🛒__title text-center">Quantity</div>
		<div class="🛒__title text-right">Cost</div>
		<div class="🛒__title">&nbsp;</div>
	</div>
	<ol class="🛒__items">
		{#if $basket.products.length > 0}
			{#each $basket.products as entryItem}
				<li class="🛒__row {entryItem.product.stockLevel === 0 ? 'is-disabled' : ''}">
					<div class="product__title">
						{entryItem.product.name}
						{#if entryItem.product.size}, {entryItem.product.size}{/if}
						{#if entryItem.product.stockLevel <= 0}
							<span class="product__message"> Product is no longer available </span>
						{/if}
					</div>
					<div class="🛒__information product__price text-right" style="--product-label: 'Price'">
						&pound;{entryItem.product.price}
					</div>
					<div class="🛒__information" style="--product-label: 'Quantity'">
						<Quantity bind:count={entryItem.quantity} maxCount={entryItem.product.stockLevel} />
					</div>
					<div class="🛒__information product__cost text-right" style="--product-label: 'Cost'">
						&pound;{formatCurrency(entryItem.totalPrice)}
					</div>
					<div class="🛒__information product__actions" style="--product-label: 'Remove'">
						<Button
							label="Buy now"
							on:click={basket.removeProduct(entryItem.product)}
							variant="blank"
							className="🛒__remove"
						>
							<span class="sr-only">Remove Item</span>
							<svg width="18" height="20" xmlns="http://www.w3.org/2000/svg">
								<g fill-rule="evenodd">
									<path
										d="m16.305 2.32-.643 16.003c-.022.555-.516 1.01-1.097 1.01H3.435c-.582 0-1.075-.455-1.097-1.01L1.695 2.32a.342.342 0 0 0-.36-.32.34.34 0 0 0-.335.345l.642 16.002C1.68 19.262 2.48 20 3.435 20h11.13c.954 0 1.756-.738 1.793-1.652L17 2.346A.34.34 0 0 0 16.666 2a.342.342 0 0 0-.361.32Z"
									/>
									<path
										d="M9 5.333v11.334c0 .184.224.333.5.333s.5-.15.5-.333V5.333C10 5.15 9.776 5 9.5 5s-.5.15-.5.333ZM5 5.343l.333 11.334a.333.333 0 0 0 .667-.02L5.667 5.324a.333.333 0 1 0-.667.02ZM12.334 5.324 12 16.657a.333.333 0 0 0 .666.02L13 5.343a.333.333 0 0 0-.666-.02ZM.346 3h17.308c.191 0 .346-.224.346-.5s-.155-.5-.346-.5H.346C.155 2 0 2.224 0 2.5s.155.5.346.5ZM5.68 2l.391-.84c.132-.283.562-.532.916-.532h4.026c.356 0 .783.247.916.532l.391.84.68-.233-.392-.84C12.364.404 11.668 0 11.013 0H6.987c-.654 0-1.352.405-1.595.927L5 1.767 5.68 2Z"
									/>
								</g>
							</svg>
						</Button>
					</div>
				</li>
			{/each}
		{:else}
			Your basket is empty
		{/if}
	</ol>
	<div class="🛒__footer">
		<div class="🛒__cost-row">
			<div class="🛒__label">Subtotal</div>
			<div class="🛒__value">£{formatCurrency($basket.totalSum)}</div>
		</div>
		<div class="🛒__cost-row">
			<div class="🛒__label">VAT at {$basketInformation.vatRate}%</div>
			<div class="🛒__value">£{formatCurrency($basket.totalVat)}</div>
		</div>
		<div class="🛒__cost-row">
			<div class="🛒__label"><strong>Total cost</strong></div>
			<div class="🛒__value font-weight-bold">£{formatCurrency($basket.totalCost)}</div>
		</div>
		<div class="🛒__actions">
			{#if $basket.basketContainsOOSItem}
				<p class="product__message">Please remove the out of stock to enable the button</p>
			{/if}
			<Button
				label="Buy now"
				on:click={checkoutProcess}
				disabled={$basket.products.length === 0 ||
					$basket.totalCost === 0 ||
					$basket.basketContainsOOSItem}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	@use '../styles/mixins/breakpoints' as *;

	$viewport-break-size: sm;

	:root {
		--table-grid: 1fr 5rem 7rem 5rem 3.5rem;
	}

	// Fun fact emoji's can be used as CSS classes, I don't use these in client work, though this felt a little more acceptable
	.🛒 {
		display: grid;
		grid-template-columns: 1fr;
		grid-row-gap: 1rem;
		row-gap: 1rem;
	}

	.🛒__row {
		column-gap: 1rem;
		margin-bottom: 3rem;

		@include breakpoint-min($viewport-break-size) {
			grid-template-columns: var(--table-grid);
			grid-auto-flow: row;
			display: grid;
			align-items: center;
		}

		&.is-disabled {
			cursor: not-allowed;
			.🛒__information,
			.product__title {
				pointer-events: none;
			}
			.product__actions {
				pointer-events: painted;
			}
		}
	}

	.🛒__header {
		display: none;
		@include breakpoint-min($viewport-break-size) {
			display: grid;
			column-gap: 1rem;
			grid-template-columns: var(--table-grid);
			border-bottom: 1px solid var(--border-color);
			padding-bottom: 1rem;
			font-weight: 500;
		}
	}

	//[1] Remove padding and list style in case class is used on a UL/OL
	.🛒__items {
		padding-left: 0; // [1]
		list-style: none; // [1]
		margin: 0;
	}

	.🛒__cost-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		margin: 0.8rem 0;
		column-gap: 1rem;
		@include breakpoint-min($viewport-break-size) {
			grid-template-columns: repeat(2, 1fr) 3.5rem;
		}
	}

	.🛒__value {
		text-align: end;
	}

	.🛒__information {
		display: grid;
		grid-template-columns: minmax(4rem, 50%) 1fr;
		text-align: end;
		margin-top: 1rem;
		margin-bottom: 1rem;
		align-items: center;

		@include breakpoint-min($viewport-break-size) {
			display: inline-block;
			text-align: center;
			grid-template-columns: 3rem;
		}

		&:before {
			content: var(--product-label, 'Information');
			text-align: start;

			@include breakpoint-min($viewport-break-size) {
				content: none;
			}
		}
	}

	.🛒__actions {
		text-align: right;
		padding-top: 2rem;

		@include breakpoint-min($viewport-break-size) {
			padding-right: 4.5rem;
		}
	}

	:global(.🛒__remove path) {
		fill: var(--site-blue);
	}

	.product__title {
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		opacity: 0.87;
		border-bottom: 1px solid var(--border-color);
		margin-bottom: 1rem;
		padding-bottom: 1rem;

		@include breakpoint-min($viewport-break-size) {
			border-bottom-color: transparent;
			margin-bottom: 0;
			padding-bottom: 0;
		}
	}

	.product__price,
	.product__cost {
		text-align: right;
	}

	.product__message {
		color: var(--warning);
		font-weight: 500;
	}
</style>
