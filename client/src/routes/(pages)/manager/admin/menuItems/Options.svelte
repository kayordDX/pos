<script lang="ts">
	import { arrayUnique } from "$lib/util";
	import { Badge, Button, Card, Command } from "@kayord/ui";
	import { CirclePlusIcon, CircleXIcon } from "@lucide/svelte";
	import { createOptionGroup } from "$lib/api";

	const query = createOptionGroup();

	let specialExtraOpen = $state(false);
	interface Props {
		options?: Array<number>;
	}

	let { options = $bindable([]) }: Props = $props();

	const selectItem = (id: number) => {
		options.push(id);
		options = arrayUnique(options);
		specialExtraOpen = false;
	};

	const removeItem = (id: number) => {
		options = options.filter((s) => s !== id);
	};

	const getItem = (id: number) => {
		return query.data?.find((s) => s.optionGroupId === id);
	};
</script>

<Card.Root class="bg-background p-2">
	<div>
		<Button variant="secondary" onclick={() => (specialExtraOpen = true)}>
			<CirclePlusIcon class="size-4" /> Option Groups
		</Button>
		<div class="mt-2 flex flex-wrap gap-2">
			{#each options as current}
				<button
					onclick={(e) => {
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
</Card.Root>

<Command.Dialog bind:open={specialExtraOpen}>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Option Groups">
			{#each query.data ?? [] as optionGroup}
				<Command.Item onSelect={() => selectItem(optionGroup.optionGroupId)}>
					<div class="flex w-full items-center flex-row justify-between">
						<div class="whitespace-nowrap overflow-hidden text-ellipsis">
							{optionGroup.name.replace(/[^a-zA-Z0-9 -]*/g, "")}
						</div>
						<div class="flex flex-shrink-0 text-xs ml-2">
							({optionGroup.minSelections}-{optionGroup.maxSelections})
						</div>
					</div>
				</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Dialog>
