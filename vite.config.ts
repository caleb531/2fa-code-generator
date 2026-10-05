import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit({
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
					// Remove the announcer whether its opening tag uses spaces or newlines
					markup: ({ content: code }) => {
						code = code.replace(
							/<div\s+id="svelte-announcer"\s[\s\S]*?<\/div>/,
							'{null}'
						);
						return { code };
					}
				}
			],

			// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
			// If your environment is not supported or you settled on a specific environment, switch out the adapter.
			// See https://kit.svelte.dev/docs/adapters for more information about adapters.
			adapter: adapter(),
			// Content Security Policy
			csp: {
				directives: {
					'default-src': ['none'],
					'img-src': ['self'],
					'font-src': ['self', 'data:'],
					'style-src': ['self'],
					'script-src': ['self'],
					'connect-src': ['self'],
					'base-uri': ['none']
				}
			}
		}),
		svelteTesting()
	],
	test: {
		environment: 'jsdom',
		globals: true,
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			exclude: [
				'build',
				'*.config.js',
				'src/routes/+layout.ts',
				...coverageConfigDefaults.exclude
			],
			reporter: ['text', 'lcov', 'html', 'text-summary']
		}
	}
});
