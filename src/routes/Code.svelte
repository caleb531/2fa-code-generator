<script lang="ts">
	export let secret: string;

	let buffer: typeof import('@otplib/preset-browser/buffer');
	let otplib: typeof import('@otplib/preset-browser');
	let code: string;

	async function generateCode(secret: string) {
		if (!buffer) {
			buffer = await import('@otplib/preset-browser/buffer');
			window.Buffer = buffer.Buffer;
		}
		if (!otplib) {
			otplib = await import('@otplib/preset-browser');
		}
		code = otplib.totp.generate(secret);
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
