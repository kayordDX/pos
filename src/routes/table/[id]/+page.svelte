<script lang="ts">
	import { Separator, Button } from "@kayord/ui";
	import type { PageData } from "./$types";
	import Item from "./Item.svelte";

	export let data: PageData;
</script>

<div class="m-8">
	<h1 class="mt-8">Items</h1>
	<p class="text-muted-foreground">Current bill for table {data.bookingId}</p>
	<Separator />
	<div class="my-5">
		<p>Add Items to Order to get started</p>
	</div>

	<Separator />
	<div class="flex justify-between">
		<h2>Total</h2>
		<h2>R0.00</h2>
	</div>

	<div class="mt-10">
		<Button href="/waiter" variant="outline">Dashboard</Button>
		<Button>Send to Kitchen</Button>
		<Button href={`/table/${data.bookingId}/menu/0`}>Add Item</Button>
		<Button href={`/table/${data.bookingId}/pay`}>Pay Bill</Button>
	</div>
</div>
