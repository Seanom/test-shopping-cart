<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	/**
	 * Message
	 * Display a message box that fades out after a defined period
	 */

	/**
	 * The message object passed to includes the message and ID
	 */
	export let message = {
		text: '',
		id: Math.floor(Math.random() * 99)
	};

	const dispatch = createEventDispatcher();

	function deleteMessage(id) {
		dispatch('change', {
			id
		});
	}

	setTimeout(() => {
		deleteMessage(message.id);
	}, 1000);
</script>

<div out:fade>
	{message?.text}
</div>

<style>
	div {
		background-color: var(--site-background);
		padding: 1rem;
		border-radius: 0.5rem;
		border: 1px solid var(--success);
		margin-bottom: 1rem;
	}
</style>
