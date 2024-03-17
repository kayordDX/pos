<script lang="ts">
	import { Button } from "@kayord/ui";
	import BasketItem from "./BasketItem.svelte";
	import autoAnimate from "@formkit/auto-animate";
	import EmptyBasket from "./EmptyBasket.svelte";
	import { ChefHatIcon } from "lucide-svelte";
	import { createTableOrderGetBasket, createTableOrderSendToKitchen } from "$lib/api";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	const query = createTableOrderGetBasket({ tableBookingId: Number($page.params.id) });

	const refetch = async () => {
		await $query.refetch();
	};

	const mutation = createTableOrderSendToKitchen();

	const sendAllToKitchen = async () => {
		await $mutation.mutateAsync({
			data: {
				tableBookingId: Number($page.params.id),
			},
		});
		goto(`/table/bill/${$page.params.id}`);
	};
</script>

<div class="m-2 mb-12">
	<div class="flex flex-col gap-2" use:autoAnimate>
		{#each $query.data?.orderItems ?? [] as item, i (item.orderItemId)}
			<BasketItem
				id={item.orderItemId}
				name={item.menuItem.name}
				price={item.menuItem.price}
				note={item.note}
				options={item.orderItemOptions ?? []}
				extras={item.orderItemExtras ?? []}
				{refetch}
			/>
		{/each}
	</div>
	{#if ($query.data?.orderItems.length ?? 0) <= 0}
		<EmptyBasket />
	{:else}
		<div class="flex flex-col mt-4 gap-2 w-full items-end">
			<div class="flex items-center gap-2">
				<div class="text-muted-foreground">Total:</div>
				<h2>R{$query.data?.total.toFixed(2)}</h2>
			</div>
			<Button on:click={sendAllToKitchen} class="w-full">
				Send All to Kitchen <ChefHatIcon class="h-4 w-4 ml-2" />
			</Button>
		</div>
	{/if}
</div>
