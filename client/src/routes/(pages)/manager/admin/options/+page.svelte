<script lang="ts">
	import { createOptionGroup, type DTOOptionGroupBasicDTO } from "$lib/api";
	import { Badge, Button, Card } from "@kayord/ui";
	import {
		DataTable,
		renderComponent,
		renderSnippet,
		createShadTable,
		decodeGlobalFilter,
		type DataTableFeatures,
		useTableUrlSync,
	} from "@kayord/ui/data-table";
	import Actions from "./Actions.svelte";
	import { PlusIcon } from "@lucide/svelte";
	import EditOptionGroup from "./EditOptionGroup.svelte";
	import type { ColumnDef } from "@tanstack/svelte-table";
	import Search from "$lib/components/Search.svelte";

	const query = createOptionGroup();
	let addOpen = $state(false);

	const columns: ColumnDef<DataTableFeatures, DTOOptionGroupBasicDTO>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 10000,
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
					refetch: query.refetch,
				}),
			size: 10,
			enableSorting: false,
		},
	];

	let data = $derived(query.data ?? []);
	let search = $state(decodeGlobalFilter() ?? "");

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
	useTableUrlSync(table);
</script>

{#snippet header()}
	<div class="flex items-center justify-between">
		<div class="flex flex-col gap-1">
			<h1>Option Groups</h1>
			<div class="flex items-center gap-2">
				<Search bind:search name="Option Groups" />
			</div>
		</div>
		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<EditOptionGroup refetch={query.refetch} bind:open={addOpen} />
	</div>
{/snippet}

{#snippet selection(optionGroup: DTOOptionGroupBasicDTO)}
	<Card.Root class="flex flex-row items-center gap-2 p-2">
		min: <Badge>{optionGroup.maxSelections}</Badge>
		max: <Badge>{optionGroup.minSelections}</Badge>
	</Card.Root>
{/snippet}

<div class="m-2">
	<DataTable headerClass="pb-2" {header} {table} isLoading={query.isPending} noDataMessage="No roles for outlet" />
</div>
