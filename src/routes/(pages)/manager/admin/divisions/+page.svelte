<script lang="ts">
	import { createDivisionGetAll, type EntitiesDivision } from "$lib/api";
	import Search from "$lib/components/Search.svelte";
	import { status } from "$lib/stores/status.svelte";
	import { DataTable, createShadTable, renderComponent } from "@kayord/ui";
	import { type ColumnDef } from "@tanstack/table-core";
	import Actions from "./Actions.svelte";

	const query = createDivisionGetAll({ outletId: status.value.outletId });
	let selectedDivision = $state<EntitiesDivision | undefined>(undefined);
	let isDialogOpen = $state(false);
	const columns: ColumnDef<EntitiesDivision>[] = [
		{
			header: "Name",
			accessorKey: "divisionName",
		},
		{
			header: "",
			accessorKey: "id",
			enableSorting: false,
			cell: (row) =>
				renderComponent(Actions, {
					division: row.row.original,
					refetch: $query.refetch,
					setSection: selectedDivision,
					openDialog: () => (isDialogOpen = true),
				}),
			size: 10,
		},
	];

	let data = $derived($query.data ?? []);
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
			<Search bind:search name="Divisions" />
		</div>
	</div>
{/snippet}

<div class="m-2">
	<h2>Divisions</h2>
	<DataTable
		headerClass="pb-2"
		{header}
		{table}
		isLoading={$query.isPending}
		noDataMessage="No Divisions for outlet"
	/>
</div>
