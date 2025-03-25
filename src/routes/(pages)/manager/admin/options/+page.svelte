<script lang="ts">
	import { createOptionGroup, optionGroup, type DTOOptionGroupBasicDTO } from "$lib/api";
	import {
		Badge,
		Button,
		Card,
		DataTable,
		renderComponent,
		renderSnippet,
		ShadTable,
		Tooltip,
	} from "@kayord/ui";
	import Actions from "./Actions.svelte";
	import { PlusIcon } from "@lucide/svelte";
	import EditOptionGroup from "./EditOptionGroup.svelte";
	import type { ColumnDef } from "@tanstack/table-core";

	const query = createOptionGroup();
	let addOpen = $state(false);

	const columns: ColumnDef<DTOOptionGroupBasicDTO>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 10000,
			// cell: (item) => renderSnippet(extraGroup, item.row.original),
		},
		{
			header: "Selection",
			accessorKey: "minSelections",
			size: 10,
			cell: (item) => renderSnippet(selection, item.row.original),
		},
		{
			header: "",
			accessorKey: "optionGroupId",
			cell: (item) =>
				renderComponent(Actions, {
					optionGroup: item.row.original,
					refetch: $query.refetch,
				}),
			size: 10,
			enableSorting: false,
		},
	];

	let data = $derived($query.data ?? []);

	let tableState = $state(
		new ShadTable({
			columns,
			get data() {
				return data;
			},
			enableRowSelection: false,
		})
	);
</script>

{#snippet header()}
	<div class="flex items-center justify-between">
		<h1>Option Groups</h1>
		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<EditOptionGroup refetch={$query.refetch} bind:open={addOpen} />
	</div>
{/snippet}

{#snippet selection(optionGroup: DTOOptionGroupBasicDTO)}
	<Card.Root class="p-2 flex items-center gap-2">
		min: <Badge>{optionGroup.maxSelections}</Badge>
		max: <Badge>{optionGroup.minSelections}</Badge>
	</Card.Root>
{/snippet}

<div class="m-2">
	<DataTable
		headerClass="pb-2"
		{header}
		bind:tableState
		isLoading={$query.isPending}
		noDataMessage="No roles for outlet"
	/>
</div>
