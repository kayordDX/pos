<script lang="ts">
	import type { DTOExtraDTO } from "$lib/api";
	import { AlertDialog, Button, DropdownMenu } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import {
		BookOpenTextIcon,
		EllipsisVerticalIcon,
		EqualIcon,
		PencilIcon,
		Trash2Icon,
	} from "@lucide/svelte";
	import { createExtraDelete } from "$lib/api";
	import { getError, LinkType } from "$lib/types";
	import EditExtra from "./EditExtra.svelte";
	import StockLink from "../../stockLink/StockLink.svelte";

	interface Props {
		refetch: () => void;
		extra: DTOExtraDTO;
	}

	let { extra, refetch }: Props = $props();

	let deleteOpen = $state(false);
	let editOpen = $state(false);
	let stockLinkOpen = $state(false);

	const deleteMutation = createExtraDelete();
	const deleteMenu = async () => {
		deleteOpen = false;
		try {
			await deleteMutation.mutateAsync({ id: extra.extraId });
			refetch();
			toast.message("Extra Deleted");
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

<EditExtra {refetch} bind:open={editOpen} {extra} />

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Extra?</AlertDialog.Title>
			<AlertDialog.Description>This will delete the extra.</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-destructive" onclick={deleteMenu}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<StockLink bind:open={stockLinkOpen} id={extra.extraId} linkType={LinkType.Extra} />
