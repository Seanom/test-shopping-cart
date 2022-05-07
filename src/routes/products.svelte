<script>
	import { basket, firstRun } from '$lib/Basket';
	import { get } from 'svelte/store';
	import Button from '$lib/Button.svelte';
	import Message from '$lib/Message.svelte';
	import productJson from '/api/products/index.json';

	let messageList = [];

	if (get(firstRun)) {
		basket.addExtraProducts(productJson.items);
		firstRun.update(() => false);
	}

	const addProduct = (product) => {
		basket.addProduct(product);
		const text = `Added: ${product.size} ${product.name} to the basket`;
		showMessage(text, product.sku);
	};

	const addAllProducts = (products) => {
		console.log('Adding products');
		basket.addExtraProducts(products.items);
		showMessage('All products have been added to the basket', 'all-products');
	};

	const showMessage = (message, sku) => {
		const text = message;
		const id = `${sku}-${Math.floor(Math.random() * Date.now())}`;
		messageList = [...messageList, { text, id }];
	};

	const deleteMessage = (event) => {
		messageList = messageList.filter((array) => array.id !== event.detail.id);
	};
</script>

<svelte:head>
	<title>💡 My App - Products</title>
	<meta
		name="description"
		content="We don't stop playing because we grow old; we grow old because we stop playing."
	/>
</svelte:head>

<div class="product">
	<h1>Products</h1>
	<p>
		The first time you visit this page all products will automatically added to your basket,
		including an Out Of Stock item. Otherwise it should not be possible to add an OOS item to your
		basket
	</p>
	<div class="message-bag">
		{#each messageList as message (message.id)}
			<Message {message} on:change={deleteMessage} />
		{/each}
	</div>
	<h2>Products</h2>
	<Button on:click={() => addAllProducts(productJson)} variant="secondary"
		>Add all of the products</Button
	>
	<ul>
		{#each productJson.items as product}
			<li class:is-disabled={product.stockLevel === 0}>
				<h3>{product.name} {product.size}</h3>
				<p>{product.price}</p>
				{#if product.stockLevel >= 0}
					<p>{product.stockLevel > 0 ? `${product.stockLevel} Remaining` : `Out of stock`}</p>
				{/if}
				<Button
					on:click={() => addProduct(product)}
					variant="secondary"
					disabled={product.stockLevel === 0}
					>Add to basket
				</Button>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	@use '../styles/mixins/breakpoints' as *;
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		grid-auto-flow: row;
		gap: 1rem;
		padding-left: 0;
		place-content: center;
	}

	li {
		border: 1px solid var(--light);
		border-radius: 0.25rem;
		padding: 0.5rem 0.5rem 1rem;
		list-style: none;
		text-align: center;
	}

	.message-bag {
		position: fixed;
		top: 3rem;
		left: 1rem;
		z-index: 100;

		@include breakpoint-min(sm) {
			top: 130px;
			left: unset;
			right: 3rem;
		}
	}
</style>
