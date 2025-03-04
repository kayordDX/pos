<script lang="ts">
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { EllipsisVerticalIcon, UnlinkIcon } from "lucide-svelte";
	import { createStockLinkDelete } from "$lib/api";
	import { getError, LinkType } from "$lib/types";
	interface Props {
		refetch: () => void;
		id: number;
		stockId: number;
		linkType: LinkType;
	}

	let { id, stockId, linkType, refetch }: Props = $props();

	let deleteOpen = $state(false);

	const deleteMutation = createStockLinkDelete();
	const deleteMenuItem = async () => {
		deleteOpen = false;
		try {
			await $deleteMutation.mutateAsync({ id, linkType, stockId });
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
				class="bg-destructive text-destructive-foreground"
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
