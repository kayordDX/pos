<script lang="ts">
	import { Card } from "@kayord/ui";
	import { CornerDownRight } from "lucide-svelte";

	export let name: string;
	export let price: number;
</script>

<button class="w-full relative max-w-lg text-left">
	<Card.Root class="p-2 w-full relative max-w-lg p-4">
		<div class="w-5 h-5 bg-gray-500 absolute top-2 right-2 rounded-full"></div>
		<div class="font-bold">{name}</div>
		<div class="text-sm text-muted-foreground">R {price.toFixed(2)}</div>
	</Card.Root>
</button>
