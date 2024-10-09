<script lang="ts">
	import { Header } from "$lib/components/Header";
	import { page } from "$app/stores";
	import type { Snippet } from "svelte";
	let { children }: { children?: Snippet } = $props();

	const hideHeader = $derived(!$page.route.id?.startsWith("/(salesPeriod)/(clockedIn)/table"));
</script>

{#if hideHeader}
	<Header />
{/if}
{#if children}
	{@render children()}
{/if}
