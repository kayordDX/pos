<script lang="ts">
	import { goto } from "$app/navigation";
	import type { DTOOptionDTO } from "$lib/api";
	import { AlertDialog, Button, DropdownMenu } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import {
		BookOpenTextIcon,
		EllipsisVerticalIcon,
		EqualIcon,
		ListCollapseIcon,
		PencilIcon,
		Trash2Icon,
	} from "@lucide/svelte";
	import { createOptionDelete } from "$lib/api";
	import { getError, LinkType } from "$lib/types";
	import EditOption from "./EditOption.svelte";
	import StockLink from "../../stockLink/StockLink.svelte";

	interface Props {
		refetch: () => void;
		option: DTOOptionDTO;
	}

	let { option, refetch }: Props = $props();

	let deleteOpen = $state(false);
	let editOpen = $state(false);
	let stockLinkOpen = $state(false);

	const deleteMutation = createOptionDelete();
	const deleteMenu = async () => {
		deleteOpen = false;
		try {
			await deleteMutation.mutateAsync({ id: option.optionId });
			refetch();
			toast.message("Option Deleted");
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
		<DropdownMenu.Item onclick={() => (editOpen = true)}><PencilIcon /> Edit</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (deleteOpen = true)}><Trash2Icon /> Delete</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (stockLinkOpen = true)}>
			<BookOpenTextIcon /> Link Stock
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<EditOption {refetch} bind:open={editOpen} {option} />

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Option?</AlertDialog.Title>
			<AlertDialog.Description>This will delete the option.</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-destructive" onclick={deleteMenu}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<StockLink bind:open={stockLinkOpen} id={option.optionId} linkType={LinkType.Option} />
