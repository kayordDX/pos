<script lang="ts">
	import type { DTOMenuItemDTO, OrderAddItemsOrder } from "$lib/api";
	import { Button, Card, Drawer, Label, Skeleton, Textarea, ToggleGroup } from "@kayord/ui";
	import { BoldIcon, ItalicIcon } from "lucide-svelte";
	// import { add } from "$lib/stores/basket";
	import { createOrderAddItems } from "$lib/api";

	export let menuItem: DTOMenuItemDTO;
	export let tableBookingId: number;

	let open = false;
	let note = "";

	const mutation = createOrderAddItems();

	const addToBasket = async () => {
		$mutation.mutateAsync({
			data: {
				orders: [{ menuItemId: menuItem.menuItemId, extraIds: [], optionIds: [], note: note }],
				tableBookingId: tableBookingId,
			},
		});
		open = false;
	};
</script>

<Drawer.Root bind:open>
	<Drawer.Trigger class="w-full max-w-lg">
		<div class="w-full relative max-w-lg text-left">
			<Card.Root class="w-full relative max-w-lg p-4">
				<!-- <div class="w-3 h-3 bg-green-500 absolute top-2 right-2 rounded-full"></div> -->
				<div class="font-bold">{menuItem.name}</div>
				<div class="text-sm text-muted-foreground">R {menuItem.price.toFixed(2)}</div>
			</Card.Root>
		</div>
	</Drawer.Trigger>
	<Drawer.Content class="fixed bottom-0 left-0 right-0 flex max-h-[96%] w-full">
		<div class="mx-auto flex w-full flex-col overflow-auto rounded-t-[10px] p-4">
			<Drawer.Header>
				<Drawer.Title>{menuItem.name}</Drawer.Title>
				<Drawer.Description>{menuItem.description}</Drawer.Description>
				<div class="font-bold">R {menuItem.price.toFixed(2)}</div>
			</Drawer.Header>
			<div class="flex flex-col gap-2 p-4">
				<Label>Special instructions</Label>
				<Textarea bind:value={note} />
			</div>
			<Drawer.Footer>
				<Button on:click={addToBasket}>Add</Button>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
