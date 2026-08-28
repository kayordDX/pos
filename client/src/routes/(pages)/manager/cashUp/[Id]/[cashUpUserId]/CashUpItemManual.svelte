<script lang="ts">
	import { page } from "$app/state";
	import { createCashUpUserDelete, type DTOCashUpUserItemDTO } from "$lib/api";
	import { Button } from "@kayord/ui";
	import { Trash2Icon } from "@lucide/svelte";

	const mutation = createCashUpUserDelete();

	interface Props {
		item: DTOCashUpUserItemDTO;
		refetch: () => void;
	}

	let { item, refetch }: Props = $props();

	const isCashedUp = $derived(Number(page.params.cashUpUserId ?? 0) > 0);

	const deleteItem = async () => {
		await mutation.mutateAsync({ id: item.id });
		refetch();
	};
</script>

<div class="flex w-full items-center justify-between py-1">
	<div class="flex items-center">
		<span class="text-muted-foreground">{item.cashUpUserItemType?.itemType}</span>
		{#if !isCashedUp}
			<Button class="ml-2 size-6" variant="destructive" size="icon" onclick={deleteItem}>
				<Trash2Icon class="text-background size-4" />
			</Button>
		{/if}
	</div>
	<span>R {item.value.toFixed(2)}</span>
</div>
