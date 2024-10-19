<script lang="ts">
	import type { TableOrderOfficeOrderItemDTO } from "$lib/api";
	import { Badge, Button, Card, Drawer } from "@kayord/ui";
	import { ConciergeBellIcon } from "lucide-svelte";
	import { createTableOrderUpdateOrderItem } from "$lib/api";
	let open = $state(false);

	const mutation = createTableOrderUpdateOrderItem();

	interface Props {
		refetch: () => void;
		isHistory?: boolean;
		item: TableOrderOfficeOrderItemDTO;
	}

	let { refetch, isHistory = false, item }: Props = $props();

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

	const setStatus = async (statusId: number, orderItemId: number) => {
		await $mutation.mutateAsync({
			data: { orderItemIds: [orderItemId], orderItemStatusId: statusId },
		});
		refetch();
	};
</script>

<Card.Root class="p-2 relative">
	<div class="flex justify-between items-center">
		<div>
			<div>{item.menuItem.name}</div>
			{#if (item.orderItemOptions ?? []).length > 0}
				<div class="text-muted-foreground mt-1">
					<div class="ml-4">
						{#each item.orderItemOptions ?? [] as option}
							<div>
								{">"}
								<span class="text-foreground">{option.option.optionGroup.name}:</span>
								<span>{option.option.name}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			{#if (item.orderItemExtras ?? []).length > 0}
				<div class="text-muted-foreground mt-1">
					<div class="ml-4">
						{#each item.orderItemExtras ?? [] as extra}
							<div>
								{"+"}
								<span class="text-foreground">{extra.extra.extraGroup.name}:</span>
								<span> {extra.extra.name}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			{#if (item.note?.length ?? 0) > 0}
				<div class="flex items-center gap-2 mt-2">
					<div class="text-muted-foreground">Note:</div>
					{item.note}
				</div>
			{/if}
		</div>
		<div class="flex items-center gap-2">
			<div class="flex flex-col gap-1">
				<Badge class="truncate self-end">{item.orderItemStatus?.status}</Badge>
				<Badge class="truncate animate-pulse" style={getStatus()}>
					{item.orderUpdatedFormatted}
				</Badge>
			</div>

			<Drawer.Root bind:open>
				<Drawer.Trigger>
					<Button variant="secondary"><ConciergeBellIcon class="h-4 w-4" /></Button>
				</Drawer.Trigger>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>Item Actions</Drawer.Title>
						<Drawer.Description>{item.menuItem.name}</Drawer.Description>
					</Drawer.Header>
					<Drawer.Footer>
						{#if isHistory}
							<Drawer.Close>
								<Button on:click={() => setStatus(7, item.orderItemId)} class="w-full"
									>Recall Item
								</Button>
							</Drawer.Close>
						{:else}
							<Drawer.Close>
								<Button on:click={() => setStatus(5, item.orderItemId)} class="w-full">Ready</Button
								>
							</Drawer.Close>
						{/if}
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
