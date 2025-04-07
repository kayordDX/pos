<script lang="ts">
	import {
		Badge,
		Button,
		DataTable,
		renderComponent,
		renderSnippet,
		createShadTable,
	} from "@kayord/ui";
	import Actions from "./Actions.svelte";

	import AddAllocation from "./AddAllocation.svelte";

	let addAllocateOpen = $state(false);

	import { type DTOStockAllocateDTO, createStockAllocateGetAll } from "$lib/api";
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
	import { PlusIcon } from "@lucide/svelte";
	import Search from "$lib/components/Search.svelte";
	import QueryBuilder from "fluent-querykit";

	const columns: ColumnDef<DTOStockAllocateDTO>[] = [
		{
			header: "Comment",
			accessorKey: "comment",
			size: 1000,
		},
		{
			header: "Status",
			accessorKey: "stockAllocateStatus.name",
			cell: (item) => renderSnippet(statusCol, item.row.original),
			size: 1000,
		},
		{
			header: "From",
			accessorKey: "fromDivision.divisionName",
			cell: (item) => renderSnippet(fromCol, item.row.original),

			size: 1000,
		},
		{
			header: "To",
			accessorKey: "toDivision.divisionName",
			cell: (item) => renderSnippet(toCol, item.row.original),
			size: 1000,
		},
		{
			header: "Assigned",
			accessorKey: "assignedUser.name",
			size: 1000,
		},
		{
			header: "",
			accessorKey: "menuItemId",
			cell: (item) =>
				renderComponent(Actions, {
					stockAllocate: item.row.original,
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
		createStockAllocateGetAll({
			page: pagination.pageIndex + 1,
			pageSize: 10,
			filters,
			sorts,
			outletId: status.value.outletId,
		})
	);

	let data = $derived($query.data?.items ?? []);
	let rowCount = $derived($query.data?.totalCount ?? 0);

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

	let search = $state("");

	$effect(() => {
		const qb = new QueryBuilder(false, false);
		if (search) {
			qb.containsCaseInsensitive("comment", search);
		}
		filters = qb.build();
	});

	$effect(() => {
		if (table.getPageCount() > 0 && pagination.pageIndex > table.getPageCount() - 1) {
			pagination.pageIndex = 0;
		}
	});
</script>

{#snippet statusCol(allocate: DTOStockAllocateDTO)}
	{@const v =
		allocate.stockAllocateStatusId == 1
			? "secondary"
			: allocate.stockAllocateStatusId == 2
				? "default"
				: "outline"}
	<Badge variant={v}>{allocate.stockAllocateStatus.name}</Badge>
{/snippet}

{#snippet fromCol(allocate: DTOStockAllocateDTO)}
	{#if allocate.outletId == status.value.outletId}
		{allocate.fromDivision.divisionName}
	{:else}
		{allocate.outlet.name} - {allocate.fromDivision.divisionName}
	{/if}
{/snippet}

{#snippet toCol(allocate: DTOStockAllocateDTO)}
	{#if allocate.outletId == status.value.outletId}
		{allocate.toDivision.divisionName}
	{:else}
		{allocate.toOutlet.name} - {allocate.toDivision.divisionName}
	{/if}
{/snippet}

{#snippet header()}
	<div class="flex gap-2 justify-between items-center">
		<div class="flex gap-2 items-center">
			<div class="flex flex-col gap-1">
				<h2>Allocate</h2>
				<Search bind:search name="Allocations" />
			</div>
			<AddAllocation bind:open={addAllocateOpen} refetch={$query.refetch} />
		</div>
		<div class="flex gap-2 items-center">
			<Button size="sm" onclick={() => (addAllocateOpen = true)}>
				<PlusIcon class="h-5 w-5" /> Add
			</Button>
		</div>
	</div>
{/snippet}

<div class="m-2">
	<DataTable
		{table}
		{header}
		headerClass="pb-2"
		isLoading={$query.isPending}
		noDataMessage="No menu items"
	/>
</div>
