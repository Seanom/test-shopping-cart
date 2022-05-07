<script context="module">
	export const prerender = true;
</script>

<svelte:head>
	<title>💡 My App - Home</title>
	<meta
		name="description"
		content="We don't stop playing because we grow old; we grow old because we stop playing."
	/>
</svelte:head>

<div>
	<h1>App</h1>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam delectus eos,
		exercitationem incidunt, labore nostrum perspiciatis placeat reiciendis tempore, unde vel
		voluptatibus. Aperiam doloribus enim porro praesentium quisquam. Enim?
	</p>
	<a sveltekit:prefetch href="/cart">Shopping Basket</a>
</div>

<style>
	a {
		color: var(--link-color);
		font-weight: 500;
	}
</style>
