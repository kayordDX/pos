<script lang="ts">
	import { createUserUnassignedUsers, type UserUserResponse } from "$lib/api";
	import { DataTable, renderComponent, ShadTable } from "@kayord/ui";
	import {
		type ColumnDef,
		getCoreRowModel,
		type Updater,
		type PaginationState,
		type ColumnFiltersState,
		getPaginationRowModel,
		getFilteredRowModel,
	} from "@tanstack/table-core";
	import Current from "../Current.svelte";
	import Avatar from "../Avatar.svelte";
	import AddRole from "../AddRole.svelte";
	import RemoveRole from "../RemoveRole.svelte";
	import QueryBuilder from "fluent-querykit";
	import Search from "$lib/components/Search.svelte";

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
				renderComponent(AddRole, {
					userId: item.row.original.userId,
					refetch: $query.refetch,
				}),
		},
		{
			header: "Reject",
			accessorKey: "roles",
			cell: (item) =>
				renderComponent(RemoveRole, {
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
	let filters = $state("");

	const query = $derived(
		createUserUnassignedUsers({ page: pagination.pageIndex + 1, pageSize: 10, filters })
	);
	let data = $derived($query.data?.items ?? []);
	let rowCount = $derived($query.data?.totalCount ?? 0);

	let tableState = $state(
		new ShadTable({
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
		})
	);

	let searchEmail = $state("");

	$effect(() => {
		const qb = new QueryBuilder(false, false);
		if (searchEmail) {
			qb.containsCaseInsensitive("email", searchEmail);
		}
		filters = qb.build();
	});

	$effect(() => {
		if (
			tableState.table.getPageCount() > 0 &&
			pagination.pageIndex > tableState.table.getPageCount() - 1
		) {
			pagination.pageIndex = 0;
		}
	});
</script>

{#snippet header()}
	<div class="flex gap-2">
		<Search bind:search={searchEmail} name="Email" />
	</div>
{/snippet}

<div class="m-2">
	<h2>Unassigned Users</h2>
	<DataTable
		bind:tableState
		{header}
		headerClass="pb-2"
		isLoading={$query.isPending}
		noDataMessage="No unassigned users for outlet"
	/>
</div>
