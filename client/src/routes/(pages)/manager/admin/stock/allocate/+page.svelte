<script lang="ts">
	import { Badge, Button } from "@kayord/ui";
	import {
		DataTable,
		createShadTable,
		renderComponent,
		renderSnippet,
		decodeColumnFilters,
		type DataTableFeatures,
		useTableUrlSync,
	} from "@kayord/ui/data-table";
	import Actions from "./Actions.svelte";

	import AddAllocation from "./AddAllocation.svelte";

	let addAllocateOpen = $state(false);
	const hasOpenSalesPeriod = status.value.salesPeriodId > 0;

	import { type DTOStockAllocateDTO, createStockAllocateGetAll } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { type ColumnDef } from "@tanstack/svelte-table";
	import { PlusIcon } from "@lucide/svelte";
	import Search from "$lib/components/Search.svelte";
	import { QueryBuilder } from "fluent-querykit";
	import { stringToFDate } from "$lib/util";

	const columns: ColumnDef<DataTableFeatures, DTOStockAllocateDTO>[] = [
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
			header: "Sent",
			accessorKey: "fromUser.name",
			size: 1000,
		},
		{
			header: "Received",
			accessorKey: "assignedUser.name",
			size: 1000,
		},
		{
			header: "Created",
			accessorFn: (item) => stringToFDate(item.created),
			size: 1000,
		},
		{
			header: "",
			accessorKey: "menuItemId",
			cell: (item) =>
				renderComponent(Actions, {
					stockAllocateId: item.row.original.id,
				}),
			size: 10,
			enableSorting: false,
		},
	];

	let controlledState = $state({
		pagination: { pageIndex: 0, pageSize: 10 },
		sorting: [{ id: "Created", desc: true }],
		columnFilters: decodeColumnFilters() ?? [],
		search: decodeColumnFilters()?.find((x) => x.id == "comment")?.value ?? "",
	});

	let filters = $state("");
	const sorts = $derived(controlledState.sorting.map((sort) => `${sort.desc ? "-" : ""}${sort.id.replaceAll("_", ".")}`).join(","));

	const query = createStockAllocateGetAll(() => ({
		page: controlledState.pagination.pageIndex + 1,
		pageSize: 10,
		filters,
		sorts,
		outletId: status.value.outletId,
	}));

	let data = $derived(query.data?.items ?? []);
	let rowCount = $derived(query.data?.totalCount ?? 0);

	const table = createShadTable({
		controlledState: controlledState,
		columns,
		get data() {
			return data;
		},
		get rowCount() {
			return rowCount;
		},
		manualPagination: true,
		manualFiltering: true,
		manualSorting: true,
		enableRowSelection: false,
	});

	useTableUrlSync(table);

	$effect(() => {
		const qb = new QueryBuilder(false, false);
		if (controlledState.search) {
			controlledState.columnFilters = [{ id: "comment", value: controlledState.search }];
			qb.containsCaseInsensitive("comment", controlledState.search);
		} else {
			controlledState.columnFilters = [];
		}
		filters = qb.build();
	});
</script>

{#snippet statusCol(allocate: DTOStockAllocateDTO)}
	{@const v = allocate.stockAllocateStatusId == 1 ? "secondary" : allocate.stockAllocateStatusId == 2 ? "default" : "outline"}
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
	<div class="flex items-center justify-between gap-2">
		<div class="flex items-center gap-2">
			<div class="flex flex-col gap-1">
				<h2>Allocate</h2>
				<Search bind:search={controlledState.search} name="Allocations" />
			</div>
		</div>
		<div class="flex items-center gap-2">
			{#if hasOpenSalesPeriod}
				<AddAllocation bind:open={addAllocateOpen} refetch={query.refetch} />
				<Button size="sm" onclick={() => (addAllocateOpen = true)}>
					<PlusIcon class="h-5 w-5" /> Add
				</Button>
			{/if}
		</div>
	</div>
{/snippet}

<pre>{JSON.stringify(controlledState)}</pre>

<div class="m-2">
	<DataTable {table} {header} headerClass="pb-2" isLoading={query.isPending} noDataMessage="No allocations" />
</div>
