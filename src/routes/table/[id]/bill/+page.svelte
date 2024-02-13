<script lang="ts">
	import { Separator, Button } from "@kayord/ui";
	import type { PageData } from "./$types";
	import Item from "./Item.svelte";

	export let data: PageData;
</script>

<div class="m-4">
	<h1 class="mt-4">Items</h1>
	<p class="text-muted-foreground">Current bill #{data.bookingId}</p>
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
		<Button class="w-full" href={`/table/${data.bookingId}/pay`}>Pay Bill</Button>
	</div>
</div>
