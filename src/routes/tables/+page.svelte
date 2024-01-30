<script lang="ts">
	import type { PageData } from "./$types";
	import Error from "$lib/components/Error.svelte";

	export let data: PageData;

	import { createTableGetMyBooked } from "$lib/api";

	import { Card, Loader } from "@kayord/ui";
	import { getError } from "$lib/types";

	const query = createTableGetMyBooked({ myBooking: false, outletId: data.outlet?.outletId ?? 0 });
</script>

<div>
	{#if $query.isPending}
		<Loader />
	{/if}
	{#if $query.error}
		<Error message={getError($query.error).message} />
	{/if}
	{#if $query.isSuccess}
		<div class="flex flex-wrap gap-4 mt-4">
			{#each $query.data as otherTable}
				<a href={`/table/${otherTable.id}`}>
					<Card.Root class="p-5 w-48">
						<div class="flex justify-between">
							<h3>{otherTable.table.name}</h3>
							<p>{otherTable.table.section.name}</p>
						</div>
						<p class="text-xs">{otherTable.bookingName}</p>
					</Card.Root>
				</a>
			{/each}
		</div>
	{/if}
</div>
