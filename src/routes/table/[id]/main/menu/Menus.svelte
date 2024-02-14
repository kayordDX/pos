<script lang="ts">
	import type { EntitiesMenu } from "$lib/api";
	import { Badge, ToggleGroup } from "@kayord/ui";

	export let menus: EntitiesMenu[];

	import { selection } from "$lib/stores/selection";

	const setMenu = (menuId: number) => {
		$selection.menuId = menuId;
	};

	if ($selection.menuId == 0) {
		if (menus.length > 0 && menus[0]) {
			setMenu(menus[0].id);
		}
	}
</script>

<div class="flex items-center gap-2 mt-4">
	{#each menus as menu}
		<button on:click={() => setMenu(menu.id)}>
			<Badge variant={menu.id == $selection.menuId ? "" : "secondary"}>{menu.name}</Badge>
		</button>
	{/each}
</div>
