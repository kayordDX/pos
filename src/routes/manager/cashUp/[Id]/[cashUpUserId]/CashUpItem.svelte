<script lang="ts">
	import { createCashUpUserDelete, type DTOCashUpUserItemDTO } from "$lib/api";

	interface Props {
		item: DTOCashUpUserItemDTO;
	}

	let { item }: Props = $props();
</script>

<div class="flex items-center justify-between py-1 w-full">
	<div class="flex items-center">
		<span class="text-muted-foreground">{item.cashUpUserItemType?.itemType}</span>
	</div>
	<span>R {item.value.toFixed(2)}</span>
</div>
