<script lang="ts">
	import { createStockLinkGetAll, type StockLinkGetAllResponse } from "$lib/api";
	import { LinkType } from "$lib/types";
	import { Button, createShadTable, DataTable, Dialog, renderComponent } from "@kayord/ui";
	import type { ColumnDef } from "@tanstack/table-core";
	import Actions from "./Actions.svelte";
	import { LinkIcon } from "lucide-svelte";
	import AddLinkStock from "./AddLinkStock.svelte";

	interface Props {
		open: boolean;
		id: number;
		linkType: LinkType;
	}
	let { open = $bindable(false), id, linkType }: Props = $props();
	let linkOpen = $state(false);

	const query = createStockLinkGetAll(
		{ id: id, linkType: linkType },
		{ query: { enabled: false } }
	);
	const data = $derived($query.data ?? []);

	$effect(() => {
		if (open) {
			$query.refetch();
		}
	});

	const columns: ColumnDef<StockLinkGetAllResponse>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 1000,
		},
		{
			header: "Quantity",
			accessorKey: "quantity",
			size: 1000,
		},
		{
			header: "Unit",
			accessorKey: "unitName",
			size: 1000,
		},
		{
			header: "",
			accessorKey: "id",
			cell: (item) =>
				renderComponent(Actions, {
					refetch: $query.refetch,
					id: item.row.original.id,
					stockId: item.row.original.stockId,
					quantity: item.row.original.quantity,
					linkType: linkType,
					stockName: item.row.original.name,
					unitName: item.row.original.unitName,
				}),
			size: 10,
			enableSorting: false,
		},
	];

	const table = createShadTable({
		columns,
		get data() {
			return data;
		},
		enableRowSelection: false,
	});
</script>

{#snippet header()}
	<Dialog.Header class="pr-6 flex-row w-full justify-between">
		<div>
			<Dialog.Title>Stock</Dialog.Title>
			<Dialog.Description>Linked Stock Items</Dialog.Description>
		</div>
		<Button onclick={() => (linkOpen = true)}>
			<LinkIcon />
			Link Stock
		</Button>
	</Dialog.Header>
{/snippet}
<AddLinkStock bind:open={linkOpen} {id} {linkType} refetch={$query.refetch} />

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] max-w-3xl overflow-scroll">
		<div class="flex flex-col gap-4 p-0 mt-0">
			<DataTable
				{table}
				{columns}
				{header}
				headerClass="pb-2"
				isLoading={$query.isPending}
				noDataMessage="No linked items"
			/>
		</div>
	</Dialog.Content>
</Dialog.Root>
