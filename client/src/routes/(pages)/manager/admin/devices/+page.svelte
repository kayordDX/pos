<script lang="ts">
	import { Alert, Badge, Button, Card, DropdownMenu } from "@kayord/ui";
	import {
		EllipsisVerticalIcon,
		InfoIcon,
		KeyRoundIcon,
		PlusIcon,
		RadarIcon,
		RefreshCwIcon,
		RotateCcwIcon,
		Trash,
		WifiIcon,
		WifiOffIcon,
	} from "@lucide/svelte";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
	import { createDeviceList, type DTODeviceDTO } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import AddDevice from "./AddDevice.svelte";
	import RotateKey from "./RotateKey.svelte";
	import RevokeKey from "./RevokeKey.svelte";
	import DeleteDevice from "./DeleteDevice.svelte";
	import ScanPrinters from "./ScanPrinters.svelte";
	import DeviceInfo from "./DeviceInfo.svelte";
	import AddPrinter from "../printers/AddPrinter.svelte";

	const query = createDeviceList(() => ({ query: { refetchInterval: 15000 } }));
	const items = $derived((query.data ?? []) as DTODeviceDTO[]);

	const refetch = async () => {
		await query.refetch();
	};

	const formatDate = (value?: string | Date | null) => {
		if (!value) {
			return "Never";
		}

		return new Date(value).toLocaleString();
	};

	let addOpen = $state(false);

	let rotateOpen = $state(false);
	let rotateDevice = $state<DTODeviceDTO | null>(null);

	let revokeOpenId = $state<number | null>(null);

	let deleteOpenId = $state<number | null>(null);

	let scanOpen = $state(false);
	let scanDevice = $state<DTODeviceDTO | null>(null);

	let infoOpen = $state(false);
	let infoDevice = $state<DTODeviceDTO | null>(null);

	let addPrinterOpen = $state(false);
	let prefillIpAddress = $state("");
	let prefillPort = $state(9100);
	let prefillDeviceId = $state<number | null>(null);

	// The user picked a discovered host in the scan dialog: prefill the
	// add-printer form (IP, port and the device that ran the scan).
	const handleAddPrinter = (host: { ipAddress: string; port: number; deviceId: number }) => {
		prefillIpAddress = host.ipAddress;
		prefillPort = host.port;
		prefillDeviceId = host.deviceId;
		scanOpen = false;
		scanDevice = null;
		addPrinterOpen = true;
	};

	const keyLabel = (item: DTODeviceDTO) => {
		if (!item.maskedKey) return "No key";
		return item.revokedAt ? "Key revoked" : "Key active";
	};

	const keyBadgeClass = (item: DTODeviceDTO) => {
		if (!item.maskedKey || item.revokedAt) return "bg-muted text-muted-foreground";
		return "bg-primary/10 text-primary";
	};

	const openRotate = (item: DTODeviceDTO) => {
		rotateDevice = item;
		rotateOpen = true;
	};
</script>

<Card.Root class="m-2">
	<Card.Header class="flex flex-row items-center justify-between">
		<div class="flex flex-col gap-1">
			<Card.Title>Print devices</Card.Title>
			<Card.Description>Devices running the print service for {status.value.outletName}</Card.Description>
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
					<Alert.Title>No print devices</Alert.Title>
					<Alert.Description>Create a device to connect a print service and assign printers to it.</Alert.Description>
				</Alert.Root>
			{:else}
				<div class="grid gap-3">
					{#each items as item (item.id)}
						<div class="border-border bg-card flex flex-col gap-3 rounded-lg border p-4">
							<div class="flex flex-wrap items-start justify-between gap-3">
								<div class="flex flex-col gap-1">
									<div class="font-medium">{item.name}</div>
									{#if item.maskedKey}
										<div class="text-muted-foreground bg-muted/60 rounded-md px-2.5 py-1.5 font-mono text-sm">{item.maskedKey}</div>
									{/if}
								</div>
								<div class="flex items-center gap-2">
									{#if item.isOnline}
										<Badge class="bg-primary/10 text-primary gap-1">
											<WifiIcon class="size-3.5" />Online
										</Badge>
									{:else}
										<Badge class="bg-muted text-muted-foreground gap-1">
											<WifiOffIcon class="size-3.5" />Offline
										</Badge>
									{/if}
									<Badge class={keyBadgeClass(item)}>{keyLabel(item)}</Badge>
									<DropdownMenu.Root>
										<DropdownMenu.Trigger>
											<Button size="icon" variant="secondary" class="h-8"><EllipsisVerticalIcon /></Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content class="w-40">
											<DropdownMenu.Item
												onclick={() => {
													scanDevice = item;
													scanOpen = true;
												}}
											>
												<RadarIcon class="mr-2 h-4 w-4" />Scan network
											</DropdownMenu.Item>
											<DropdownMenu.Item
												onclick={() => {
													infoDevice = item;
													infoOpen = true;
												}}
											>
												<InfoIcon class="mr-2 h-4 w-4" />Device info
											</DropdownMenu.Item>
											<DropdownMenu.Item onclick={() => openRotate(item)}>
												<KeyRoundIcon class="mr-2 h-4 w-4" />{item.maskedKey ? "Rotate key" : "Create key"}
											</DropdownMenu.Item>
											<DropdownMenu.Item disabled={!item.maskedKey || !!item.revokedAt} onclick={() => (revokeOpenId = item.id)}>
												<RotateCcwIcon class="mr-2 h-4 w-4" />
												Revoke key
											</DropdownMenu.Item>
											<DropdownMenu.Separator />
											<DropdownMenu.Item onclick={() => (deleteOpenId = item.id)} class="text-destructive">
												<Trash class="mr-2 h-4 w-4" />
												Delete
											</DropdownMenu.Item>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</div>
							</div>
							<div class="flex flex-wrap items-center gap-1 text-sm">
								<Badge variant="default">{item.printerCount} printer{item.printerCount === 1 ? "" : "s"}</Badge>
								<Badge variant="outline">Created {formatDate(item.created)}</Badge>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full" onclick={() => (addOpen = true)}>
			<PlusIcon class="mr-2 size-4" />Add Print Device
		</Button>
	</Card.Footer>
</Card.Root>

<AddDevice bind:open={addOpen} {refetch} />

{#if rotateDevice}
	<RotateKey bind:open={rotateOpen} deviceId={rotateDevice.id} deviceName={rotateDevice.name} {refetch} />
{/if}

{#each items as item (item.id)}
	{#if revokeOpenId === item.id}
		<RevokeKey deviceId={item.id} deviceName={item.name} open={revokeOpenId === item.id} {refetch} onClose={() => (revokeOpenId = null)} />
	{/if}
	{#if deleteOpenId === item.id}
		<DeleteDevice
			deviceId={item.id}
			deviceName={item.name}
			printerCount={item.printerCount}
			open={deleteOpenId === item.id}
			{refetch}
			onClose={() => (deleteOpenId = null)}
		/>
	{/if}
{/each}

{#if scanDevice}
	<ScanPrinters bind:open={scanOpen} deviceId={scanDevice.id} deviceName={scanDevice.name} onAddPrinter={handleAddPrinter} />
{/if}

{#if infoDevice}
	<DeviceInfo bind:open={infoOpen} deviceId={infoDevice.id} deviceName={infoDevice.name} />
{/if}

<AddPrinter {refetch} bind:open={addPrinterOpen} defaultIpAddress={prefillIpAddress} defaultPort={prefillPort} defaultDeviceId={prefillDeviceId ?? undefined} />
