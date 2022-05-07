<script lang="ts">
	/**
	 * Button
	 * Simple button component
	 */

	/**
	 * The visible text in the button
	 * @type {string}
	 */
	export let label = 'Button Text';
	/**
	 * Disable the button
	 * @param {('true'|'false'|null)}
	 */
	export let disabled = null;

	/**
	 * The button variant style
	 * @param {('primary'|'secondary'|'blank')}
	 */
	export let variant = 'primary';
	/**
	 * Which DOM element to return
	 * @param {('button'|'a')}
	 */
	export let as = 'button';
	/**
	 * As anchor defines href url
	 * * @type {string}
	 */
	export let href = '#';
	/**
	 * As anchor defines target
	 * @type {string}
	 */
	export let target = '_blank';
	/**
	 * Enables a html class to be applied to the dom element
	 * @param {(string|null)}
	 */
	export let className = null;

	const classes = `button button--${variant} ${className}`;
	const title = target === '_blank' ? `${label} (opens in a new window)` : undefined;
</script>

{#if as === 'button'}
	<button on:click class={classes} {disabled}>
		<slot>{label}</slot>
	</button>
{:else if as === 'a' && href}
	<a on:click {href} {target} {title} rel="noreferrer" class={classes}>
		<slot>{label}</slot>
	</a>
{:else}
	<em>Button missing default props</em>
{/if}

<style lang="scss">
	@use '../styles/base/variables';

	.button {
		border: none;
		background-color: transparent;
		color: currentColor;
		font-size: 1rem;
		border-radius: 2px;

		&:hover {
			background-color: var(--navigation-hover-background);
		}

		&[disabled] {
			opacity: 0.7;
			cursor: not-allowed;
		}
	}

	.button--primary {
		color: var(--site-color-inverted);
		font-size: 1rem;
		background-color: var(--button-background);
		background-blend-mode: normal;
		font-weight: 400;
		line-height: 15px;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.3257143px;
		display: inline-block;
		padding: 1rem;
		border-radius: 4px;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.12),
			0 2px 4px rgba(0, 0, 0, 0.14);

		&:hover {
			background-color: var(--button-background-hover);
		}
	}

	.button--secondary {
		color: var(--site-color);
		background-color: var(--site-background);
		border: 1px var(--site-blue) solid;
		background-blend-mode: normal;
		font-weight: 400;
		line-height: 15px;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.3257143px;
		display: inline-block;
		padding: 1rem;
		border-radius: 4px;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.12),
			0 2px 4px rgba(0, 0, 0, 0.14);

		&:hover {
			filter: saturate(20%);
		}
	}

	.button--blank {
		background-color: transparent;
		margin-left: auto;
	}
</style>
