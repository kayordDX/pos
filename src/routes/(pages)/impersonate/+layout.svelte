<script lang="ts">
	import Header from "$lib/components/Header/Header.svelte";
	import type { Snippet } from "svelte";
	let { children }: { children?: Snippet } = $props();
</script>

{#if children}
	<Header />
	{@render children()}
{/if}
