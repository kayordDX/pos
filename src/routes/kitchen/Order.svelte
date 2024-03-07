<script lang="ts">
	import { Avatar, Badge, Button, Card, Drawer, Loader, Popover, ScrollArea } from "@kayord/ui";
	import Error from "$lib/components/Error.svelte";
	import Item from "./Item.svelte";
	import { BellElectricIcon } from "lucide-svelte";
	import { createTableOrderUpdateTableOrder } from "$lib/api";
	import Masonry from "svelte-bricks";
	import { createTableOrderKitchen } from "$lib/api";
	import { getError } from "$lib/types";
	import { getInitials } from "$lib/util";
	const query = createTableOrderKitchen({ query: { refetchInterval: 20000 } });

	const getTime = (date: string) => {
		return new Date(date).toLocaleTimeString();
	};

	const mutation = createTableOrderUpdateTableOrder();
	const readyAll = async (id: number, statusId: number) => {
		await $mutation.mutateAsync({ data: { orderItemStatusId: statusId, tableBookingId: id } });
		$query.refetch();
	};

	let [minColWidth, maxColWidth, gap] = [500, 600, 10];
</script>

{#if $query.isPending}
	<Loader />
{/if}
{#if $query.error}
	<Error message={getError($query.error).message} />
{/if}
{#if $query.data}
	<div class="flex justify-between mb-2">
		<div>
			<Badge>{$query.data.pendingTables} pending table(s)</Badge>
			<Badge>{$query.data.pendingItems} pending items(s)</Badge>
		</div>
		<button on:click={() => $query.refetch()}>
			<Badge variant="secondary" class="truncate">
				Refreshed: {getTime($query.data.lastRefresh)}
			</Badge>
		</button>
	</div>

	<!-- <div class="flex flex-wrap gap-2 items-baseline"> -->
	<Masonry
		items={$query.data.tables ?? []}
		{minColWidth}
		{maxColWidth}
		{gap}
		let:item={tableOrder}
		animate
	>
		<!-- {#each $query.data.tables ?? [] as tableOrder} -->
		<Card.Root class="p-2">
			<div class="flex justify-between items-center">
				<div class="flex items-center gap-2">
					<Popover.Root>
						<Popover.Trigger>
							<Avatar.Root>
								<Avatar.Image src={tableOrder.user.image} alt={tableOrder.user.name} />
								<Avatar.Fallback>{getInitials(tableOrder.user.name)}</Avatar.Fallback>
							</Avatar.Root>
						</Popover.Trigger>
						<Popover.Content>{tableOrder.user.name}</Popover.Content>
					</Popover.Root>
					<div class="max-w-64 line-clamp-2">
						<div># {tableOrder.id}</div>
						<div class="text-sm font-bold">
							{tableOrder.table.name} - {tableOrder.table.section?.name}
							<span class="text-muted-foreground text-sm">({tableOrder.bookingName})</span>
						</div>
					</div>
				</div>
				<div class="float-right ml-2">
					<Drawer.Root>
						<Drawer.Trigger>
							<Button><BellElectricIcon class="mr-2 h-4 w-4" />Actions</Button>
						</Drawer.Trigger>
						<Drawer.Content>
							<Drawer.Header>
								<Drawer.Title># {tableOrder.id}</Drawer.Title>
								<Drawer.Description>Table Actions</Drawer.Description>
							</Drawer.Header>
							<Drawer.Footer>
								<Drawer.Close>
									<Button class="w-full" on:click={() => readyAll(tableOrder.id, 5)}>
										Ready All</Button
									>
								</Drawer.Close>
							</Drawer.Footer>
						</Drawer.Content>
					</Drawer.Root>
				</div>
			</div>
			<div class="flex flex-col gap-2 mt-2">
				{#each tableOrder.orderItems ?? [] as item}
					<Item {item} refetch={$query.refetch} />
				{/each}
			</div>
		</Card.Root>
		<!-- {/each} -->
	</Masonry>
	<!-- </div> -->
{/if}
