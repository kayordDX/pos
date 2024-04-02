<script lang="ts">
	import type { TableOrderGetBillResponse } from "$lib/api";
	import { Button, Table } from "@kayord/ui";
	import Item from "./Item.svelte";
	import { createTableBookingClose } from "$lib/api";
	import { goto } from "$app/navigation";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import EmailBill from "./EmailBill.svelte";
	import { stringToFDate } from "$lib/util";

	export let data: TableOrderGetBillResponse;
	export let bookingId: number;
	export let isReadOnly: boolean = false;

	const closeTableMut = createTableBookingClose();

	const closeTable = async () => {
		const result = await $closeTableMut.mutateAsync({ data: { tableBookingId: bookingId } });
		if (result.id) {
			goto("/waiter");
		}
	};
</script>

<div class="m-2 mb-12">
	<Table.Root class="caption-top">
		<Table.Caption>
			<span class="font-bold">Bill #{bookingId}</span>
			<span class="text-xs">{stringToFDate(data.billDate)}</span>
		</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head>Item</Table.Head>
				<Table.Head class="text-right">Amount</Table.Head>
			</Table.Row>
		</Table.Header>
		<Item data={data?.orderItems ?? []} />
		<Table.Row></Table.Row>
		<Table.Footer class="bg-background text-foreground">
			<Table.Row>
				<Table.Cell><h1>Total</h1></Table.Cell>
				<Table.Cell class="text-right"><h1>R{data?.total.toFixed(2)}</h1></Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell><h4>Total Excluding VAT</h4></Table.Cell>
				<Table.Cell class="text-right"><h4>R{data?.totalExVAT.toFixed(2)}</h4></Table.Cell>
			</Table.Row>
			{#each data.paymentsReceived as payment}
				<Table.Row>
					<Table.Cell>{payment.paymentTypeId == 1 ? "Tap" : "Manual"} Payment</Table.Cell>
					<Table.Cell class="text-right">{payment.amount.toFixed(2)}</Table.Cell>
				</Table.Row>
			{/each}

			{#if data.paymentsReceived.length > 0}
				<Table.Row>
					<Table.Cell><h3>Balance</h3></Table.Cell>
					<Table.Cell class="text-right">R{data?.balance.toFixed(2)}</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell><h3>Tip</h3></Table.Cell>
					<Table.Cell class="text-right">R{data?.tipAmount.toFixed(2)}</Table.Cell>
				</Table.Row>
			{/if}
		</Table.Footer>
	</Table.Root>

	{#if (data?.orderItems.length ?? 0) <= 0}
		<div class="my-5">
			<p>Add Items to Order to get started</p>
		</div>
	{/if}

	<div class="mt-10 flex flex-col gap-2">
		{#if !isReadOnly}
			<Button
				class="w-full"
				href={`/table/pay/${bookingId}?total=${data.total}&balance=${data?.balance}`}
				>Pay Bill</Button
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
		{/if}
		{#if data?.balance == 0}
			<EmailBill {bookingId} />
		{/if}
	</div>
</div>
