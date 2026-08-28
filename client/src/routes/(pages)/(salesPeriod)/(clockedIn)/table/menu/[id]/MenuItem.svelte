<script lang="ts">
	import type { DTOMenuItemDTOBasic } from "$lib/api";
	import { Card } from "@kayord/ui";

	interface Props {
		menuItem: DTOMenuItemDTOBasic;
		open: boolean;
		menuItemId: number;
		divisionId: number;
	}

	let {
		menuItem,
		open = $bindable(),
		menuItemId = $bindable(),
		divisionId = $bindable(),
	}: Props = $props();

	const openMenuItem = (id: number, divId: number) => {
		menuItemId = id;
		divisionId = divId;
		open = true;
	};
</script>

{#if menuItem.isAvailable}
	<div class="w-full relative max-w-lg text-left">
		<button
			class="w-full text-left"
			onclick={() => openMenuItem(menuItem.menuItemId, menuItem.divisionId)}
		>
			<Card.Root class="w-full relative max-w-lg p-4 gap-0">
				<div class="font-bold line-clamp-1">{menuItem.name}</div>
				<div class="text-sm text-muted-foreground">R {menuItem.price.toFixed(2)}</div>
				<div class="text-xs text-muted-foreground">{menuItem.menuSection.name}</div>
			</Card.Root>
		</button>
	</div>
{:else}
	<div class="w-full relative max-w-lg text-left">
		<Card.Root class="w-full relative max-w-lg p-4 bg-background gap-0">
			<div class="h-4 w-4 bg-destructive rounded-sm absolute top-2 right-2"></div>
			<div class="font-bold text-muted-foreground line-clamp-1">{menuItem.name}</div>
			<div class="text-sm text-muted-foreground">R {menuItem.price.toFixed(2)}</div>
			<div class="text-xs text-muted-foreground">{menuItem.menuSection.name}</div>
		</Card.Root>
	</div>
{/if}
