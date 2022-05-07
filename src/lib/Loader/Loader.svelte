<script>
	/**
	 * The loading message to display
	 * @type {string}
	 */
	export let message = 'Loading...';
	/**
	 * The duration of the rotation
	 * @type {number}
	 */
	export let duration = 2;
</script>

<div class="loader">
	<div class="loader__icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 122.315 122.88">
			<animateTransform
				attributeName="transform"
				type="rotate"
				from="0 0 0"
				to="360 0 0"
				begin="0s"
				dur={duration}
				repeatCount="indefinite"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M94.754 14.534c8.844 0 16.014 7.17 16.014 16.012 0 8.844-7.17 16.015-16.014 16.015-8.843 0-16.013-7.17-16.013-16.015 0-8.842 7.17-16.012 16.013-16.012zm14.511 37.587c-7.205 0-13.049 5.844-13.049 13.048 0 7.207 5.844 13.049 13.049 13.051 7.207 0 13.051-5.844 13.051-13.051-.001-7.204-5.844-13.048-13.051-13.048zm-15.13 37.782c-5.032 0-9.114 4.082-9.114 9.113 0 5.032 4.082 9.114 9.114 9.114 5.031 0 9.113-4.082 9.113-9.114 0-5.031-4.082-9.113-9.113-9.113zm-34.86 14.747c-5.032 0-9.114 4.081-9.114 9.113 0 5.034 4.082 9.116 9.114 9.116s9.113-4.082 9.113-9.116c.001-5.032-4.08-9.113-9.113-9.113zM23.652 90.86a8.54 8.54 0 000 17.08 8.54 8.54 0 000-17.08zM9.096 54.872a9.095 9.095 0 10-.001 18.19 9.095 9.095 0 00.001-18.19zm14.556-37.846c-6.354 0-11.508 5.155-11.508 11.509s5.154 11.506 11.508 11.506 11.506-5.152 11.506-11.506-5.152-11.509-11.506-11.509zM59.341 0C51.69 0 45.483 6.205 45.483 13.855c0 7.651 6.207 13.856 13.858 13.856s13.856-6.205 13.856-13.856C73.197 6.205 66.992 0 59.341 0z"
			/></svg
		>
		<h4>{message}</h4>
	</div>
</div>

<style lang="scss">
	.loader {
		position: absolute;
		text-align: center;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.loader__icon {
		display: flex;
	}

	svg {
		width: 50px;
		height: 50px;
	}

	svg path {
		fill: #000;
	}

	h4 {
		margin: 8px 20px;
	}
</style>
