<script lang="ts">
	import {
		createBillCategoryGetAll,
		type EntitiesBillCategory,
		type EntitiesSection,
	} from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import Actions from "./Actions.svelte";
	import { Button, DataTable, renderComponent, createShadTable } from "@kayord/ui";
	import { type ColumnDef } from "@tanstack/table-core";
	import { PlusIcon } from "@lucide/svelte";
	import AddEditBillCategory from "./AddEditBillCategory.svelte";
	import Search from "$lib/components/Search.svelte";

	const query = createBillCategoryGetAll({ outletId: status.value.outletId });

	let isDialogOpen = $state(false);
	let selectedSection = $state<EntitiesBillCategory | undefined>(undefined);

	const openAdd = () => {
		selectedSection = undefined;
		isDialogOpen = true;
	};

	const columns: ColumnDef<EntitiesBillCategory>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 10000,
		},
		{
			header: "",
			accessorKey: "id",
			enableSorting: false,
			cell: (row) =>
				renderComponent(Actions, {
					billCat: row.row.original,
					refetch: query.refetch,
					setSection: selectedSection,
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
			<h1>Bill Categories</h1>
			<div class="flex gap-2 items-center">
				<Search bind:search name="Bill Categories" />
			</div>
		</div>

		<Button onclick={openAdd}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
	</div>
	<AddEditBillCategory
		bind:open={isDialogOpen}
		billCat={selectedSection}
		refetch={query.refetch}
	/>
{/snippet}

<div class="m-2">
	<DataTable
		headerClass="pb-2"
		{header}
		{table}
		isLoading={query.isPending}
		noDataMessage="No sections for outlet"
	/>
</div>
