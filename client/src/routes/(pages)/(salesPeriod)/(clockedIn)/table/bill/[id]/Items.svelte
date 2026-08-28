<script lang="ts">
	import type { TableOrderGetBillResponse } from "$lib/api";

	interface Props {
		bill: TableOrderGetBillResponse;
		showDetail?: boolean;
	}

	let { bill, showDetail = false }: Props = $props();

	const data = $derived(bill.summaryOrderItems ?? []);
</script>

<ul class="grid gap-3">
	{#each data as item}
		<li class="flex items-center justify-between">
			<span class="text-muted-foreground">
				<!-- {#if showDetail}
					<div class="line-clamp-1 text-xs">
						{new Date(item.orderReceived).toLocaleTimeString()}
					</div>
				{/if} -->
				<div class="line-clamp-1">{item.quantity} {item.menuItem.name}</div>
				{#each item.orderItemOptions ?? [] as option}
					<div class="ml-4 flex items-center gap-1">
						{">"}
						<span>{option.option.optionGroup.name}:</span>
						<span>{option.option.name}</span>
					</div>
				{/each}
				{#each item.orderItemExtras ?? [] as extra}
					<div class="ml-4 flex items-center gap-1">
						{"+"}
						<span class="font-light">{extra.extra.extraGroup.name}:</span>
						<span>{extra.extra.name}</span>
					</div>
				{/each}
			</span>
			<span class="text-right">
				{#if showDetail}
					<div class="h-3"></div>
				{/if}
				<div class="grid grid-cols-2 gap-4 text-muted-foreground w-48">
					{item.menuItem.price.toFixed(2)}
					<span class="font-semibold text-foreground">{item.total.toFixed(2)}</span>
					<div>
						{#each item.orderItemOptions ?? [] as option}
							<div>{option.option.price.toFixed(2)}</div>
						{/each}
						{#each item.orderItemExtras ?? [] as extra}
							<div>{extra.extra.price.toFixed(2)}</div>
						{/each}
					</div>
				</div>
			</span>
		</li>
	{/each}
	{#if data.length == 0}
		<div class="text-muted-foreground">Add Items to Order to get started</div>
	{/if}
</ul>
