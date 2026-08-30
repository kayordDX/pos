<script lang="ts">
	import type { TableOrderGetBillBillOrderItemDTO } from "$lib/api";
	import { Table } from "@kayord/ui";

	interface Props {
		data: Array<TableOrderGetBillBillOrderItemDTO>;
	}

	let { data }: Props = $props();
</script>

<Table.Body>
	{#each data as item (item)}
		<Table.Row class="border-none">
			<Table.Cell class="w-full py-2 font-medium">
				<div class="line-clamp-1">{item.menuItem.name}</div>
				{#each item.orderItemOptions ?? [] as option (option.orderItemOptionId)}
					<div class="ml-4 flex items-center gap-1">
						&gt;
						<span>{option.option.optionGroup.name}:</span>
						<span>{option.option.name}</span>
					</div>
				{/each}
				{#each item.orderItemExtras ?? [] as extra (extra.orderItemExtraId)}
					<div class="ml-4 flex items-center gap-1">
						+
						<span class="text-foreground">{extra.extra.extraGroup.name}:</span>
						<span>{extra.extra.name}</span>
					</div>
				{/each}
			</Table.Cell>
			<Table.Cell class="w-full py-2 text-right"
				>{item.menuItem.price.toFixed(2)}
				{#each item.orderItemOptions ?? [] as option (option.orderItemOptionId)}
					<div>{option.option.price.toFixed(2)}</div>
				{/each}
				{#each item.orderItemExtras ?? [] as extra (extra.orderItemExtraId)}
					<div>{extra.extra.price.toFixed(2)}</div>
				{/each}
			</Table.Cell>
		</Table.Row>
	{/each}
</Table.Body>
