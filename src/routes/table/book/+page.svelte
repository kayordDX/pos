<script lang="ts">
	import { Badge, Button, Card, Dialog, Input, Label, Loader } from "@kayord/ui";
	import type { PageData } from "./$types";
	import { goto } from "$app/navigation";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { salesPeriod } from "$lib/stores/salesPeriod";
	import { outlet } from "$lib/stores/outlet";
	import { createTableBookingCreate, createTableGetAvailable } from "$lib/api";
	import { session } from "$lib/stores/session";

	const query = createTableGetAvailable({ outletId: $outlet?.outletId ?? 0 });
	let dialogOpen = false;
	let tableId: number = 0;
	let name: string;

	const selectTable = (id: number) => {
		dialogOpen = true;
		tableId = id;
	};

	const mutate = createTableBookingCreate();
	const makeBooking = async () => {
		await $mutate.mutateAsync({
			data: {
				bookingName: name,
				salesPeriodId: $salesPeriod?.id ?? 0,
				// staffId: $session?.user?.id ?? 0,
				staffId: 23,
				tableId: tableId,
			},
		});
		dialogOpen = false;
		goto("/waiter");
	};
</script>

<div class="m-8">
	<h1>Available Tables</h1>
	<p class="text-muted-foreground">Select table to book</p>

	{#if $query.isPending}
		<Loader />
	{/if}
	{#if $query.error}
		<Error message={getError($query.error).message} />
	{/if}

	{#if $query.isSuccess}
		<div class="flex flex-wrap gap-4 mt-4">
			{#each $query.data as table}
				<button class="text-start" on:click={() => selectTable(table.tableId)}>
					<Card.Root class="p-5 w-48">
						<div class="flex justify-between">
							<h3>{table.name}</h3>
							<Badge>{table.capacity}</Badge>
						</div>
						<p class="text-xs">{table.section.name}</p>
					</Card.Root>
				</button>
			{/each}
		</div>
	{/if}

	<Dialog.Root bind:open={dialogOpen}>
		<Dialog.Trigger />
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Book Table</Dialog.Title>
				<Dialog.Description>This will book the table and assign it to you</Dialog.Description>
			</Dialog.Header>
			{#if $mutate.isPending}
				<Loader />
			{/if}

			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">Booking Name</Label>
				<Input id="name" bind:value={name} class="col-span-3" />
			</div>

			<Dialog.Footer>
				<Button on:click={makeBooking}>Make Booking</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>

	<Button class="mt-4" on:click={() => history.back()}>Cancel</Button>
</div>
