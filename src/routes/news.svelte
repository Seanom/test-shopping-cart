<script context="module">
	export const prerender = true;
</script>

<script>
	let jokesPromise;

	const fetchJokes = async () => {
		// I was going to leave this page blank, and was enjoying working with Svelte so decided to add a little more
		const response = await fetch(
			'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit&type=twopart&amount=5',
			{
				method: 'GET',
				headers: {
					accept: 'application/json'
				}
			}
		);

		const jokeList = await response.json();

		if (response.ok) {
			return jokeList;
		} else {
			throw new Error(response.statusText);
		}
	};

	jokesPromise = fetchJokes();
</script>

<svelte:head>
	<title>💡 My App - Home</title>
	<meta
		name="description"
		content="We don't stop playing because we grow old; we grow old because we stop playing."
	/>
</svelte:head>

<div class="contact">
	<h1>New details</h1>
	<div class="intro">
		<p>
			I don't often get the change to play with some of the newer HTML elements, so here are a few
			jokes using the details element
		</p>
	</div>
	{#await jokesPromise}
		<p>...waiting</p>
	{:then content}
		{#each content.jokes as { setup, delivery }}
			<details>
				<summary>{setup}</summary>
				<p>🤦 {delivery}</p>
			</details>
		{/each}
	{:catch error}
		<div class="alert">
			<p class="alert__message">An error occurred!, {error.message}</p>
		</div>
	{/await}
</div>

<style lang="scss">
	summary {
		margin-bottom: 0.5rem;
		border: 1px var(--site-gray) solid;
		padding: 8px;
		border-radius: 4px;
	}

	details {
		p {
			border-bottom: 1px var(--site-gray) solid;
		}
	}
</style>
