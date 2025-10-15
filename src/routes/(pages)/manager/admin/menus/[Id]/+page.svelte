<script lang="ts">
	import { createMenuGetSectionsGetMenusSections, type DTOMenuSectionDTO } from "$lib/api";
	import { Button } from "@kayord/ui";
	import { DataTable, createShadTable, renderComponent } from "@kayord/ui/data-table";
	import { PlusIcon } from "@lucide/svelte";
	import Actions from "./Actions.svelte";
	import EditSection from "./EditSection.svelte";
	import { page } from "$app/state";
	import type { ColumnDef } from "@tanstack/table-core";
	import Search from "$lib/components/Search.svelte";

	const query = createMenuGetSectionsGetMenusSections({
		menuId: Number(page.params.Id),
		sectionId: 0,
	});
	let addOpen = $state(false);

	const columns: ColumnDef<DTOMenuSectionDTO>[] = [
		{
			header: "Section",
			accessorKey: "name",
			size: 10000,
		},
		{
			header: "",
			enableSorting: false,
			accessorKey: "id",
			cell: (row) =>
				renderComponent(Actions, {
					section: row.row.original,
					refetch: query.refetch,
				}),
			size: 10,
		},
	];

	let data = $derived(query.data?.sections ?? []);
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
			<h1>Menu Sections</h1>
			<div class="flex gap-2 items-center">
				<Search bind:search name="Sections" />
			</div>
		</div>

		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<EditSection refetch={query.refetch} bind:open={addOpen} />
	</div>
{/snippet}

<div class="m-2">
	<DataTable
		headerClass="pb-2"
		{header}
		{table}
		isLoading={query.isPending}
		noDataMessage="No roles for outlet"
	/>
</div>
