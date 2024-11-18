<script lang="ts">
	import { createMenuItemGetAll, createMenuList, type MenuItemMenuItemAdminDTO } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Button, createSvelteTable, DataTable, Input, renderComponent } from "@kayord/ui";
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
	import MenuFilter from "./MenuFilter.svelte";
	import { PlusIcon } from "lucide-svelte";
	import EditMenuItem from "./EditMenuItem.svelte";

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
			header: "Menu",
			accessorKey: "menuSection.menu.name",
		},
		{
			header: "Menu",
			accessorKey: "menuSection.menuId",
			id: "menuId",
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
			get columnVisibility() {
				return { menuId: false };
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

		const rv = menuCol?.getFilterValue() as undefined | Array<string>;
		console.log("rv", rv);
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

	const menuCol = $derived(table.getColumn("menuId")!);
	const queryMenu = createMenuList({ outletId: status.value.outletId });
	const menus = $derived(
		$queryMenu.data?.map((m) => {
			return {
				label: m.name,
				value: m.id.toString(),
			};
		}) ?? []
	);

	let addOpen = $state(false);
</script>

{#snippet header()}
	<div class="flex gap-2 justify-between items-center">
		<div class="flex gap-2 items-center">
			<Input
				value={col?.getFilterValue()}
				onchange={(e) => debouncedCb(e.currentTarget.value)}
				oninput={(e) => debouncedCb(e.currentTarget.value)}
				placeholder="Search Menu Item..."
				class="h-8 w-[150px] lg:w-[250px]"
			/>
			<MenuFilter column={menuCol} title="Menu" options={menus} />
			<FilterReset {table} />
		</div>
		<div class="flex gap-2 items-center">
			<Button size="sm" onclick={() => (addOpen = true)}>
				<PlusIcon class="h-5 w-5" /> Add
			</Button>
			<EditMenuItem refetch={$query.refetch} bind:open={addOpen} />
		</div>
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
