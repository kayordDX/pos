<script lang="ts">
	import { Separator, Button, Card, Loader } from "@kayord/ui";
	import type { PageData } from "./$types";
	import { createTableOrderGetBill } from "$lib/api";
	import Item from "./Item.svelte";

	export let data: PageData;

	const query = createTableOrderGetBill({ tableBookingId: Number(data.bookingId) });
</script>

{#if $query.error}
	It errorsed
{/if}

{#if $query.isPending}
	<Loader />
{/if}

<div class="m-4">
	<h1 class="mt-4">Items</h1>
	<p class="text-muted-foreground">Current bill #{data.bookingId}</p>
	<Separator />
	{#if ($query.data?.orderItems.length ?? 0) <= 0}
		<div class="my-5">
			<p>Add Items to Order to get started</p>
		</div>
	{/if}

	{#each $query.data?.orderItems ?? [] as item, i (item.orderItemId)}
		<Item name={item.menuItem.name} price={item.menuItem.price} quantity={1} />
	{/each}

	<Separator class="mt-4" />
	<div class="flex justify-between">
		<h2>Total</h2>
		<h2>R{$query.data?.total.toFixed(2)}</h2>
	</div>

	<div class="mt-10">
		<Button class="w-full" href={`/table/${data.bookingId}/main/pay`}>Pay Bill</Button>
	</div>
</div>
