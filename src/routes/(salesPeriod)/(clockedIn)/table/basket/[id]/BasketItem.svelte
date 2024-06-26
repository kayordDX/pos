<script lang="ts">
	import { Badge, Button, Card } from "@kayord/ui";
	import {
		createTableOrderCopyItem,
		createTableOrderRemoveItem,
		createTableOrderUpdateOrderItem,
		type DTOOrderItemExtraDTO,
		type DTOOrderItemOptionDTO,
	} from "$lib/api";
	import { CopyIcon, TrashIcon } from "lucide-svelte";
	import ItemCount from "./ItemCount.svelte";

	export let id: number;
	export let quantity: number;
	export let price: number;
	export let note: string | null | undefined = undefined;
	export let options: Array<DTOOrderItemOptionDTO>;
	export let extras: Array<DTOOrderItemExtraDTO>;
	export let refetch: () => any;

	const removeItem = createTableOrderRemoveItem();
	const copyItem = createTableOrderCopyItem();

	const remove = async () => {
		await $removeItem.mutateAsync({ data: { orderItemId: id } });
		refetch();
	};

	const copy = async () => {
		await $copyItem.mutateAsync({ data: { orderItemId: id } });
		refetch();
	};
</script>

<Card.Root class="p-4 flex justify-between relative">
	<ItemCount value={quantity} />
	<div class="flex flex-col gap-2 justify-center">
		<slot />
		{#if (options ?? []).length > 0}
			<div class="text-muted-foreground mt-2">
				Options
				<div class="ml-4">
					{#each options ?? [] as option, i (option.optionId)}
						<div>
							<span class="text-foreground">{option.option.optionGroup.name}:</span>
							<span>{option.option.name}</span>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if (extras ?? []).length > 0}
			<div class="text-muted-foreground mt-2">
				Extras
				<div class="ml-4">
					{#each extras ?? [] as extra, i (extra.extraId)}
						<div>
							<span class="text-foreground">{extra.extra.extraGroup.name}:</span>
							<span> {extra.extra.name}</span>
						</div>
					{/each}
				</div>
			</div>
		{/if}
		{#if note}
			<div class="flex gap-2">
				<div class="text-muted-foreground">Note:</div>
				<div>{note}</div>
			</div>
		{/if}
	</div>
	<div class="flex items-center gap-2 mr-1">
		<div class="font-bold mr-2">R {price.toFixed(2)}</div>
		<Button variant="outline" on:click={copy} size="icon">
			<CopyIcon class="h-4 w-4" />
		</Button>
		<Button variant="destructive" on:click={remove} size="icon">
			<TrashIcon class="h-4 w-4" />
		</Button>
	</div>
</Card.Root>
