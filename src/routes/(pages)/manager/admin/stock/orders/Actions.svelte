<script lang="ts">
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { EllipsisVerticalIcon, ShieldXIcon, ViewIcon } from "@lucide/svelte";
	import { createStockOrderCancel, type DTOStockOrderResponseDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import { goto } from "$app/navigation";
	import { status } from "$lib/stores/status.svelte";

	interface Props {
		refetch: () => void;
		stockOrder: DTOStockOrderResponseDTO;
	}

	let { stockOrder, refetch }: Props = $props();

	let cancelOpen = $state(false);

	const hasOpenSalesPeriod = status.value.salesPeriodId > 0;

	const showCancel = $derived(hasOpenSalesPeriod && stockOrder.stockOrderStatusId == 1);

	const cancelMutation = createStockOrderCancel();
	const cancelStockOrder = async () => {
		cancelOpen = false;
		try {
			await $cancelMutation.mutateAsync({ data: { id: stockOrder.id } });
			refetch();
			toast.message("Stock Order Cancelled");
		} catch (error) {
			toast.error(getError(error).message);
		}
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="icon" variant="secondary">
			<EllipsisVerticalIcon class="size-5" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item onclick={() => goto(`/manager/admin/stock/orders/${stockOrder.id}`)}>
			<ViewIcon /> View
		</DropdownMenu.Item>
		{#if showCancel}
			<DropdownMenu.Item onclick={() => (cancelOpen = true)}>
				<ShieldXIcon />Cancel
			</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>

<AlertDialog.Root bind:open={cancelOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Cancel Stock Order?</AlertDialog.Title>
			<AlertDialog.Description>
				This will cancel all stock order items and move this order to done
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				class="bg-destructive"
				onclick={() => {
					cancelStockOrder();
					cancelOpen = false;
				}}
			>
				Continue
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
