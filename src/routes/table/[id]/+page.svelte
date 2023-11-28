<script lang="ts">
	import { Separator, Button } from "@kayord/ui";
	import type { PageData } from "./$types";
	import Item from "./Item.svelte";

	export let data: PageData;
</script>

<div class="m-8">
	<h1 class="mt-8">Items</h1>
	<p class="text-muted-foreground">Current bill for table {data.tableId}</p>
	<Separator />
	<Item name="Latte" price={12} quantity={1} />
	<Item
		name="Coffee"
		price={12}
		quantity={2}
		subItems={[
			{ name: "Extra milk", price: 0, quantity: 1 },
			{ name: "Extra strong", price: 5, quantity: 1 },
		]}
	/>
	<Separator />
	<div class="flex justify-between">
		<h2>Total</h2>
		<h2>R23</h2>
	</div>

	<div class="mt-10">
		<Button href="/waiter" variant="outline">Dashboard</Button>
		<Button>Send to Kitchen</Button>
		<Button href={`/table/${data.tableId}/menu`}>Add Item</Button>
		<Button>Pay Bill</Button>
	</div>
</div>
