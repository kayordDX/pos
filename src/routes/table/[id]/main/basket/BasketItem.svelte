<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { remove } from "$lib/stores/basket";
	import { TrashIcon } from "lucide-svelte";

	export let id: string;
	export let name: string;
	export let price: number;
</script>

<Card.Root class="p-4 flex justify-between">
	<div class="flex items-center gap-2">
		<div class="font-bold">{name}</div>
	</div>
	<div class="flex items-center gap-2">
		<div class="font-bold">R {price.toFixed(2)}</div>
		<Button variant="destructive" on:click={() => remove(id)} size="icon"
			><TrashIcon class="h-4 w-4" /></Button
		>
	</div>
</Card.Root>
