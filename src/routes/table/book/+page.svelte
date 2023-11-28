<script lang="ts">
	import {
		Badge,
		Button,
		Card,
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
		Input,
		Label,
		Loader,
	} from "@kayord/ui";
	import type { PageData } from "./$types";
	import { createTableGetAvailable, createTableBookingCreate } from "$lib/api";
	import { outlet } from "$lib/stores/outletStore";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { salesPeriod } from "$lib/stores/salesPeriodStore";
	import { user } from "$lib/stores/userStore";

	const query = createTableGetAvailable({ OutletId: $outlet?.outletId ?? 0 });
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
				staffId: $user?.id ?? 0,
				tableId: tableId,
			},
		});
		dialogOpen = false;
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
					<Card class="p-5 w-48">
						<div class="flex justify-between">
							<h3>{table.name}</h3>
							<Badge>{table.capacity}</Badge>
						</div>
						<p class="text-xs">{table.section.name}</p>
					</Card>
				</button>
			{/each}
		</div>
	{/if}

	<Dialog bind:open={dialogOpen}>
		<DialogTrigger />
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Book Table</DialogTitle>
				<DialogDescription>This will book the table and assign it to you</DialogDescription>
			</DialogHeader>
			{#if $mutate.isPending}
				<Loader />
			{/if}

			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">Booking Name</Label>
				<Input id="name" bind:value={name} class="col-span-3" />
			</div>

			<DialogFooter>
				<Button on:click={makeBooking}>Make Booking</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>

	<Button class="mt-4" href="/waiter">Cancel</Button>
</div>
