<script lang="ts">
	import { createTableOrderUpdateGroupOrder, type TableOrderOfficeOrderBasedBackOrderGroupDTO } from "$lib/api";
	import { getInitials } from "$lib/util";
	import { Avatar, Badge, Button, Card, Popover, ScrollArea } from "@kayord/ui";
	import { Drawer } from "@kayord/ui/drawer";
	import { BellElectricIcon, EllipsisIcon } from "@lucide/svelte";
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
		await mutation.mutateAsync({
			data: { orderItemStatusId: statusId, orderGroupId: id, divisionIds },
		});
		refetch();
	};

	const height = $derived(backOffice.value.itemHeight ?? 500);
	const scale = $derived(backOffice.value.fontSize / 1000);
	const fontSizeStyle = $derived(
		// @kayord/ui components use Tailwind text-* utilities, which resolve their size from these theme variables
		`--text-xs: calc(0.75rem * ${scale}); --text-sm: calc(0.875rem * ${scale}); --text-base: calc(1rem * ${scale})`
	);
	let clientHeight = $state(0);

	const showMore = $derived(clientHeight > height);
</script>

<div style={`height: ${height}px; font-size: ${scale}rem; ${fontSizeStyle}`} class="w-full">
	<ScrollArea class="h-full overflow-hidden">
		<Card.Root class={`p-2 ${group.priority > 10 ? "border-destructive border-4" : ""}`} style={`min-height: ${height}px`}>
			<div>
				<div bind:clientHeight>
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							<Popover.Root>
								<Popover.Trigger>
									<Avatar.Root>
										<Avatar.Image src={group.tableBooking?.user.image} alt={group.tableBooking?.user.name} />
										<Avatar.Fallback>{getInitials(group.tableBooking?.user.name ?? "")}</Avatar.Fallback>
									</Avatar.Root>
								</Popover.Trigger>
								<Popover.Content>{group.tableBooking?.user.name}</Popover.Content>
							</Popover.Root>
							<div class="line-clamp-2 flex max-w-64 flex-col">
								<div class="leading-none"># {group.orderGroupId}</div>
								<div class="font-bold">
									{group.tableBooking?.table.name} - {group.tableBooking?.table.section?.name}
									<span class="text-muted-foreground text-xs">({group.tableBooking?.bookingName})</span>
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
												<Button class="w-full" onclick={() => readyAll(group.orderGroupId, 5)}>Ready All</Button>
											</Drawer.Close>
										</Drawer.Footer>
									</Drawer.Content>
								</Drawer.Root>
							</div>
						{/if}
					</div>
					<div class="mt-2 flex flex-col gap-2">
						{#each group.orderItems ?? [] as item (item.orderItemId)}
							<Item {item} {refetch} {isHistory} />
						{/each}
					</div>
				</div>
				{#if showMore}
					<div class="mt-6 flex justify-center">
						<Badge variant="secondary" class="absolute right-0 bottom-0 left-0 flex h-5 w-full justify-center">
							<EllipsisIcon class="size-5" />
						</Badge>
					</div>
				{/if}
			</div>
		</Card.Root>
	</ScrollArea>
</div>
