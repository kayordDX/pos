<script lang="ts">
	import { createCashUpUserGet } from "$lib/api";
	import { Loader } from "@kayord/ui";
	import { status } from "$lib/stores/status.svelte";
	import { getError } from "$lib/types";
	import Error from "$lib/components/Error.svelte";
	import CashUpUser from "./CashUpUser.svelte";

	const query = createCashUpUserGet(() => status.value.outletId);
</script>

{#if query.isPending}
	<Loader />
{/if}
{#if query.error}
	<Error message={getError(query.error).message} />
{/if}

{#if query.data}
	<div class="flex flex-col gap-2 items-center">
		{#each query.data.items as cash}
			<CashUpUser {cash} />
		{/each}
	</div>
{/if}
