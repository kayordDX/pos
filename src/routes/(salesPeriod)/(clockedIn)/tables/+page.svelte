<script lang="ts">
	import Error from "$lib/components/Error.svelte";

	import { createTableGetMyBooked } from "$lib/api";

	import { Card, Loader, Badge } from "@kayord/ui";
	import { getError } from "$lib/types";
	import { status } from "$lib/stores/status";

	const query = createTableGetMyBooked({ myBooking: false, outletId: $status?.outletId ?? 0 });
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
			<h1>Other Tables</h1>
			<p class="text-muted-foreground">Tables assigned to other waiters</p>
			<div class="flex flex-wrap gap-4 mt-4 w-full">
				{#each $query.data as otherTable}
					<a href={`/table/menu/${otherTable.id}`} class="w-full">
						<Card.Root class="p-5 w-full">
							<div class="flex justify-between gap-2 line-clamp-1 items-center">
								<h3>{otherTable.table.name}</h3>
								<Badge>{otherTable.table.section.name}</Badge>
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
