<script lang="ts">
	import type { DTOMenuItemDTOBasic } from "$lib/api";
	import { Card } from "@kayord/ui";

	interface Props {
		menuItem: DTOMenuItemDTOBasic;
		open: boolean;
		menuItemId: number;
		divisionId: number;
	}

	let { menuItem, open = $bindable(), menuItemId = $bindable(), divisionId = $bindable() }: Props = $props();

	const openMenuItem = (id: number, divId: number) => {
		menuItemId = id;
		divisionId = divId;
		open = true;
	};
</script>

{#if menuItem.isAvailable}
	<div class="relative w-full max-w-lg text-left">
		<button class="w-full text-left" onclick={() => openMenuItem(menuItem.menuItemId, menuItem.divisionId)}>
			<Card.Root class="relative w-full max-w-lg gap-0 p-4">
				<div class="line-clamp-1 font-bold">{menuItem.name}</div>
				<div class="text-muted-foreground text-sm">R {menuItem.price.toFixed(2)}</div>
				<div class="text-muted-foreground text-xs">{menuItem.menuSection.name}</div>
			</Card.Root>
		</button>
	</div>
{:else}
	<div class="relative w-full max-w-lg text-left">
		<Card.Root class="bg-background relative w-full max-w-lg gap-0 p-4">
			<div class="bg-destructive absolute top-2 right-2 h-4 w-4 rounded-sm"></div>
			<div class="text-muted-foreground line-clamp-1 font-bold">{menuItem.name}</div>
			<div class="text-muted-foreground text-sm">R {menuItem.price.toFixed(2)}</div>
			<div class="text-muted-foreground text-xs">{menuItem.menuSection.name}</div>
		</Card.Root>
	</div>
{/if}
