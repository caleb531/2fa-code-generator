<script lang="ts">
	import { getOTPLib } from '$lib';
	import { onDestroy, onMount } from 'svelte';

	// The number of seconds a 2FA code will last before we must generate a new
	// code
	const TIME_STEP = 30;
	// The number of milliseconds to wait before re-rendering the countdown or
	// checking if the code is still valid
	const VERIFY_DELAY = 500;

	export let secret: string;
	let code: string;
	let timeRemaining: number;

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
		if (typeof window !== 'undefined') {
			generateCode(secret);
		}
	}
</script>

<div class="code-container">
	{#if code}
		<div class="code">{code}</div>
	{:else}
		<div class="loading">Loading...</div>
	{/if}
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
