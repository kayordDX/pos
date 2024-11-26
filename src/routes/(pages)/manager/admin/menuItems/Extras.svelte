<script lang="ts">
	import { arrayUnique } from "$lib/util";
	import { Badge, Button, Command } from "@kayord/ui";
	import { CirclePlusIcon, CircleXIcon } from "lucide-svelte";
	import { createExtraGroup } from "$lib/api";

	const query = createExtraGroup();

	let specialExtraOpen = $state(false);
	interface Props {
		extras?: Array<number>;
	}

	let { extras = $bindable([]) }: Props = $props();

	const selectItem = (id: number) => {
		extras.push(id);
		extras = arrayUnique(extras);
		specialExtraOpen = false;
	};

	const removeItem = (id: number) => {
		extras = extras.filter((s) => s !== id);
	};

	const getItem = (id: number) => {
		return $query.data?.find((s) => s.extraGroupId === id);
	};
</script>

<div>
	<Button variant="secondary" onclick={() => (specialExtraOpen = true)}>
		<CirclePlusIcon class="size-4 mr-2" /> Extra Groups
	</Button>
	<div class="mt-2 flex flex-wrap gap-2">
		{#each extras as current}
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

<Command.Dialog bind:open={specialExtraOpen}>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Special Extras">
			{#each $query.data ?? [] as extraGroup}
				<Command.Item onSelect={() => selectItem(extraGroup.extraGroupId)}>
					<div class="flex w-full items-center flex-row justify-between">
						<div class="whitespace-nowrap overflow-hidden text-ellipsis">
							{extraGroup.name.replace(/[^a-zA-Z0-9 -]*/g, "")}
						</div>
						<div class="flex flex-shrink-0 text-xs ml-2">
							<div
								class={`size-3 ${extraGroup.isGlobal ? "bg-primary animate-pulse" : "bg-secondary"} rounded-full`}
							></div>
						</div>
					</div>
				</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Dialog>
