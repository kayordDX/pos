<script lang="ts">
	import { goto } from "$app/navigation";
	import type { DTOOptionGroupBasicDTO } from "$lib/api";
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import {
		EllipsisVerticalIcon,
		EqualIcon,
		ListCollapseIcon,
		PencilIcon,
		Trash2Icon,
	} from "@lucide/svelte";
	import { createOptionGroupDelete } from "$lib/api";
	import { getError } from "$lib/types";
	import EditOptionGroup from "./EditOptionGroup.svelte";

	interface Props {
		refetch: () => void;
		optionGroup: DTOOptionGroupBasicDTO;
	}

	let { optionGroup, refetch }: Props = $props();

	let deleteOpen = $state(false);
	let editOpen = $state(false);

	const deleteMutation = createOptionGroupDelete();
	const deleteMenu = async () => {
		deleteOpen = false;
		try {
			await $deleteMutation.mutateAsync({ id: optionGroup.optionGroupId });
			refetch();
			toast.message("Option Group Deleted");
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
		<DropdownMenu.Item onclick={() => goto(`/manager/admin/options/${optionGroup.optionGroupId}`)}>
			<ListCollapseIcon /> Options
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (editOpen = true)}><PencilIcon /> Edit</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (deleteOpen = true)}><Trash2Icon /> Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<EditOptionGroup {refetch} bind:open={editOpen} {optionGroup} />

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Option Group?</AlertDialog.Title>
			<AlertDialog.Description>
				This will delete the option group only if it does not contain any options.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-destructive text-destructive-foreground" onclick={deleteMenu}>
				Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
