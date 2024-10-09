<script lang="ts">
	import { Header } from "$lib/components/Header";
	import type { Snippet } from "svelte";
	let { children }: { children?: Snippet } = $props();
</script>

<Header />
{#if children}
	{@render children()}
{/if}
