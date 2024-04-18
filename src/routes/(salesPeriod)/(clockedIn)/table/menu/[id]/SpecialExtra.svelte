<script lang="ts">
	import { arrayUnique } from "$lib/util";
	import { Badge, Button, Command } from "@kayord/ui";
	import { CirclePlusIcon, CircleXIcon } from "lucide-svelte";
	import { createExtraGetAll } from "$lib/api";

	const query = createExtraGetAll();

	let specialExtraOpen = false;
	export let currentExtras: Array<number> = [];

	const selectItem = (id: number) => {
		currentExtras.push(id);
		currentExtras = arrayUnique(currentExtras);
		specialExtraOpen = false;
	};

	const removeItem = (id: number) => {
		currentExtras = currentExtras.filter((s) => s !== id);
	};

	const getItem = (id: number) => {
		return $query.data?.find((s) => s.extraId === id);
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
			{#each $query.data ?? [] as extra}
				<Command.Item onSelect={() => selectItem(extra.extraId)}>
					<div class="flex w-full items-center flex-row justify-between">
						<div class="whitespace-nowrap overflow-hidden text-ellipsis">
							{extra.name.replace(/[^a-zA-Z0-9 -]*/g, "")}
						</div>
						<div class="flex flex-shrink-0 text-xs ml-2">R {extra.price.toFixed(2)}</div>
					</div>
				</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Dialog>
