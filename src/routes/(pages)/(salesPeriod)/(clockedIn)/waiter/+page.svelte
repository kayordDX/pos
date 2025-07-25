<script lang="ts">
	import { Card, Button, Badge, Loader } from "@kayord/ui";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { NotebookIcon, Rows4Icon, CalendarOffIcon } from "@lucide/svelte";
	import HistoryIcon from "@lucide/svelte/icons/history";
	import { createTableGetMyBooked } from "$lib/api";
	import Orders from "./Orders.svelte";
	import { status } from "$lib/stores/status.svelte";
	import TransferTable from "../tables/TransferTable.svelte";

	const query = createTableGetMyBooked({ myBooking: true, outletId: status.value?.outletId ?? 0 });
</script>

<div class="m-2">
	{#if !status.value?.salesPeriod}
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

	{#if status.value?.salesPeriod}
		<h1>Actions</h1>
		<p class="text-muted-foreground">Book a table or view tables managed by other users</p>
		<div class="flex items-center gap-2 my-2 flex-wrap">
			<Button href="/tables/book"><NotebookIcon class="h-5 w-5 mr-2" /> Book a Table</Button>
			<Button variant="outline" href="/tables"
				><Rows4Icon class="h-5 w-5 mr-2" /> Other Tables</Button
			>
			<Button variant="outline" href="/waiter/history"
				><HistoryIcon class="h-5 w-5 mr-2" /> History</Button
			>
		</div>

		<h1 class="mt-8">My Tables</h1>
		<p class="text-muted-foreground">List of my current tables</p>

		{#if $query.isPending}
			<Loader />
		{/if}

		{#if $query.error}
			<Error message={getError($query.error).message} />
		{/if}

		<div class="flex flex-col flex-wrap gap-2 mt-4 items-start">
			{#each $query.data ?? [] as myTable}
				<a href={`/table/menu/${myTable.id}`} class="w-full">
					<Card.Root class="p-5 w-full gap-1">
						<div class="flex justify-between">
							<h3>{myTable?.table?.name}</h3>
							<Badge>{myTable?.table?.section?.name}</Badge>
						</div>
						<p class="text-xs">{myTable.bookingName}</p>
						<TransferTable otherTable={myTable} refetch={$query.refetch} />
					</Card.Root>
				</a>
			{/each}
		</div>

		<h1 class="mt-8">My Orders</h1>
		<p class="text-muted-foreground mb-4">Active Orders</p>
		<Orders />
	{/if}
</div>
