<script lang="ts">
	import { Badge, Button, Card, Dialog, Input, Label, Loader } from "@kayord/ui";
	import { goto } from "$app/navigation";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { createTableBookingCreate, createTableGetAvailable } from "$lib/api";
	import { status } from "$lib/stores/status";

	const query = createTableGetAvailable({ outletId: $status?.outletId ?? 0 });
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
				salesPeriodId: $status?.salesPeriodId ?? 0,
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
		<div class="flex flex-wrap gap-4 mt-4 w-full">
			{#each $query.data as table}
				<button class="text-start w-full md:w-48" on:click={() => selectTable(table.tableId)}>
					<Card.Root class="p-5">
						<div class="flex justify-between gap-2">
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
</div>
