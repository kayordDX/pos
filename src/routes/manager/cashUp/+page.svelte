<script lang="ts">
	import Error from "$lib/components/Error.svelte";
	import { client, createSalesPeriodCashUp } from "$lib/api";
	import { Button, Card, Loader, toast } from "@kayord/ui";
	import { getError } from "$lib/types";
	import { status } from "$lib/stores/status";
	import { goto } from "$app/navigation";
	import CashUpUser from "./CashUpUser.svelte";

	const cashUpQuery = createSalesPeriodCashUp({
		salesPeriodId: $status?.salesPeriodId ?? 0,
		userId: "",
	});

	const closeSalesPeriod = async () => {
		const { response } = await client.POST("/salesPeriod/close", {
			body: { salesPeriodId: $status?.salesPeriodId ?? 0 },
		});
		if (response.ok) {
			await status.getStatus();
			goto("/");
		} else {
			toast.error("Could not close sales period");
		}
	};
</script>

<div class="m-2">
	{#if $cashUpQuery.isPending}
		<Loader />
	{/if}
	{#if $cashUpQuery.error}
		{#if getError($cashUpQuery.error).message == "Forbidden"}
			<Error message="Not all tables have been cashed up" />
		{:else if getError($cashUpQuery.error).message == "Unauthorized"}
			<Error message="Could not find sales period" />
		{:else}
			<Error message={getError($cashUpQuery.error).message} />
		{/if}
	{/if}

	{#if $cashUpQuery.data}
		{@const d = $cashUpQuery.data}
		<div class="flex flex-col gap-4">
			<div class="flex flex-row gap-4 flex-wrap items-center justify-center">
				<Card.Root class="min-w-52">
					<Card.Header>
						<Card.Title>R{d.cashUpTotal.toFixed(2)}</Card.Title>
						<Card.Description>Cash Up Total</Card.Description>
					</Card.Header>
				</Card.Root>
				<Card.Root class="min-w-52">
					<Card.Header>
						<Card.Title>{d.tableCount}</Card.Title>
						<Card.Description>Table Count</Card.Description>
					</Card.Header>
				</Card.Root>
				<Card.Root class="min-w-52">
					<Card.Header>
						<Card.Title>R{d.cashUpBalance.toFixed(2)}</Card.Title>
						<Card.Description>Cash Up Balance</Card.Description>
					</Card.Header>
				</Card.Root>
				<Card.Root class="min-w-52">
					<Card.Header>
						<Card.Title>R{d.cashUpTotalPayments.toFixed(2)}</Card.Title>
						<Card.Description>Cash Up Total Payments</Card.Description>
					</Card.Header>
				</Card.Root>
			</div>

			{#if $cashUpQuery.data.openTableCount <= 0}
				<Card.Root class="min-w-52 p-2">
					<Button class="w-full" on:click={closeSalesPeriod}>Cash up and Close Sales Period</Button>
				</Card.Root>
			{/if}

			{#each d.userCashUps as cash}
				<CashUpUser {cash} />
			{/each}
		</div>
	{/if}
</div>
