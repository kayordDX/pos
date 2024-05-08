<script lang="ts">
	import type { TableOrderGetBillResponse } from "$lib/api";
	import { Button, Card, Separator } from "@kayord/ui";
	import { createTableBookingClose } from "$lib/api";
	import { goto } from "$app/navigation";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import EmailBill from "./EmailBill.svelte";
	import { stringToFDate } from "$lib/util";
	import { CreditCardIcon, NfcIcon } from "lucide-svelte";
	import Items from "./Items.svelte";
	import Adjustment from "./Adjustment.svelte";

	export let data: TableOrderGetBillResponse;
	export let bookingId: number;
	export let isReadOnly: boolean = false;
	export let refetch: () => void;

	const closeTableMut = createTableBookingClose();

	const closeTable = async () => {
		const result = await $closeTableMut.mutateAsync({ data: { tableBookingId: bookingId } });
		if (result.id) {
			goto("/waiter");
		}
	};

	let adjustmentOpen = false;
</script>

<Card.Root class="overflow-hidden m-2 mb-12">
	<Card.Header class="flex flex-row items-start bg-muted/50 p-4">
		<div class="grid gap-0.5">
			<Card.Title class="group flex items-center gap-2 text-lg">
				Bill #{bookingId}
			</Card.Title>
			<Card.Description>{stringToFDate(data.billDate)}</Card.Description>
		</div>
	</Card.Header>
	<Card.Content class="p-6 text-sm">
		<div class="grid gap-3">
			<div class="font-semibold">Order Details</div>
			<Items data={data?.orderItems ?? []} />

			{#if (data?.adjustments?.length ?? 0) > 0}
				<Separator class="my-2" />
				<ul class="grid gap-3">
					<li class="flex items-center justify-between font-semibold">
						<span>Adjustments</span>
						<span></span>
					</li>
					{#each data?.adjustments ?? [] as adjustment}
						<li class="flex items-center justify-between">
							<span class="text-muted-foreground">{adjustment.adjustmentType.name}</span>
							<span>{adjustment.amount.toFixed(2)}</span>
						</li>
					{/each}
				</ul>
			{/if}

			<Separator class="my-2" />
			<ul class="grid gap-3">
				<li class="flex items-center justify-between font-semibold">
					<span>Total</span>
					<span>R{data?.total.toFixed(2)}</span>
				</li>
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">Total Excluding VAT</span>
					<span>R{data?.totalExVAT.toFixed(2)}</span>
				</li>
			</ul>
		</div>
		{#if data.paymentsReceived.length > 0}
			<Separator class="my-4" />
			<div class="grid gap-3">
				<div class="font-semibold">Payments</div>
				<dl class="grid gap-3">
					{#each data.paymentsReceived as payment}
						<div class="flex items-center justify-between">
							<dt class="flex items-center gap-1 text-muted-foreground">
								{#if payment.paymentTypeId == 1}
									<NfcIcon class="h-4 w-4" />
								{:else}
									<CreditCardIcon class="h-4 w-4" />
								{/if}
								{payment.paymentTypeId == 1 ? "Tap" : "Manual"} Payment
							</dt>
							<dd>{payment.amount.toFixed(2)}</dd>
						</div>
					{/each}
				</dl>
			</div>
		{/if}
		{#if data.paymentsReceived.length > 0}
			<Separator class="my-4" />
			<div class="grid gap-3">
				<div class="font-semibold">Summary</div>
				<ul class="grid gap-3">
					<li class="flex items-center justify-between">
						<span class="text-muted-foreground">Balance</span>
						<span>R{data?.balance.toFixed(2)}</span>
					</li>
					<li class="flex items-center justify-between">
						<span class="text-muted-foreground">Tip</span>
						<span>R{data?.tipAmount.toFixed(2)}</span>
					</li>
				</ul>
			</div>
		{/if}
	</Card.Content>
	<Card.Footer class="flex flex-col items-center border-t bg-muted/50 p-4">
		<div class="flex flex-col gap-2 w-full">
			{#if !isReadOnly}
				<Adjustment tableBookingId={bookingId} bind:open={adjustmentOpen} {refetch} />
				<Button href={`/table/pay/${bookingId}?total=${data.total}&balance=${data?.balance}`}>
					Pay Bill
				</Button>
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
	</Card.Footer>
</Card.Root>
