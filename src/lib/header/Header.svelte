<script>
	import { page } from '$app/stores';
	let menuActive = false;

	const closeMenu = () => {
		menuActive = false;
	};
</script>

<header>
	<div class="logo">
		<a sveltekit:prefetch href="/" title="App">
			<svg width="59.427" height="19.024" xmlns="http://www.w3.org/2000/svg"
				><path
					d="M11.351 11.773H6.58c-.65 0-1.055.053-1.213.158-.158.106-.37.457-.633 1.055l-.857 1.938c-.387.888-.58 1.547-.58 1.977 0 .413.103.712.31.897.206.184.613.343 1.22.475.263.052.4.158.408.316.009.15-.114.224-.37.224-.096 0-.245-.004-.447-.013l-1.266-.066a35.59 35.59 0 0 0-1.463-.027c-.255 0-.453.005-.594.014-.448.035-.694.052-.738.052-.237 0-.356-.079-.356-.237 0-.14.075-.233.224-.277l.488-.145c.176-.053.413-.266.712-.64a6.04 6.04 0 0 0 .738-1.166l.382-.87L9.321.396C9.435.132 9.563 0 9.703 0s.26.127.356.382l5.669 14.502.29.712c.413 1.064.756 1.725 1.028 1.984.273.26.827.464 1.662.613.272.053.404.163.395.33-.009.15-.132.224-.37.224-.078 0-.245-.009-.5-.026-.457-.044-1.27-.066-2.44-.066-1.22 0-1.985.026-2.293.079-.185.035-.32.053-.409.053-.228 0-.342-.093-.342-.277 0-.14.11-.233.33-.277l.408-.092c.44-.088.659-.387.659-.897 0-.466-.268-1.393-.804-2.782l-.66-1.74c-.184-.483-.329-.762-.434-.837-.106-.075-.405-.112-.897-.112Zm.158-2.11-2.07-5.22-.105-.277c-.105-.281-.22-.426-.343-.435-.061-.009-.132.075-.21.25L6.208 9.69c-.114.246-.17.409-.17.488 0 .228.201.342.606.342l.355.014h3.982c.44 0 .66-.11.66-.33 0-.061-.023-.163-.067-.303l-.066-.237ZM23.944 2.77v10.995l-.013 1.279.04 1.107c.096 1.063.492 1.683 1.186 1.859.483.132.848.197 1.094.197.264 0 .4.08.409.238.017.228-.136.343-.462.343-.149 0-.443-.018-.883-.053a24.781 24.781 0 0 0-1.37-.027l-.937-.026-1.028.013c-.519 0-.91.018-1.174.053a6.635 6.635 0 0 1-.751.066c-.229 0-.343-.088-.343-.264 0-.167.145-.272.435-.316.686-.106 1.154-.492 1.404-1.16.25-.668.376-1.872.376-3.613V5.458c0-1.846-.11-3.012-.33-3.5-.22-.488-.769-.78-1.648-.877-.237-.018-.351-.105-.342-.264.009-.202.18-.303.514-.303.167 0 .391.022.672.066.554.08 1.011.119 1.371.119.563 0 1.38-.049 2.452-.145a17.848 17.848 0 0 1 1.358-.066c1.837 0 3.33.441 4.476 1.325 1.147.883 1.72 2.037 1.72 3.46 0 1.723-.702 3.081-2.109 4.074-1.054.739-2.17 1.108-3.348 1.108a5.9 5.9 0 0 1-1.523-.185c-.461-.123-.683-.255-.666-.395.018-.106.101-.159.25-.159.071 0 .159.013.264.04.203.061.528.092.976.092 1.266 0 2.279-.347 3.039-1.041.76-.695 1.14-1.618 1.14-2.769 0-1.327-.5-2.426-1.503-3.296-1.002-.87-2.272-1.305-3.81-1.305-.351 0-.593.066-.725.198s-.198.382-.198.751l-.013.383Zm14.241 0v10.995l-.013 1.279.04 1.107c.096 1.063.492 1.683 1.186 1.859.483.132.848.197 1.094.197.264 0 .4.08.409.238.018.228-.136.343-.461.343-.15 0-.444-.018-.884-.053a24.786 24.786 0 0 0-1.37-.027l-.937-.026-1.028.013c-.519 0-.91.018-1.173.053a6.638 6.638 0 0 1-.752.066c-.228 0-.343-.088-.343-.264 0-.167.145-.272.435-.316.686-.106 1.154-.492 1.404-1.16.25-.668.376-1.872.376-3.613V5.458c0-1.846-.11-3.012-.33-3.5-.22-.488-.769-.78-1.648-.877-.237-.018-.351-.105-.342-.264.008-.202.18-.303.514-.303.167 0 .391.022.672.066.554.08 1.011.119 1.371.119.563 0 1.38-.049 2.453-.145a17.85 17.85 0 0 1 1.357-.066c1.837 0 3.33.441 4.476 1.325 1.147.883 1.72 2.037 1.72 3.46 0 1.723-.702 3.081-2.109 4.074-1.054.739-2.17 1.108-3.348 1.108a5.9 5.9 0 0 1-1.523-.185c-.461-.123-.683-.255-.666-.395.018-.106.101-.159.25-.159.071 0 .159.013.264.04.202.061.528.092.976.092 1.266 0 2.278-.347 3.039-1.041.76-.695 1.14-1.618 1.14-2.769 0-1.327-.5-2.426-1.503-3.296-1.002-.87-2.272-1.305-3.81-1.305-.351 0-.593.066-.725.198s-.198.382-.198.751l-.013.383ZM53.863.316c.94 0 1.736.137 2.386.41l.91.381a.58.58 0 0 0 .237.053c.106 0 .211-.044.317-.132l.184-.158c.027-.035.075-.053.145-.053.22-.008.33.207.33.646 0 .15.057.594.171 1.332l.211 1.358c.044.29.066.47.066.54 0 .273-.092.41-.277.41-.14 0-.28-.212-.422-.634-.316-.949-.96-1.731-1.93-2.346-.972-.616-2.055-.923-3.25-.923-.95 0-1.743.279-2.38.837-.638.558-.956 1.255-.956 2.09 0 .738.206 1.375.62 1.911.36.457.753.791 1.18 1.002.426.211 1.474.593 3.144 1.147 3.252 1.064 4.878 2.808 4.878 5.234 0 1.644-.598 2.988-1.793 4.034-1.196 1.046-2.73 1.569-4.601 1.569-.677 0-1.422-.097-2.235-.29-.813-.194-1.409-.418-1.786-.673-.159-.105-.264-.217-.317-.336-.053-.118-.132-.424-.237-.916-.018-.07-.127-.47-.33-1.2-.228-.79-.343-1.353-.343-1.687 0-.264.088-.391.264-.382.158.008.299.224.422.646.317 1.09.985 2.003 2.004 2.742 1.02.738 2.127 1.107 3.322 1.107 1.213 0 2.24-.356 3.079-1.068.839-.712 1.259-1.577 1.259-2.597 0-.975-.387-1.797-1.16-2.465-.396-.343-1.539-.83-3.428-1.464-1.951-.659-3.333-1.388-4.146-2.188-.814-.8-1.22-1.837-1.22-3.111 0-1.424.53-2.584 1.589-3.48C50.829.764 52.193.315 53.863.315Z"
					fill-rule="evenodd"
				/></svg
			>
		</a>
	</div>

	<nav>
		<button class="nav__toggle" on:click={() => (menuActive = true)}>
			<span>Menu</span>
			<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"
				><path
					d="M16 19v-2h16v2H16Zm0 6v-2h16v2H16Zm0 6v-2h16v2H16Z"
					fill-opacity=".54"
					fill-rule="evenodd"
				/></svg
			>
		</button>

		<span
			class="header__curtain"
			on:click={() => (menuActive = !menuActive)}
			class:is-active={menuActive}>&nbsp;</span
		>
		<ul class="header__nav" on:click={closeMenu}>
			<li class:active={$page.url.pathname === '/products'}>
				<a sveltekit:prefetch href="/products">Products</a>
			</li>
			<li class:active={$page.url.pathname === '/news'}>
				<a sveltekit:prefetch href="/news">News</a>
			</li>
			<li class:active={$page.url.pathname === '/contact'}>
				<a sveltekit:prefetch href="/contact">Contact</a>
			</li>
			<li class:active={$page.url.pathname === '/cart'}>
				<a sveltekit:prefetch href="/cart">
					<span class="sr-only">Menu</span>
					<svg width="20" height="17" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
						><path
							d="M18.747 3.46h-3.275c-.016-.024-.032-.05-.056-.07L11.672.25a.3.3 0 1 0-.385.459l3.28 2.751H5.213L8.493.708A.3.3 0 1 0 8.108.25L4.365 3.39c-.024.02-.04.045-.056.07H1.034C.464 3.46 0 3.924 0 4.494v1.917c0 .57.464 1.034 1.034 1.034h.587l.802 8.044c.06.59.551 1.036 1.144 1.036h12.647c.593 0 1.085-.445 1.144-1.036l.802-8.043h.587c.57 0 1.034-.464 1.034-1.034V4.495c0-.57-.464-1.035-1.034-1.035ZM16.76 15.43a.549.549 0 0 1-.547.495H3.567a.55.55 0 0 1-.548-.496l-.796-7.984h15.334l-.796 7.984Zm2.42-9.019c0 .24-.194.435-.434.435H1.034a.435.435 0 0 1-.435-.435V4.494c0-.24.195-.434.435-.434h17.713c.24 0 .435.195.435.434v1.917Z"
						/><path
							d="M5.547 14.075a.3.3 0 0 0 .3-.3V9.429a.3.3 0 1 0-.6 0v4.346a.3.3 0 0 0 .3.3ZM8.443 14.075a.3.3 0 0 0 .3-.3V9.429a.3.3 0 1 0-.6 0v4.346a.3.3 0 0 0 .3.3ZM11.337 14.075a.3.3 0 0 0 .3-.3V9.429a.3.3 0 1 0-.6 0v4.346a.3.3 0 0 0 .3.3ZM14.232 14.075a.3.3 0 0 0 .3-.3V9.429a.3.3 0 1 0-.6 0v4.346a.3.3 0 0 0 .3.3Z"
							fill-rule="evenodd"
						/></svg
					>
				</a>
			</li>
		</ul>
	</nav>
</header>

<style lang="scss">
	@use 'src/styles/base/root' as *;
	@use 'src/styles/mixins/breakpoints' as *;

	$navigationBreakpointSize: sm;

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: var(--site-header-background);
		box-shadow: var(--site-header-shadow);
		padding: 0.5rem 1rem;
		flex-shrink: 0;

		@include breakpoint-min(#{$navigationBreakpointSize}) {
			position: sticky;
			top: 0;
			left: 0;
			right: 0;
			z-index: 100;
		}
	}

	.header__nav {
		background-color: var(--site-header-background);
		padding-block: 0.5rem;
		display: none;
		z-index: 101;

		@include breakpoint-min(#{$navigationBreakpointSize}) {
			display: flex;
		}

		.is-active ~ & {
			display: block;
			position: absolute;
			right: 0.5rem;
			top: 0.5rem;
			border-radius: 2px;

			@include breakpoint-min(#{$navigationBreakpointSize}) {
				position: relative;
				right: auto;
				left: auto;
			}
		}
	}

	.header__curtain {
		display: none;
		width: 100%;
		height: 100%;
		background-color: var(--site-background-opacity);
		z-index: 100;

		&.is-active {
			display: block;
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;

			@include breakpoint-min(#{$navigationBreakpointSize}) {
				background-color: transparent;
			}
		}

		@include breakpoint-min(#{$navigationBreakpointSize}) {
			display: none;
		}
	}

	.nav__toggle {
		text-align: center;
		padding: 0;
		border: none;
		background-color: transparent;
		display: flex;
		align-items: center;
		color: currentColor;

		@include breakpoint-min(#{$navigationBreakpointSize}) {
			display: none;
		}

		> span {
			text-transform: uppercase;
			font-size: 0.9rem;
			@include breakpoint-min(#{$navigationBreakpointSize}) {
				display: none;
			}
		}
	}

	.logo a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	path {
		fill: var(--navigation-toggle);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		margin-block: 0.1rem;

		a {
			display: block;
			padding: 1rem;
		}
	}

	nav a {
		color: var(--heading-color);
		text-transform: uppercase;
		text-decoration: none;
		transition: color 0.2s linear, background-color 0.3s ease-in-out;
		border-radius: 2px;
		background-color: transparent;

		&:hover {
			background-color: var(--navigation-hover-background);
		}
	}
</style>
