<script lang="ts">
	import '../styles/index.scss';
	import Code from './Code.svelte';
	import Field from './Field.svelte';
	import RevealSecretToggle from './RevealSecretToggle.svelte';
	import Secret from './Secret.svelte';

	// TODO: blank out this default secret once we are ready for production
	let secret = 'abcdefghijklmnopqrstuvqwyz';
	let isSecretRevealed = false;
</script>

<svelte:head>
	<title>2FA Code Generator | Caleb Evans</title>
	<meta
		name="description"
		content="Have a handwritten 2FA secret and need to generate a 2FA code from it? This is a secure place to do just that!"
	/>
</svelte:head>

<main class="app">
	<h1>2FA Code Generator</h1>

	<a class="author-link" href="https://calebevans.me/"><span class="by">by</span> Caleb Evans</a>

	<p>
		Have a handwritten 2FA secret and need to generate a 2FA code from it? This is a secure place to
		do just that!
	</p>

	<form>
		<Field id="secret">
			<Secret bind:value={secret} reveal={isSecretRevealed} />
		</Field>
		<Field id="reveal">
			<RevealSecretToggle bind:enabled={isSecretRevealed} />
		</Field>
		<Field id="code">
			<Code {secret} />
		</Field>
	</form>

	<p class="disclaimer">
		<strong>Disclaimer:</strong> Nothing you type here is sent or stored anywhere. The entire
		project is open-source, and you can
		<a href="https://github.com/caleb531/2fa-code-generator" target="_blank" rel="noopener"
			>browse the source code on GitHub</a
		>
		if you'd like to see how it works.
	</p>
</main>
