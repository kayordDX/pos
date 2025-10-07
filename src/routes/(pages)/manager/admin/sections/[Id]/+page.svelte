<script lang="ts">
	import { createSectionTableGetAll, type EntitiesTable } from "$lib/api";
	import { type ColumnDef } from "@tanstack/table-core";
	import { PlusIcon } from "@lucide/svelte";
	import { page } from "$app/state";
	import Actions from "./Actions.svelte";
	import { Button, createShadTable, DataTable, renderComponent } from "@kayord/ui";
	import AddEditTable from "./AddEditTable.svelte";
	import Search from "$lib/components/Search.svelte";
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
					refetch: query.refetch,
				}),
			size: 10,
			enableSorting: false,
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
		useURLSearchParams: true,
		state: {
			get globalFilter() {
				return search;
			},
		},
	});
</script>

{#snippet header()}
	<div class="flex items-center justify-between">
		<div class="flex flex-col gap-1">
			<h1>Section Tables</h1>
			<div class="flex gap-2 items-center">
				<Search bind:search name="Tables" />
			</div>
		</div>
		<Button onclick={openAdd}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>

		<AddEditTable
			bind:open={isDialogOpen}
			sectionId={Number(page.params.Id)}
			refetch={query.refetch}
		/>
	</div>
{/snippet}
<div class="m-2">
	<DataTable
		headerClass="pb-2"
		{header}
		{table}
		isLoading={query.isPending}
		noDataMessage="No tables in section"
	/>
</div>
