<script lang="ts">
	import { page } from "$app/state";
	import SalesPeriodCheck from "$lib/components/Check/SalesPeriodCheck.svelte";
	import { Header } from "$lib/components/Header";
	import type { Snippet } from "svelte";
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	const hideHeader = $derived(!page.route.id?.startsWith("/(salesPeriod)/(clockedIn)/table"));
</script>

{#if hideHeader}
	<Header />
{/if}
<SalesPeriodCheck>
	{@render children?.()}
</SalesPeriodCheck>
