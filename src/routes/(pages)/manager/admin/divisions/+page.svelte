<script lang="ts">
	import { createDivisionGetAll, type EntitiesDivision } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Badge, DataTable, createShadTable, renderSnippet } from "@kayord/ui";
	import { type ColumnDef } from "@tanstack/table-core";

	const query = createDivisionGetAll({ outletId: status.value.outletId });

	const columns: ColumnDef<EntitiesDivision>[] = [
		{
			header: "Name",
			accessorKey: "divisionName",
		},
	];

	let data = $derived($query.data ?? []);
	$inspect(data);

	const table = createShadTable({
		columns,
		get data() {
			return data;
		},
		enableRowSelection: false,
	});
</script>

<div class="m-2">
	<h2>Divisions</h2>
	<DataTable
		headerClass="pb-2"
		{table}
		{columns}
		isLoading={$query.isPending}
		noDataMessage="No roles for outlet"
	/>
</div>
