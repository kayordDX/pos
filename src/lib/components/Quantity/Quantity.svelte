<script lang="ts">
	import { Button, Card, Input } from "@kayord/ui";
	import { MinusIcon, PlusIcon } from "@lucide/svelte";

	interface Props {
		value: number;
	}

	let { value = $bindable() }: Props = $props();

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
		<div class="flex items-center w-full gap-2">
			<Button
				variant="outline"
				size="icon"
				class="s-10 shrink-0 rounded-full"
				onclick={decrement}
				disabled={value <= 1}
			>
				<MinusIcon class="h-4 w-4" />
				<span class="sr-only">Decrease</span>
			</Button>
			<div class="flex-1 text-center">
				<Input bind:value class="text-3xl font-bold tracking-tighter text-center" />
			</div>
			<Button variant="outline" size="icon" class="s-10 shrink-0 rounded-full" onclick={increment}>
				<PlusIcon class="h-4 w-4" />
				<span class="sr-only">Increase</span>
			</Button>
		</div>
	</Card.Root>
</div>
