<script lang="ts">
	import type { EntitiesMenu } from "$lib/api";
	import { Card } from "@kayord/ui";
	import { menu } from "$lib/stores/menu.svelte";
	import { menuSection } from "$lib/stores/menuSection.svelte";
	import { cn } from "@kayord/ui/utils";

	interface Props {
		menus: EntitiesMenu[];
		open?: boolean;
	}
	let { menus, open = $bindable(false) }: Props = $props();

	const setMenu = (menuId: number) => {
		open = false;
		menu.value.menuId = menuId;
		menuSection.sectionId = 0;
	};

	if (menu.value.menuId == 0) {
		if (menus.length > 0 && menus[0]) {
			setMenu(menus[0].id);
		}
	}
</script>

<div class="flex flex-col items-center gap-2 mt-4">
	{#each menus as menuItem}
		{@const extraClass =
			menuItem.id == menu.value.menuId ? "bg-primary text-primary-foreground" : ""}
		<button onclick={() => setMenu(menuItem.id)} class="w-full">
			<Card.Root class={cn("p-4 w-full", extraClass)}>
				{menuItem.name}
			</Card.Root>
		</button>
	{/each}
</div>
