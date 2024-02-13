<script lang="ts">
	import { Button } from "@kayord/ui";
	import BasketItem from "./BasketItem.svelte";
	import { basket, clear } from "$lib/stores/basket";
	import autoAnimate from "@formkit/auto-animate";
</script>

<div class="m-4">
	<div class="flex flex-col gap-2" use:autoAnimate>
		{#if $basket}
			{#each $basket as item, i (item.id)}
				<BasketItem id={item.id} name={item.name} price={item.price} />
			{/each}
		{/if}
	</div>
	<div class="flex justify-end mt-4 gap-2">
		<Button variant="destructive" on:click={clear}>Empty Basket</Button>
		<Button>Send All to Kitchen</Button>
	</div>
</div>
