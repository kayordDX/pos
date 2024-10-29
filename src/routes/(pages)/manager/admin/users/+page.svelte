<script lang="ts">
	import { createUserUsers, type UserUserResponse } from "$lib/api";
	import { DataTable, renderComponent, createSvelteTable } from "@kayord/ui";
	import {
		type ColumnDef,
		getCoreRowModel,
		type Updater,
		type PaginationState,
		getPaginationRowModel,
	} from "@tanstack/table-core";
	import Current from "./Current.svelte";
	import Avatar from "./Avatar.svelte";
	import Roles from "./Roles.svelte";

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

	let query = createUserUsers();
	let data = $state<UserUserResponse[]>([]);
	let rowCount = $state($query.data?.totalCount ?? 0);

	$effect(() => {
		query = createUserUsers({ page: pagination.pageIndex + 1, pageSize: 10 });
		data = $query.data?.items ?? [];
		rowCount = $query.data?.totalCount ?? 0;
	});

	const table = createSvelteTable({
		columns,
		get data() {
			return data;
		},
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			get pagination() {
				return pagination;
			},
		},
		get rowCount() {
			return rowCount;
		},
		onPaginationChange: setPagination,
		enableRowSelection: false,
	});
</script>

<div class="m-4">
	<h2>Users</h2>
	<DataTable
		{table}
		{columns}
		isLoading={$query.isPending}
		noDataMessage="No unassigned users for outlet"
	/>
</div>
