<script lang="ts">
	// Whether the secret is currently revealed
	export let enabled: boolean;
</script>

<label for="reveal">Reveal secret?</label>
<input type="checkbox" id="reveal" bind:checked={enabled} />
