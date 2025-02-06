<script lang="ts">
	import {
		Badge,
		Button,
		createSvelteTable,
		DataTable,
		renderComponent,
		renderSnippet,
	} from "@kayord/ui";
	import Actions from "./Actions.svelte";

	import AddOrder from "./AddOrder.svelte";

	let addOrderOpen = $state(false);

	import { createStockOrderGetAll, type EntitiesStockOrder } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import {
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type SortingState,
		type Updater,
	} from "@tanstack/table-core";
	import { PlusIcon } from "lucide-svelte";

	const columns: ColumnDef<EntitiesStockOrder>[] = [
		{
			header: "Order Number",
			accessorKey: "orderNumber",
			size: 1000,
		},
		{
			header: "Status",
			accessorKey: "stockOrderStatus.name",
			cell: (item) => renderSnippet(statusCol, item.row.original.stockOrderStatus.name ?? ""),
			size: 1000,
		},
		{
			header: "Supplier",
			accessorKey: "supplier.name",
			size: 1000,
		},
		{
			header: "",
			accessorKey: "menuItemId",
			cell: (item) =>
				renderComponent(Actions, {
					stockOrder: item.row.original,
					refetch: $query.refetch,
				}),
			size: 10,
			enableSorting: false,
		},
	];

	let pagination: PaginationState = $state({ pageIndex: 0, pageSize: 10 });
	const setPagination = (updater: Updater<PaginationState>) => {
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else pagination = updater;
	};

	let sorting: SortingState = $state([]);
	const setSorting = (updater: Updater<SortingState>) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else sorting = updater;
	};

	let columnFilters = $state<ColumnFiltersState>([]);
	let filters = $state("");

	// Replacing _ with . to fix sorting issue
	const sorts = $derived(
		sorting.map((sort) => `${sort.desc ? "-" : ""}${sort.id.replaceAll("_", ".")}`).join(",")
	);

	const query = $derived(
		createStockOrderGetAll({
			page: pagination.pageIndex + 1,
			pageSize: 10,
			filters,
			sorts,
			outletId: status.value.outletId,
		})
	);

	let data = $derived($query.data?.items ?? []);
	let rowCount = $derived($query.data?.totalCount ?? 0);

	const table = createSvelteTable({
		columns,
		get data() {
			return data;
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnFiltersChange: (updater) => {
			if (typeof updater === "function") {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		manualPagination: true,
		manualFiltering: true,
		manualSorting: true,
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnFilters() {
				return columnFilters;
			},
			get columnVisibility() {
				return { menuId: false };
			},
		},
		get rowCount() {
			return rowCount;
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		enableRowSelection: false,
	});
</script>

{#snippet statusCol(status: string)}
	<Badge>{status}</Badge>
{/snippet}

{#snippet header()}
	<div class="flex gap-2 justify-between items-center">
		<div class="flex gap-2 items-center">
			<AddOrder bind:open={addOrderOpen} refetch={$query.refetch} />
		</div>
		<div class="flex gap-2 items-center">
			<Button size="sm" onclick={() => (addOrderOpen = true)}>
				<PlusIcon class="h-5 w-5" /> Add
			</Button>
		</div>
	</div>
{/snippet}

<div class="m-2">
	<h2>Orders</h2>
	<DataTable
		{table}
		{columns}
		{header}
		headerClass="pb-2"
		isLoading={$query.isPending}
		noDataMessage="No menu items"
	/>
</div>
