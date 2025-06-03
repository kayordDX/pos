<script lang="ts">
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { Trash2Icon, EllipsisVerticalIcon } from "@lucide/svelte";
	import AddEditAdjustmentType from "./AddEditAdjustmentType.svelte";
	import { createAdjustmentTypeOutletRemove } from "$lib/api";
	import { getError } from "$lib/types";
	import { status } from "$lib/stores/status.svelte";
	import type { EntitiesAdjustmentType } from "$lib/api";

	interface Props {
		refetch: () => void;
		adjustmentType: EntitiesAdjustmentType;
		adjustmentTypeId: number;
	}

	let { refetch, adjustmentType }: Props = $props();

	let editOpen = $state(false);
	let deleteOpen = $state(false);

	const deleteMutation = createAdjustmentTypeOutletRemove();

	const deleteAdjustmentType = async () => {
		deleteOpen = false;
		try {
			await $deleteMutation.mutateAsync({
				data: {
					outletId: status.value.outletId,
					adjustmentTypeId: adjustmentType.adjustmentTypeId,
				},
			});
			toast.message("Adjustment Type Deleted");
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
			<Trash2Icon /> Remove Adjustment Type
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<AddEditAdjustmentType bind:open={editOpen} {refetch} {adjustmentType} />

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Remove Adjustment Type</AlertDialog.Title>
			<AlertDialog.Description>
				This will remove this Adjustment Type from your Outlet
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				class="bg-destructive text-destructive-foreground"
				onclick={deleteAdjustmentType}
			>
				Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
