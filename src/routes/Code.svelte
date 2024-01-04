<script lang="ts">
	import { getOTPLib } from '$lib';

	export let secret: string;
	let code: string;

	async function generateCode(secret: string) {
		const { totp } = await getOTPLib();
		code = totp.generate(secret);
	}

	$: {
		if (typeof window !== 'undefined') {
			generateCode(secret);
		}
	}
</script>

<p class="code-container">
	{#if code}
		<span class="code">{code}</span>
	{:else}
		<span class="loading">Loading...</span>
	{/if}
</p>
