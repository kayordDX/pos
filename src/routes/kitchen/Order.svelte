<script lang="ts">
	import { Avatar, Badge, Button, Card, Drawer, Loader } from "@kayord/ui";
	import Error from "$lib/components/Error.svelte";
	import Item from "./Item.svelte";
	import { BellElectricIcon } from "lucide-svelte";
	let open = false;

	import { createTableOrderKitchen } from "$lib/api";
	import { getError } from "$lib/types";
	import { stringify } from "qs";
	import { getInitials } from "$lib/util";
	const query = createTableOrderKitchen();

	console.log($query.data);
</script>

{#if $query.isPending}
	<Loader />
{/if}
{#if $query.error}
	<Error message={getError($query.error).message} />
{/if}
{#if $query.data}
	<div class="text-clip font-mono">
		{JSON.stringify($query.data)}
	</div>

	<Badge class="mb-2">{$query.data.length} pending orders</Badge>

	<div class="flex flex-col gap-2">
		{#each $query.data as table}
			<div># {table.tableBookingId} {table.tableName}</div>
			{#each table.orderItems as order}
				<div>Test</div>
			{/each}
		{/each}
	</div>

	<div class="flex flex-col gap-2">
		{#each $query.data as order, i}
			<Card.Root class="p-4">
				<div class="flex justify-between items-center">
					<div class="flex items-center gap-2">
						<!-- <Avatar.Root>
							<Avatar.Image
								src={order.tableBooking.user.image}
								alt={order.tableBooking.user.name}
							/>
							<Avatar.Fallback>{getInitials(order.tableBooking.user.name)}</Avatar.Fallback>
						</Avatar.Root> -->
						<div>
							<div class="text-lg font-bold">Indoor, Table</div>
							<div># {order.tableBookingId}</div>
						</div>
					</div>
					<div class="float-right">
						<Drawer.Root>
							<Drawer.Trigger>
								<Button><BellElectricIcon class="mr-2 h-4 w-4" />Order Actions</Button>
							</Drawer.Trigger>
							<Drawer.Content>
								<Drawer.Header>
									<Drawer.Title># {order.tableBookingId}</Drawer.Title>
									<Drawer.Description>Actions</Drawer.Description>
								</Drawer.Header>
								<Drawer.Footer>
									<Drawer.Close>
										<Button class="w-full" on:click={() => (open = false)}>Ready</Button>
									</Drawer.Close>
									<Drawer.Close>
										<Button class="w-full" variant="destructive">Call Waiter</Button>
									</Drawer.Close>
								</Drawer.Footer>
							</Drawer.Content>
						</Drawer.Root>
					</div>
				</div>

				<div class="flex flex-col gap-2 mt-2">
					<Item />
					<Item />
					<Item />
				</div>
			</Card.Root>
		{/each}
	</div>
{/if}

<!-- <Card.Root class="p-4">
	<div class="flex justify-between items-center">
		<div class="text-lg font-bold">Indoor, Table1</div>
		<div class="float-right">
			<Drawer.Root bind:open>
				<Drawer.Trigger>
					<Button><BellElectricIcon class="mr-2 h-4 w-4" />Order Actions</Button>
				</Drawer.Trigger>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title># 123</Drawer.Title>
						<Drawer.Description>Actions</Drawer.Description>
					</Drawer.Header>
					<Drawer.Footer>
						<Button>Ready</Button>
						<Button variant="destructive">Call Waiter</Button>
						<Drawer.Close>Cancel</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		</div>
	</div>
	<div># 123</div>

	<div class="flex flex-col gap-2 mt-2">
		<Item />
		<Item />
		<Item />
	</div>
</Card.Root> -->
