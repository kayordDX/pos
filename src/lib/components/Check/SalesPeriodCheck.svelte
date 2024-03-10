<script lang="ts">
	import { status } from "$lib/stores/status";
	import NoSalesPeriod from "../NoSalesPeriod.svelte";
</script>

{#if $status.salesPeriodId > 0}
	<slot />
{:else}
	<NoSalesPeriod />
{/if}
