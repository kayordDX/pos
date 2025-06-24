<script lang="ts">
	import {
		createStockCategoryGetAll,
		type EntitiesStockCategory,
		type EntitiesStockCategoryAllOf,
	} from "$lib/api";
	import Search from "$lib/components/Search.svelte";
	import { page } from "$app/state";
	import { status } from "$lib/stores/status.svelte";
	import { Button, DataTable, createShadTable, renderComponent } from "@kayord/ui";
	import { type ColumnDef } from "@tanstack/table-core";
	import Actions from "./Actions.svelte";
	import { PlusIcon } from "@lucide/svelte";
	import AddEditCategory from "./AddEditCategory.svelte";
	const query = createStockCategoryGetAll({
		outletId: status.value.outletId,
		parentOnly: false,
		parentId: Number(page.params.id),
	});
	let selectedDivision = $state<EntitiesStockCategory | undefined>(undefined);
	let isDialogOpen = $state(false);
	const columns: ColumnDef<EntitiesStockCategoryAllOf>[] = [
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "",
			accessorKey: "id",
			enableSorting: false,
			cell: (row) =>
				renderComponent(Actions, {
					category: row.row.original,
					refetch: $query.refetch,
					setSection: selectedDivision,
					openDialog: () => (isDialogOpen = true),
				}),
			size: 10,
		},
	];

	let data = $derived($query.data ?? []);
	let search = $state("");
	let selectedCategory = $state<EntitiesStockCategory | undefined>(undefined);

	const openAdd = () => {
		selectedCategory = undefined;
		isDialogOpen = true;
	};
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
			<Search bind:search name="Child Categories" />
		</div>
		<Button onclick={openAdd}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
	</div>
	<AddEditCategory bind:open={isDialogOpen} refetch={$query.refetch} />
{/snippet}

<div class="m-2">
	<h2>Child Categories</h2>
	<DataTable
		headerClass="pb-2"
		{header}
		{table}
		isLoading={$query.isPending}
		noDataMessage="No child categories"
	/>
</div>
