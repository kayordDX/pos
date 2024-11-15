<script lang="ts">
	import { createMenuGetSectionsGetMenusSections } from "$lib/api";
	import { Button, Card } from "@kayord/ui";
	import { PlusIcon } from "lucide-svelte";
	import Actions from "./Actions.svelte";

	const query = createMenuGetSectionsGetMenusSections({ menuId: 1, sectionId: 0 });
</script>

<div class="m-2">
	<div class="flex items-center justify-between">
		<h1>Sections</h1>
		<Button><PlusIcon class="h-5 w-5" /> Add</Button>
	</div>
	<div class="flex flex-col gap-2 mt-2">
		{#each $query.data?.sections ?? [] as section}
			<Card.Root class="p-2 flex items-center justify-between">
				{section.name}
				<Actions />
			</Card.Root>
		{/each}
	</div>
</div>
