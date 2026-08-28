<script lang="ts">
	import { Button } from "@kayord/ui";
	import { Drawer } from "@kayord/ui/drawer";
	import { SquareMenuIcon } from "@lucide/svelte";
	import Menus from "./Menus.svelte";
	import type { EntitiesMenu } from "$lib/api";

	interface Props {
		data: EntitiesMenu[] | undefined;
	}
	let { data }: Props = $props();
	let open = $state(false);
</script>

{#if (data?.length ?? 0) > 1}
	<Drawer.Root bind:open>
		<Drawer.Trigger>
			<Button variant="outline" size="icon"><SquareMenuIcon class="w-5 h-5" /></Button>
		</Drawer.Trigger>
		<Drawer.Content class="fixed bottom-0 left-0 right-0 flex max-h-[96%] w-full">
			<Drawer.Header>
				<Drawer.Title>Select Menu</Drawer.Title>
				<Drawer.Description>Choose the menu to view</Drawer.Description>
			</Drawer.Header>
			<div class="mx-auto flex w-full flex-col overflow-auto rounded-t-[10px] px-4">
				<Menus menus={data ?? []} bind:open />
			</div>
		</Drawer.Content>
	</Drawer.Root>
{/if}
