<script lang="ts">
	import { page } from "$app/state";
	import { createStockOrderGet, type DTOStockOrderItemDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import {
		Alert,
		Badge,
		Button,
		Card,
		createShadTable,
		DataTable,
		Loader,
		renderComponent,
		toast,
	} from "@kayord/ui";
	import { NotebookPenIcon, PlusIcon } from "lucide-svelte";
	import AddOrderItem from "./AddOrderItem.svelte";
	import Actions from "./Actions.svelte";
	import { type ColumnDef, type RowSelectionState } from "@tanstack/table-core";

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
		{
			header: "",
			accessorKey: "id",
			enableSorting: false,
			cell: (item) =>
				renderComponent(Actions, {
					item: item.row.original,
					refetch: $query.refetch,
				}),
			size: 10,
		},
	];

	let data = $derived($query.data?.stockOrderItems ?? []);

	let rowSelection: RowSelectionState = $state({});

	const table = createShadTable({
		columns,
		getRowId: (row) => row.stockId.toString(),
		get data() {
			return data;
		},
		state: {
			get rowSelection() {
				return rowSelection;
			},
		},
		enableRowSelection: true,
		enablePaging: false,
		onRowSelectionChange: (updater) => {
			if (updater instanceof Function) {
				rowSelection = updater(rowSelection);
			} else rowSelection = updater;
		},
	});

	const updateSelected = async () => {
		try {
			$query.refetch();
			toast.info(`Updated ${Object.keys(rowSelection).length} order items`);
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
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
		<Card.Root class="bg-secondary">
			<div
				class="border-2 border-secondary p-2 rounded-md flex justify-between items-center bg-background/60 text-secondary-foreground"
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

			<div class="flex justify-between m-2">
				<div>
					{#if Object.keys(rowSelection).length > 0}
						<Button size="sm" onclick={updateSelected}>
							<NotebookPenIcon />
							Update Selected
						</Button>
					{/if}
				</div>
				{@render addOrderItem()}
			</div>
		</Card.Root>

		<DataTable
			{table}
			{columns}
			headerClass="pb-2"
			isLoading={$query.isPending}
			noDataMessage="No order items"
		/>
	{:else if !$query.isPending}
		{@render errorMessage("An error occurred while fetching order items")}
	{/if}
	{#if $query.error}
		{@render errorMessage(getError($query.error).message)}
	{/if}
	{#if Object.keys(rowSelection).length > 0}
		<Button size="sm" class="mt-2" onclick={updateSelected}>
			<NotebookPenIcon />
			Update Selected
		</Button>
	{/if}
	<AddOrderItem bind:open={addOrderItemOpen} refetch={$query.refetch} />
</div>
