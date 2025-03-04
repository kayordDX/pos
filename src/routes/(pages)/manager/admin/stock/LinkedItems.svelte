<script lang="ts">
	import {
		createStockLinkGet,
		type StockGetAllResponse,
		type StockLinkGetResponse,
	} from "$lib/api";
	import { Badge, createShadTable, DataTable, Dialog, renderSnippet } from "@kayord/ui";
	import type { ColumnDef } from "@tanstack/table-core";

	interface Props {
		open: boolean;
		stock?: StockGetAllResponse;
	}
	let { open = $bindable(false), stock }: Props = $props();

	const query = createStockLinkGet(stock?.id ?? 0, { query: { enabled: false } });
	const data = $derived($query.data ?? []);

	$effect(() => {
		if (open) {
			$query.refetch();
		}
	});

	const columns: ColumnDef<StockLinkGetResponse>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 1000,
		},
		{
			header: "Description",
			accessorKey: "description",
			size: 1000,
		},
		{
			header: "Type",
			accessorKey: "type",
			size: 1000,
			cell: (item) => renderSnippet(linkedType, item.getValue<string>()),
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

{#snippet linkedType(type: string)}
	{#if type == "Menu Item"}
		<Badge>{type}</Badge>
	{:else if type == "Extra"}
		<Badge variant="secondary">{type}</Badge>
	{:else}
		<Badge variant="ghost">{type}</Badge>
	{/if}
{/snippet}

{#snippet header()}
	<Dialog.Header class="p-0">
		<Dialog.Title>Linked Items</Dialog.Title>
		<Dialog.Description>{stock?.name ?? "Stock"}</Dialog.Description>
	</Dialog.Header>
{/snippet}

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] max-w-3xl overflow-scroll p-2">
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
