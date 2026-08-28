<script lang="ts">
	import { createRoleGetAll, type EntitiesRole } from "$lib/api";
	import Search from "$lib/components/Search.svelte";
	import { status } from "$lib/stores/status.svelte";
	import { Button } from "@kayord/ui";
	import { DataTable, createShadTable, renderComponent } from "@kayord/ui/data-table";
	import { type ColumnDef } from "@tanstack/table-core";
	import Actions from "./Actions.svelte";
	import { PlusIcon } from "@lucide/svelte";
	import AddEditRole from "./AddEditRole.svelte";

	const query = createRoleGetAll(() => status.value.outletId);
	let selectedRole = $state<EntitiesRole | undefined>(undefined);
	let isDialogOpen = $state(false);

	const columns: ColumnDef<EntitiesRole>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 100000,
		},
		{
			header: "Description",
			accessorKey: "description",
			size: 100000,
		},
		{
			header: "Role Type",
			accessorKey: "roleType.name",
			size: 100000,
		},
		{
			header: "",
			accessorKey: "id",
			enableSorting: false,
			cell: (row) =>
				renderComponent(Actions, {
					role: row.row.original,
					refetch: query.refetch,
					setSection: selectedRole,
					openDialog: () => (isDialogOpen = true),
				}),
			size: 10,
		},
	];
	const openAdd = () => {
		selectedRole = undefined;
		isDialogOpen = true;
	};
	let data = $derived(query.data ?? []);
	let search = $state("");

	const table = createShadTable({
		columns,
		get data() {
			return data;
		},
		enableRowSelection: false,
		state: {
			get globalFilter() {
				return search;
			},
		},
	});
</script>

{#snippet header()}
	<div class="flex gap-2 justify-between items-center">
		<div class="flex gap-2 items-center">
			<Search bind:search name="Roles" />
		</div>
		<Button onclick={openAdd}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<AddEditRole bind:open={isDialogOpen} role={selectedRole} refetch={query.refetch} />
	</div>
{/snippet}

<div class="m-2">
	<h2>Roles</h2>
	<DataTable
		headerClass="pb-2"
		{header}
		{table}
		isLoading={query.isPending}
		noDataMessage="No Roles for outlet"
	/>
</div>
