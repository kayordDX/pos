<script lang="ts">
	import { arrayUnique } from "$lib/util";
	import { Badge, Button, Command } from "@kayord/ui";
	import { CirclePlusIcon, CircleXIcon } from "@lucide/svelte";
	import { createExtraGetAll, createExtraGetAllMenu } from "$lib/api";
	import { page } from "$app/state";
	import { status } from "$lib/stores/status.svelte";

	let specialExtraOpen = $state(false);
	interface Props {
		divisionId: number;
		currentExtras?: Array<number>;
	}

	let { divisionId, currentExtras = $bindable([]) }: Props = $props();

	const query = createExtraGetAllMenu(() => ({
		divisionId: divisionId,
		outletId: status.value.outletId,
	}));

	const selectItem = (id: number) => {
		currentExtras.push(id);
		currentExtras = arrayUnique(currentExtras);
		specialExtraOpen = false;
	};

	const removeItem = (id: number) => {
		currentExtras = currentExtras.filter((s) => s !== id);
	};

	const getItem = (id: number) => {
		return query.data?.find((s) => s.extraId === id);
	};
</script>

<div>
	<Button variant="secondary" onclick={() => (specialExtraOpen = true)}>
		<CirclePlusIcon class="mr-2 size-4" /> More Extras
	</Button>
	<div class="mt-2 flex flex-wrap gap-2">
		{#each currentExtras as current (current)}
			<button
				onclick={(e) => {
					removeItem(current);
					e.preventDefault();
				}}
			>
				<Badge variant="outline" class="p-2 pl-3">
					{getItem(current)?.name}
					<CircleXIcon class="ml-2 size-4" />
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
			{#each query.data ?? [] as extra (extra.extraId)}
				<Command.Item onSelect={() => selectItem(extra.extraId)} disabled={!extra.isAvailable} class={!extra.isAvailable ? "text-muted" : ""}>
					<div class="flex w-full flex-row items-center justify-between">
						<div class="overflow-hidden text-ellipsis whitespace-nowrap">
							{extra.name.replace(/[^a-zA-Z0-9 -]*/g, "")}
						</div>
						<div class="ml-2 flex flex-shrink-0 text-xs">R {extra.price.toFixed(2)}</div>
					</div>
				</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Dialog>
