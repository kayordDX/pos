<script lang="ts">
	import { resolve } from "$app/paths";
	import { Card, Button, Badge, Loader } from "@kayord/ui";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { NotebookIcon, Rows4Icon, CalendarOffIcon } from "@lucide/svelte";
	import HistoryIcon from "@lucide/svelte/icons/history";
	import { createTableGetBooked } from "$lib/api";
	import Orders from "./Orders.svelte";
	import { status } from "$lib/stores/status.svelte";
	import TransferTable from "../tables/TransferTable.svelte";

	const query = createTableGetBooked(() => ({
		myBooking: true,
		outletId: status.value?.outletId ?? 0,
	}));
</script>

<div class="m-2">
	{#if !status.value?.salesPeriod}
		<Card.Root>
			<Card.Header class="flex flex-row items-center gap-4">
				<CalendarOffIcon />
				<div>
					<Card.Title>No Active sales period</Card.Title>
					<Card.Description>Once a sales period has been opened you can get started</Card.Description>
				</div>
			</Card.Header>
		</Card.Root>
	{/if}

	{#if status.value?.salesPeriod}
		<h1>Actions</h1>
		<p class="text-muted-foreground">Book a table or view tables managed by other users</p>
		<div class="my-2 flex flex-wrap items-center gap-2">
			<Button href="/tables/book"><NotebookIcon class="mr-2 h-5 w-5" /> Book a Table</Button>
			<Button variant="outline" href="/tables"><Rows4Icon class="mr-2 h-5 w-5" /> Other Tables</Button>
			<Button variant="outline" href="/waiter/history"><HistoryIcon class="mr-2 h-5 w-5" /> History</Button>
		</div>

		<h1 class="mt-8">My Tables</h1>
		<p class="text-muted-foreground">List of my current tables</p>

		{#if query.isPending}
			<Loader />
		{/if}

		{#if query.error}
			<Error message={getError(query.error).message} />
		{/if}

		<div class="mt-4 flex flex-col flex-wrap items-start gap-2">
			{#each query.data ?? [] as myTable (myTable.id)}
				<a href={resolve(`/table/menu/${myTable.id}`)} class="w-full">
					<Card.Root class="w-full gap-1 p-5">
						<div class="flex justify-between">
							<h3>{myTable?.table?.name}</h3>
							<Badge>{myTable?.table?.section?.name}</Badge>
						</div>
						<p class="text-xs">{myTable.bookingName}</p>
						<TransferTable otherTable={myTable} refetch={query.refetch} />
					</Card.Root>
				</a>
			{/each}
		</div>

		<h1 class="mt-8">My Orders</h1>
		<p class="text-muted-foreground mb-4">Active Orders</p>
		<Orders />
	{/if}
</div>
