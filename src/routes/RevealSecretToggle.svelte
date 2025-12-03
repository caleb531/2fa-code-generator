<script lang="ts">
	interface Props {
		// Whether the secret is currently revealed
		enabled: boolean;
	}

	let { enabled = $bindable() }: Props = $props();
</script>

<label for="reveal">Reveal secret?</label>
<input type="checkbox" id="reveal" bind:checked={enabled} />
