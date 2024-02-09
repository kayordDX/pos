<script lang="ts">
	import { Button, Card, Drawer, Skeleton, ToggleGroup } from "@kayord/ui";
	import { BoldIcon, CornerDownRight, ItalicIcon } from "lucide-svelte";

	export let name: string;
	export let price: number;
</script>

<Drawer.Root>
	<Drawer.Trigger class="w-full max-w-lg">
		<div class="w-full relative max-w-lg text-left">
			<Card.Root class="w-full relative max-w-lg p-4">
				<div class="w-5 h-5 bg-gray-500 absolute top-2 right-2 rounded-full"></div>
				<div class="font-bold">{name}</div>
				<div class="text-sm text-muted-foreground">R {price.toFixed(2)}</div>
			</Card.Root>
		</div>
	</Drawer.Trigger>
	<Drawer.Content class="fixed bottom-0 left-0 right-0 flex max-h-[96%] w-full">
		<div class="mx-auto flex w-full flex-col overflow-auto rounded-t-[10px] p-4">
			<Drawer.Header>
				<Drawer.Title>Add item to basket</Drawer.Title>
				<Drawer.Description>The very interesting sub title</Drawer.Description>
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
			</div>
			<Drawer.Footer>
				<Button>Add</Button>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
