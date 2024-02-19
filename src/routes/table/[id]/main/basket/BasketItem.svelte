<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { createTableOrderRemoveItem, createTableOrderUpdateOrderItem } from "$lib/api";
	import { TrashIcon, ChefHatIcon } from "lucide-svelte";

	export let id: number;
	export let name: string;
	export let price: number;
	export let refetch: () => any;

	const removeItem = createTableOrderRemoveItem();

	const updateOrderItem = createTableOrderUpdateOrderItem();

	const remove = async () => {
		await $removeItem.mutateAsync({ data: { orderItemId: id } });
		refetch();
	};

	const sendItemToKitchen = async () => {
		await $updateOrderItem.mutateAsync({
			data: {
				orderItemId: id,
				isComplete: false,
				orderItemStatusId: 2,
			},
		});
		refetch();
	};
</script>

<Card.Root class="p-4 flex justify-between">
	<div class="flex items-center gap-2">
		<div class="font-bold">{name}</div>
	</div>
	<div class="flex items-center gap-2">
		<div class="font-bold">R {price.toFixed(2)}</div>
		<Button variant="destructive" on:click={remove} size="icon">
			<TrashIcon class="h-4 w-4" />
		</Button>
		<Button on:click={sendItemToKitchen} size="icon">
			<ChefHatIcon class="h-4 w-4" />
		</Button>
	</div>
</Card.Root>
