<script lang="ts">
	import { page } from "$app/state";
	import {
		createStockOrderGet,
		createStockOrderItemUpdateBulk,
		type DTOStockOrderItemDTO,
	} from "$lib/api";
	import { getError } from "$lib/types";
	import { Alert, Badge, Button, Card, Loader } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import {
		DataTable,
		createShadTable,
		renderComponent,
		aggregationFns,
		renderSnippet,
	} from "@kayord/ui/data-table";
	import { BookXIcon, NotebookPenIcon, PlusIcon, XIcon } from "@lucide/svelte";
	import AddOrderItem from "./AddOrderItem.svelte";
	import Actions from "./Actions.svelte";
	import { type ColumnDef, type RowSelectionState } from "@tanstack/table-core";
	import { stringToFDate } from "$lib/util";
	import { status } from "$lib/stores/status.svelte";

	const query = createStockOrderGet(Number(page.params.Id));

	let addOrderItemOpen = $state(false);

	let data = $derived(query.data?.stockOrderItems ?? []);

	const hasOpenSalesPeriod = status.value.salesPeriodId > 0;
	const showActions = $derived(query?.data?.stockOrderStatus.id != 3 && hasOpenSalesPeriod);

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
			footer: () => aggregationFns.sum(data, "orderAmount"),
		},
		{
			header: "Actual",
			accessorKey: "actual",
			size: 1000,
			footer: () => aggregationFns.sum(data, "actual"),
		},
		{
			header: "Price",
			accessorKey: "price",
			size: 1000,
			footer: () => aggregationFns.sum(data, "price"),
		},
		{
			header: "Status",
			accessorKey: "stockOrderItemStatus.name",
			size: 1000,
			cell: (item) => renderSnippet(statusSnippet, item.row.original),
		},
		{
			header: "Status Date",
			accessorFn: (item) => stringToFDate(item.lastModified ?? item.created),
			size: 1000,
		},
		{
			header: "",
			accessorKey: "id",
			enableSorting: false,
			cell: (item) =>
				renderComponent(Actions, {
					item: item.row.original,
					refetch: query.refetch,
					showActions: showActions,
				}),
			size: 10,
		},
	];

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

	const bulkEditMutation = createStockOrderItemUpdateBulk();

	const updateSelected = async (isCancel: boolean) => {
		try {
			const stockIds: Array<number> = Object.keys(rowSelection).map((i) => Number(i));
			await bulkEditMutation.mutateAsync({
				data: {
					stockOrderId: Number(page.params.Id),
					stockIds,
					stockOrderItemStatusId: isCancel ? 3 : 2,
				},
			});
			query.refetch();
			toast.info(`Updated ${Object.keys(rowSelection).length} order items`);
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
</script>

{#snippet statusSnippet(item: DTOStockOrderItemDTO)}
	{@const variant =
		item.stockOrderItemStatusId === 1
			? "default"
			: item.stockOrderItemStatusId === 2
				? "secondary"
				: "outline"}
	{@const isPartial = item.orderAmount > item.actual && item.actual > 0}
	<Badge {variant}>
		{item.stockOrderItemStatus.name}
		{#if isPartial}
			<span class="text-xs ml-1">
				({item.actual}/{item.orderAmount})
			</span>
		{/if}
	</Badge>
{/snippet}

{#snippet addOrderItem()}
	{#if showActions}
		<Button size="sm" onclick={() => (addOrderItemOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add Item
		</Button>
	{/if}
{/snippet}

{#snippet errorMessage(message: string)}
	<Alert.Root variant="destructive">
		<Alert.Title>Error</Alert.Title>
		<Alert.Description>{message}</Alert.Description>
	</Alert.Root>
{/snippet}

<div class="m-2">
	<Loader isLoading={query.isPending} />
	{#if query.data}
		<Card.Root class="bg-secondary p-0">
			<div
				class="border-2 border-secondary p-2 rounded-md flex justify-between items-center bg-background/60 text-secondary-foreground"
			>
				<div class="flex flex-col">
					<h2 class="font-bold">Order: {query.data.orderNumber}</h2>
					<div>
						<Badge>{query.data.stockOrderStatus.name}</Badge>
					</div>
				</div>
				<div class="flex flex-col">
					<div>
						Division: {query.data.division.divisionName}
					</div>
					<div>
						Supplier: {query.data.supplier.name}
					</div>
				</div>
			</div>

			<div class="flex justify-between m-2">
				<div class="flex gap-2">
					{#if Object.keys(rowSelection).length > 0 && showActions}
						<Button size="sm" onclick={() => updateSelected(false)}>
							<NotebookPenIcon />
							Mark as Done
						</Button>
						<Button size="sm" variant="destructive" onclick={() => updateSelected(true)}>
							<BookXIcon />
							Mark as Cancelled
						</Button>
					{/if}
				</div>
				{@render addOrderItem()}
			</div>
		</Card.Root>

		<DataTable
			{table}
			headerClass="pb-2"
			isLoading={query.isPending}
			noDataMessage="No order items"
		/>
	{:else if !query.isPending}
		{@render errorMessage("An error occurred while fetching order items")}
	{/if}
	{#if query.error}
		{@render errorMessage(getError(query.error).message)}
	{/if}
	{#if Object.keys(rowSelection).length > 0 && showActions}
		<div class="flex gap-2 mt-2">
			{#if Object.keys(rowSelection).length > 0}
				<Button size="sm" onclick={() => updateSelected(false)}>
					<NotebookPenIcon />
					Mark as Done
				</Button>
				<Button size="sm" variant="destructive" onclick={() => updateSelected(true)}>
					<BookXIcon />
					Mark as Cancelled
				</Button>
			{/if}
		</div>
	{/if}
	<AddOrderItem bind:open={addOrderItemOpen} refetch={query.refetch} />
</div>
