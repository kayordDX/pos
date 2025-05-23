<script lang="ts">
	import { createSectionList, type EntitiesSection } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import Actions from "./Actions.svelte";
	import { Button, DataTable, renderComponent, createShadTable } from "@kayord/ui";
	import { type ColumnDef } from "@tanstack/table-core";
	import { PlusIcon } from "@lucide/svelte";
	import AddEditSection from "./AddEditSection.svelte";

	const query = createSectionList({ outletId: status.value.outletId });

	let isDialogOpen = $state(false);
	let selectedSection = $state<EntitiesSection | undefined>(undefined);

	const openAdd = () => {
		selectedSection = undefined;
		isDialogOpen = true;
	};

	const columns: ColumnDef<EntitiesSection>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 10000,
		},
		{
			header: "",
			accessorKey: "id",
			cell: (row) =>
				renderComponent(Actions, {
					section: row.row.original,
					refetch: $query.refetch,
					setSection: selectedSection,
					openDialog: () => (isDialogOpen = true),
				}),
			size: 10,
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
		<h1>Sections</h1>
		<Button onclick={openAdd}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
	</div>
	<AddEditSection bind:open={isDialogOpen} section={selectedSection} refetch={$query.refetch} />
{/snippet}

<div class="m-2">
	<DataTable
		headerClass="pb-2"
		{header}
		{table}
		isLoading={$query.isPending}
		noDataMessage="No sections for outlet"
	/>
</div>
