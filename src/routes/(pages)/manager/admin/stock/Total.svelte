<script lang="ts">
	import { Badge, Button } from "@kayord/ui";
	import { SettingsIcon, SigmaIcon } from "@lucide/svelte";
	import StockItems from "./StockItems.svelte";
	import type { StockGetAllResponse } from "$lib/api";

	interface Props {
		stock: StockGetAllResponse;
		refetch: () => void;
	}

	let { stock, refetch }: Props = $props();

	let isOpen = $state(false);
</script>

<Button size="sm" variant="ghost" onclick={() => (isOpen = true)}>
	<Badge variant="secondary">{stock.totalActual}</Badge><SettingsIcon />
</Button>
<StockItems bind:open={isOpen} id={stock.id} stockName={stock.name} {refetch} />
