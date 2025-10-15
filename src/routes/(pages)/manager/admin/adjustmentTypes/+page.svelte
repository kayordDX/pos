<script lang="ts">
	import { createAdjustmentGetAll, type EntitiesAdjustmentType } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import Actions from "./Actions.svelte";
	import { Button } from "@kayord/ui";
	import { DataTable, createShadTable, renderComponent } from "@kayord/ui/data-table";
	import { type ColumnDef } from "@tanstack/table-core";
	import { PlusIcon } from "@lucide/svelte";
	import AddEditAdjustmentType from "./AddEditAdjustmentType.svelte";
	import Search from "$lib/components/Search.svelte";

	const query = createAdjustmentGetAll(status.value.outletId);

	let isDialogOpen = $state(false);
	let selectedAdjustmentType = $state<EntitiesAdjustmentType | undefined>(undefined);

	const openAdd = () => {
		selectedAdjustmentType = undefined;
		isDialogOpen = true;
	};

	const columns: ColumnDef<EntitiesAdjustmentType>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 10000,
		},
		{
			header: "Description",
			accessorKey: "description",
			size: 10000,
		},
		{
			header: "",
			accessorKey: "adjustmentTypeId",
			enableSorting: false,
			cell: (row) =>
				renderComponent(Actions, {
					adjustmentType: row.row.original,
					refetch: query.refetch,
					setAdjustmentType: selectedAdjustmentType,
					adjustmentTypeId: row.row.original.adjustmentTypeId,
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
	<div class="flex items-center justify-between">
		<div class="flex flex-col gap-1">
			<h1>Adjustment Types</h1>
			<div class="flex gap-2 items-center">
				<Search bind:search name="Adjustment" />
			</div>
		</div>
		<Button onclick={openAdd}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
	</div>
	<AddEditAdjustmentType
		bind:open={isDialogOpen}
		adjustmentType={selectedAdjustmentType}
		refetch={query.refetch}
	/>
{/snippet}

<div class="m-2">
	<DataTable
		headerClass="pb-2"
		{header}
		{table}
		isLoading={query.isPending}
		noDataMessage="No adjustment types for outlet"
	/>
</div>
