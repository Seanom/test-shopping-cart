import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		},
		vite: {
			server: {
				fs: {
					allow: ['api']
				}
			}
		}
	},
	preprocess: [sveltePreprocess({})]
};

export default config;
