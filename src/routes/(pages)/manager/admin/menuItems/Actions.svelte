<script lang="ts">
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import {
		BookOpenTextIcon,
		EllipsisVerticalIcon,
		PencilIcon,
		SquareStackIcon,
		Trash2Icon,
	} from "@lucide/svelte";
	import EditMenuItem from "./EditMenuItem.svelte";
	import { createMenuItemDelete, type MenuItemMenuItemAdminDTO } from "$lib/api";
	import { getError, LinkType } from "$lib/types";
	import StockLink from "../stockLink/StockLink.svelte";

	interface Props {
		refetch: () => void;
		menuItem: MenuItemMenuItemAdminDTO;
	}

	let { menuItem, refetch }: Props = $props();

	let deleteOpen = $state(false);
	let editOpen = $state(false);
	let stockLinkOpen = $state(false);
	let linkType = $state(LinkType.MenuItem);

	const deleteMutation = createMenuItemDelete();
	const deleteMenuItem = async () => {
		deleteOpen = false;
		try {
			await $deleteMutation.mutateAsync({ id: menuItem.menuItemId });
			refetch();
			toast.message("Menu Item Deleted");
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
		<DropdownMenu.Item
			onclick={() => {
				linkType = LinkType.MenuItem;
				stockLinkOpen = true;
			}}
		>
			<BookOpenTextIcon /> Link Stock
		</DropdownMenu.Item>
		<DropdownMenu.Item
			onclick={() => {
				linkType = LinkType.Bulk;
				stockLinkOpen = true;
			}}
		>
			<SquareStackIcon /> Bulk Stock
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Menu Item?</AlertDialog.Title>
			<AlertDialog.Description>
				This will delete the menu item and all its configured options.
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
				Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<EditMenuItem {refetch} bind:open={editOpen} {menuItem} />
{#if stockLinkOpen}
	<StockLink bind:open={stockLinkOpen} id={menuItem.menuItemId} {linkType} />
{/if}
