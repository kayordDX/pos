<script lang="ts">
	import { Badge, Button, Popover, Slider } from "@kayord/ui";
	import { Settings2Icon } from "lucide-svelte";
	import { backOffice } from "$lib/stores/backOffice.svelte";
	import { useLocalStorage } from "$lib/stores";

	const test = useLocalStorage("test", { itemHeight: 500, fontSize: 1000 });
	$effect(() => {
		backOffice.value = test.value;
	});
	$effect(() => {
		test.value = backOffice.value;
	});

	const reset = () => {
		backOffice.value = { itemHeight: 500, fontSize: 1000 };
	};
</script>

<Popover.Root>
	<Popover.Trigger>
		<Badge variant="secondary" class="truncate flex">
			<Settings2Icon class="size-4" />
		</Badge>
	</Popover.Trigger>
	<Popover.Content>
		<div class="mb-2">Item Height</div>
		<Slider
			value={[backOffice.value.itemHeight]}
			min={300}
			max={1000}
			step={10}
			onValueChange={(v) => {
				backOffice.value.itemHeight = v[0] ?? 500;
			}}
		/>

		<div class="my-2">Font</div>
		<Slider
			value={[backOffice.value.fontSize]}
			min={500}
			max={2000}
			step={10}
			onValueChange={(v) => {
				backOffice.value.fontSize = v[0] ?? 1000;
			}}
		/>
		<Button class="w-full mt-4" onclick={reset}>Reset</Button>
	</Popover.Content>
</Popover.Root>
