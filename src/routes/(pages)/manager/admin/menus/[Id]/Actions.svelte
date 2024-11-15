<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button, DropdownMenu } from "@kayord/ui";
	import { EllipsisVerticalIcon, EqualIcon, PencilIcon, Trash2Icon } from "lucide-svelte";

	interface Props {
		refetch: () => void;
		id: number;
	}

	let { id, refetch }: Props = $props();

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
		<DropdownMenu.Item onclick={() => (editOpen = true)}><PencilIcon /> Edit</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (deleteOpen = true)}><Trash2Icon /> Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
