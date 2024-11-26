<script lang="ts">
	import { goto } from "$app/navigation";
	import type { DTOExtraGroupAdminDTO } from "$lib/api";
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { EllipsisVerticalIcon, EqualIcon, PencilIcon, Trash2Icon } from "lucide-svelte";
	import { createExtraGroupDelete } from "$lib/api";
	import { getError } from "$lib/types";
	import EditExtraGroup from "./EditExtraGroup.svelte";

	interface Props {
		refetch: () => void;
		extraGroup: DTOExtraGroupAdminDTO;
	}

	let { extraGroup, refetch }: Props = $props();

	let deleteOpen = $state(false);
	let editOpen = $state(false);

	const deleteMutation = createExtraGroupDelete();
	const deleteMenu = async () => {
		deleteOpen = false;
		try {
			await $deleteMutation.mutateAsync({ id: extraGroup.extraGroupId });
			refetch();
			toast.message("Extra Group Deleted");
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
		<DropdownMenu.Item onclick={() => goto(`/manager/admin/extras/${extraGroup.extraGroupId}`)}>
			<EqualIcon /> Extra Items
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (editOpen = true)}><PencilIcon /> Edit</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (deleteOpen = true)}><Trash2Icon /> Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<EditExtraGroup {refetch} bind:open={editOpen} {extraGroup} />

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Extra Group?</AlertDialog.Title>
			<AlertDialog.Description>
				This will delete the extra group only if it does not contain any extras.
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
