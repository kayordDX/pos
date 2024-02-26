<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
	import Error from "$lib/components/Error.svelte";
	import { createSalesPeriodCashUp } from "$lib/api";
	import { Avatar, Card, Loader, Separator } from "@kayord/ui";
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
		<div class="flex flex-col gap-4">
			<div class="flex flex-row gap-4">
				<Card.Root class="w-full max-w-lg">
					<Card.Header>
						<Card.Title>R{d.cashUpTotal.toFixed(2)}</Card.Title>
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
						<Card.Title>R{d.cashUpBalance.toFixed(2)}</Card.Title>
						<Card.Description>Cash Up Balance</Card.Description>
					</Card.Header>
				</Card.Root>
				<Card.Root class="w-full max-w-lg">
					<Card.Header>
						<Card.Title>R{d.cashUpTotalPayments.toFixed(2)}</Card.Title>
						<Card.Description>Cash Up Total Payments</Card.Description>
					</Card.Header>
				</Card.Root>
			</div>
			{#each d.userCashUps as cash}
				<Card.Root>
					<Card.Header>
						<Avatar.Root>
							<Avatar.Image src={cash.user?.image} alt="profile" />
							<Avatar.Fallback class="bg-primary text-primary-foreground">
								{getInitials(cash.user?.name ?? "")}
							</Avatar.Fallback>
						</Avatar.Root>
					</Card.Header>
					<Card.Content>
						<div class="mb-4">
							<div class="flex justify-between">
								<h3>User Total</h3>
								<h3>R{cash.userTotal.toFixed(2)}</h3>
							</div>
							<div class="flex justify-between">
								<h3>User Payment Total</h3>
								<h3>R{cash.userPaymentTotal.toFixed(2)}</h3>
							</div>
							<div class="flex justify-between">
								<h3>User Balance</h3>
								<h3>R{cash.userBalance.toFixed(2)}</h3>
							</div>
							<div class="flex justify-between">
								<h3>User Tips</h3>
								<h3>R{cash.userTipTotal.toFixed(2)}</h3>
							</div>
						</div>

						<div class="flex flex-col gap-2">
							{#each cash.tableCashUps as table}
								<Card.Root>
									<Card.Content>
										<div class="flex justify-between">
											<h3>Table Payment</h3>
											<h3>R{table.tablePaymentTotal.toFixed(2)}</h3>
										</div>
										<div class="flex justify-between">
											<h3>Total</h3>
											<h3>R{table.total.toFixed(2)}</h3>
										</div>
										<Item data={table.orderItems} />

										<Separator class="mt-4" />

										<div class="flex justify-between">
											<h3>Total</h3>
											<h2>R{table.total.toFixed(2)}</h2>
										</div>
										<Separator class="mt-4" />

										{#each table.paymentsReceived as payment}
											<div class="flex justify-between">
												<div>Payment</div>
												<div>
													{payment.amount.toFixed(2)}
												</div>
											</div>
										{/each}
										<div class="flex justify-between font-bold">
											<div>Total Payed</div>
											<div>{table.tablePaymentTotal.toFixed(2)}</div>
										</div>
										{#if table.paymentsReceived.length > 0}
											<Separator class="mt-4" />
											<div class="flex justify-between">
												<h3>Balance</h3>
												<h3>R{table?.balance.toFixed(2)}</h3>
											</div>
										{/if}
									</Card.Content>
								</Card.Root>
							{/each}
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
