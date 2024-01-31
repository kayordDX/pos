<script lang="ts">
	import { Card, Button, Badge, Loader } from "@kayord/ui";
	import type { PageData } from "./$types";
	export let data: PageData;
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { NotebookIcon, Rows4Icon, CalendarOffIcon } from "lucide-svelte";

	import { createTableGetMyBooked } from "$lib/api";
	import { error } from "@sveltejs/kit";

	const query = createTableGetMyBooked({ myBooking: false, outletId: data.outlet?.outletId ?? 0 });
</script>

<div class="m-8">
	{#if !data.salesPeriod}
		<Card.Root>
			<Card.Header class="flex flex-row items-center gap-4">
				<CalendarOffIcon />
				<div>
					<Card.Title>No Active sales period</Card.Title>
					<Card.Description
						>Once a sales period has been opened you can get started</Card.Description
					>
				</div>
			</Card.Header>
		</Card.Root>
	{/if}

	{#if data.salesPeriod}
		<h1>My Tables</h1>
		<p class="text-muted-foreground">List of my current tables</p>

		{#if $query.isPending}
			<Loader />
		{/if}

		{#if $query.error}
			<Error message={getError($query.error).message} />
		{/if}

		<div class="flex flex-wrap gap-4 mt-4">
			{#each $query.data ?? [] as myTable}
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

		<h1 class="mt-8">Table Booking</h1>
		<p class="text-muted-foreground mb-4">Book a new table</p>
		<Button href="/table/book"><NotebookIcon class="h-5 w-5 mr-2" /> Book a Table</Button>

		<h1 class="mt-8">Other Tables</h1>
		<p class="text-muted-foreground mb-4">Tables managed by other users</p>
		<Button href="/tables"><Rows4Icon class="h-5 w-5 mr-2" /> View Tables</Button>
	{/if}
</div>
