<script lang="ts">
	import type { TableOrderGetBillBillOrderItemDTO } from "$lib/api";

	export let data: Array<TableOrderGetBillBillOrderItemDTO>;
</script>

<div>
	{#each data as item}
		<div class="flex justify-between">
			<div>{item.menuItem.name}</div>
			<div>{item.menuItem.price.toFixed(2)}</div>
		</div>
		<div class="ml-4 line-clamp-1">
			{#each item.orderItemOptions ?? [] as option}
				<div class="flex justify-between">
					<div>
						<span class="text-foreground">{option.option.optionGroup.name}:</span>
						<span>{option.option.name}</span>
					</div>
					<div>{option.option.price.toFixed(2)}</div>
				</div>
			{/each}

			{#each item.orderItemExtras ?? [] as extra}
				<div class="flex justify-between">
					<div>
						<span class="text-foreground">{extra.extra.extraGroup.name}:</span>
						<span>{extra.extra.name}</span>
					</div>
					<div>{extra.extra.price.toFixed(2)}</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
