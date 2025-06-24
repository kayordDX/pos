<script lang="ts">
	import { goto } from "$app/navigation";
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { Trash2Icon, PencilIcon, TableIcon, EllipsisVerticalIcon } from "@lucide/svelte";
	//import AddEditSection from "./AddEditSection.svelte";
	import { getError } from "$lib/types";
	import type { EntitiesStockCategoryAllOf } from "$lib/api";

	interface Props {
		refetch: () => void;
		category: EntitiesStockCategoryAllOf;
	}
	let { refetch, category }: Props = $props();

	let editOpen = $state(false);
	let deleteOpen = $state(false);

	//const deleteMutation = createSectionDelete();

	// const deleteSection = async () => {
	// 	deleteOpen = false;
	// 	try {
	// 		await $deleteMutation.mutateAsync({ id: role.id });
	// 		toast.message("Section Deleted");
	// 		refetch();
	// 	} catch (err) {
	// 		toast.error(getError(err).message);
	// 	}
	// };
</script>

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

<!-- <AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Section?</AlertDialog.Title>
			<AlertDialog.Description>
				This will delete the section if no tables or items depend on it.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-destructive" onclick={deleteSection}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root> -->
