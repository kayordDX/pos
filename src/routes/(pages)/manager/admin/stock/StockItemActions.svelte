<script lang="ts">
	import { AlertDialog, Button, DropdownMenu, toast } from "@kayord/ui";
	import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-svelte";
	import { createStockDelete, type StockGetAllResponse } from "$lib/api";
	import { getError } from "$lib/types";
	import AddStock from "./AddStock.svelte";

	interface Props {
		refetch: () => void;
		// stock?: StockGetAllResponse;
	}

	let { refetch }: Props = $props();

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
	</DropdownMenu.Content>
</DropdownMenu.Root>

<!-- <AddStock {refetch} bind:open={editOpen} {stock} /> -->
