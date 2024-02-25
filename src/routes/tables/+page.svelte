<script lang="ts">
	import type { PageData } from "./$types";
	import Error from "$lib/components/Error.svelte";

	export let data: PageData;

	import { createTableGetMyBooked } from "$lib/api";

	import { Card, Loader } from "@kayord/ui";
	import { getError } from "$lib/types";

	const query = createTableGetMyBooked({ myBooking: false, outletId: data.status?.outletId ?? 0 });
</script>

<div class="m-8">
	{#if $query.isPending}
		<Loader />
	{/if}
	{#if $query.error}
		<Error message={getError($query.error).message} />
	{/if}
	{#if $query.isSuccess}
		{#if $query.data.length > 0}
			<div class="flex flex-wrap gap-4 mt-4">
				{#each $query.data as otherTable}
					<a href={`/table/menu/${otherTable.id}`}>
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
		{:else}
			<div class="flex items-center justify-center">
				<Card.Root class="max-w-md w-full">
					<Card.Header>
						<Card.Title>Booked Tables</Card.Title>
						<Card.Description>There are no tables booked by other users</Card.Description>
					</Card.Header>
				</Card.Root>
			</div>
		{/if}
	{/if}
</div>
