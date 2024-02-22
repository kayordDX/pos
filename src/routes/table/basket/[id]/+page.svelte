<script lang="ts">
	import { Button } from "@kayord/ui";
	import BasketItem from "./BasketItem.svelte";
	import autoAnimate from "@formkit/auto-animate";
	import EmptyBasket from "./EmptyBasket.svelte";
	import { ChefHatIcon } from "lucide-svelte";
	import { createTableOrderGetBasket, createTableOrderSendToKitchen } from "$lib/api";
	import { goto } from "$app/navigation";

	import type { PageData } from "./$types";
	export let data: PageData;

	const query = createTableOrderGetBasket({ tableBookingId: Number(data.bookingId) });

	const refetch = async () => {
		await $query.refetch();
	};

	const mutation = createTableOrderSendToKitchen();

	const sendAllToKitchen = async () => {
		await $mutation.mutateAsync({
			data: {
				tableBookingId: Number(data.bookingId),
			},
		});
		goto("bill");
	};
</script>

<div class="m-4">
	<div class="flex flex-col gap-2" use:autoAnimate>
		{#each $query.data?.orderItems ?? [] as item, i (item.menuItemId)}
			<BasketItem
				id={item.orderItemId}
				name={item.menuItem.name}
				price={item.menuItem.price}
				{refetch}
			/>
		{/each}
	</div>
	{#if ($query.data?.orderItems.length ?? 0) <= 0}
		<EmptyBasket />
	{:else}
		<div class="flex justify-end mt-4 gap-2 w-full">
			<Button on:click={sendAllToKitchen} class="w-full"
				>Send All to Kitchen <ChefHatIcon class="h-4 w-4 ml-2" /></Button
			>
		</div>
	{/if}
</div>
