<script>
	import { createCashUpUserGet } from "$lib/api";
	import { Card, Loader } from "@kayord/ui";
	import { status } from "$lib/stores/status";
	import { getError } from "$lib/types";
	import Error from "$lib/components/Error.svelte";
	import CashUpUser from "./CashUpUser.svelte";
	import { CheckIcon } from "lucide-svelte";

	const query = createCashUpUserGet($status.outletId);
</script>

<div class="m-2">
	{#if $query.isPending}
		<Loader />
	{/if}
	{#if $query.error}
		<Error message={getError($query.error).message} />
	{/if}

	{#if $query.data}
		{#if !$query.data.items.length}
			<Card.Root class="m-4">
				<Card.Header class="flex flex-row items-center gap-4">
					<div class="bg-primary rounded-full p-2">
						<CheckIcon class="text-primary-foreground" />
					</div>
					<div>
						<Card.Title>Cash Up</Card.Title>
						<Card.Description>All users have been cashed up</Card.Description>
					</div>
				</Card.Header>
			</Card.Root>
		{/if}
		<!-- <CashUpSummary /> -->
		<div class="flex flex-col gap-2 items-center">
			{#each $query.data.items as cash}
				<CashUpUser {cash} />
			{/each}
		</div>
	{/if}
</div>
