<script lang="ts">
	import { createPrinterList } from "$lib/api";
	import { Alert, Card } from "@kayord/ui";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
	import { status } from "$lib/stores/status.svelte";
	import Printer from "$lib/components/Printer.svelte";
	const query = createPrinterList(status.value.outletId);

	const enabledPrinters = $derived((query.data ?? []).filter((x) => x.isEnabled == true));
</script>

<Card.Root class="m-4">
	<Card.Header>
		<Card.Title>Available Printers</Card.Title>
		<Card.Description>Printers that can be used in outlet</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if query.data?.length === 0}
			<Alert.Root>
				<TriangleAlertIcon class="size-4" />
				<Alert.Title>No printers available</Alert.Title>
				<Alert.Description>Could not find any available printers for outlet</Alert.Description>
			</Alert.Root>
		{:else}
			<div class="flex flex-col gap-4">
				{#each enabledPrinters as printer}
					<Printer {printer} refetch={query.refetch} canPrint={true} />
				{/each}
			</div>
		{/if}
	</Card.Content>
</Card.Root>
