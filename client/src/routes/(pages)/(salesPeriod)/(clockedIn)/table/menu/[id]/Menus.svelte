<script lang="ts">
	import type { EntitiesMenu } from "$lib/api";
	import { Card } from "@kayord/ui";
	import { menu } from "$lib/stores/menu.svelte";
	import { menuSection } from "$lib/stores/menuSection.svelte";
	import { cn } from "@kayord/ui/utils";
	import { untrack } from "svelte";

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

	untrack(() => menu.value.menuId == 0 && menus.length > 0 && menus[0] && setMenu(menus[0].id));
</script>

<div class="mt-4 flex flex-col items-center gap-2">
	{#each menus as menuItem (menuItem.id)}
		{@const extraClass = menuItem.id == menu.value.menuId ? "bg-primary text-primary-foreground" : ""}
		<button onclick={() => setMenu(menuItem.id)} class="w-full">
			<Card.Root class={cn("w-full p-4", extraClass)}>
				{menuItem.name}
			</Card.Root>
		</button>
	{/each}
</div>
