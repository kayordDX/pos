<script lang="ts">
	import Error from "$lib/components/Error.svelte";
	import { client, createSalesPeriodCashUp } from "$lib/api";
	import { Avatar, Button, Card, Loader, Separator, Table, toast } from "@kayord/ui";
	import { getError } from "$lib/types";
	import Item from "../../(salesPeriod)/(clockedIn)/table/bill/[id]/Item.svelte";
	import { getInitials } from "$lib/util";
	import { status } from "$lib/stores/status";
	import { goto } from "$app/navigation";

	const cashUpQuery = createSalesPeriodCashUp({
		salesPeriodId: $status?.salesPeriodId ?? 0,
		userId: "",
	});

	const closeSalesPeriod = async () => {
		const { response } = await client.POST("/salesPeriod/close", {
			body: { salesPeriodId: $status?.salesPeriodId ?? 0 },
		});
		if (response.ok) {
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
			{#each d.userCashUps as cash}
				<Card.Root>
					<Card.Header class="pb-2">
						<div class="flex items-center gap-2">
							<Avatar.Root>
								<Avatar.Image src={cash.user?.image} alt="profile" />
								<Avatar.Fallback class="bg-primary text-primary-foreground">
									{getInitials(cash.user?.name ?? "")}
								</Avatar.Fallback>
							</Avatar.Root>
							<h3>{cash.user?.name}</h3>
						</div>
					</Card.Header>
					<Card.Content>
						<Table.Root class="mb-2">
							<Table.Body>
								<Table.Row>
									<Table.Cell>User Total</Table.Cell>
									<Table.Cell class="float-right">R{cash.userTotal.toFixed(2)}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>User Payment Total</Table.Cell>
									<Table.Cell class="float-right">R{cash.userPaymentTotal.toFixed(2)}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>User Balance</Table.Cell>
									<Table.Cell class="float-right">R{cash.userBalance.toFixed(2)}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>User Tips</Table.Cell>
									<Table.Cell class="float-right">R{cash.userTipTotal.toFixed(2)}</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table.Root>

						<div class="flex flex-col gap-2">
							{#each cash.tableCashUps as table}
								<Card.Root>
									<Card.Content>
										<Table.Root>
											<Item data={table.orderItems} />
										</Table.Root>
										<Separator class="mt-4" />
										<Table.Root>
											<Table.Body>
												<Table.Row>
													<Table.Cell><h3 class="font-bold">Total</h3></Table.Cell>
													<Table.Cell class="float-right">
														<h3 class="font-bold">R{table.total.toFixed(2)}</h3>
													</Table.Cell>
												</Table.Row>
												{#each table.paymentsReceived as payment}
													<Table.Row>
														<Table.Cell
															>{payment.paymentTypeId == 1 ? "Tap" : "Manual"} Payment</Table.Cell
														>
														<Table.Cell class="float-right">
															{payment.amount.toFixed(2)}
														</Table.Cell>
													</Table.Row>
												{/each}
												<Table.Row>
													<Table.Cell><h3>Total Paid</h3></Table.Cell>
													<Table.Cell class="float-right">
														<h3>R{table.tablePaymentTotal.toFixed(2)}</h3>
													</Table.Cell>
												</Table.Row>
												{#if table.paymentsReceived.length > 0}
													<Table.Row>
														<Table.Cell><h3>Balance</h3></Table.Cell>
														<Table.Cell class="float-right">
															<h3>R{table?.balance.toFixed(2)}</h3>
														</Table.Cell>
													</Table.Row>
												{/if}
											</Table.Body>
										</Table.Root>
									</Card.Content>
								</Card.Root>
							{/each}
						</div>
					</Card.Content>
					{#if $cashUpQuery.data.openTableCount <= 0}
						<Card.Footer>
							<Button class="w-full" on:click={closeSalesPeriod}>
								Cash up and Close Sales Period
							</Button>
						</Card.Footer>
					{/if}
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
