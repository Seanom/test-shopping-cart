<script>
	import { browser } from '$app/env';
	import Header from '$lib/header/Header.svelte';
	import '../styles/app.scss';
	import Button from '../lib/Button.svelte';

	let darkMode;

	const toggleDarkMode = () => {
		darkMode = !darkMode;
		if (darkMode) {
			setDarkMode();
		} else {
			setLightMode();
		}
	};
	const setDarkMode = () => {
		window.document.body.classList.add('is-dark-mode');
		darkMode = true;
		if (browser) {
			localStorage.setItem('darkMode', 'dark');
		}
	};

	const setLightMode = () => {
		window.document.body.classList.remove('is-dark-mode');
		darkMode = false;
		if (browser) {
			localStorage.setItem('darkMode', 'light');
		}
	};

	if (browser) {
		const currentMode = window.localStorage.getItem('darkMode');

		if (currentMode === 'dark') {
			setDarkMode();
		} else {
			setLightMode();
		}
	}
</script>

<div class="skip-btn-wrapper">
	<a class="button button--secondary button--skip sr-only sr-only-focusable" href="#content">
		<span>Skip to main content</span>
	</a>
</div>
<article>
	<Header />

	<main id="content">
		<slot />
	</main>

	<footer class="text-right">
		<!-- I've been wanting to add in a dark mode to a site, and decided to give it a go here -->
		<Button on:click={toggleDarkMode} variant="secondary" label="Toggle" />
	</footer>
</article>

<style lang="scss">
	@use '../styles/mixins/breakpoints' as *;

	:global(body.is-dark-mode) {
		--site-background: var(--site-dark);
		--site-header-background: var(--site-dark);
		--site-color: var(--site-light);
		--border-color: var(--site-light);
		--navigation-toggle: var(--site-light);
		--input-background: var(--black);
		--navigation-hover-background: var(--black);
		--quantity-button: var(--site-blue);
		--quantity-button-hover: var(--black);
		--link-color: var(--white);
		--site-header-shadow: 0 12px 12px rgba(255, 255, 255, 0.05);
	}

	.skip-btn-wrapper {
		position: relative;
	}

	.button--skip {
		background-color: var(--navigation-hover-background);
		color: var(--site-color);
		font-size: 1rem;
		border-radius: 2px;
		padding: 0.5rem;
		position: absolute;
		z-index: 1000;
		text-decoration: none;
		border: 2px solid;

		&:hover {
		}
	}

	article {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	main,
	footer {
		flex-shrink: 0;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 647px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;

		@include breakpoint-min(sm) {
			padding-left: 0;
			padding-right: 0;
		}
	}
</style>
