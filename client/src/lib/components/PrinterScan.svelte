<script lang="ts">
	import { Button, Card, Dialog, Input, ProgressLoading } from "@kayord/ui";
	import { createPrinterScanResults, createPrinterEdit, type DTOPrinterDTO } from "$lib/api";
	import { PlugIcon } from "@lucide/svelte";
	import { toast } from "@kayord/ui/sonner";
	import { getError } from "$lib/types";

	interface Props {
		open: boolean;
		printer: DTOPrinterDTO;
	}
	let { open = $bindable(), printer }: Props = $props();

	const scanResults = createPrinterScanResults(
		() => ({ deviceId: printer.deviceId, outletId: printer.outletId }),
		() => ({ query: { refetchInterval: 6000 } })
	);
	const printerEditMutation = createPrinterEdit();

	const results = $derived(scanResults.data);

	// Parse IP addresses from scan output
	const discoveredIps = $derived(() => {
		const output = results?.output;
		if (!output) return [];
		const matches = output.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g);
		return matches ? [...new Set(matches)] : [];
	});

	let selectedIp = $state("");

	const connect = async () => {
		if (!selectedIp) return;
		try {
			await printerEditMutation.mutateAsync({
				data: {
					id: printer.id,
					printerName: printer.printerName,
					ipAddress: selectedIp,
					port: printer.port,
					lineCharacters: printer.lineCharacters,
					isEnabled: printer.isEnabled,
					deviceId: printer.deviceId,
				},
			});
			toast.success(`Printer IP updated to ${selectedIp}`);
			open = false;
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<Dialog.Header>
			<Dialog.Title>Scan printers</Dialog.Title>
			<Dialog.Description>Scan results from the printer service</Dialog.Description>
		</Dialog.Header>
		<div class="m-4 flex flex-col gap-4">
			{#if results?.status}
				<Card.Root>
					<Card.Header>
						<Card.Title>Scanning in Progress</Card.Title>
						<Card.Description class="mb-2">This process may take several minutes to complete</Card.Description>
						<Card.Description class="whitespace-pre-wrap">{results?.status}</Card.Description>
						<ProgressLoading class="h-1" />
					</Card.Header>
				</Card.Root>
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
			{#if discoveredIps().length > 0}
				<Card.Root>
					<Card.Header>
						<Card.Title>Discovered IPs</Card.Title>
						<Card.Description>Select an IP to connect or enter one manually below</Card.Description>
					</Card.Header>
					<Card.Content class="flex flex-wrap gap-2 pb-4">
						{#each discoveredIps() as ip}
							<Button variant="outline" size="sm" onclick={() => (selectedIp = ip)}>{ip}</Button>
						{/each}
					</Card.Content>
				</Card.Root>
			{/if}
			<div class="flex gap-2">
				<Input placeholder="Enter IP address" bind:value={selectedIp} />
				<Button onclick={connect} disabled={!selectedIp}>
					<PlugIcon />Connect
				</Button>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
