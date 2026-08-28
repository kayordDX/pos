<script lang="ts">
	import { Badge, Button } from "@kayord/ui";
	import { SettingsIcon, SigmaIcon } from "@lucide/svelte";
	import StockItems from "./StockItems.svelte";

	interface Props {
		id: number;
		name: string;
		totalActual: number;
		refetch: () => void;
	}

	let { id, name, totalActual, refetch }: Props = $props();

	let isOpen = $state(false);
</script>

<Button size="sm" variant="ghost" onclick={() => (isOpen = true)}>
	<Badge variant="secondary">{totalActual}</Badge><SettingsIcon />
</Button>
<StockItems bind:open={isOpen} {id} stockName={name} {refetch} />
