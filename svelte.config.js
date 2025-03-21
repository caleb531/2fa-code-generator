import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		// Remove #svelte-announcer since it is only used when navigating
		// between routes, whereas our application consists of only a single
		// route; this is necessary to work around the CSP error that the
		// announcer's inline style triggers
		// (<https://github.com/sveltejs/kit/issues/11993>); solution taken from
		// <https://github.com/sveltejs/kit/issues/12661>
		{
			name: 'strip-announcer',
			markup: ({ content: code }) => {
				code = code.replace(/<div id="svelte-announcer" [\s\S]*?<\/div>/, '{null}');
				return { code };
			}
		}
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		// Content Security Policy
		csp: {
			directives: {
				'default-src': ["'none'"],
				'img-src': ["'self'"],
				'font-src': ["'self'", 'data:'],
				'style-src': ["'self'"],
				'script-src': ["'self'"],
				'connect-src': ["'self'"],
				'base-uri': ["'none'"]
			}
		}
	}
};

export default config;
