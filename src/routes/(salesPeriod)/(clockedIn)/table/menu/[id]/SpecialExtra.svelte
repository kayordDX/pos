<script lang="ts">
	import { arrayUnique } from "$lib/util";
	import { Badge, Button, Command } from "@kayord/ui";
	import { CirclePlusIcon, CircleXIcon } from "lucide-svelte";

	let specialExtraOpen = false;
	export let currentExtras: Array<number> = [];

	const specialExtras = [
		{ id: 1, name: "Bacon" },
		{ id: 2, name: "Egg" },
		{ id: 3, name: "Salid" },
		{ id: 4, name: "Cheese" },
		{ id: 5, name: "Patty" },
		{ id: 6, name: "Bread" },
		{ id: 7, name: "Pizza" },
		{ id: 8, name: "Chicken Wings" },
		{ id: 9, name: "Ribs" },
		{ id: 10, name: "Chips" },
		{ id: 11, name: "Prawns" },
		{ id: 12, name: "Souse" },
		{ id: 13, name: "Soup" },
		{ id: 14, name: "Dog" },
		{ id: 15, name: "Cat" },
		{ id: 16, name: "Pork" },
		{ id: 17, name: "Lamb" },
		{ id: 18, name: "Chilly" },
		{ id: 19, name: "Feta Bomb" },
		{ id: 20, name: "Hake" },
		{ id: 21, name: "Carpatio" },
		{ id: 22, name: "Cream" },
		{ id: 23, name: "Jam" },
		{ id: 24, name: "Ham" },
		{ id: 25, name: "Tomato" },
	];

	const selectItem = (id: number) => {
		currentExtras.push(id);
		currentExtras = arrayUnique(currentExtras);
		specialExtraOpen = false;
	};

	const removeItem = (id: number) => {
		currentExtras = currentExtras.filter((s) => s !== id);
	};

	const getItem = (id: number) => {
		return specialExtras.find((s) => s.id === id);
	};
</script>

<div>
	<Button variant="secondary" on:click={() => (specialExtraOpen = true)}>
		<CirclePlusIcon class="size-4 mr-2" /> More Extras
	</Button>
	<div class="mt-2 flex flex-wrap gap-2">
		{#each currentExtras as current}
			<button
				on:click={(e) => {
					removeItem(current);
					e.preventDefault();
				}}
			>
				<Badge variant="outline" class="p-2 pl-3">
					{getItem(current)?.name}
					<CircleXIcon class="size-4 ml-2" />
				</Badge>
			</button>
		{/each}
	</div>
</div>

<Command.Dialog bind:open={specialExtraOpen}>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Special Extras">
			{#each specialExtras as extra}
				<Command.Item onSelect={() => selectItem(extra.id)}>{extra.name}</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Dialog>
