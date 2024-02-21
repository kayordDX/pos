<script lang="ts">
	import type { TableOrderKitchenOrderItemDTO } from "$lib/api";
	import { Badge, Button, Card, Drawer } from "@kayord/ui";
	import { ConciergeBellIcon } from "lucide-svelte";
	import { createTableOrderUpdateOrderItem } from "$lib/api";
	export let refetch: () => void;
	let open = false;

	const mutation = createTableOrderUpdateOrderItem();

	export let item: TableOrderKitchenOrderItemDTO;

	const getStatus = () => {
		const theDate = new Date(item.orderReceived);

		var critical = 30 * 60 * 1000;
		var warning = 10 * 60 * 1000;

		if (Date.now() - theDate.valueOf() > critical) {
			return "background-color: hsl(var(--destructive));";
		}
		if (Date.now() - theDate.valueOf() > warning) {
			return "background-color: rgb(245 158 11);";
		}
		return "background-color: rgb(34 197 94);";
	};

	const setStatus = async (statusId: number, orderItemId: number, isComplete: boolean = false) => {
		await $mutation.mutateAsync({
			data: { isComplete: isComplete, orderItemId, orderItemStatusId: statusId },
		});
		refetch();
	};
</script>

<Card.Root class="p-2 relative">
	<div class="flex justify-between items-center">
		<div>
			<div>{item.menuItem.name}</div>
			<div class="text-muted-foreground">TODO: Sub Option</div>
			<div class="text-muted-foreground">TODO: Sub Option</div>
		</div>
		<div class="flex items-center gap-2">
			<Badge style={getStatus()}>{item.orderReceivedFormatted}</Badge>
			<Drawer.Root bind:open>
				<Drawer.Trigger>
					<Button><ConciergeBellIcon class="h-4 w-4 mr-2" />Action</Button>
				</Drawer.Trigger>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>Item Actions</Drawer.Title>
						<Drawer.Description>{item.menuItem.name}</Drawer.Description>
					</Drawer.Header>
					<Drawer.Footer>
						<Drawer.Close>
							<Button on:click={() => setStatus(5, item.orderItemId)} class="w-full">Ready</Button>
						</Drawer.Close>
						<Drawer.Close>
							<Button
								variant="destructive"
								on:click={() => setStatus(4, item.orderItemId)}
								class="w-full">Cancel Order</Button
							>
						</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		</div>
	</div>
</Card.Root>
