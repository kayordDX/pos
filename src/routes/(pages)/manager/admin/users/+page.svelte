<script lang="ts">
	import { createRoleGetAll, createUserUsers, type UserUserResponse } from "$lib/api";
	import { DataTable, renderComponent, createSvelteTable, Input } from "@kayord/ui";
	import {
		type ColumnDef,
		getCoreRowModel,
		type Updater,
		type PaginationState,
		type ColumnFiltersState,
		getPaginationRowModel,
		getFilteredRowModel,
	} from "@tanstack/table-core";
	import Current from "./Current.svelte";
	import Avatar from "./Avatar.svelte";
	import Roles from "./Roles.svelte";
	import Filter from "./Filter.svelte";
	import { QueryBuilder } from "fluent-querykit";
	import FilterReset from "./FilterReset.svelte";
	import FilterBar from "./FilterBar.svelte";
	import { debounce } from "$lib/util";

	const columns: ColumnDef<UserUserResponse>[] = [
		{
			accessorKey: "image",
			header: "Image",
			cell: (item) =>
				renderComponent(Avatar, {
					name: item.row.original.name,
					image: item.row.original.image,
				}),
		},
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "Email",
			accessorKey: "email",
		},
		{
			accessorKey: "isCurrent",
			header: "Current",
			cell: (item) =>
				renderComponent(Current, {
					isCurrent: Boolean(item.getValue()),
				}),
		},
		{
			header: "Roles",
			accessorKey: "roles",
			cell: (item) =>
				renderComponent(Roles, {
					roles: String(item.getValue()),
					userId: item.row.original.userId,
					refetch: $query.refetch,
				}),
		},
	];

	let pagination: PaginationState = $state({ pageIndex: 0, pageSize: 10 });
	const setPagination = (updater: Updater<PaginationState>) => {
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else pagination = updater;
	};

	let columnFilters = $state<ColumnFiltersState>([]);

	let query = createUserUsers();
	let data = $state<UserUserResponse[]>([]);
	let rowCount = $state($query.data?.totalCount ?? 0);
	let filters = $state("");

	$effect(() => {
		query = createUserUsers({
			page: pagination.pageIndex + 1,
			pageSize: 10,
			filters,
		});
		data = $query.data?.items ?? [];
		rowCount = $query.data?.totalCount ?? 0;
	});

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

	const nameCol = $derived(table.getColumn("roles")!);

	const rolesQuery = createRoleGetAll();
	const roles = $derived(
		$rolesQuery.data?.map((role) => {
			return {
				label: role.name,
				value: role.name,
			};
		}) ?? []
	);

	$effect(() => {
		const qb = new QueryBuilder(false, false);
		const fv = table.getColumn("email")?.getFilterValue() as undefined | string;
		if (fv) {
			qb.containsCaseInsensitive("email", fv);
		}
		const rv = table.getColumn("roles")?.getFilterValue() as undefined | Array<string>;
		if (rv) {
			if (fv) {
				qb.and();
			}
			for (let i = 0; i < rv.length; i++) {
				if (i > 0) qb.and();
				qb.contains("roles", rv[i] ?? "");
			}
		}
		filters = qb.build();
	});

	const col = $derived(table.getColumn("email"));
	const debouncedCb = debounce((value: string) => col?.setFilterValue(value), 300);
</script>

{#snippet header()}
	<div class="flex gap-2">
		<Input
			value={col?.getFilterValue()}
			onchange={(e) => debouncedCb(e.currentTarget.value)}
			oninput={(e) => debouncedCb(e.currentTarget.value)}
			placeholder="Search Email..."
			class="h-8 w-[150px] lg:w-[250px]"
		/>
		<Filter column={nameCol} title="Role" options={roles} />
		<FilterReset {table} />
	</div>
{/snippet}

<div class="m-2">
	<h2>Users</h2>
	<DataTable
		{table}
		{columns}
		{header}
		isLoading={$query.isPending}
		noDataMessage="No unassigned users for outlet"
	/>
</div>
