<script lang="ts">
	import { status } from "$lib/stores/status.svelte";
	import type { Snippet } from "svelte";
	import NoSalesPeriod from "../NoSalesPeriod.svelte";
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

{#if status.value.salesPeriodId > 0}
	{@render children?.()}
{:else}
	<NoSalesPeriod />
{/if}
