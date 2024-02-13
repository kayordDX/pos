<script lang="ts">
	import type { DTOMenuItemDTO } from "$lib/api";
	import { Button, Card, Drawer, Label, Skeleton, Textarea, ToggleGroup } from "@kayord/ui";
	import { BoldIcon, ItalicIcon } from "lucide-svelte";
	import { add } from "$lib/stores/basket";

	export let menuItem: DTOMenuItemDTO;

	let open = false;

	const addToBasket = () => {
		add(1, menuItem.name, menuItem.price);
		open = false;
	};
</script>

<Drawer.Root bind:open>
	<Drawer.Trigger class="w-full max-w-lg">
		<div class="w-full relative max-w-lg text-left">
			<Card.Root class="w-full relative max-w-lg p-4">
				<div class="w-3 h-3 bg-green-500 absolute top-2 right-2 rounded-full"></div>
				<div class="font-bold">{menuItem.name}</div>
				<div class="text-sm text-muted-foreground">R {menuItem.price.toFixed(2)}</div>
			</Card.Root>
		</div>
	</Drawer.Trigger>
	<Drawer.Content class="fixed bottom-0 left-0 right-0 flex max-h-[96%] w-full">
		<div class="mx-auto flex w-full flex-col overflow-auto rounded-t-[10px] p-4">
			<Drawer.Header>
				<Drawer.Title>{menuItem.name}</Drawer.Title>
				<Drawer.Description>{menuItem.description}</Drawer.Description>
			</Drawer.Header>
			<div class="flex flex-col gap-2">
				{#each { length: 15 } as _, i}
					<Skeleton class="h-6" />
				{/each}
				<ToggleGroup.Root type="single" value="bold">
					<ToggleGroup.Item value="bold" aria-label="Toggle bold">
						<div class="p-2">Monkeys</div>
					</ToggleGroup.Item>
					<ToggleGroup.Item value="italic" aria-label="Toggle italic">
						<ItalicIcon class="h-4 w-4" />
					</ToggleGroup.Item>
					<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
						<BoldIcon class="h-4 w-4" />
					</ToggleGroup.Item>
				</ToggleGroup.Root>
				{JSON.stringify(menuItem)}
				<Label>Special instructions</Label>
				<Textarea />
			</div>
			<Drawer.Footer>
				<Button on:click={addToBasket}>Add</Button>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
