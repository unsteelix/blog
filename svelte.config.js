import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		files: {
			assets: 'volume/videos',
		}
	},
	preprocess: preprocess(),
};

export default config;
