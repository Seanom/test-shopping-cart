<script lang="ts">
	/**
	 * Quantity input
	 * Increases or decreases a count
	 */

	/**
	 * Used to determine what the minimum quantity should be
	 * @type {number}
	 */
	export let minCount = 0;

	/**
	 * Used to keep track of the maximum number, used to ensure the user can no add more then the stockLevel
	 * @type {number}
	 */
	export let maxCount = 10;

	/**
	 * The input value
	 * @type {number}
	 */
	export let count = 0;
	let manualValue;

	const increaseQuantity = () => {
		if (maxCount <= 0) return;
		setMaxNumber();
		if (count >= maxCount) {
			count = Number(maxCount);
		}

		count++;
	};

	const decreaseQuantity = () => {
		if (count <= 0) return (count = 0);

		setMinNumber();
		count--;
	};

	const onBlur = () => {
		count = Math.trunc(count);
		if (count >= 1 && count <= maxCount) return;
		setMinNumber();
		setMaxNumber();
	};

	const onKeyDown = (e) => {
		let oldValue = manualValue;
		let newValue = e.target.value;

		if (newValue.length < 3) {
			manualValue = newValue;
		} else {
			e.target.value = oldValue;
		}
	};

	const setMaxNumber = () => {
		if (count <= maxCount) return;
		count = Number(maxCount);
	};

	const setMinNumber = () => {
		if (count >= 1) return;
		count = Number(minCount);
	};

	$: count = count;
</script>

<div class="quantity">
	<button
		class="quantity__decrease"
		on:click={decreaseQuantity}
		disabled={count <= minCount || null}
		aria-label="Decrease Quantity">&ndash;</button
	>
	<input
		aria-label="Quantity"
		class="quantity__value"
		step="1"
		pattern="[0-9]+"
		type="number"
		bind:value={count}
		min="0"
		max={maxCount}
		disabled={!maxCount || null}
		on:keydown|stopPropagation={onKeyDown}
		on:blur={onBlur}
	/>
	<button
		class="quantity__increase"
		on:click={increaseQuantity}
		disabled={count >= maxCount || null}
		aria-label="Increase Quantity">&plus;</button
	>
</div>

<style lang="scss">
	@use 'src/styles/base/root';
	@use '../styles/mixins/breakpoints' as *;

	.quantity {
		border: 1px solid var(--site-blue);
		border-radius: 6px;
		display: inline-grid;
		grid-template-columns: 1.8rem minmax(2rem, 1fr) 1.8rem;
		color: var(--site-blue);
		padding: 0;
		justify-content: center;
		z-index: 10;
		margin-left: auto;
	}

	.quantity__decrease,
	.quantity__increase {
		border: none;
		background-color: transparent;
		color: currentColor;
		font-size: 1.5rem;
		&:focus-visible {
			background-color: var(--site-blue);
			color: var(--white);
			outline: none;
			&:hover {
				background-color: var(--quantity-button);
				opacity: 0.8;
			}
		}
		&:hover {
			background-color: var(--quantity-button-hover);
		}
	}

	.quantity__decrease {
		padding-left: 8px;
		padding-right: 2px;
		border-radius: 4px 0 0 4px;
		border-right: 1px solid transparent;
	}

	.quantity__increase {
		padding-left: 2px;
		border-radius: 0 4px 4px 0;
		border-left: 1px solid transparent;
	}

	.quantity__value {
		width: auto;
		font-size: 1rem;
		border: none;
		text-align: center;
		color: currentColor;
		z-index: 11;
		padding-left: 0.75rem;
		background-color: var(--input-background);

		&:focus-visible {
			outline-offset: 1px;
		}

		@include breakpoint-min(sm) {
			width: 2.5rem;
		}
	}

	button[disabled] {
		opacity: 0.2;
		cursor: not-allowed;
	}
</style>
