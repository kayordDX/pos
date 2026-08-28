<script lang="ts">
	import { createStockGetAll, type StockGetAllResponse } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Button } from "@kayord/ui";
	import { DataTable, createShadTable, renderComponent } from "@kayord/ui/data-table";
	import {
		type ColumnDef,
		getCoreRowModel,
		type Updater,
		type PaginationState,
		type SortingState,
		type ColumnFiltersState,
		getPaginationRowModel,
		getFilteredRowModel,
		getSortedRowModel,
	} from "@tanstack/table-core";
	import QueryBuilder from "fluent-querykit";
	import { PlusIcon } from "@lucide/svelte";
	import Actions from "./Actions.svelte";
	import Total from "./Total.svelte";
	import AddStock from "./AddStock.svelte";
	import Search from "$lib/components/Search.svelte";

	const columns: ColumnDef<StockGetAllResponse>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 1000,
		},
		{
			header: "Unit",
			accessorKey: "unitName",
			size: 1000,
			enableSorting: false,
		},
		{
			header: "Category",
			accessorKey: "categoryDisplayName",
			size: 1000,
			enableSorting: false,
		},
		{
			header: "Total",
			accessorKey: "id",
			cell: (item) =>
				renderComponent(Total, {
					id: item.row.original.id,
					name: item.row.original.name,
					totalActual: item.row.original.totalActual,
					refetch: query.refetch,
				}),
			size: 1000,
			enableSorting: false,
		},
		{
			header: "",
			accessorKey: "name",
			cell: (item) =>
				renderComponent(Actions, {
					stock: item.row.original,
					refetch: query.refetch,
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

	const sorts = $derived(sorting.map((sort) => `${sort.desc ? "-" : ""}${sort.id}`).join(","));

	const query = createStockGetAll(() => ({
		page: pagination.pageIndex + 1,
		pageSize: 10,
		filters,
		sorts,
		outletId: status.value.outletId,
	}));
	let data = $derived(query.data?.items ?? []);
	let rowCount = $derived(query.data?.totalCount ?? 0);

	const table = createShadTable({
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
		},
		get rowCount() {
			return rowCount;
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		enableRowSelection: false,
	});

	let search = $state("");
	$effect(() => {
		const qb = new QueryBuilder(false, false);
		if (search) {
			qb.containsCaseInsensitive("name", search);
		}
		filters = qb.build();
	});

	$effect(() => {
		if (table.getPageCount() > 0 && pagination.pageIndex > table.getPageCount() - 1) {
			pagination.pageIndex = 0;
		}
	});

	let addOpen = $state(false);
</script>

{#snippet header()}
	<div class="flex gap-2 justify-between items-center">
		<div class="flex gap-2 items-center">
			<Search bind:search name="Stock Items" />
		</div>
		<div class="flex gap-2 items-center">
			<Button size="sm" onclick={() => (addOpen = true)}>
				<PlusIcon class="h-5 w-5" /> Add
			</Button>
		</div>
	</div>
{/snippet}

<AddStock refetch={query.refetch} bind:open={addOpen} />

<div class="m-2">
	<h2>Stock Items</h2>
	<DataTable
		{table}
		{header}
		headerClass="pb-2"
		isLoading={query.isPending}
		noDataMessage="No stock items"
	/>
</div>
