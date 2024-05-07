<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { MinusIcon, PlusIcon } from "lucide-svelte";

	export let value: number;

	const increment = () => {
		value++;
	};

	const decrement = () => {
		if (value <= 1) return;
		value--;
	};
</script>

<div class="flex items-center justify-center">
	<Card.Root class="w-44 p-1">
		<div class="flex items-center w-full">
			<Button
				variant="outline"
				size="icon"
				class="s-10 shrink-0 rounded-full"
				on:click={decrement}
				disabled={value <= 1}
			>
				<MinusIcon class="h-4 w-4" />
				<span class="sr-only">Decrease</span>
			</Button>
			<div class="flex-1 text-center">
				<div class="text-3xl font-bold tracking-tighter">{value}</div>
			</div>
			<Button variant="outline" size="icon" class="s-10 shrink-0 rounded-full" on:click={increment}>
				<PlusIcon class="h-4 w-4" />
				<span class="sr-only">Increase</span>
			</Button>
		</div>
	</Card.Root>
</div>
