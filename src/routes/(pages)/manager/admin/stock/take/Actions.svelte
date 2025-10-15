<script lang="ts">
	import { Button, DropdownMenu, toast } from "@kayord/ui";
	import { CalculatorIcon, EllipsisVerticalIcon, PencilIcon } from "@lucide/svelte";
	import { type StockGetAllDivisionResponse, createStockItemsUpdateStockTake } from "$lib/api";
	import StockTake from "./StockTake.svelte";
	import { status } from "$lib/stores/status.svelte";
	import { getError } from "$lib/types";

	interface Props {
		refetch: () => void;
		stockItem: StockGetAllDivisionResponse;
	}

	let { refetch, stockItem }: Props = $props();

	let editOpen = $state(false);

	const hasOpenSalesPeriod = status.value.salesPeriodId > 0;

	const stockTakeMutation = createStockItemsUpdateStockTake();
	let stockTakeLoading = $state(false);
	const stockChecked = async () => {
		try {
			open = false;
			stockTakeLoading = true;
			await stockTakeMutation.mutateAsync({ data: { stockItemId: stockItem.stockItemId } });
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		} finally {
			stockTakeLoading = false;
		}
	};

	let open = $state(false);
</script>

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger>
		<Button size="icon" variant="secondary">
			<EllipsisVerticalIcon class="size-5" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item disabled={stockTakeLoading} onclick={stockChecked}>
			<CalculatorIcon /> Stock Checked
		</DropdownMenu.Item>
		<DropdownMenu.Item disabled={!hasOpenSalesPeriod} onclick={() => (editOpen = true)}>
			<PencilIcon /> Edit
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<StockTake {refetch} bind:open={editOpen} {stockItem} />
