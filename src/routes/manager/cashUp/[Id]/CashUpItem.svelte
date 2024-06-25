<script lang="ts">
	import type { DTOCashUpUserItemDTO } from "$lib/api";
	import { Card } from "@kayord/ui";

	let { item }: { item: DTOCashUpUserItemDTO } = $props();
</script>

<Card.Root class="p-2 w-full">
	<Card.Header>
		<Card.Title>{item.value}</Card.Title>
		<Card.Description>{item.cashUpUserItemType?.itemType}</Card.Description>
	</Card.Header>
</Card.Root>
