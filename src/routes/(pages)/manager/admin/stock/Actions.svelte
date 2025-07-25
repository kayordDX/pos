<script lang="ts">
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { CableIcon, EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "@lucide/svelte";
	import { createStockDelete, type StockGetAllResponse } from "$lib/api";
	import { getError } from "$lib/types";
	import AddStock from "./AddStock.svelte";
	import LinkedItems from "./LinkedItems.svelte";

	interface Props {
		refetch: () => void;
		stock?: StockGetAllResponse;
	}

	let { stock, refetch }: Props = $props();

	let deleteOpen = $state(false);
	let editOpen = $state(false);
	let linkedOpen = $state(false);

	const deleteMutation = createStockDelete();
	const deleteMenuItem = async () => {
		deleteOpen = false;
		try {
			await $deleteMutation.mutateAsync({ id: stock?.id ?? 0 });
			refetch();
			toast.message("Stock Item Deleted");
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
		<DropdownMenu.Item onclick={() => (editOpen = true)}><PencilIcon /> Edit</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (deleteOpen = true)}><Trash2Icon /> Delete</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (linkedOpen = true)}>
			<CableIcon /> Linked Items
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

{#if editOpen}
	<AddStock {refetch} bind:open={editOpen} {stock} />
{/if}
{#if linkedOpen}
	<LinkedItems bind:open={linkedOpen} {stock} />
{/if}

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Stock Item?</AlertDialog.Title>
			<AlertDialog.Description>
				This will delete the stock item and all its stock in all division.
			</AlertDialog.Description>
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
