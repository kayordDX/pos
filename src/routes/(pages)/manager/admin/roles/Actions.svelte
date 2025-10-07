<script lang="ts">
	import { goto } from "$app/navigation";
	import AddEditDivision from "./AddEditRole.svelte";

	import { Button, DropdownMenu } from "@kayord/ui";
	import { PencilIcon, TableIcon, EllipsisVerticalIcon } from "@lucide/svelte";

	import type { EntitiesRole } from "$lib/api";

	interface Props {
		refetch: () => void;
		role: EntitiesRole;
	}
	let { refetch, role }: Props = $props();

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
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
{#if editOpen}
	<AddEditDivision bind:open={editOpen} {refetch} {role} />
{/if}
