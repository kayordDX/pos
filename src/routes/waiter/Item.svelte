<script lang="ts">
	import type { TableOrderKitchenOrderItemDTO } from "$lib/api";
	import { Badge, Card } from "@kayord/ui";
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
</script>

<Card.Root class="p-2 relative">
	<div class="flex justify-between items-center">
		<div>
			<div>{item.menuItem.name}</div>
			{#if (item.orderItemOptions ?? []).length > 0}
				<div class="text-muted-foreground mt-2">
					Options
					<div class="ml-4">
						{#each item.orderItemOptions ?? [] as option}
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
						{#each item.orderItemExtras ?? [] as extra}
							<div>
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
			<Badge>{item.orderItemStatus?.status}</Badge>
			<Badge class="truncate animate-pulse" style={getStatus()}>{item.orderReceivedFormatted}</Badge
			>
		</div>
	</div>
</Card.Root>
