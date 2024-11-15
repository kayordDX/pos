<script lang="ts">
	import { goto } from "$app/navigation";
	import type { EntitiesMenu } from "$lib/api";
	import { Button, DropdownMenu } from "@kayord/ui";
	import { EllipsisVerticalIcon, EqualIcon, PencilIcon, Trash2Icon } from "lucide-svelte";
	import EditMenu from "./EditMenu.svelte";

	interface Props {
		refetch: () => void;
		menu: EntitiesMenu;
	}

	let { menu, refetch }: Props = $props();

	let deleteOpen = $state(false);
	let editOpen = $state(false);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="icon" variant="secondary">
			<EllipsisVerticalIcon class="size-5" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item onclick={() => goto(`/manager/admin/menus/${menu.id}`)}>
			<EqualIcon /> Sections
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (editOpen = true)}><PencilIcon /> Edit</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (deleteOpen = true)}><Trash2Icon /> Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<EditMenu {refetch} bind:open={editOpen} {menu} />
