<script lang="ts">
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { EllipsisVerticalIcon, PencilIcon, UnlinkIcon } from "@lucide/svelte";
	import { createStockLinkDelete } from "$lib/api";
	import { getError, LinkType } from "$lib/types";
	import AddLinkStock from "./AddLinkStock.svelte";
	interface Props {
		refetch: () => void;
		id: number;
		stockId: number;
		quantity: number;
		linkType: LinkType;
		stockName: string;
		unitName: string;
	}

	let { id, stockId, linkType, refetch, quantity, stockName, unitName }: Props = $props();

	let deleteOpen = $state(false);
	let linkOpen = $state(false);

	const deleteMutation = createStockLinkDelete();
	const deleteMenuItem = async () => {
		deleteOpen = false;
		try {
			await deleteMutation.mutateAsync({ id, linkType, stockId });
			refetch();
			toast.message("Stock Item Unlinked");
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
		<DropdownMenu.Item onclick={() => (linkOpen = true)}><PencilIcon /> Edit</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (deleteOpen = true)}><UnlinkIcon /> Unlink</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Unlink Stock Item?</AlertDialog.Title>
			<AlertDialog.Description>
				This will unlink the stock item from current selection.
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
				Unlink
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

{#if linkOpen}
	<AddLinkStock
		bind:open={linkOpen}
		{id}
		{linkType}
		{refetch}
		{stockId}
		{quantity}
		{stockName}
		{unitName}
	/>
{/if}
