<script lang="ts">
	import { page } from "$app/state";
	import { createStockOrderGet, type DTOStockOrderItemDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import {
		Alert,
		Badge,
		Button,
		Card,
		createSvelteTable,
		DataTable,
		Loader,
		Table,
	} from "@kayord/ui";
	import { PlusIcon } from "lucide-svelte";
	import AddOrderItem from "./AddOrderItem.svelte";
	import Actions from "./Actions.svelte";
	import {
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type SortingState,
		type Updater,
	} from "@tanstack/table-core";

	const query = createStockOrderGet(Number(page.params.Id));

	let addOrderItemOpen = $state(false);

	const columns: ColumnDef<DTOStockOrderItemDTO>[] = [
		{
			header: "Stock",
			accessorKey: "stock.name",
			size: 1000,
		},
		{
			header: "Ordered Amount",
			accessorKey: "orderAmount",
			size: 1000,
		},
		{
			header: "Actual",
			accessorKey: "actual",
			size: 1000,
		},
		{
			header: "Price",
			accessorKey: "price",
			size: 1000,
		},
		{
			header: "Status",
			accessorKey: "stockOrderItemStatus.name",
			size: 1000,
		},
	];

	let data = $derived($query.data?.stockOrderItems ?? []);

	let sorting: SortingState = $state([]);
	const setSorting = (updater: Updater<SortingState>) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else sorting = updater;
	};

	const table = createSvelteTable({
		columns,
		get data() {
			return data;
		},
		state: {
			get sorting() {
				return sorting;
			},
		},
		enableRowSelection: false,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
	});
</script>

{#snippet addOrderItem()}
	<Button size="sm" onclick={() => (addOrderItemOpen = true)}>
		<PlusIcon class="h-5 w-5" /> Add Item
	</Button>
{/snippet}

{#snippet errorMessage(message: string)}
	<Alert.Root variant="destructive">
		<Alert.Title>Error</Alert.Title>
		<Alert.Description>{message}</Alert.Description>
	</Alert.Root>
{/snippet}

<div class="m-2">
	<Loader isLoading={$query.isPending} />
	{#if $query.data}
		<div
			class="border-2 border-secondary p-2 rounded-md flex justify-between items-center bg-secondary text-secondary-foreground"
		>
			<div class="flex flex-col">
				<h2 class="font-bold">Order: {$query.data.orderNumber}</h2>
				<div>
					<Badge>{$query.data.stockOrderStatus.name}</Badge>
				</div>
			</div>
			<div class="flex flex-col">
				<div>
					Division: {$query.data.division.divisionName}
				</div>
				<div>
					Supplier: {$query.data.supplier.name}
				</div>
			</div>
		</div>

		<div class="flex justify-end m-2">
			{@render addOrderItem()}
		</div>

		<DataTable
			{table}
			{columns}
			headerClass="pb-2"
			isLoading={$query.isPending}
			noDataMessage="No order items"
		/>

		{#if ($query.data?.stockOrderItems?.length ?? 0) > 0}
			<Table.Root class="mt-2">
				<Table.Header>
					<Table.Row>
						<Table.Head>Stock</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head>Ordered Amount</Table.Head>
						<Table.Head>Actual</Table.Head>
						<Table.Head>Price</Table.Head>
						<Table.Head class="w-[40px]"></Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each $query.data?.stockOrderItems ?? [] as item}
						<Table.Row>
							<Table.Cell>{item.stock.name}</Table.Cell>
							<Table.Cell>{item.stockOrderItemStatus.name}</Table.Cell>
							<Table.Cell>{item.orderAmount}</Table.Cell>
							<Table.Cell>{item.actual}</Table.Cell>
							<Table.Cell>{item.price}</Table.Cell>
							<Table.Cell class="w-[40px] py-0">
								<Actions {item} refetch={$query.refetch} />
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{:else if !$query.isPending}
			<Alert.Root class="border-dashed">
				<Alert.Title>No Items</Alert.Title>
				<Alert.Description>Select Add Item to add new Items to Order</Alert.Description>
			</Alert.Root>
		{/if}
	{:else if !$query.isPending}
		{@render errorMessage("An error occurred while fetching order items")}
	{/if}
	{#if $query.error}
		{@render errorMessage(getError($query.error).message)}
	{/if}

	<AddOrderItem bind:open={addOrderItemOpen} refetch={$query.refetch} />
</div>
