<script lang="ts">
	import { createStockGetAllDivision, createDivisionGetAll, type StockGetAllDivisionResponse } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import Actions from "./Actions.svelte";
	import { Select, Label } from "@kayord/ui";
	import { DataTable, createShadTable, renderComponent, type DataTableFeatures } from "@kayord/ui/data-table";
	import { type ColumnDef, type Updater, type PaginationState, type SortingState, type ColumnFiltersState } from "@tanstack/svelte-table";
	import QueryBuilder from "fluent-querykit";
	import Search from "$lib/components/Search.svelte";
	import { stringToFDate } from "$lib/util";

	const divisionQuery = createDivisionGetAll(() => ({ outletId: status.value.outletId }));
	const divisionList = $derived.by(() => {
		return (
			divisionQuery.data?.map((m) => ({
				label: m.divisionName,
				value: m.divisionId.toString(),
			})) ?? []
		);
	});
	let divisionId = $state(0);
	$effect(() => {
		if (divisionList.length > 0 && divisionId == 0) {
			divisionId = Number(divisionList[0]?.value);
		}
	});
	const divisionValue = $derived(divisionList.find((i) => i.value == divisionId.toString())?.label);

	const columns: ColumnDef<DataTableFeatures, StockGetAllDivisionResponse>[] = [
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
		},
		{
			header: "Threshold",
			accessorKey: "threshold",
			size: 1000,
		},
		{
			header: "Actual",
			accessorKey: "actual",
			size: 1000,
		},
		{
			header: "Updated",
			accessorFn: (item) => stringToFDate(item.updated),
			size: 1000,
		},
		{
			header: "",
			accessorKey: "name",
			cell: (item) =>
				renderComponent(Actions, {
					stockItem: item.row.original,
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

	const query = createStockGetAllDivision(() => ({
		page: pagination.pageIndex + 1,
		pageSize: 10,
		filters,
		sorts,
		divisionId: divisionId,
	}));

	let data = $derived(query.data?.items ?? []);
	let rowCount = $derived(query.data?.totalCount ?? 0);

	const table = createShadTable({
		columns,
		get data() {
			return data;
		},
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
</script>

{#snippet header()}
	<div class="flex items-center justify-between gap-2">
		<div class="flex items-center gap-2">
			<Search bind:search name="Stock Items" />
		</div>
		<div class="flex items-center gap-2">
			<Label>Division:</Label>
			<Select.Root type="single" name="divisionId" bind:value={() => divisionId.toString(), (v) => (divisionId = Number(v))} allowDeselect={false}>
				<Select.Trigger class="min-w-[100px]">
					{divisionValue ? divisionValue : "Select Division"}
				</Select.Trigger>
				<Select.Content>
					{#each divisionList as division (division)}
						<Select.Item value={division.value}>{division.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	</div>
{/snippet}

<div class="m-2">
	<h2>Stock Take</h2>
	<DataTable {table} {header} headerClass="pb-2" isLoading={query.isPending} noDataMessage="No stock take items" />
</div>
