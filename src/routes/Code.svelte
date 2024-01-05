<script lang="ts">
	import { getOTPLib } from '$lib';
	import { onDestroy, onMount } from 'svelte';

	// The number of seconds a 2FA code will last before we must generate a new
	// code
	const TIME_STEP = 30;
	// The number of milliseconds to wait before re-rendering the countdown or
	// checking if the code is still valid
	const VERIFY_DELAY = 500;
	// The number of milliseconds to display the "Copied!" message after copying the code to the clipboard
	const COPIED_TO_CLIPBOARD_DELAY = 750;

	export let secret: string;
	let code: string;
	let timeRemaining: number;
	let copiedToClipboard = false;

	async function copyCodeToClipboard(event: Event) {
		event.preventDefault();
		const element = event.currentTarget as HTMLElement;
		await navigator.clipboard.writeText(element.innerText);
		copiedToClipboard = true;
		setTimeout(() => {
			copiedToClipboard = false;
		}, COPIED_TO_CLIPBOARD_DELAY);
	}

	function calculateTimeRemaining() {
		return TIME_STEP - ((Date.now() / 1000) % TIME_STEP);
	}

	async function generateCode(secret: string) {
		const { totp } = await getOTPLib();
		code = totp.generate(secret);
		timeRemaining = calculateTimeRemaining();
	}

	let timer: ReturnType<typeof setInterval>;

	onMount(() => {
		timer = setInterval(() => {
			generateCode(secret);
		}, VERIFY_DELAY);
	});

	onDestroy(() => {
		clearInterval(timer);
	});

	$: {
		if (typeof window !== 'undefined' && secret !== '') {
			generateCode(secret);
		}
	}
</script>

<div class="code-container" class:visible={Boolean(secret)}>
	<button
		class="code"
		class:copied={copiedToClipboard}
		on:click={copyCodeToClipboard}
		tabindex="0"
	>
		{code}
	</button>
	<div class="copy-to-clipboard-message">
		{#if copiedToClipboard}
			Copied!
		{:else}
			Click to copy
		{/if}
	</div>
	<div class="code-countdown" class:visible={timeRemaining !== undefined}>
		<div class="code-countdown-bar-wrapper">
			<div
				class="code-countdown-bar"
				style:--percent-time-remaining={Math.ceil(timeRemaining) / TIME_STEP}
			></div>
		</div>
		<div class="code-countdown-count">{Math.ceil(timeRemaining)}</div>
	</div>
</div>
