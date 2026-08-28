<script lang="ts">
	import Error from "$lib/components/Error.svelte";
	import { createSalesPeriodCashUp } from "$lib/api";
	import { Card, Loader } from "@kayord/ui";
	import { getError } from "$lib/types";
	import { status } from "$lib/stores/status.svelte";

	const cashUpQuery = createSalesPeriodCashUp(() => ({
		salesPeriodId: status.value?.salesPeriodId ?? 0,
		userId: "",
	}));
</script>

<div class="m-2">
	{#if cashUpQuery.isPending}
		<Loader />
	{/if}
	{#if cashUpQuery.error}
		<Error message={getError(cashUpQuery.error).message} />
	{/if}

	{#if cashUpQuery.data}
		{@const d = cashUpQuery.data}
		<div class="flex flex-col gap-4">
			<div class="flex flex-row gap-4 flex-wrap items-center justify-center">
				<Card.Root class="min-w-52">
					<Card.Header class="pb-6">
						<Card.Title>R{d.cashUpTotal.toFixed(2)}</Card.Title>
						<Card.Description class="text-xs">Total Sales</Card.Description>
					</Card.Header>
				</Card.Root>
				<Card.Root class="min-w-52">
					<Card.Header class="pb-6">
						<Card.Title>{d.tableCount}</Card.Title>
						<Card.Description>Total Payments</Card.Description>
					</Card.Header>
				</Card.Root>
				<Card.Root class="min-w-52">
					<Card.Header class="pb-6">
						<Card.Title>R{d.cashUpBalance.toFixed(2)}</Card.Title>
						<Card.Description>Total Tips</Card.Description>
					</Card.Header>
				</Card.Root>
			</div>
		</div>
	{/if}
</div>
