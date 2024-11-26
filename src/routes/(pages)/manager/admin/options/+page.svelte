<script lang="ts">
	import { createOptionGroup } from "$lib/api";
	import { Badge, Button, Card, Tooltip } from "@kayord/ui";
	import Actions from "./Actions.svelte";
	import { PlusIcon } from "lucide-svelte";

	const query = createOptionGroup();
	let addOpen = $state(false);
</script>

<div class="m-2">
	<div class="flex items-center justify-between">
		<h1>Option Groups</h1>
		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<!-- <EditMenu refetch={$query.refetch} bind:open={addOpen} /> -->
	</div>
	<div class="flex flex-col gap-2 mt-4">
		{#each $query.data ?? [] as optionGroup}
			<Card.Root class="p-2 flex items-center justify-between">
				<div class="flex items-center gap-2">
					{optionGroup.name}
				</div>
				<div class="flex items-center gap-2">
					<Card.Root class="p-2 flex items-center gap-2">
						min: <Badge>{optionGroup.maxSelections}</Badge>
						max: <Badge>{optionGroup.minSelections}</Badge>
					</Card.Root>
					<Actions refetch={$query.refetch} {optionGroup} />
				</div>
			</Card.Root>
		{/each}
	</div>
</div>
