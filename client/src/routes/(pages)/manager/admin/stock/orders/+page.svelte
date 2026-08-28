<script lang="ts">
	import { Badge, Button } from "@kayord/ui";
	import {
		DataTable,
		createShadTable,
		renderComponent,
		renderSnippet,
		decodeColumnFilters,
		decodeSorting,
		decodePageIndex,
	} from "@kayord/ui/data-table";
	import Actions from "./Actions.svelte";

	import AddOrder from "./AddOrder.svelte";

	let addOrderOpen = $state(false);

	import { createStockOrderGetAll, type DTOStockOrderResponseDTO } from "$lib/api";
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
	import { stringToFDate } from "$lib/util";

	const columns: ColumnDef<DTOStockOrderResponseDTO>[] = [
		{
			header: "Order Number",
			accessorKey: "orderNumber",
			size: 1000,
		},
		{
			header: "Status",
			accessorKey: "stockOrderStatusName",
			cell: (item) => renderSnippet(statusCol, item.row.original),
			size: 1000,
		},
		{
			header: "Supplier",
			accessorKey: "supplierName",
			size: 1000,
		},
		{
			header: "Created",
			accessorFn: (item) => stringToFDate(item.created),
			size: 1000,
		},
		{
			header: "Total",
			accessorFn: (item) => item.total.toFixed(2),
			size: 1000,
		},
		{
			header: "",
			accessorKey: "menuItemId",
			cell: (item) =>
				renderComponent(Actions, {
					stockOrder: item.row.original,
					refetch: query.refetch,
				}),
			size: 10,
			enableSorting: false,
		},
	];

	let pagination: PaginationState = $state({ pageIndex: decodePageIndex(), pageSize: 10 });
	const setPagination = (updater: Updater<PaginationState>) => {
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else pagination = updater;
	};

	let sorting: SortingState = $state(decodeSorting() ?? [{ id: "Created", desc: true }]);
	const setSorting = (updater: Updater<SortingState>) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		}
	};

	let search = $state(decodeColumnFilters()?.find((x) => x.id == "orderNumber")?.value ?? "");
	let columnFilters = $state<ColumnFiltersState>(decodeColumnFilters() ?? []);
	let filters = $state("");

	// Replacing _ with . to fix sorting issue
	const sorts = $derived(
		sorting.map((sort) => `${sort.desc ? "-" : ""}${sort.id.replaceAll("_", ".")}`).join(",")
	);

	const query = createStockOrderGetAll(() => ({
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
		useURLSearchParams: true,
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

	$effect(() => {
		const qb = new QueryBuilder(false, false);
		if (search) {
			columnFilters = [{ id: "orderNumber", value: search }];
			qb.containsCaseInsensitive("orderNumber", search);
		} else {
			columnFilters = [];
		}
		filters = qb.build();
	});

	const hasOpenSalesPeriod = status.value.salesPeriodId > 0;
</script>

{#snippet statusCol(stockOrder: DTOStockOrderResponseDTO)}
	{@const v =
		stockOrder.stockOrderStatusId == 1
			? "secondary"
			: stockOrder.stockOrderStatusId == 2
				? "default"
				: "outline"}
	<Badge variant={v}>{stockOrder.stockOrderStatusName}</Badge>
{/snippet}

{#snippet header()}
	<div class="flex gap-2 justify-between items-center">
		<div class="flex gap-2 items-center">
			<div class="flex flex-col gap-1">
				<h2>Orders</h2>
				<Search bind:search name="Orders" />
			</div>
		</div>
		<div class="flex gap-2 items-center">
			{#if hasOpenSalesPeriod}
				<AddOrder bind:open={addOrderOpen} refetch={query.refetch} />
				<Button size="sm" onclick={() => (addOrderOpen = true)}>
					<PlusIcon class="h-5 w-5" /> Add
				</Button>
			{/if}
		</div>
	</div>
{/snippet}

<div class="m-2">
	<DataTable
		{table}
		{header}
		headerClass="pb-2"
		isLoading={query.isPending}
		noDataMessage="No menu items"
	/>
</div>
