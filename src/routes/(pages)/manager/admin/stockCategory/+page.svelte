<script lang="ts">
	import {
		createStockCategoryGetAll,
		type EntitiesStockCategory,
		type EntitiesStockCategoryAllOf,
	} from "$lib/api";
	import Search from "$lib/components/Search.svelte";
	import { status } from "$lib/stores/status.svelte";
	import { Button, DataTable, createShadTable, renderComponent } from "@kayord/ui";
	import { type ColumnDef } from "@tanstack/table-core";
	import Actions from "./Actions.svelte";
	import { PlusIcon } from "@lucide/svelte";
	import AddEditTable from "../sections/[Id]/AddEditTable.svelte";
	import AddEditCategory from "./AddEditCategory.svelte";

	const query = createStockCategoryGetAll({
		outletId: status.value.outletId,
		parentOnly: true,
		parentId: 0,
	});

	let selectedCategory = $state<EntitiesStockCategory | undefined>(undefined);
	let isDialogOpen = $state(false);
	const openAdd = () => {
		selectedCategory = undefined;
		isDialogOpen = true;
	};
	const columns: ColumnDef<EntitiesStockCategory>[] = [
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
					setSection: selectedCategory,
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
			<Search bind:search name="Stock Categories" />
		</div>
		<Button onclick={openAdd}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
	</div>

	<AddEditCategory bind:open={isDialogOpen} refetch={$query.refetch} />
{/snippet}

<div class="m-2">
	<h2>Stock Categories</h2>
	<DataTable
		headerClass="pb-2"
		{header}
		{table}
		isLoading={$query.isPending}
		noDataMessage="No categories for Outlet"
	/>
</div>
