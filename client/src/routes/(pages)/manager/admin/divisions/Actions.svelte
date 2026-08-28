<script lang="ts">
	import { goto } from "$app/navigation";
	import AddEditDivision from "./AddEditDivision.svelte";

	import { AlertDialog, Button, DropdownMenu } from "@kayord/ui";
	import { PencilIcon, TableIcon, EllipsisVerticalIcon, Trash2Icon } from "@lucide/svelte";

	import { createDivisionDelete, type EntitiesDivision } from "$lib/api";
	import { toast } from "@kayord/ui/sonner";
	import { getError } from "$lib/types";

	interface Props {
		refetch: () => void;
		division: EntitiesDivision;
	}
	let { refetch, division }: Props = $props();

	let editOpen = $state(false);
	let deleteOpen = $state(false);

	const deleteMutation = createDivisionDelete();

	const deleteDivision = async () => {
		deleteOpen = false;
		try {
			await deleteMutation.mutateAsync({ id: division.divisionId });
			toast.message("Division Deleted");
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
		<DropdownMenu.Item onclick={() => goto(`/manager/admin/divisions/${division.divisionId}`)}>
			<TableIcon /> View Roles
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (editOpen = true)}>
			<PencilIcon /> Edit Division
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (deleteOpen = true)}>
			<Trash2Icon /> Delete
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
{#if editOpen}
	<AddEditDivision bind:open={editOpen} {refetch} {division} />
{/if}

{#if deleteOpen}
	<AlertDialog.Root bind:open={deleteOpen}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Delete Division?</AlertDialog.Title>
				<AlertDialog.Description>
					This will remove the division and all its items
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action class="bg-destructive" onclick={deleteDivision}>
					Delete
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
