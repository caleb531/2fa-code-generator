<script lang="ts">
	export let enabled: boolean;
</script>

<label for="reveal">Reveal secret?</label>
<input type="checkbox" id="reveal" bind:checked={enabled} />
