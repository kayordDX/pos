<script lang="ts">
	import { Card, Button, Badge } from "@kayord/ui";
	import type { PageData } from "./$types";
	export let data: PageData;
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { outlet } from "$lib/stores/outlet";
</script>

<div class="m-8">
	<h1>Table Booking</h1>
	<Button href="/table/book">Book a Table</Button>

	<h1 class="mt-8">My Tables</h1>
	<p class="text-muted-foreground">List of my current tables</p>

	{#if data.myTables.error}
		<Error message={getError(data.myTables.error).message} />
	{/if}

	<div class="flex flex-wrap gap-4 mt-4">
		{#each data.myTables.data ?? [] as myTable}
			<a href={`/table/${myTable.id}`}>
				<Card.Root class="p-5 w-48">
					<div class="flex justify-between">
						<h3>{myTable?.table?.name}</h3>
						<Badge>{myTable?.table?.section?.name}</Badge>
					</div>
					<p class="text-xs">{myTable.bookingName}</p>
				</Card.Root>
			</a>
		{/each}
	</div>

	<h1 class="mt-8">Other Tables</h1>
	<p class="text-muted-foreground">Tables managed by other users</p>
	<!-- {#if $queryOther.isPending}
		<Loader />
	{/if}
	{#if $queryOther.error}
		<Error message={getError($queryOther.error).message} />
	{/if}
	{#if $queryOther.isSuccess}
		<div class="flex flex-wrap gap-4 mt-4">
			{#each $queryOther.data as otherTable}
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
	{/if} -->
</div>
