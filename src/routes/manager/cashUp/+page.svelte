<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
	import Error from "$lib/components/Error.svelte";
	import { createSalesPeriodCashUp } from "$lib/api";
	import { Accordion, Avatar, Card, Loader } from "@kayord/ui";
	import { getError } from "$lib/types";
	import Item from "../../table/bill/[id]/Item.svelte";
	import { getInitials } from "$lib/util";

	const cashUpQuery = createSalesPeriodCashUp({
		salesPeriodId: data.status?.salesPeriodId ?? 0,
		userId: null,
	});
</script>

<div class="m-8">
	{#if $cashUpQuery.isPending}
		<Loader />
	{/if}
	{#if $cashUpQuery.error}
		{#if getError($cashUpQuery.error).message == "Forbidden"}
			<Error message="Not all tables has been cashed up" />
		{:else if getError($cashUpQuery.error).message == "Unauthorized"}
			<Error message="Could not find sales period" />
		{:else}
			<Error message={getError($cashUpQuery.error).message} />
		{/if}
	{/if}

	{#if $cashUpQuery.data}
		{@const d = $cashUpQuery.data}
		<div class="flex flex-col gap-2">
			<div class="flex flex-row gap-2">
				<Card.Root class="w-full max-w-lg">
					<Card.Header>
						<Card.Title>{d.cashUpTotal}</Card.Title>
						<Card.Description>Cash Up Total</Card.Description>
					</Card.Header>
				</Card.Root>
				<Card.Root class="w-full max-w-lg">
					<Card.Header>
						<Card.Title>{d.tableCount}</Card.Title>
						<Card.Description>Table Count</Card.Description>
					</Card.Header>
				</Card.Root>
				<Card.Root class="w-full max-w-lg">
					<Card.Header>
						<Card.Title>{d.cashUpBalance}</Card.Title>
						<Card.Description>Cash Up Balance</Card.Description>
					</Card.Header>
				</Card.Root>
				<Card.Root class="w-full max-w-lg">
					<Card.Header>
						<Card.Title>{d.cashUpTotalPayments}</Card.Title>
						<Card.Description>Cash Up Total Payments</Card.Description>
					</Card.Header>
				</Card.Root>
			</div>
			{#each d.userCashUps as cash}
				<Accordion.Root>
					<Accordion.Item value="item-1">
						<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
						<Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>

				<Avatar.Root>
					<Avatar.Image src={""} alt="profile" />
					<Avatar.Fallback class="bg-primary text-primary-foreground">
						{getInitials("Kay Jay")}
					</Avatar.Fallback>
				</Avatar.Root>
				<div>
					{cash.userId}
					{cash.user?.name}
				</div>
				{cash.userPaymentTotal}
				{cash.userTotal}
				{cash.userBalance}

				{#each cash.tableCashUps as table}
					{table.balance}
					{table.paymentsReceived}
					{table.tablePaymentTotal}
					{table.total}
					{table.userId}
					<Item data={table.orderItems} />
				{/each}
			{/each}
		</div>
	{/if}
</div>
