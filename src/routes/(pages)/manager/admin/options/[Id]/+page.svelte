<script lang="ts">
	import { page } from "$app/stores";
	import { createOptionItems } from "$lib/api";
	import { Badge, Button, Card } from "@kayord/ui";
	import { PlusIcon } from "lucide-svelte";
	import Actions from "./Actions.svelte";
	import EditOption from "./EditOption.svelte";

	const query = createOptionItems(Number($page.params.Id));
	let addOpen = $state(false);

	const groupName = $derived(($query.data ?? [])[0]?.optionGroup.name);
</script>

<div class="m-2">
	<div class="flex items-center justify-between">
		<h1>Options - ({groupName})</h1>
		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<EditOption refetch={$query.refetch} bind:open={addOpen} />
	</div>
	<div class="flex flex-col gap-2 mt-4">
		{#if $query.data?.length == 0}
			<Card.Root>
				<Card.Header class="pb-6">
					<Card.Title>No Options</Card.Title>
					<Card.Description>There are currently no options in this group</Card.Description>
				</Card.Header>
			</Card.Root>
		{/if}
		{#each $query.data ?? [] as option}
			<Card.Root class="p-2 flex items-center justify-between">
				<div class="flex flex-col gap-1 pl-2">
					<div class="font-bold flex items-center gap-4">
						{option.name}
						<Badge variant="secondary">{option.positionId}</Badge>
					</div>
					<div>R {option.price.toFixed(2)}</div>
				</div>
				<Actions refetch={$query.refetch} {option} />
			</Card.Root>
		{/each}
	</div>
</div>
