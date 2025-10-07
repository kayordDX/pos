<script lang="ts">
	import { goto } from "$app/navigation";
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { Trash2Icon, PencilIcon, TableIcon, EllipsisVerticalIcon } from "@lucide/svelte";
	import AddEditBillCategory from "./AddEditBillCategory.svelte";
	import { createSectionDelete } from "$lib/api";
	import { getError } from "$lib/types";
	import type { EntitiesBillCategory } from "$lib/api";

	interface Props {
		refetch: () => void;
		billCat: EntitiesBillCategory;
	}
	let { refetch, billCat }: Props = $props();

	let editOpen = $state(false);
	let deleteOpen = $state(false);

	const deleteMutation = createSectionDelete();

	const deleteSection = async () => {
		deleteOpen = false;
		try {
			await deleteMutation.mutateAsync({ id: billCat.id });
			toast.message("Category Deleted");
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
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
		<DropdownMenu.Item onclick={() => (editOpen = true)}>
			<PencilIcon /> Edit
		</DropdownMenu.Item>
		<!-- <DropdownMenu.Item onclick={() => (deleteOpen = true)}>
			<Trash2Icon /> Delete
		</DropdownMenu.Item> -->
	</DropdownMenu.Content>
</DropdownMenu.Root>

{#if editOpen}
	<AddEditBillCategory bind:open={editOpen} {refetch} {billCat} />
{/if}

<!-- <AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Category?</AlertDialog.Title>
			<AlertDialog.Description>
				This will delete the category if no menu items depend on it.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-destructive" onclick={deleteSection}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root> -->
