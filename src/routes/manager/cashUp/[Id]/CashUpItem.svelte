<script lang="ts">
	import { createCashUpUserDelete, type DTOCashUpUserItemDTO } from "$lib/api";
	import { Button, Card } from "@kayord/ui";

	const mutation = createCashUpUserDelete();

	interface Props {
		item: DTOCashUpUserItemDTO;
		refetch: () => void;
	}

	let { item, refetch }: Props = $props();

	const deleteItem = async () => {
		console.log("delete", item);
		await $mutation.mutateAsync({ data: { id: item.id } });
		refetch();
	};
</script>

<Card.Root class="p-2 w-full">
	{#if item.id}
		<Button on:click={deleteItem}>Delete</Button>
	{/if}
	<Card.Header>
		<Card.Title>{item.value}</Card.Title>
		<Card.Description>{item.cashUpUserItemType?.itemType}</Card.Description>
	</Card.Header>
</Card.Root>
