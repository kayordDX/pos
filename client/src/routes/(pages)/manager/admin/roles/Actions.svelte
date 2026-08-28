<script lang="ts">
	import AddEditDivision from "./AddEditRole.svelte";

	import { AlertDialog, Button, DropdownMenu } from "@kayord/ui";
	import { PencilIcon, EllipsisVerticalIcon, Trash2Icon } from "@lucide/svelte";

	import { createRoleDelete, type EntitiesRole } from "$lib/api";
	import { toast } from "@kayord/ui/sonner";
	import { getError } from "$lib/types";

	interface Props {
		refetch: () => void;
		role: EntitiesRole;
	}
	let { refetch, role }: Props = $props();

	let editOpen = $state(false);
	let deleteOpen = $state(false);

	const deleteMutation = createRoleDelete();

	const deleteRole = async () => {
		deleteOpen = false;
		try {
			await deleteMutation.mutateAsync({ id: role.roleId });
			toast.message("Role Deleted");
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
</script>

{#if role?.roleType.name !== "manager" && role?.roleType.name !== "guest"}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button size="icon" variant="secondary">
				<EllipsisVerticalIcon class="size-5" />
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Item onclick={() => (editOpen = true)}>
				<PencilIcon /> Edit Role
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => (deleteOpen = true)}>
				<Trash2Icon /> Delete
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
{#if editOpen}
	<AddEditDivision bind:open={editOpen} {refetch} {role} />
{/if}

{#if deleteOpen}
	<AlertDialog.Root bind:open={deleteOpen}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Delete Role?</AlertDialog.Title>
				<AlertDialog.Description>
					This will remove the role and users assigned to it will lose access
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action class="bg-destructive" onclick={deleteRole}>Delete</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
