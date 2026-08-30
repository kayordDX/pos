<script lang="ts">
	import { Alert, Badge, Button, Card, DropdownMenu } from "@kayord/ui";
	import { EllipsisVerticalIcon, InfoIcon, PlusIcon, RadarIcon, RefreshCwIcon, Trash } from "@lucide/svelte";
	import { createPrintServiceKeyList, type DTOPrintServiceKeyDTO } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
	import AddPrintKey from "./AddPrintKey.svelte";
	import RevokePrintKey from "./RevokePrintKey.svelte";
	import ScanPrinters from "./ScanPrinters.svelte";
	import DeviceInfo from "./DeviceInfo.svelte";
	import AddPrinter from "../printers/AddPrinter.svelte";

	const query = createPrintServiceKeyList();

	let open = $state(false);
	let revokeOpenId = $state<number | null>(null);

	const refetch = async () => {
		await query.refetch();
	};

	const formatDate = (value?: string | Date | null) => {
		if (!value) {
			return "Never";
		}

		return new Date(value).toLocaleString();
	};

	const items = $derived((query.data ?? []) as DTOPrintServiceKeyDTO[]);

	let scanOpen = $state(false);
	let scanDeviceId = $state<number | null>(null);
	let scanDeviceName = $state("");

	const openScan = (item: DTOPrintServiceKeyDTO) => {
		scanDeviceId = item.deviceId;
		scanDeviceName = item.name;
		scanOpen = true;
	};

	let deviceInfoOpen = $state(false);
	let deviceInfoDeviceId = $state<number | null>(null);
	let deviceInfoName = $state("");

	const openDeviceInfo = (item: DTOPrintServiceKeyDTO) => {
		deviceInfoDeviceId = item.deviceId;
		deviceInfoName = item.name;
		deviceInfoOpen = true;
	};

	let addPrinterOpen = $state(false);
	let prefillIpAddress = $state("");
	let prefillPort = $state(9100);

	// The user picked a discovered host in the scan dialog: prefill the
	// add-printer form (IP, port and the device that did the scan). The
	// last scan results stay in the query cache, so reopening the dialog
	// shows them again without rescanning.
	const handleAddPrinter = (host: { ipAddress: string; port: number }) => {
		prefillIpAddress = host.ipAddress;
		prefillPort = host.port;
		scanOpen = false;
		addPrinterOpen = true;
	};
</script>

<Card.Root class="m-2">
	<Card.Header class="flex flex-row items-center justify-between">
		<div class="flex flex-col gap-1">
			<Card.Title>Print devices / keys</Card.Title>
			<Card.Description>Manage printer service API keys for this outlet</Card.Description>
		</div>
		<div>
			<Button variant="outline" disabled={query.isPending} onclick={refetch}>
				Refresh <RefreshCwIcon />
			</Button>
		</div>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col gap-4">
			{#if items.length === 0}
				<Alert.Root>
					<TriangleAlertIcon class="size-4" />
					<Alert.Title>No print keys</Alert.Title>
					<Alert.Description>Create a key for {status.value.outletName} to connect a print device.</Alert.Description>
				</Alert.Root>
			{:else}
				<div class="grid gap-3">
					{#each items as item (item.id)}
						<div class="border-border bg-card flex flex-col gap-3 rounded-lg border p-4">
							<div class="flex flex-wrap items-start justify-between gap-3">
								<div class="flex flex-col gap-1">
									<div class="font-medium">{item.name}</div>
									<div class="text-muted-foreground font-mono text-sm">{item.maskedKey}</div>
								</div>
								<div class="flex items-center gap-2">
									<Badge>{formatDate(item.lastSeenAt)}</Badge>
									<DropdownMenu.Root>
										<DropdownMenu.Trigger>
											<Button size="icon" variant="secondary" class="h-8"><EllipsisVerticalIcon /></Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content>
											<DropdownMenu.Item onclick={() => openScan(item)}>
												<RadarIcon class="mr-2 h-4 w-4" />Scan
											</DropdownMenu.Item>
											<DropdownMenu.Item onclick={() => openDeviceInfo(item)}>
												<InfoIcon class="mr-2 h-4 w-4" />Device info
											</DropdownMenu.Item>
											<DropdownMenu.Item onclick={() => (revokeOpenId = item.id)}>
												<Trash class="mr-2 h-4 w-4" />
												Revoke
											</DropdownMenu.Item>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</div>
							</div>
							<div class="text-muted-foreground grid gap-1 text-sm">
								<div>Device ID: {item.deviceId}</div>
								<div>Created: {formatDate(item.created)}</div>
								<div>Last seen: {formatDate(item.lastSeenAt)}</div>
							</div>
						</div>
						<RevokePrintKey id={item.id} name={item.name} open={revokeOpenId === item.id} onClose={() => (revokeOpenId = null)} {refetch} />
					{/each}
				</div>
			{/if}
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full" onclick={() => (open = true)}>
			<PlusIcon class="mr-2 size-4" />Add Print Service Key
		</Button>
	</Card.Footer>
</Card.Root>

<AddPrintKey bind:open {refetch} />

{#if scanDeviceId != null}
	<ScanPrinters bind:open={scanOpen} deviceId={scanDeviceId} deviceName={scanDeviceName} onAddPrinter={handleAddPrinter} />
{/if}

{#if deviceInfoDeviceId != null}
	<DeviceInfo bind:open={deviceInfoOpen} deviceId={deviceInfoDeviceId} deviceName={deviceInfoName} />
{/if}

<AddPrinter {refetch} bind:open={addPrinterOpen} defaultIpAddress={prefillIpAddress} defaultPort={prefillPort} defaultDeviceId={scanDeviceId ?? undefined} />
