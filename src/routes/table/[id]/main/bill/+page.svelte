<script lang="ts">
	import { Separator, Button } from "@kayord/ui";
	import type { PageData } from "./$types";
	import { basket } from "$lib/stores/basket";
	import BasketItem from "../basket/BasketItem.svelte";
	import Item from "./Item.svelte";
	import { derived } from "svelte/store";

	export let data: PageData;
	$: isBasketEmpty = !$basket || $basket.length == 0;

	$: getTotal = () => {
		let total = 0;
		if ($basket) {
			$basket.map((item) => {
				total += item.price;
			});
		}
		return total;
	};
</script>

<div class="m-4">
	<h1 class="mt-4">Items</h1>
	<p class="text-muted-foreground">Current bill #{data.bookingId}</p>
	<Separator />
	{#if isBasketEmpty}
		<div class="my-5">
			<p>Add Items to Order to get started</p>
		</div>
	{/if}

	{#if $basket}
		{#each $basket as item, i (item.id)}
			<Item name={item.name} price={item.price} quantity={1} />
		{/each}
	{/if}

	<Separator class="mt-4" />
	<div class="flex justify-between">
		<h2>Total</h2>
		<h2>R{getTotal().toFixed(2)}</h2>
	</div>

	<div class="mt-10">
		<Button class="w-full" href={`/table/${data.bookingId}/main/pay`}>Pay Bill</Button>
	</div>
</div>
