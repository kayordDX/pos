<script lang="ts">
	import type { TableOrderGetBillResponse } from "$lib/api";
	import { Button, Separator } from "@kayord/ui";
	import Item from "./Item.svelte";
	import { createTableBookingClose } from "$lib/api";
	import { goto } from "$app/navigation";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";

	export let data: TableOrderGetBillResponse;
	export let bookingId: number;

	const closeTableMut = createTableBookingClose();

	const closeTable = async () => {
		const result = await $closeTableMut.mutateAsync({ data: { tableBookingId: bookingId } });
		if (result.id) {
			goto("/waiter");
		}
	};
</script>

<div class="m-2 mb-12">
	<h1 class="mt-4">Items</h1>
	<p class="text-muted-foreground">Current bill #{bookingId}</p>
	<Separator />
	{#if (data?.orderItems.length ?? 0) <= 0}
		<div class="my-5">
			<p>Add Items to Order to get started</p>
		</div>
	{/if}

	<Item data={data?.orderItems ?? []} />

	<Separator class="mt-4" />

	<div class="flex justify-between">
		<h1>Total</h1>
		<h2>R{data?.total.toFixed(2)}</h2>
	</div>
	<Separator class="mt-4" />

	{#each data.paymentsReceived as payment}
		<div class="flex justify-between">
			<div>Payment</div>
			<div>
				{payment.amount.toFixed(2)}
			</div>
		</div>
	{/each}
	{#if data.paymentsReceived.length > 0}
		<Separator class="mt-4" />
		<div class="flex justify-between">
			<h3>Balance</h3>
			<h3>R{data?.balance.toFixed(2)}</h3>
		</div>
		<div class="flex justify-between">
			<h3>Tip</h3>
			<h3>R{data?.tipAmount.toFixed(2)}</h3>
		</div>
	{/if}
	<div class="mt-10 flex flex-col gap-2">
		<Button
			class="w-full"
			href={`/table/pay/${bookingId}?total=${data.total}&balance=${data?.balance}`}>Pay Bill</Button
		>
		{#if data?.balance == 0}
			<Button
				class="w-full"
				disabled={$closeTableMut.isPending}
				variant="destructive"
				on:click={closeTable}>Close Table</Button
			>
		{/if}

		{#if $closeTableMut.error}
			<Error message={getError($closeTableMut.error).message} />
		{/if}
	</div>
</div>
