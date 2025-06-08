<script lang="ts">
	import { createDivisionGetAll, type EntitiesDivision } from "$lib/api";
	import Search from "$lib/components/Search.svelte";
	import { status } from "$lib/stores/status.svelte";
	import { DataTable, createShadTable } from "@kayord/ui";
	import { type ColumnDef } from "@tanstack/table-core";

	const query = createDivisionGetAll({ outletId: status.value.outletId });

	const columns: ColumnDef<EntitiesDivision>[] = [
		{
			header: "Name",
			accessorKey: "divisionName",
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
		noDataMessage="No roles for outlet"
	/>
</div>
