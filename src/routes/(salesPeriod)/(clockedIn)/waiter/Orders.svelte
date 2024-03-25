<script lang="ts">
	import { createTableOrderKitchen } from "$lib/api";
	import { Card, Loader } from "@kayord/ui";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import Item from "./Item.svelte";

	const query = createTableOrderKitchen(
		{ divisionIds: "1" },
		{ query: { refetchInterval: 20000 } }
	);
</script>

{#if $query.isPending}
	<Loader />
{/if}
{#if $query.error}
	<Error message={getError($query.error).message} />
{/if}
{#if $query.data}
	<div class="flex flex-col gap-2">
		{#each $query.data.tables ?? [] as tableOrder}
			<Card.Root class="p-4">
				<div class="flex justify-between items-center">
					<div class="flex items-center gap-2">
						<div>
							<div class="text-lg font-bold">
								{tableOrder.table.name} - {tableOrder.table.section?.name}
								<span class="text-muted-foreground text-sm">({tableOrder.bookingName})</span>
							</div>
							<div># {tableOrder.id}</div>
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-2 mt-2">
					{#each tableOrder.orderItems ?? [] as item}
						<Item {item} refetch={$query.refetch} />
					{/each}
				</div>
			</Card.Root>
		{/each}
	</div>
{/if}
