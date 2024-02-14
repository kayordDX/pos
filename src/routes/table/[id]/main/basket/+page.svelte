<script lang="ts">
	import { Button } from "@kayord/ui";
	import BasketItem from "./BasketItem.svelte";
	import { basket, clear } from "$lib/stores/basket";
	import autoAnimate from "@formkit/auto-animate";
	import EmptyBasket from "./EmptyBasket.svelte";
	import { ChefHatIcon } from "lucide-svelte";
	import { createOrderAddItems, type OrderAddItemsOrder } from "$lib/api";
	import { goto } from "$app/navigation";

	$: isBasketEmpty = !$basket || $basket.length == 0;

	const mutation = createOrderAddItems();

	const sendAllToKitchen = async () => {
		const list: Array<OrderAddItemsOrder> = [
			{
				menuItemId: 1,
				orderId: 1,
			},
		];
		await $mutation.mutateAsync({
			data: {
				orders: list,
				tableBookingId: 1,
			},
		});
		await clear();
		goto("bill");
	};
</script>

<div class="m-4">
	<div class="flex flex-col gap-2" use:autoAnimate>
		{#if $basket}
			{#each $basket as item, i (item.id)}
				<BasketItem id={item.id} name={item.name} price={item.price} />
			{/each}
		{/if}
	</div>
	{#if isBasketEmpty}
		<EmptyBasket />
	{:else}
		<div class="flex justify-end mt-4 gap-2 w-full">
			<Button on:click={sendAllToKitchen} class="w-full"
				>Send All to Kitchen <ChefHatIcon class="h-4 w-4 ml-2" /></Button
			>
		</div>
	{/if}
</div>
