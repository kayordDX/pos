<script lang="ts">
	import { createRoleDivisionGetAll, type EntitiesRole } from "$lib/api";
	import Search from "$lib/components/Search.svelte";
	import { Button } from "@kayord/ui";
	import { DataTable, createShadTable, renderComponent } from "@kayord/ui/data-table";
	import { type ColumnDef } from "@tanstack/table-core";
	import Actions from "./Actions.svelte";
	import { page } from "$app/state";
	import AddRole from "./AddRole.svelte";
	import { PlusIcon } from "@lucide/svelte";

	const query = createRoleDivisionGetAll(() => Number(page.params.id) ?? 0);
	let selectedDivision = $state<EntitiesRole | undefined>(undefined);
	let isDialogOpen = $state(false);
	let divisionId = $state(Number(page.params.id));
	let open: boolean = $state(false);
	const columns: ColumnDef<EntitiesRole>[] = [
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
			header: "",
			accessorKey: "id",
			enableSorting: false,
			cell: (row) =>
				renderComponent(Actions, {
					role: row.row.original,
					refetch: query.refetch,
					divisionId: Number(page.params.id),
					openDialog: () => (isDialogOpen = true),
				}),
			size: 10,
		},
	];

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
		<Button onclick={() => (open = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
	</div>
{/snippet}

<AddRole refetch={query.refetch} {divisionId} bind:open />

<div class="m-2">
	<h2>Roles</h2>
	<DataTable
		headerClass="pb-2"
		{header}
		{table}
		isLoading={query.isPending}
		noDataMessage="No roles for outlet"
	/>
</div>
