<script lang="ts">
	import {
		createTableOrderUpdateTableOrder,
		type TableOrderOfficeOrderBasedBackOrderGroupDTO,
	} from "$lib/api";
	import { getInitials } from "$lib/util";
	import { Avatar, Button, Card, Drawer, Popover } from "@kayord/ui";
	import { BellElectricIcon } from "lucide-svelte";
	import Item from "./Item.svelte";

	export let group: TableOrderOfficeOrderBasedBackOrderGroupDTO;
	export let refetch: () => void;

	const mutation = createTableOrderUpdateTableOrder();
	const readyAll = async (id: number, statusId: number) => {
		await $mutation.mutateAsync({ data: { orderItemStatusId: statusId, tableBookingId: id } });
		refetch();
	};
</script>

<Card.Root class="p-2">
	<div class="flex justify-between items-center">
		<div class="flex items-center gap-2">
			<Popover.Root>
				<Popover.Trigger>
					<Avatar.Root>
						<!-- <Avatar.Image src={tableOrder.user.image} alt={tableOrder.user.name} /> -->
						<Avatar.Fallback>{getInitials("Jaco Kok")}</Avatar.Fallback>
					</Avatar.Root>
				</Popover.Trigger>
				<Popover.Content>User Name</Popover.Content>
			</Popover.Root>
			<div class="max-w-64 line-clamp-2 flex flex-col">
				<div class="leading-none"># {group.orderGroupId}</div>
				<div class="text-sm font-bold">
					Name
					<span class="text-muted-foreground text-xs">(text)</span>
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
						<Drawer.Title># Table</Drawer.Title>
						<Drawer.Description>Table Actions</Drawer.Description>
					</Drawer.Header>
					<Drawer.Footer>
						<Drawer.Close>
							<!-- <Button class="w-full" on:click={() => readyAll(tableOrder.id, 5)}>Ready All</Button> -->
						</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		</div>
	</div>
	<div class="flex flex-col gap-2 mt-2">
		{#each group.orderItems ?? [] as item}
			<Item {item} {refetch} />
		{/each}
	</div>
</Card.Root>
