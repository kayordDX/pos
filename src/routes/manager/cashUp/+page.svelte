<script>
	import { createCashUpUserGet } from "$lib/api";
	import { Loader } from "@kayord/ui";
	import { status } from "$lib/stores/status";
	import { getError } from "$lib/types";
	import Error from "$lib/components/Error.svelte";
	import CashUpUser from "./CashUpUser.svelte";
	import CashUpSummary from "./CashUpSummary.svelte";

	const query = createCashUpUserGet($status.outletId);
</script>

<div class="m-2">
	{#if $query.isPending}
		<Loader />
	{/if}
	{#if $query.error}
		<Error message={getError($query.error).message} />
	{/if}

	{#if $query.data}
		<CashUpSummary />
		<div class="flex flex-col gap-2 items-center">
			{#each $query.data as cash}
				<CashUpUser {cash} />
			{/each}
		</div>
	{/if}
</div>
