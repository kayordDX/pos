<script lang="ts">
	import type { TableOrderGetBillBillOrderItemDTO } from "$lib/api";
	import { Table } from "@kayord/ui";

	export let data: Array<TableOrderGetBillBillOrderItemDTO>;
</script>

<Table.Body class="w-full">
	{#each data as item}
		<Table.Row>
			<Table.Cell class="font-medium w-full">
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
						<span class="text-foreground">{extra.extra.extraGroup.name}:</span>
						<span>{extra.extra.name}</span>
					</div>
				{/each}
			</Table.Cell>
			<Table.Cell class="text-right w-full"
				>{item.menuItem.price.toFixed(2)}
				{#each item.orderItemOptions ?? [] as option}
					<div>{option.option.price.toFixed(2)}</div>
				{/each}
				{#each item.orderItemExtras ?? [] as extra}
					<div>{extra.extra.price.toFixed(2)}</div>
				{/each}
			</Table.Cell>
		</Table.Row>
	{/each}
</Table.Body>
