<script lang="ts">
	// Whether or not the actual secret is shown within the input
	export let reveal = false;
</script>

<label for="secret">Secret:</label>
<input
	id="secret"
	class="secret"
	type={reveal ? 'text' : 'password'}
	placeholder="Your 2FA secret"
/>
