<script lang="ts">
	import { createCashUpUserDelete, type DTOCashUpUserItemDTO } from "$lib/api";
	import { Button, Card } from "@kayord/ui";
	import { Trash2Icon } from "lucide-svelte";

	const mutation = createCashUpUserDelete();

	interface Props {
		item: DTOCashUpUserItemDTO;
		refetch: () => void;
	}

	let { item, refetch }: Props = $props();

	const deleteItem = async () => {
		await $mutation.mutateAsync({ id: item.id });
		refetch();
	};
</script>

<div class="w-full">
	<div class="flex items-center justify-between p-2">
		<div class="flex items-center">
			<span class="text-muted-foreground">{item.cashUpUserItemType?.itemType}</span>
			{#if item.id}
				<Button class="ml-2 size-6" variant="destructive" size="icon" on:click={deleteItem}>
					<Trash2Icon class="size-5 text-destructive-foreground" />
				</Button>
			{/if}
		</div>
		<span>R {item.value.toFixed(2)}</span>
	</div>
</div>
