<script lang="ts">
	import { AlertDialog, Button, DropdownMenu } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { BanIcon, EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "@lucide/svelte";
	import {
		createStockAllocateItemCancel,
		createStockAllocateItemDelete,
		type DTOStockAllocateItemDTO,
	} from "$lib/api";
	import { getError } from "$lib/types";
	import AddOrderItem from "./AddAllocationItem.svelte";
	import AddAllocationItem from "./AddAllocationItem.svelte";

	interface Props {
		canEdit: boolean;
		refetch: () => void;
		divisionId: number;
		item: DTOStockAllocateItemDTO;
	}

	let { canEdit, item, divisionId, refetch }: Props = $props();

	let deleteOpen = $state(false);
	let editOpen = $state(false);

	const deleteMutation = createStockAllocateItemDelete();
	const deleteAllocateItem = async () => {
		deleteOpen = false;
		try {
			await deleteMutation.mutateAsync({ id: item.id });
			refetch();
			toast.message("Stock Allocation Item Deleted");
		} catch (error) {
			toast.error(getError(error).message);
		}
	};

	const cancelMutation = createStockAllocateItemCancel();
	const cancelAllocateItem = async () => {
		try {
			await cancelMutation.mutateAsync({ data: { id: item.id } });
			refetch();
			toast.message("Stock Allocation Item Cancelled");
		} catch (error) {
			toast.error(getError(error).message);
		}
	};
</script>

<DropdownMenu.Root>
	{#if canEdit}
		<DropdownMenu.Trigger>
			<Button size="icon" variant="secondary">
				<EllipsisVerticalIcon class="size-5" />
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Item onclick={() => (editOpen = true)}>
				<PencilIcon /> Edit
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => (deleteOpen = true)}>
				<Trash2Icon /> Delete
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	{:else if item.stockAllocateItemStatusId == 2}
		<Button variant="secondary" onclick={cancelAllocateItem}>
			<BanIcon /> Cancel
		</Button>
	{/if}
</DropdownMenu.Root>

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Allocation Item?</AlertDialog.Title>
			<AlertDialog.Description>This will delete the allocation item.</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				class="bg-destructive"
				onclick={() => {
					deleteAllocateItem();
					deleteOpen = false;
				}}
			>
				Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<AddAllocationItem bind:open={editOpen} {refetch} allocateItem={item} {divisionId} />
