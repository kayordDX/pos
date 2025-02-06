<script lang="ts">
	import { page } from "$app/state";
	import { createStockOrderGet } from "$lib/api";
	import { getError } from "$lib/types";
	import { Alert, Badge, Button, Card, Loader, Table } from "@kayord/ui";
	import { PlusIcon } from "lucide-svelte";
	import AddOrderItem from "./AddOrderItem.svelte";
	import Actions from "./Actions.svelte";

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
		<div
			class="border-2 border-secondary p-2 rounded-md flex justify-between items-center bg-secondary text-secondary-foreground"
		>
			<div class="flex flex-col">
				<h2 class="font-bold">Order: {$query.data.orderNumber}</h2>
				<div>
					<Badge>{$query.data.stockOrderStatus.name}</Badge>
				</div>
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
						<Table.Head>Stock</Table.Head>
						<Table.Head>Actual</Table.Head>
						<Table.Head>Price</Table.Head>
						<Table.Head class="w-[40px]"></Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each $query.data?.stockOrderItems ?? [] as item}
						<Table.Row>
							<Table.Cell>{item.stock.name}</Table.Cell>
							<Table.Cell>{item.actual}</Table.Cell>
							<Table.Cell>{item.price}</Table.Cell>
							<Table.Cell class="w-[40px] py-0">
								<Actions {item} refetch={$query.refetch} />
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{:else if !$query.isPending}
			<Alert.Root class="border-dashed">
				<Alert.Title>No Items</Alert.Title>
				<Alert.Description>Select Add Item to add new Items to Order</Alert.Description>
			</Alert.Root>
		{/if}
	{:else}
		{@render errorMessage("An error occurred while fetching order items")}
	{/if}
	{#if $query.error}
		{@render errorMessage(getError($query.error).message)}
	{/if}

	<AddOrderItem bind:open={addOrderItemOpen} refetch={$query.refetch} />
</div>
