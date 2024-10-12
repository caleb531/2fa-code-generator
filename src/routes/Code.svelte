<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { TOTP } from 'totp-generator';

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

	// The event handler to copy the contents of the clicked element (i.e. the
	// 2FA code) to the clipboard
	async function copyCodeToClipboard(event: Event) {
		event.preventDefault();
		const element = event.currentTarget as HTMLElement;
		await navigator.clipboard.writeText(element.innerText);
		copiedToClipboard = true;
		setTimeout(() => {
			copiedToClipboard = false;
		}, COPIED_TO_CLIPBOARD_DELAY);
	}

	// Calculate the number of seconds remaining before the 2FA code expires
	function calculateTimeRemaining() {
		return TIME_STEP - ((Date.now() / 1000) % TIME_STEP);
	}

	// Generate the 2FA code corresponding to the given TOTP secret and the
	// current time; also recompute the number of seconds remaining before the
	// code expires
	async function generateCode(secret: string) {
		code = TOTP.generate(secret).otp;
		timeRemaining = calculateTimeRemaining();
	}

	let timer: ReturnType<typeof setInterval>;

	// Re-render the 2FA code on a regular interval to re-calculate the time
	// remaining
	onMount(() => {
		timer = setInterval(() => {
			generateCode(secret);
		}, VERIFY_DELAY);
	});

	// Cancel the internal timer when the component is unmounted
	onDestroy(() => {
		clearInterval(timer);
	});

	$: {
		// If the component is in a browser context (i.e. not SSR)
		if (typeof window !== 'undefined' && secret !== '') {
			// Generate the 2FA code when the component initially mounts and
			// whenever the secret changes
			generateCode(secret);
		}
	}
</script>

<div class="code-container" class:visible={Boolean(secret)}>
	<button
		type="button"
		aria-label="Code"
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
