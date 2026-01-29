<script lang="ts">
	import { createStockLinkGetAll, type StockLinkGetAllResponse } from "$lib/api";
	import { LinkType } from "$lib/types";
	import { Button, Dialog } from "@kayord/ui";
	import { DataTable, createShadTable, renderComponent } from "@kayord/ui/data-table";
	import type { ColumnDef } from "@tanstack/table-core";
	import Actions from "./Actions.svelte";
	import { LinkIcon } from "@lucide/svelte";
	import AddLinkStock from "./AddLinkStock.svelte";
	import Total from "../stock/Total.svelte";

	interface Props {
		open: boolean;
		id: number;
		linkType: LinkType;
	}
	let { open = $bindable(false), id, linkType }: Props = $props();
	let linkOpen = $state(false);

	const query = createStockLinkGetAll(
		() => ({ id, linkType }),
		() => ({ query: { enabled: false } })
	);
	const data = $derived(query.data ?? []);

	$effect(() => {
		if (open) {
			query.refetch();
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
			header: "Total",
			accessorKey: "id",
			cell: (item) =>
				renderComponent(Total, {
					id: item.row.original.stockId,
					name: item.row.original.name,
					totalActual: item.row.original.totalActual,
					refetch: query.refetch,
				}),
			size: 1000,
			enableSorting: false,
		},
		{
			header: "",
			accessorKey: "id",
			cell: (item) =>
				renderComponent(Actions, {
					refetch: query.refetch,
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
			{#if linkType === LinkType.Bulk}
				<Dialog.Description>Bulk Stock increases quantity when actioned</Dialog.Description>
			{:else}
				<Dialog.Description>Linked Stock Items</Dialog.Description>
			{/if}
		</div>
		<Button onclick={() => (linkOpen = true)} class="mr-3">
			<LinkIcon />
			Link Stock
		</Button>
	</Dialog.Header>
{/snippet}
<AddLinkStock bind:open={linkOpen} {id} {linkType} refetch={query.refetch} />

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto p-2 w-[100%] md:min-w-[48rem]">
		<div class="flex flex-col gap-4 p-0 mt-0">
			<DataTable
				{table}
				{header}
				headerClass="pb-2"
				isLoading={query.isPending}
				noDataMessage="No linked items"
			/>
		</div>
	</Dialog.Content>
</Dialog.Root>
