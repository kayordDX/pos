<script lang="ts">
	import type { DTOMenuItemDTOBasic } from "$lib/api";
	import { Card, Drawer, Loader } from "@kayord/ui";
	import Error from "$lib/components/Error.svelte";
	import { createMenuGetItemGetMenuItems } from "$lib/api";
	import { getError } from "$lib/types";
	import AddMenuItem from "./AddMenuItem.svelte";

	export let menuItem: DTOMenuItemDTOBasic;
	export let tableBookingId: number;

	let open = false;

	$: query = createMenuGetItemGetMenuItems(
		{ id: menuItem.menuItemId },
		{ query: { enabled: open } }
	);
</script>

<Drawer.Root bind:open>
	{#if menuItem.isAvailable}
		<Drawer.Trigger class="w-full max-w-lg">
			<div class="w-full relative max-w-lg text-left">
				<Card.Root class="w-full relative max-w-lg p-4">
					<div class="font-bold line-clamp-1">{menuItem.name}</div>
					<div class="text-sm text-muted-foreground">R {menuItem.price.toFixed(2)}</div>
					<div class="text-xs text-muted-foreground">{menuItem.menuSection.name}</div>
				</Card.Root>
			</div>
		</Drawer.Trigger>
	{:else}
		<div class="w-full relative max-w-lg text-left">
			<Card.Root class="w-full relative max-w-lg p-4 bg-background">
				<div class="h-4 w-4 bg-red-500 rounded-sm absolute top-2 right-2"></div>
				<div class="font-bold text-muted-foreground line-clamp-1">{menuItem.name}</div>
				<div class="text-sm text-muted-foreground">R {menuItem.price.toFixed(2)}</div>
				<div class="text-xs text-muted-foreground">{menuItem.menuSection.name}</div>
			</Card.Root>
		</div>
	{/if}
	<Drawer.Content class="fixed bottom-0 left-0 right-0 flex max-h-[96%] w-full">
		<div class="mx-auto flex w-full flex-col overflow-auto rounded-t-[10px] p-4">
			{#if $query.isPending}
				<Loader />
			{/if}
			{#if $query.error}
				<Error message={getError($query.error).message} />
			{/if}
			{#if $query.data}
				<AddMenuItem data={$query.data} {menuItem} {tableBookingId} bind:open />
			{/if}
		</div>
	</Drawer.Content>
</Drawer.Root>
