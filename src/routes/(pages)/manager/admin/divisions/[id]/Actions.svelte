<script lang="ts">
	import { AlertDialog, Button, DropdownMenu } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { getError } from "$lib/types";
	import type { EntitiesRole } from "$lib/api";
	import { createRoleDivisionDelete } from "$lib/api";
	import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "@lucide/svelte";

	interface Props {
		refetch: () => void;
		role: EntitiesRole;
		divisionId: number;
	}
	let { refetch, role, divisionId }: Props = $props();

	let editOpen = $state(false);
	let deleteOpen = $state(false);

	const deleteMutation = createRoleDivisionDelete();

	const deleteRole = async () => {
		deleteOpen = false;
		try {
			await deleteMutation.mutateAsync({ roleId: role.roleId, divisionId: divisionId });
			toast.message("Role Removed from Division");
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
		<DropdownMenu.Item onclick={() => (deleteOpen = true)}>
			<Trash2Icon /> Delete
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Role from Division?</AlertDialog.Title>
			<AlertDialog.Description>
				This will remove the role from this division
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-destructive" onclick={deleteRole}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
