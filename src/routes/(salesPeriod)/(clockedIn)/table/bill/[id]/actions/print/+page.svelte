<script lang="ts">
	import { createPrinterList } from "$lib/api";
	import { Alert, Card } from "@kayord/ui";
	import Printer from "./Printer.svelte";
	import TriangleAlertIcon from "lucide-svelte/icons/triangle-alert";
	import { status } from "$lib/stores/status";
	const query = createPrinterList($status.outletId);

	// TODO: Remove this temp fix and just use $query.data
	const getData = () => {
		let d = $query.data ?? [];
		d = d.map((p) => {
			if (p.outletId == 0) {
				p.outletId = p.printerConfig?.outletId ?? 0;
				p.printerId = p.printerConfig?.printerId ?? 0;
				p.name = p.printerConfig?.name ?? "";
			}
			return p;
		});
		return d;
	};

	const data = $derived.by(getData);
</script>

<Card.Root class="m-4">
	<Card.Header>
		<Card.Title>Available Printers</Card.Title>
		<Card.Description>Printers that can be used in outlet</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if data.length === 0}
			<Alert.Root>
				<TriangleAlertIcon class="size-4" />
				<Alert.Title>No printers available</Alert.Title>
				<Alert.Description>Could not find any available printers for outlet</Alert.Description>
			</Alert.Root>
		{:else}
			<div class="flex flex-col gap-4">
				{#each data as printer}
					<Printer {printer} refetch={$query.refetch} />
				{/each}
			</div>
		{/if}
	</Card.Content>
</Card.Root>
