<script lang="ts">
	import { Button, DropdownMenu } from "@kayord/ui";
	import { EllipsisVerticalIcon, PencilIcon } from "@lucide/svelte";
	import { type StockItemsGetAllResponse } from "$lib/api";
	import EditStockItem from "./EditStockItem.svelte";
	import { status } from "$lib/stores/status.svelte";

	interface Props {
		parentRefetch: () => void;
		refetch: () => void;
		stockItem: StockItemsGetAllResponse;
	}

	let { refetch, stockItem, parentRefetch }: Props = $props();

	let editOpen = $state(false);

	const hasOpenSalesPeriod = status.value.salesPeriodId > 0;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="icon" variant="secondary">
			<EllipsisVerticalIcon class="size-5" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item disabled={!hasOpenSalesPeriod} onclick={() => (editOpen = true)}>
			<PencilIcon /> Edit
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<EditStockItem {refetch} bind:open={editOpen} {stockItem} {parentRefetch} />
