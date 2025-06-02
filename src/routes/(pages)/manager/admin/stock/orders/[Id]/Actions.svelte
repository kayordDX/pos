<script lang="ts">
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "@lucide/svelte";
	import { createStockOrderItemDelete, type DTOStockOrderItemDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import AddOrderItem from "./AddOrderItem.svelte";

	interface Props {
		refetch: () => void;
		item: DTOStockOrderItemDTO;
		showActions: boolean;
	}

	let { item, refetch, showActions }: Props = $props();

	let deleteOpen = $state(false);
	let editOpen = $state(false);

	const deleteMutation = createStockOrderItemDelete();
	const deleteMenuItem = async () => {
		deleteOpen = false;
		try {
			await $deleteMutation.mutateAsync({ stockId: item.stockId, stockOrderId: item.stockOrderId });
			refetch();
			toast.message("Stock Item Deleted");
		} catch (error) {
			toast.error(getError(error).message);
		}
	};
</script>

{#if showActions}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button size="icon" variant="secondary">
				<EllipsisVerticalIcon class="size-5" />
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Item onclick={() => (editOpen = true)}><PencilIcon /> Edit</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => (deleteOpen = true)}
				><Trash2Icon /> Delete</DropdownMenu.Item
			>
		</DropdownMenu.Content>
	</DropdownMenu.Root>

	<AlertDialog.Root bind:open={deleteOpen}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Delete Order Item?</AlertDialog.Title>
				<AlertDialog.Description>This will delete the order item.</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action
					class="bg-destructive"
					onclick={() => {
						deleteMenuItem();
						deleteOpen = false;
					}}
				>
					Delete
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>

	<AddOrderItem bind:open={editOpen} {refetch} orderItem={item} />
{/if}
