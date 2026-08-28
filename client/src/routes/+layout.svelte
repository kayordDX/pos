<script lang="ts">
	import "../layout.css";
	import { ModeWatcher } from "mode-watcher";
	import type { Snippet } from "svelte";

	let { children }: { children?: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
	<link rel="manifest" href="/manifest.json" />
</svelte:head>

<ModeWatcher defaultMode="dark" track={false} lightClassNames={["dark"]} />
{#if children}
	{@render children()}
{/if}
