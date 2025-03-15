<script lang="ts">
	import { createMenuGetSectionsGetMenusSections } from "$lib/api";
	import { Button, Card } from "@kayord/ui";
	import { PlusIcon } from "@lucide/svelte";
	import Actions from "./Actions.svelte";
	import EditSection from "./EditSection.svelte";
	import { page } from "$app/stores";

	const query = createMenuGetSectionsGetMenusSections({
		menuId: Number($page.params.Id),
		sectionId: 0,
	});
	let addOpen = $state(false);
</script>

<div class="m-2">
	<div class="flex items-center justify-between">
		<h1>Sections</h1>
		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<EditSection refetch={$query.refetch} bind:open={addOpen} />
	</div>
	<div class="flex flex-col gap-2 mt-2">
		{#if $query.data?.sections?.length == 0}
			<Card.Root>
				<Card.Header class="pb-6">
					<Card.Title>No Sections</Card.Title>
					<Card.Description>There are currently no sections in this menu</Card.Description>
				</Card.Header>
			</Card.Root>
		{/if}
		{#each $query.data?.sections ?? [] as section}
			<Card.Root class="p-2 flex items-center justify-between">
				{section.name}
				<Actions refetch={$query.refetch} {section} />
			</Card.Root>
		{/each}
	</div>
</div>
