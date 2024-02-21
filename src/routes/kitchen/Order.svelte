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
	const query = createTableOrderKitchen({ query: { refetchInterval: 20000 } });
</script>

{#if $query.isPending}
	<Loader />
{/if}
{#if $query.error}
	<Error message={getError($query.error).message} />
{/if}
{#if $query.data}
	<Badge class="mb-2">{$query.data.length} pending table(s)</Badge>

	<div class="flex flex-col gap-2">
		{#each $query.data as tableOrder}
			<Card.Root class="p-4">
				<div class="flex justify-between items-center">
					<div class="flex items-center gap-2">
						<Avatar.Root>
							<Avatar.Image src={tableOrder.user.image} alt={tableOrder.user.name} />
							<Avatar.Fallback>{getInitials(tableOrder.user.name)}</Avatar.Fallback>
						</Avatar.Root>
						<div>
							<div class="text-lg font-bold">Indoor, Table, {tableOrder.bookingName}</div>
							<div># {tableOrder.id}</div>
						</div>
					</div>
					<div class="float-right">
						<Drawer.Root>
							<Drawer.Trigger>
								<Button><BellElectricIcon class="mr-2 h-4 w-4" />Order Actions</Button>
							</Drawer.Trigger>
							<Drawer.Content>
								<Drawer.Header>
									<Drawer.Title># {tableOrder.id}</Drawer.Title>
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
					{#each tableOrder.orderItems ?? [] as item}
						<Item {item} />
					{/each}
				</div>
			</Card.Root>
		{/each}
	</div>

	<div class="text-clip font-mono mt-8">
		{JSON.stringify($query.data)}
	</div>
{/if}
