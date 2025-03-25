<script lang="ts">
	import { page } from "$app/state";
	import { createExtraItems, type DTOExtraDTO } from "$lib/api";
	import { Button, DataTable, renderComponent, ShadTable } from "@kayord/ui";
	import { PlusIcon } from "@lucide/svelte";
	import Actions from "./Actions.svelte";
	import EditExtra from "./EditExtra.svelte";
	import type { ColumnDef } from "@tanstack/table-core";

	const query = createExtraItems(Number(page.params.Id));
	let addOpen = $state(false);

	const groupName = $derived(($query.data ?? [])[0]?.extraGroup.name);

	const columns: ColumnDef<DTOExtraDTO>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 1000,
		},
		{
			header: "Price",
			accessorKey: "price",
			size: 1000,
			cell: (item) => `R ${item.row.original.price.toFixed(2)}`,
		},
		{
			header: "Position",
			accessorKey: "positionId",
			size: 1000,
		},
		{
			header: "",
			accessorKey: "extraGroupId",
			cell: (item) =>
				renderComponent(Actions, {
					extra: item.row.original,
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
		<h1>Extra Items - ({groupName})</h1>
		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<EditExtra refetch={$query.refetch} bind:open={addOpen} />
	</div>
{/snippet}

<div class="m-2">
	<DataTable
		headerClass="pb-2"
		bind:tableState
		{header}
		isLoading={$query.isPending}
		noDataMessage="No roles for outlet"
	/>
</div>
