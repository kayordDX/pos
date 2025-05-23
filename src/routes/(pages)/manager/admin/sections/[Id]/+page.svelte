<script lang="ts">
	import { createSectionTableGetAll, type EntitiesTable } from "$lib/api";
	import { type ColumnDef } from "@tanstack/table-core";
	import { PlusIcon } from "@lucide/svelte";
	import { page } from "$app/state";
	import Actions from "./Actions.svelte";
	import { Button, createShadTable, DataTable, renderComponent } from "@kayord/ui";
	import AddEditTable from "./AddEditTable.svelte";
	const query = createSectionTableGetAll({ sectionId: Number(page.params.Id) });
	let selectedTable = $state<EntitiesTable | undefined>(undefined);

	let isDialogOpen = $state(false);
	let addOpen = $state(false);
	const openAdd = () => {
		selectedTable = undefined;
		isDialogOpen = true;
	};
	const columns: ColumnDef<EntitiesTable>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 1000,
		},
		{
			header: "Capacity",
			accessorKey: "capacity",
			size: 1000,
		},
		{
			header: "Position",
			accessorKey: "position",
			size: 1000,
		},
		{
			header: "",
			accessorKey: "tableId",
			cell: (row) =>
				renderComponent(Actions, {
					table: row.row.original,
					refetch: $query.refetch,
				}),
			size: 10,
			enableSorting: false,
		},
	];
	let data = $derived($query.data ?? []);

	const table = createShadTable({
		columns,
		get data() {
			return data;
		},
		enableRowSelection: false,
	});
</script>

{#snippet header()}
	<div class="flex items-center justify-between">
		<h1>Section Tables</h1>
		<Button onclick={openAdd}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>

		<AddEditTable
			bind:open={isDialogOpen}
			sectionId={Number(page.params.Id)}
			refetch={$query.refetch}
		/>
	</div>
{/snippet}
<div class="m-2">
	<DataTable
		headerClass="pb-2"
		{header}
		{table}
		isLoading={$query.isPending}
		noDataMessage="No tables in section"
	/>
</div>
