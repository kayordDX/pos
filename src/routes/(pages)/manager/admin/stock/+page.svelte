<script lang="ts">
	import { createStockGetAll, type DTOStockDTO } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Button, createSvelteTable, DataTable, Input, renderComponent } from "@kayord/ui";
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
	import FilterReset from "$lib/components/FilterReset.svelte";
	import { debounce } from "$lib/util";
	import QueryBuilder from "fluent-querykit";
	import { PlusIcon } from "lucide-svelte";
	import Actions from "./Actions.svelte";
	import AddStock from "./AddStock.svelte";

	const columns: ColumnDef<DTOStockDTO>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 1000,
		},
		{
			header: "Unit",
			accessorKey: "unit.name",
			size: 1000,
			enableSorting: false,
		},
		{
			header: "Total",
			accessorKey: "totalActual",
			size: 1000,
			enableSorting: false,
		},
		{
			header: "",
			accessorKey: "name",
			cell: (item) =>
				renderComponent(Actions, {
					stock: item.row.original,
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

	const sorts = $derived(sorting.map((sort) => `${sort.desc ? "-" : ""}${sort.id}`).join(","));

	const query = $derived(
		createStockGetAll({
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
		},
		get rowCount() {
			return rowCount;
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		enableRowSelection: false,
	});

	const col = $derived(table.getColumn("name"));
	const debouncedCb = debounce((value: string) => col?.setFilterValue(value), 300);

	$effect(() => {
		const qb = new QueryBuilder(false, false);
		const fv = table.getColumn("name")?.getFilterValue() as undefined | string;
		if (fv) {
			qb.containsCaseInsensitive("name", fv);
		}

		const rv = menuCol?.getFilterValue() as undefined | Array<string>;
		if (rv) {
			if (fv) {
				qb.and();
			}
			for (let i = 0; i < rv.length; i++) {
				if (i > 0) qb.or();
				qb.equals("menuSection.menuId", rv[i] ?? "");
			}
		}

		filters = qb.build();
	});

	const menuCol = $derived(table.getColumn("name")!);

	let addOpen = $state(false);
</script>

{#snippet header()}
	<div class="flex gap-2 justify-between items-center">
		<div class="flex gap-2 items-center">
			<Input
				value={col?.getFilterValue()}
				onchange={(e) => debouncedCb(e.currentTarget.value)}
				oninput={(e) => debouncedCb(e.currentTarget.value)}
				placeholder="Search Stock Items..."
				class="h-8 w-[150px] lg:w-[250px]"
			/>

			<FilterReset {table} />
		</div>
		<div class="flex gap-2 items-center">
			<Button size="sm" onclick={() => (addOpen = true)}>
				<PlusIcon class="h-5 w-5" /> Add
			</Button>
		</div>
	</div>
{/snippet}

<AddStock refetch={$query.refetch} bind:open={addOpen} />

<div class="m-2">
	<h2>Stock Items</h2>
	<DataTable
		{table}
		{columns}
		{header}
		headerClass="pb-2"
		isLoading={$query.isPending}
		noDataMessage="No menu items"
	/>
</div>
