<script lang="ts">
	import { TOTP } from 'totp-generator';

	// The number of seconds a 2FA code will last before we must generate a new
	// code
	const TIME_STEP = 30;
	// The number of milliseconds to wait before re-rendering the countdown or
	// checking if the code is still valid
	const VERIFY_DELAY = 500;
	// The number of milliseconds to display the "Copied!" message after copying the code to the clipboard
	const COPIED_TO_CLIPBOARD_DELAY = 750;

	interface Props {
		secret: string;
	}

	let { secret }: Props = $props();
	let code: string = $state('-');
	let timeRemaining: number | undefined = $state();
	let copiedToClipboard = $state(false);

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
	function generateCode(secret: string) {
		code = TOTP.generate(secret).otp;
		timeRemaining = calculateTimeRemaining();
	}

	let timer: ReturnType<typeof setInterval>;

	// Re-render the 2FA code on a regular interval to re-calculate the time
	// remaining
	$effect(() => {
		timer = setInterval(() => {
			generateCode(secret);
		}, VERIFY_DELAY);
		return () => {
			// Cancel the internal timer when the component is unmounted
			clearInterval(timer);
		};
	});

	// Immediately regenerate code whenever secret changes
	$effect(() => {
		generateCode(secret);
	});
</script>

<div class="code-container" class:visible={Boolean(secret)}>
	<button
		type="button"
		aria-label="Code"
		class="code"
		class:copied={copiedToClipboard}
		onclick={copyCodeToClipboard}
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
				style:--percent-time-remaining={Math.ceil(timeRemaining || 0) / TIME_STEP}
			></div>
		</div>
		<div class="code-countdown-count">{Math.ceil(timeRemaining || 0)}</div>
	</div>
</div>
