<script lang="ts">
	import { createCashUpUserGet, createSalesPeriodClose } from "$lib/api";
	import { Button, Card, Loader } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { status } from "$lib/stores/status.svelte";
	import { getError } from "$lib/types";
	import Error from "$lib/components/Error.svelte";
	import CashUpUser from "./CashUpUser.svelte";
	import { CalendarClockIcon, CheckIcon } from "@lucide/svelte";
	import { goto } from "$app/navigation";

	const query = createCashUpUserGet(status.value.outletId);

	const mutation = createSalesPeriodClose();

	const closeSalesPeriod = async () => {
		try {
			await mutation.mutateAsync({ data: { salesPeriodId: status.value.salesPeriodId } });
			await status.getStatus();
			await goto("/manager");
		} catch (ex) {
			toast.error(getError(ex).message);
		}
	};

	const isCashUpBusy = $derived((query.data?.items ?? []).some((d) => d.cashUpUserId == 0));
</script>

<div class="m-2">
	{#if query.isPending}
		<Loader />
	{/if}
	{#if query.error}
		<Error message={getError(query.error).message} />
	{/if}

	{#if query.data}
		{#if !isCashUpBusy}
			<Card.Root class="m-4">
				<Card.Header class="flex flex-row items-center gap-4 pb-6">
					<div class="bg-primary rounded-full p-2">
						<CheckIcon class="text-primary-foreground" />
					</div>
					<div>
						<Card.Title>Cash Up</Card.Title>
						<Card.Description>All users have been cashed up</Card.Description>
					</div>
				</Card.Header>
			</Card.Root>
			{#if status.value.salesPeriodId > 0}
				<Card.Root class="m-4 p-2">
					<Button class="w-full" onclick={closeSalesPeriod}>
						<CalendarClockIcon class="size-5 mr-2" />
						Close Sales Period
					</Button>
				</Card.Root>
			{/if}
		{/if}
		<!-- <CashUpSummary /> -->
		<div class="flex flex-col gap-2 items-center">
			{#each query.data.items as cash}
				<CashUpUser {cash} />
			{/each}
		</div>
	{/if}
</div>
