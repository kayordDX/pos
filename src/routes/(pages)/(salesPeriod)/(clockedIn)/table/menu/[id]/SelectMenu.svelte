<script lang="ts">
	import { Button, DropdownMenu } from "@kayord/ui";
	import { SquareMenuIcon } from "lucide-svelte";
	import { selection } from "$lib/stores/selection.svelte";
	import type { EntitiesMenu } from "$lib/api";

	interface Props {
		menus: EntitiesMenu[];
	}

	let { menus }: Props = $props();

	const setMenu = (menuId: number) => {
		selection.value.menuId = menuId;
	};

	if (selection.value.menuId == 0) {
		if (menus.length > 0 && menus[0]) {
			setMenu(menus[0].id);
		}
	}

	let value = $state(selection.value.menuId.toString());
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" size="icon" builders={[builder]}
			><SquareMenuIcon class="w-5 h-5" /></Button
		>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>Select Menu</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.RadioGroup bind:value>
			{#each menus as menu}
				<DropdownMenu.RadioItem value={menu.id.toString()} on:click={() => setMenu(menu.id)}>
					{menu.name}
				</DropdownMenu.RadioItem>
			{/each}
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
