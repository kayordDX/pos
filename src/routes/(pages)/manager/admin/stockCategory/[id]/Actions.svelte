<script lang="ts">
	import { goto } from "$app/navigation";
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { Trash2Icon, PencilIcon, TableIcon, EllipsisVerticalIcon } from "@lucide/svelte";
	import { getError } from "$lib/types";
	import type { EntitiesStockCategory } from "$lib/api";
	import AddEditCategory from "./AddEditChildCategory.svelte";
	import { createStockCategoryUpdate } from "$lib/api";

	interface Props {
		refetch: () => void;
		category: EntitiesStockCategory;
	}
	let { refetch, category }: Props = $props();
	let editOpen = $state(false);
	let deleteOpen = $state(false);

	const deleteMutation = createStockCategoryUpdate();

	const deleteCategory = async () => {
		deleteOpen = false;
		try {
			await deleteMutation.mutateAsync({
				id: category.id,
				data: { isDeleted: true, name: category.name, parentId: category.parentId },
			});
			toast.message("Child Category Deleted");
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
</script>

<AddEditCategory bind:open={editOpen} {refetch} {category} />
<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="icon" variant="secondary">
			<EllipsisVerticalIcon class="size-5" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item onclick={() => (editOpen = true)}>
			<PencilIcon /> Edit Category
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (deleteOpen = true)}>
			<Trash2Icon /> Delete Category
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<!-- {#if editOpen}
	<AddEditSection bind:open={editOpen} {refetch} {section} />
{/if} -->

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Child Category?</AlertDialog.Title>
			<AlertDialog.Description>
				This will delete this category if no items depend on it.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-destructive" onclick={deleteCategory}>Delete</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
