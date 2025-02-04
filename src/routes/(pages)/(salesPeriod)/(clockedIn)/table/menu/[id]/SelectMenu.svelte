<script lang="ts">
	import { Button, DropdownMenu } from "@kayord/ui";
	import { SquareMenuIcon } from "lucide-svelte";
	import { menu } from "$lib/stores/menu.svelte";
	import type { EntitiesMenu } from "$lib/api";

	interface Props {
		menus: EntitiesMenu[];
	}

	let { menus }: Props = $props();

	const setMenu = (menuId: number) => {
		menu.value.menuId = menuId;
	};

	if (menu.value.menuId == 0) {
		if (menus.length > 0 && menus[0]) {
			setMenu(menus[0].id);
		}
	}

	let value = $state(menu.value.menuId.toString());
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="outline" size="icon">
			<SquareMenuIcon class="w-5 h-5" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>Select Menu</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.RadioGroup bind:value>
			{#each menus as menu}
				<DropdownMenu.RadioItem value={menu.id.toString()} onclick={() => setMenu(menu.id)}>
					{menu.name}
				</DropdownMenu.RadioItem>
			{/each}
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
