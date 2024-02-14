<script lang="ts">
	import SubItem from "./SubItem.svelte";

	interface Item {
		name: string;
		price: number;
		quantity: number;
	}
	export let name: string;
	export let price: number;
	export let quantity: number;
	export let subItems: Array<Item> | undefined = undefined;
</script>

<div class="flex justify-between">
	<div>
		{quantity}
		{name}
	</div>
	<div>{price.toFixed(2)}</div>
</div>
{#each subItems ?? [] as subItem}
	<SubItem name={subItem.name} price={subItem.price} quantity={subItem.quantity} />
{/each}
