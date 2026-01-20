<script lang="ts">
	import {
		createStockLinkGet,
		type StockGetAllResponse,
		type StockLinkGetResponse,
	} from "$lib/api";
	import { Badge, Dialog } from "@kayord/ui";
	import { DataTable, createShadTable, renderSnippet } from "@kayord/ui/data-table";
	import type { ColumnDef } from "@tanstack/table-core";

	interface Props {
		open: boolean;
		stock?: StockGetAllResponse;
	}
	let { open = $bindable(false), stock }: Props = $props();

	const query = $derived(
		createStockLinkGet(
			() => stock?.id ?? 0,
			() => ({ query: { enabled: false } })
		)
	);
	const data = $derived(query.data ?? []);

	$effect(() => {
		if (open) {
			query.refetch();
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
			header: "Quantity",
			accessorKey: "quantity",
			size: 1000,
		},
		{
			header: "Type",
			accessorKey: "type",
			size: 1000,
			cell: (item) => renderSnippet(linkedType, { type: item.getValue<string>() }),
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

{#snippet linkedType(param: { type: string })}
	{#if param.type == "Menu Item"}
		<Badge>{param.type}</Badge>
	{:else if param.type == "Extra"}
		<Badge variant="secondary">{param.type}</Badge>
	{:else if param.type == "Bulk"}
		<Badge variant="destructive">{param.type}</Badge>
	{:else}
		<Badge variant="outline">{param.type}</Badge>
	{/if}
{/snippet}

{#snippet header()}
	<Dialog.Header class="p-0">
		<Dialog.Title>Linked Items</Dialog.Title>
		<Dialog.Description>{stock?.name ?? "Stock"}</Dialog.Description>
	</Dialog.Header>
{/snippet}

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
