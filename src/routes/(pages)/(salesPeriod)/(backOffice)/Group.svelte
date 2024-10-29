<script lang="ts">
	import {
		createTableOrderUpdateGroupOrder,
		type TableOrderOfficeOrderBasedBackOrderGroupDTO,
	} from "$lib/api";
	import { getInitials } from "$lib/util";
	import { Avatar, Badge, Button, Card, Dialog, Drawer, Popover, ScrollArea } from "@kayord/ui";
	import { BellElectricIcon, EllipsisIcon } from "lucide-svelte";
	import Item from "./Item.svelte";
	import { backOffice } from "$lib/stores/backOffice.svelte";

	interface Props {
		group: TableOrderOfficeOrderBasedBackOrderGroupDTO;
		refetch: () => void;
		isHistory?: boolean;
		divisionIds?: string;
	}
	let { group, refetch, isHistory = false, divisionIds }: Props = $props();

	const mutation = createTableOrderUpdateGroupOrder();
	const readyAll = async (id: number, statusId: number) => {
		await $mutation.mutateAsync({
			data: { orderItemStatusId: statusId, orderGroupId: id, divisionIds },
		});
		refetch();
	};

	const height = $derived(backOffice.value.itemHeight ?? 500);
	let clientHeight = $state(0);

	const showMore = $derived(clientHeight > height);
</script>

<div
	style={`height: ${height}px; font-size: ${backOffice.value.fontSize / 1000}rem`}
	class="w-full"
>
	<ScrollArea class="overflow-hidden h-full">
		<Card.Root
			class={`p-2 ${group.priority > 10 ? "border-4 border-destructive" : ""}`}
			style={`min-height: ${height}px`}
		>
			<div>
				<div bind:clientHeight>
					<div class="flex justify-between items-center">
						<div class="flex items-center gap-2">
							<Popover.Root>
								<Popover.Trigger>
									<Avatar.Root>
										<Avatar.Image
											src={group.tableBooking?.user.image}
											alt={group.tableBooking?.user.name}
										/>
										<Avatar.Fallback
											>{getInitials(group.tableBooking?.user.name ?? "")}</Avatar.Fallback
										>
									</Avatar.Root>
								</Popover.Trigger>
								<Popover.Content>{group.tableBooking?.user.name}</Popover.Content>
							</Popover.Root>
							<div class="max-w-64 line-clamp-2 flex flex-col">
								<div class="leading-none"># {group.orderGroupId}</div>
								<div class="font-bold">
									{group.tableBooking?.table.name} - {group.tableBooking?.table.section?.name}
									<span class="text-muted-foreground text-xs"
										>({group.tableBooking?.bookingName})</span
									>
								</div>
							</div>
						</div>
						{#if !isHistory}
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
												<Button class="w-full" onclick={() => readyAll(group.orderGroupId, 5)}
													>Ready All</Button
												>
											</Drawer.Close>
										</Drawer.Footer>
									</Drawer.Content>
								</Drawer.Root>
							</div>
						{/if}
					</div>
					<div class="flex flex-col gap-2 mt-2">
						{#each group.orderItems ?? [] as item}
							<Item {item} {refetch} {isHistory} />
						{/each}
					</div>
				</div>
				{#if showMore}
					<div class="flex justify-center mt-6">
						<Badge
							variant="secondary"
							class="flex justify-center absolute left-0 right-0 bottom-0 h-5 w-full"
						>
							<EllipsisIcon class="size-5" />
						</Badge>
					</div>
				{/if}
			</div>
		</Card.Root>
	</ScrollArea>
</div>
