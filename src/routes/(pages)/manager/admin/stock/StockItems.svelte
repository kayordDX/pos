<script lang="ts">
	import { createStockItemsGetAll, type StockItemsGetAllResponse } from "$lib/api";
	import { createShadTable, DataTable, Dialog, renderComponent } from "@kayord/ui";
	import type { ColumnDef } from "@tanstack/table-core";
	import StockItemActions from "./StockItemActions.svelte";

	interface Props {
		open: boolean;
		id: number;
		stockName: string;
		refetch: () => void;
	}

	let { open = $bindable(false), id, stockName, refetch }: Props = $props();

	const query = $derived(createStockItemsGetAll({ id }, { query: { enabled: false } }));
	const data = $derived($query.data ?? []);

	$effect(() => {
		if (open) {
			$query.refetch();
		}
	});

	const columns: ColumnDef<StockItemsGetAllResponse>[] = [
		{
			header: "Division",
			accessorKey: "divisionName",
			size: 1000,
		},
		{
			header: "Threshold",
			accessorKey: "threshold",
			size: 1000,
		},
		{
			header: "Actual",
			accessorKey: "actual",
			size: 1000,
		},
		{
			header: "",
			accessorKey: "id",
			cell: (item) =>
				renderComponent(StockItemActions, {
					refetch: $query.refetch,
					parentRefetch: refetch,
					stockItem: item.row.original,
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
	<Dialog.Header class="p-0">
		<Dialog.Title>{stockName}</Dialog.Title>
		<Dialog.Description>Stock Availability</Dialog.Description>
	</Dialog.Header>
{/snippet}

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%]  max-w-3xl overflow-auto p-2">
		<div class="flex flex-col gap-4 p-0 mt-0">
			<DataTable
				{table}
				{columns}
				{header}
				headerClass="pb-2"
				isLoading={$query.isPending}
				noDataMessage="No stock items"
			/>
		</div>
	</Dialog.Content>
</Dialog.Root>
