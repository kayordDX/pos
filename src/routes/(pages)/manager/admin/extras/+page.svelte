<script lang="ts">
	import { createExtraGroup, extraGroup } from "$lib/api";
	import { Button, Card, Tooltip } from "@kayord/ui";
	import Actions from "./Actions.svelte";
	import { PlusIcon } from "lucide-svelte";

	const query = createExtraGroup();
	let addOpen = $state(false);
</script>

<div class="m-2">
	<div class="flex items-center justify-between">
		<h1>Extra Groups</h1>
		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<!-- <EditMenu refetch={$query.refetch} bind:open={addOpen} /> -->
	</div>

	<div class="flex flex-col gap-2 mt-4">
		{#each $query.data ?? [] as extraGroup}
			<Card.Root class="p-2 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Tooltip.Provider>
						<Tooltip.Root>
							<Tooltip.Trigger>
								<div
									class={`size-3 ${extraGroup.isGlobal ? "bg-primary animate-pulse" : "bg-secondary"} rounded-full`}
								></div>
							</Tooltip.Trigger>
							<Tooltip.Content>
								<p class="font-bold">Global Extra Group</p>
								{#if extraGroup.isGlobal}
									<p>Group is available to search on all menu items</p>
								{:else}
									<p>Group only available to specific menu items</p>
								{/if}
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
					{extraGroup.name}
				</div>
				<Actions refetch={$query.refetch} {extraGroup} />
			</Card.Root>
		{/each}
	</div>
</div>
