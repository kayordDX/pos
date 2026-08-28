<script lang="ts">
	import { Button, Card, Dialog, ProgressLoading } from "@kayord/ui";
	import { createPrinterScanResults, createPrinterScan, type DTOPrinterDTO } from "$lib/api";
	import { RadarIcon } from "@lucide/svelte";

	interface Props {
		open: boolean;
		printer: DTOPrinterDTO;
	}
	let { open = $bindable(), printer }: Props = $props();

	const scanResults = createPrinterScanResults(
		() => ({ deviceId: printer.deviceId, outletId: printer.outletId }),
		() => ({ query: { refetchInterval: 6000 } })
	);
	const printerScanMutation = createPrinterScan();

	const scan = async () => {
		await printerScanMutation.mutateAsync({ data: { printerId: printer.id } });
		scanResults.refetch();
	};
	const results = $derived(scanResults.data);
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<Dialog.Header>
			<Dialog.Title>Scan printers</Dialog.Title>
			<Dialog.Description>Run nmap for existing IP range</Dialog.Description>
		</Dialog.Header>
		<div class="m-4 flex flex-col gap-4">
			{#if results?.status}
				<Card.Root>
					<Card.Header>
						<Card.Title>Scanning in Progress</Card.Title>
						<Card.Description class="mb-2">
							This process may take several minutes to complete
						</Card.Description>
						<Card.Description class="whitespace-pre-wrap">{results?.status}</Card.Description>
						<ProgressLoading class="h-1" />
					</Card.Header>
				</Card.Root>
			{:else}
				<Button onclick={scan}><RadarIcon /> Scan</Button>
			{/if}
			{#if results?.output}
				<Card.Root class={`${results?.status ? " border-muted" : "border-primary"}`}>
					<Card.Header>
						<Card.Title>Last Output</Card.Title>
						<Card.Description class="whitespace-pre-wrap">
							{results.output}
						</Card.Description>
					</Card.Header>
				</Card.Root>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
