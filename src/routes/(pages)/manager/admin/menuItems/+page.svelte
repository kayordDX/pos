<script lang="ts">
	import { createMenuItemGetAll, type MenuItemMenuItemAdminDTO } from "$lib/api";
	import { createSvelteTable, DataTable, Input, renderComponent } from "@kayord/ui";
	import {
		type ColumnDef,
		getCoreRowModel,
		type Updater,
		type PaginationState,
		type ColumnFiltersState,
		getPaginationRowModel,
		getFilteredRowModel,
	} from "@tanstack/table-core";
	import Price from "./Price.svelte";
	import IsEnabled from "./IsEnabled.svelte";
	import Actions from "./Actions.svelte";
	import FilterReset from "$lib/components/FilterReset.svelte";
	import { debounce } from "$lib/util";
	import QueryBuilder from "fluent-querykit";

	const columns: ColumnDef<MenuItemMenuItemAdminDTO>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 1000,
		},
		{
			header: "Description",
			accessorKey: "description",
			size: 1000,
		},
		{
			header: "Price",
			accessorKey: "price",
			cell: (item) =>
				renderComponent(Price, {
					price: Number(item.getValue()),
				}),
		},
		{
			header: "Available",
			accessorKey: "isAvailable",
			cell: (item) =>
				renderComponent(IsEnabled, {
					isEnabled: item.getValue<boolean>(),
				}),
		},
		{
			header: "Enabled",
			accessorKey: "isEnabled",
			cell: (item) =>
				renderComponent(IsEnabled, {
					isEnabled: item.getValue<boolean>(),
				}),
		},
		{
			header: "",
			accessorKey: "menuItemId",
			cell: (item) =>
				renderComponent(Actions, {
					menuItemId: item.getValue<number>(),
					refetch: $query.refetch,
				}),
			size: 10,
		},
	];

	let pagination: PaginationState = $state({ pageIndex: 0, pageSize: 10 });
	const setPagination = (updater: Updater<PaginationState>) => {
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else pagination = updater;
	};

	let columnFilters = $state<ColumnFiltersState>([]);
	let filters = $state("");

	const query = $derived(
		createMenuItemGetAll({
			page: pagination.pageIndex + 1,
			pageSize: 10,
			filters,
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
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			get pagination() {
				return pagination;
			},
			get columnFilters() {
				return columnFilters;
			},
		},
		get rowCount() {
			return rowCount;
		},
		onPaginationChange: setPagination,
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
		filters = qb.build();
	});
</script>

{#snippet header()}
	<div class="flex gap-2">
		<Input
			value={col?.getFilterValue()}
			onchange={(e) => debouncedCb(e.currentTarget.value)}
			oninput={(e) => debouncedCb(e.currentTarget.value)}
			placeholder="Search Menu Item..."
			class="h-8 w-[150px] lg:w-[250px]"
		/>
		<!-- <Filter column={nameCol} title="Role" options={roles} /> -->
		<FilterReset {table} />
	</div>
{/snippet}

<div class="m-2">
	<h2>Menu Items</h2>
	<DataTable
		{table}
		{columns}
		{header}
		headerClass="pb-2"
		isLoading={$query.isPending}
		noDataMessage="No menu items"
	/>
</div>
