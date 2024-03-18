<script lang="ts">
	import type { EntitiesMenu } from "$lib/api";
	import { Card } from "@kayord/ui";

	export let menus: EntitiesMenu[];
	export let open = false;

	import { selection } from "$lib/stores/selection";
	import { cn } from "@kayord/ui/utils";

	const setMenu = (menuId: number) => {
		$selection.menuId = menuId;
		open = false;
	};

	if ($selection.menuId == 0) {
		if (menus.length > 0 && menus[0]) {
			setMenu(menus[0].id);
		}
	}
</script>

<div class="flex flex-col items-center gap-2 mt-4">
	{#each menus as menu}
		{@const extraClass = menu.id == $selection.menuId ? "bg-primary text-primary-foreground" : ""}
		<button on:click={() => setMenu(menu.id)} class="w-full">
			<Card.Root class={cn("p-4 w-full", extraClass)}>
				{menu.name}
			</Card.Root>
		</button>
	{/each}
</div>
