<script lang="ts">
	import { goto } from "$app/navigation";
	import type { EntitiesMenu } from "$lib/api";
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { EllipsisVerticalIcon, EqualIcon, PencilIcon, Trash2Icon } from "@lucide/svelte";
	import EditMenu from "./EditMenu.svelte";
	import { createMenuDelete } from "$lib/api";
	import { getError } from "$lib/types";

	interface Props {
		refetch: () => void;
		menu: EntitiesMenu;
	}

	let { menu, refetch }: Props = $props();

	let deleteOpen = $state(false);
	let editOpen = $state(false);

	const deleteMutation = createMenuDelete();
	const deleteMenu = async () => {
		deleteOpen = false;
		try {
			await $deleteMutation.mutateAsync({ id: menu.id });
			refetch();
			toast.message("Menu Deleted");
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
		<DropdownMenu.Item onclick={() => goto(`/manager/admin/menus/${menu.id}`)}>
			<EqualIcon /> Sections
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (editOpen = true)}><PencilIcon /> Edit</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (deleteOpen = true)}><Trash2Icon /> Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<EditMenu {refetch} bind:open={editOpen} {menu} />

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Menu?</AlertDialog.Title>
			<AlertDialog.Description>
				This will delete menu only if it does not contain any sections.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-destructive" onclick={deleteMenu}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
