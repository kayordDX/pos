<script lang="ts">
	import type { TableOrderGetBillResponse } from "$lib/api";
	import { Button, Card, Separator, Switch, toast } from "@kayord/ui";
	import { createTableBookingClose, createPayCheck } from "$lib/api";
	import { goto } from "$app/navigation";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { stringToFDate } from "$lib/util";
	import Items from "./Items.svelte";
	import Adjustment from "./Adjustment.svelte";
	import PaymentTypeIcon from "$lib/components/PaymentTypeIcon/PaymentTypeIcon.svelte";
	import { status } from "$lib/stores/status.svelte";
	import EditPayment from "./EditPayment.svelte";
	import BillOptions from "./BillOptions.svelte";
	import { WalletCardsIcon, DoorOpenIcon, RotateCcwIcon } from "lucide-svelte";

	interface Props {
		data: TableOrderGetBillResponse;
		bookingId: number;
		refetch: () => void;
		isReadOnly?: boolean;
	}

	let { data, bookingId, isReadOnly = false, refetch }: Props = $props();

	const closeTableMut = createTableBookingClose();
	const recheckHaloPayment = createPayCheck();

	const closeTable = async () => {
		try {
			const result = await $closeTableMut.mutateAsync({ data: { tableBookingId: bookingId } });
			if (result.id) {
				goto("/waiter");
			}
		} catch (error) {
			toast.error(getError(error).message);
		}
	};

	let recheckHaloLoading = $state(false);

	const recheckHaloPayments = async () => {
		try {
			recheckHaloLoading = true;
			const result = await $recheckHaloPayment.mutateAsync({ data: { tableBookingId: bookingId } });
			toast.info(`${result.checked} Halo payment checked`);
			if (result.checked > 0) {
				refetch();
			}
		} catch (error) {
			toast.error(getError(error).message);
		} finally {
			recheckHaloLoading = false;
		}
	};

	let adjustmentOpen = $state(false);

	const isManager = $derived(status.value.roles.includes("Manager"));
	const showAdjustment = $derived(!isReadOnly || (isManager && !data.isCashedUp));

	let showDetail = $state(false);
</script>

<Card.Root class="overflow-hidden m-2 mb-12">
	<Card.Header class="flex flex-col bg-muted/30 dark:bg-background/30 p-4">
		<div class="flex flex-row w-full justify-between">
			<div class="flex flex-col">
				<Card.Title class="group flex items-center gap-2 text-lg">
					Bill #{bookingId}
				</Card.Title>
				<Card.Description>{stringToFDate(data.billDate)}</Card.Description>
			</div>
			<div><Switch bind:checked={showDetail} /></div>
		</div>
		{#if showDetail}
			<Separator class="mt-2" />
			<div class="text-muted-foreground flex flex-row text-sm justify-between">
				<div class="flex flex-col">
					<div>{data.tableName}</div>
					<div>Waiter {data.waiter}</div>
					<div>Bill Status {data.isClosed ? "Closed" : "Open"}</div>
				</div>
				<div class="flex flex-col justify-center">
					{#if !isReadOnly}
						<Button disabled={recheckHaloLoading} onclick={recheckHaloPayments}>
							<RotateCcwIcon class="size-4 mr-2" />
							Re-Check Halo Payment
						</Button>
					{/if}
				</div>
			</div>
		{/if}
	</Card.Header>

	<Card.Content class="p-6 text-sm">
		<div class="grid gap-3">
			<div class="font-semibold">Order Details</div>
			<Items data={data?.orderItems ?? []} {showDetail} />

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
							<div class="flex items-center gap-1 text-muted-foreground w-full justify-start">
								<PaymentTypeIcon type={payment.paymentType.paymentTypeName} />
								{#if isManager}
									<EditPayment
										paymentId={payment.id}
										amount={payment.amount}
										{refetch}
										paymentTypeId={payment.paymentTypeId ?? 0}
									/>
								{/if}
								<div class="truncate w-full">{payment.paymentType.paymentTypeName}</div>
							</div>
							<div>{payment.amount.toFixed(2)}</div>
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
	<Card.Footer class="flex flex-col items-center border-t p-4 bg-muted/30 dark:bg-background/30">
		<div class="flex flex-col gap-2 w-full">
			{#if isManager && showAdjustment}
				<Adjustment tableBookingId={bookingId} bind:open={adjustmentOpen} {refetch} />
			{/if}
			{#if !isReadOnly}
				<Button href={`/table/pay/${bookingId}?total=${data.total}&balance=${data?.balance}`}>
					<WalletCardsIcon class="size-4 mr-2" />
					Pay
				</Button>
				{#if data?.balance == 0}
					<Button
						class="w-full"
						disabled={$closeTableMut.isPending}
						variant="destructive"
						onclick={closeTable}
					>
						<DoorOpenIcon class="size-4 mr-2" />
						Close Table
					</Button>
				{/if}
				{#if $closeTableMut.error}
					<Error message={getError($closeTableMut.error).message} />
				{/if}
			{/if}
			<BillOptions {bookingId} />
		</div>
	</Card.Footer>
</Card.Root>
