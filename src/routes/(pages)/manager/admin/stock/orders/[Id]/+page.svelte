<script lang="ts">
	import { page } from "$app/state";
	import { createStockOrderGet } from "$lib/api";
	import { getError } from "$lib/types";
	import { Alert, Badge, Button, Card, Loader, Table } from "@kayord/ui";
	import { PlusIcon } from "lucide-svelte";
	import AddOrderItem from "./AddOrderItem.svelte";

	const query = createStockOrderGet(Number(page.params.Id));

	let addOrderItemOpen = $state(false);
</script>

{#snippet addOrderItem()}
	<Button size="sm" onclick={() => (addOrderItemOpen = true)}>
		<PlusIcon class="h-5 w-5" /> Add Item
	</Button>
{/snippet}

{#snippet errorMessage(message: string)}
	<Alert.Root variant="destructive">
		<Alert.Title>Error</Alert.Title>
		<Alert.Description>{message}</Alert.Description>
	</Alert.Root>
{/snippet}

<div class="m-2">
	<Loader isLoading={$query.isPending} />
	{#if $query.data}
		<div class="border-2 border-secondary p-2 rounded-md flex justify-between items-center">
			<div class="flex flex-col">
				<h2 class="font-bold">Order: {$query.data.orderNumber}</h2>
				<Badge>{$query.data.stockOrderStatus.name}</Badge>
			</div>
			<div class="flex flex-col">
				<div>
					Division: {$query.data.division.divisionName}
				</div>
				<div>
					Supplier: {$query.data.supplier.name}
				</div>
			</div>
		</div>

		<div class="flex justify-end m-2">
			{@render addOrderItem()}
		</div>

		{#if ($query.data?.stockOrderItems?.length ?? 0) > 0}
			<Table.Root class="mt-2">
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[100px]">Invoice</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head>Method</Table.Head>
						<Table.Head class="text-right">Amount</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell class="font-medium">INV001</Table.Cell>
						<Table.Cell>Paid</Table.Cell>
						<Table.Cell>Credit Card</Table.Cell>
						<Table.Cell class="text-right">$250.00</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		{/if}
	{:else}
		{@render errorMessage("An error occurred while fetching order items")}
	{/if}
	{#if $query.error}
		{@render errorMessage(getError($query.error).message)}
	{/if}

	<AddOrderItem bind:open={addOrderItemOpen} refetch={$query.refetch} />
</div>
