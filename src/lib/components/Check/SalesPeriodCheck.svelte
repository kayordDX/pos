<script lang="ts">
	import { status } from "$lib/stores/status";
	import NoSalesPeriod from "../NoSalesPeriod.svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{#if $status.salesPeriodId > 0}
	{@render children?.()}
{:else}
	<NoSalesPeriod />
{/if}
