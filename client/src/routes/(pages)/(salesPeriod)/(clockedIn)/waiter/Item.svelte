<script lang="ts">
	import type { TableOrderOfficeOrderItemDTO } from "$lib/api";
	import { Badge, Button, Card, Loader } from "@kayord/ui";
	import { createTableOrderUpdateOrderItem } from "$lib/api";

	interface Props {
		item: TableOrderOfficeOrderItemDTO;
		refetch: () => void;
	}
	let { item, refetch }: Props = $props();

	let completeItemBusy = $state(false);

	const getStatus = () => {
		const theDate = new Date(item.orderReceived);

		var critical = 30 * 60 * 1000;
		var warning = 10 * 60 * 1000;

		if (Date.now() - theDate.valueOf() > critical) {
			return "background-color: var(--destructive);";
		}
		if (Date.now() - theDate.valueOf() > warning) {
			return "background-color: var(--color-warning);";
		}
		return "background-color: var(--color-success);";
	};

	const mutation = createTableOrderUpdateOrderItem();

	const completeItem = async (id: number, statusId: number) => {
		try {
			completeItemBusy = true;
			await mutation.mutateAsync({ data: { orderItemIds: [id], orderItemStatusId: statusId } });
		} catch (e) {
			console.error(e);
		} finally {
			completeItemBusy = false;
			refetch();
		}
	};
</script>

<Card.Root class="relative p-2">
	<div class="flex items-center justify-between">
		<div>
			<div>{item.menuItem.name}</div>
			{#if (item.orderItemOptions ?? []).length > 0}
				<div class="text-muted-foreground mt-2">
					Options
					<div class="ml-4">
						{#each item.orderItemOptions ?? [] as option (option.orderItemOptionId)}
							<div>
								<span class="text-foreground">{option.option.optionGroup.name}:</span>
								<span>{option.option.name}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			{#if (item.orderItemExtras ?? []).length > 0}
				<div class="text-muted-foreground mt-2">
					Extras
					<div class="ml-4">
						{#each item.orderItemExtras ?? [] as extra (extra.orderItemExtraId)}
							<div>
								<span class="text-foreground">{extra.extra.extraGroup.name}:</span>
								<span> {extra.extra.name}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			{#if (item.note?.length ?? 0) > 0}
				<div class="mt-2 flex items-center gap-2">
					<div class="text-muted-foreground">Note:</div>
					{item.note}
				</div>
			{/if}
		</div>
		<div class="flex flex-col items-end justify-end gap-2 sm:flex-row sm:items-center">
			<div class="flex flex-col gap-1">
				<Badge class="self-end truncate">{item.orderItemStatus?.status}</Badge>
				<Badge class="animate-pulse self-end truncate" style={getStatus()}>
					{item.orderReceivedFormatted}
				</Badge>
			</div>
			<Button onclick={() => completeItem(item.orderItemId, 6)} disabled={completeItemBusy}>
				Done
				{#if completeItemBusy}
					<Loader class="size-5" />
				{/if}
			</Button>
		</div>
	</div>
</Card.Root>
