<script lang="ts">
	import type { TableOrderGetBillBillOrderItemDTO } from "$lib/api";
	import { Table } from "@kayord/ui";

	export let data: Array<TableOrderGetBillBillOrderItemDTO>;
</script>

<ul class="grid gap-3">
	{#each data as item}
		<li class="flex items-center justify-between">
			<span class="text-muted-foreground">
				<div class="line-clamp-1">{item.menuItem.name}</div>
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
				{item.menuItem.price.toFixed(2)}
				{#each item.orderItemOptions ?? [] as option}
					<div>{option.option.price.toFixed(2)}</div>
				{/each}
				{#each item.orderItemExtras ?? [] as extra}
					<div>{extra.extra.price.toFixed(2)}</div>
				{/each}
			</span>
		</li>
	{/each}
	{#if data.length == 0}
		<div class="text-muted-foreground">Add Items to Order to get started</div>
	{/if}
</ul>
