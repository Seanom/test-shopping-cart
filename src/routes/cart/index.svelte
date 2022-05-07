<script lang="ts">
	import Loader from '../../lib/Loader/Loader.svelte';
	import Basket from '../../lib/Basket.svelte';
	import { basket, basketInformation } from '../../lib/Basket';
</script>

<svelte:head>
	<title>💡 My App - Basket</title>
	<meta name="description" content="My App the place for all your base" />
</svelte:head>

<div class="basket">
	<h1>Your Basket</h1>
	<p>
		Items you have added to your basket are shown below. Adjust the quantities or remove items
		before continuing purchase.
	</p>

	{#await basket}
		<Loader message="Loading..." />
	{:then response}
		<Basket {basket} {basketInformation} />
	{:catch error}
		<div class="alert">
			<div class="alert__message">
				<h3>I'm sorry we encountered an error</h3>
				<p>{error.message}</p>
			</div>
		</div>
	{/await}
</div>
