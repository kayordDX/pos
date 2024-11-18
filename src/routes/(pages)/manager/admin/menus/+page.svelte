<script lang="ts">
	import { createMenuList } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Button, Card } from "@kayord/ui";
	import { PlusIcon } from "lucide-svelte";
	import Actions from "./Actions.svelte";
	import EditMenu from "./EditMenu.svelte";

	const query = createMenuList({ outletId: status.value.outletId });
	let addOpen = $state(false);
</script>

<div class="m-2">
	<div class="flex items-center justify-between">
		<h1>Menus</h1>
		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<EditMenu refetch={$query.refetch} bind:open={addOpen} />
	</div>
	<div class="flex flex-col gap-2 mt-2">
		{#if $query.data?.length == 0}
			<Card.Root>
				<Card.Header class="pb-6">
					<Card.Title>No Sections</Card.Title>
					<Card.Description>There are currently no sections in this menu</Card.Description>
				</Card.Header>
			</Card.Root>
		{/if}
		{#each $query.data ?? [] as menu}
			<Card.Root class="p-2 flex items-center justify-between">
				{menu.name}
				<Actions {menu} refetch={$query.refetch} />
			</Card.Root>
		{/each}
	</div>
</div>
