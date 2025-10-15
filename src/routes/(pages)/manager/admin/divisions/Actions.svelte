<script lang="ts">
	import { goto } from "$app/navigation";
	import AddEditDivision from "./AddEditDivision.svelte";

	import { Button, DropdownMenu } from "@kayord/ui";
	import { PencilIcon, TableIcon, EllipsisVerticalIcon } from "@lucide/svelte";

	import type { EntitiesDivision } from "$lib/api";

	interface Props {
		refetch: () => void;
		division: EntitiesDivision;
	}
	let { refetch, division }: Props = $props();

	let editOpen = $state(false);

	//const deleteMutation = createSectionDelete();

	// const deleteSection = async () => {
	// 	deleteOpen = false;
	// 	try {
	// 		await deleteMutation.mutateAsync({ id: role.id });
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
		<DropdownMenu.Item onclick={() => goto(`/manager/admin/divisions/${division.divisionId}`)}>
			<TableIcon /> View Roles
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (editOpen = true)}>
			<PencilIcon /> Edit Division
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
{#if editOpen}
	<AddEditDivision bind:open={editOpen} {refetch} {division} />
{/if}
