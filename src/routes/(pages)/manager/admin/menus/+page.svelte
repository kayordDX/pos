<script lang="ts">
	import { createMenuList } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Button, Card } from "@kayord/ui";
	import { PlusIcon } from "lucide-svelte";
	import Actions from "./Actions.svelte";

	const query = createMenuList({ outletId: status.value.outletId });

	$inspect($query.data);
</script>

<div class="m-2">
	<div class="flex items-center justify-between">
		<h1>Menus</h1>
		<Button><PlusIcon class="h-5 w-5" /> Add</Button>
	</div>
	<div class="flex flex-col gap-2 mt-2">
		{#each $query.data ?? [] as menu}
			<Card.Root class="p-2 flex items-center justify-between">
				{menu.name}
				<Actions id={menu.id} refetch={$query.refetch} />
			</Card.Root>
		{/each}
	</div>
</div>
