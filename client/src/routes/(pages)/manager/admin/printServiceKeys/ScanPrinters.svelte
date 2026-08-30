<script lang="ts">
	import { Alert, Badge, Button, Card, Dialog, Input, ProgressLoading, Table } from "@kayord/ui";
	import { createPrinterScan, createPrinterScanResults } from "$lib/api";
	import { RadarIcon, PlusIcon } from "@lucide/svelte";
	import { toast } from "@kayord/ui/sonner";
	import { getError } from "$lib/types";
	import { status } from "$lib/stores/status.svelte";

	interface Props {
		open: boolean;
		deviceId: number;
		deviceName?: string;
		/** Called when the user picks a discovered host to add as a printer. */
		onAddPrinter?: (_host: { ipAddress: string; port: number }) => void;
	}
	let { open = $bindable(), deviceId, deviceName, onAddPrinter }: Props = $props();

	let ipPattern = $state("");
	let port = $state("9100");

	const scanResults = createPrinterScanResults(
		() => ({ deviceId, outletId: status.value.outletId }),
		() => ({ query: { enabled: () => open, refetchInterval: 6000 } })
	);
	const scanMutation = createPrinterScan();

	const scanning = $derived(scanResults.data?.status != null);
	const output = $derived(scanResults.data?.output);

	type ScanHit = { ipAddress: string; port: number; latency: string };

	// The device reports a plain text summary; turn "192.168.1.50:9100 open (12ms)"
	// lines into a list of hosts we can act on.
	const hits = $derived.by(() => {
		if (!output) return [];
		return [...output.matchAll(/^\s*(\d{1,3}(?:\.\d{1,3}){3}):(\d+)\s+open\s+\((.+)\)\s*$/gm)].map((match) => ({
			ipAddress: match[1] ?? "",
			port: Number(match[2] ?? 0),
			latency: match[3] ?? "",
		}));
	});

	const scan = async () => {
		if (!ipPattern.trim()) {
			toast.error("Enter an IP address or subnet to scan");
			return;
		}
		try {
			const started = await scanMutation.mutateAsync({
				data: { deviceId, ipAddress: ipPattern.trim(), port: Number(port) || 9100 },
			});
			if (!started) {
				toast.error("No print device available to run this scan");
				return;
			}
			await scanResults.refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const addPrinter = (hit: ScanHit) => {
		onAddPrinter?.(hit);
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto md:min-w-xl">
		<Dialog.Header>
			<Dialog.Title>Scan for printers</Dialog.Title>
			<Dialog.Description>
				Send a subnet scan to print device {deviceName ? `"${deviceName}"` : `#${deviceId}`}. Results are reported back once the scan completes.
			</Dialog.Description>
		</Dialog.Header>
		<div class="m-4 flex flex-col gap-4">
			<Card.Root>
				<Card.Header>
					<Card.Title>Scan target</Card.Title>
					<Card.Description>A single IP, a wildcard like 192.168.1.*, a range like 192.168.1.10-200 or CIDR like 192.168.1.0/24</Card.Description>
				</Card.Header>
				<Card.Content class="flex flex-col gap-4">
					<div class="flex flex-col gap-2">
						<Input placeholder="IP address or subnet. Example 192.168.1.*" bind:value={ipPattern} />
						<div class="flex items-center gap-2">
							<Input class="w-32" type="number" bind:value={port} />
							<span class="text-muted-foreground text-sm">Port (optional, default 9100)</span>
						</div>
					</div>
					<Button onclick={scan} disabled={scanning || scanMutation.isPending}>
						<RadarIcon />
						{scanning ? "Scanning..." : "Scan"}
					</Button>
				</Card.Content>
			</Card.Root>

			{#if scanning}
				<Card.Root>
					<Card.Header>
						<Card.Title>Scanning in progress</Card.Title>
						<Card.Description class="mb-2">This process may take several minutes to complete</Card.Description>
						<Card.Description class="whitespace-pre-wrap">{scanResults.data?.status}</Card.Description>
						<ProgressLoading class="h-1" />
					</Card.Header>
				</Card.Root>
			{/if}

			{#if !scanning && output && hits.length === 0}
				<Alert.Root>
					<RadarIcon class="size-4" />
					<Alert.Title>No printers found</Alert.Title>
					<Alert.Description>No hosts with an open port were found on the last scan</Alert.Description>
				</Alert.Root>
			{/if}

			{#if hits.length > 0}
				<Card.Root class="border-primary">
					<Card.Header>
						<Card.Title>Found {hits.length} host{hits.length > 1 ? "s" : ""}</Card.Title>
						<Card.Description>Add a printer using one of the discovered addresses</Card.Description>
					</Card.Header>
					<Card.Content class="pb-4">
						<div class="rounded-md border">
							<Table.Root>
								<Table.Header>
									<Table.Row>
										<Table.Head>IP Address</Table.Head>
										<Table.Head>Port</Table.Head>
										<Table.Head>Latency</Table.Head>
										<Table.Head class="text-right">Action</Table.Head>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{#each hits as hit (hit.ipAddress)}
										<Table.Row>
											<Table.Cell class="font-mono">{hit.ipAddress}</Table.Cell>
											<Table.Cell>{hit.port}</Table.Cell>
											<Table.Cell><Badge variant="secondary">{hit.latency}</Badge></Table.Cell>
											<Table.Cell class="text-right">
												<Button size="sm" onclick={() => addPrinter(hit)}>
													<PlusIcon class="size-4" />Add Printer
												</Button>
											</Table.Cell>
										</Table.Row>
									{/each}
								</Table.Body>
							</Table.Root>
						</div>
					</Card.Content>
				</Card.Root>
			{/if}

			{#if output}
				<Card.Root>
					<Card.Header>
						<Card.Title>Raw output</Card.Title>
					</Card.Header>
					<Card.Content>
						<pre class="text-muted-foreground bg-muted/50 max-h-48 overflow-auto rounded-md p-3 font-mono text-xs whitespace-pre-wrap">{output}</pre>
					</Card.Content>
				</Card.Root>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
