<script lang="ts">
	import { page } from "$app/stores";
	import { createExtraItems } from "$lib/api";
	import Header from "$lib/components/Header/Header.svelte";
	import { Badge, Button, Card } from "@kayord/ui";
	import { PlusIcon } from "lucide-svelte";
	import Actions from "./Actions.svelte";
	import EditExtra from "./EditExtra.svelte";

	const query = createExtraItems(Number($page.params.Id));
	let addOpen = $state(false);

	const groupName = $derived(($query.data ?? [])[0]?.extraGroup.name);
</script>

<div class="m-2">
	<div class="flex items-center justify-between">
		<h1>Extra Items - ({groupName})</h1>
		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<EditExtra refetch={$query.refetch} bind:open={addOpen} />
	</div>
	<div class="flex flex-col gap-2 mt-4">
		{#if $query.data?.length == 0}
			<Card.Root>
				<Card.Header class="pb-6">
					<Card.Title>No Extras</Card.Title>
					<Card.Description>There are currently no extras in this group</Card.Description>
				</Card.Header>
			</Card.Root>
		{/if}
		{#each $query.data ?? [] as extra}
			<Card.Root class="p-2 flex items-center justify-between">
				<div class="flex flex-col gap-1 pl-2">
					<div class="font-bold flex items-center gap-4">
						{extra.name}
						<Badge variant="secondary">{extra.positionId}</Badge>
					</div>
					<div>R {extra.price.toFixed(2)}</div>
				</div>
				<Actions refetch={$query.refetch} {extra} />
			</Card.Root>
		{/each}
	</div>
</div>
