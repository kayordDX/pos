<script lang="ts">
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "@lucide/svelte";
	import EditSection from "./EditSection.svelte";
	import type { DTOMenuSectionDTO } from "$lib/api";
	import { createMenuSectionsDelete } from "$lib/api";
	import { getError } from "$lib/types";

	interface Props {
		refetch: () => void;
		section: DTOMenuSectionDTO;
	}

	let { section, refetch }: Props = $props();

	let deleteOpen = $state(false);
	let editOpen = $state(false);

	const deleteMutation = createMenuSectionsDelete();
	const deleteMenuSection = async () => {
		deleteOpen = false;
		try {
			await $deleteMutation.mutateAsync({ id: section.menuSectionId });
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
		<DropdownMenu.Item onclick={() => (editOpen = true)}><PencilIcon /> Edit</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (deleteOpen = true)}><Trash2Icon /> Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<EditSection {refetch} bind:open={editOpen} {section} />

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Section?</AlertDialog.Title>
			<AlertDialog.Description>
				This will delete section only if it does not contain any menu items.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				class="bg-destructive text-destructive-foreground"
				onclick={deleteMenuSection}
			>
				Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
