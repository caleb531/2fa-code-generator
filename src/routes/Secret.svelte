<script lang="ts">
	export let value: string;
	// Whether or not the actual secret is shown within the input
	export let reveal = false;

	// Svelte prohibits us from binding to the input's `value` attribute
	// directly because the input type is not static (see
	// <https://stackoverflow.com/a/57393751/560642>); to fix this, we can
	// simply listen for the input's `input` event and update the variable
	// accordingly
	function updateValue(event: Event & { currentTarget: HTMLInputElement }) {
		value = event.currentTarget.value;
	}
</script>

<label for="secret">Secret:</label>
<input
	id="secret"
	class="secret"
	type={reveal ? 'text' : 'password'}
	placeholder="Your 2FA secret"
	{value}
	on:input={updateValue}
/>
