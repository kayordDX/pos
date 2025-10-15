<script lang="ts">
	import {
		createUserRemoveUserOutlet,
		createUserUnassignedUsers,
		type UserUserResponse,
	} from "$lib/api";
	import { Actions } from "@kayord/ui";
	import { DataTable, createShadTable, renderComponent } from "@kayord/ui/data-table";
	import { toast } from "@kayord/ui/sonner";
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
	import { PlusIcon, XIcon } from "@lucide/svelte";
	import { getError } from "$lib/types";

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
			size: 1000,
		},
		{
			header: "Email",
			accessorKey: "email",
			size: 1000,
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
			header: "",
			accessorKey: "userId",
			enableSorting: false,
			size: 0,
			cell: (item) =>
				renderComponent(Actions, {
					variant: "secondary",
					actions: [
						{
							icon: PlusIcon,
							text: "Add",
							action: () => {
								userId = item.row.original.userId;
								addOpen = true;
							},
						},
						{
							icon: XIcon,
							text: "Reject",
							action: () => rejectUser(item.row.original.userId),
						},
					],
				}),
		},
	];

	let userId: string = $state("");
	let addOpen: boolean = $state(false);

	const mutation = createUserRemoveUserOutlet();

	const rejectUser = async (rejectUserId: string) => {
		try {
			await mutation.mutateAsync({ userId: rejectUserId });
		} catch (error) {
			toast.error(getError(error).message);
		} finally {
			toast.info("Rejected user");
			query.refetch();
		}
	};

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

	let searchEmail = $state("");

	$effect(() => {
		const qb = new QueryBuilder(false, false);
		if (searchEmail) {
			qb.containsCaseInsensitive("email", searchEmail);
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
	<div class="flex gap-2">
		<Search bind:search={searchEmail} name="Email" />
	</div>
{/snippet}

{#if addOpen}
	<AddRole refetch={query.refetch} {userId} bind:open={addOpen} />
{/if}

<div class="m-2">
	<h2>Unassigned Users</h2>
	<DataTable
		{table}
		{header}
		headerClass="pb-2"
		isLoading={query.isPending}
		noDataMessage="No unassigned users for outlet"
	/>
</div>
