<script lang="ts">
	import { createPrinterList, type DTOPrinterDTO } from "$lib/api";
	import { Alert, Card, Button } from "@kayord/ui";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
	import { status } from "$lib/stores/status.svelte";
	import Printer from "$lib/components/Printer.svelte";
	import AddPrinter from "./AddPrinter.svelte";
	import { PlusIcon, RefreshCwIcon } from "@lucide/svelte";
	import { hub } from "$lib/stores/hub.svelte";
	import { HubConnectionState } from "@microsoft/signalr";
	const query = createPrinterList(() => status.value.outletId);

	let open = $state(false);
	let printers = $state.raw<DTOPrinterDTO[]>([]);

	type PrinterStatusChanged = {
		outletId: number;
		printerId: number;
		reachable?: boolean | null;
		online: boolean;
	};

	const refetchPrinters = async () => {
		await query.refetch();
		printers = [...(query.data ?? [])];
	};

	const handlePrinterStatusChanged = (event: PrinterStatusChanged) => {
		if (event.outletId !== status.value.outletId) {
			return;
		}

		printers = printers.map((printer) =>
			printer.id === event.printerId
				? {
						...printer,
						deviceOnline: event.online,
						printerReachable: event.reachable ?? printer.printerReachable,
					}
				: printer
		);
	};

	$effect(() => {
		printers = [...(query.data ?? [])];
	});

	$effect(() => {
		if (hub.state === HubConnectionState.Connected) {
			hub.on("PrinterStatusChanged", handlePrinterStatusChanged);
			return () => {
				hub.off("PrinterStatusChanged", handlePrinterStatusChanged);
			};
		}
	});
</script>

<Card.Root class="m-2">
	<Card.Header class="flex flex-row items-center justify-between">
		<div class="flex flex-col gap-1">
			<Card.Title>Outlet Printers</Card.Title>
			<Card.Description>Printers that can be used in outlet</Card.Description>
		</div>
		<div>
			<Button variant="outline" disabled={query.isPending} onclick={refetchPrinters}>
				Refresh <RefreshCwIcon />
			</Button>
		</div>
	</Card.Header>
	<Card.Content>
		{#if !query.isPending && printers.length === 0}
			<Alert.Root>
				<TriangleAlertIcon class="size-4" />
				<Alert.Title>No printers available</Alert.Title>
				<Alert.Description>Could not find any available printers for outlet</Alert.Description>
			</Alert.Root>
		{:else}
			<div class="flex flex-col gap-4">
				{#each printers as printer (printer.id)}
					<Printer {printer} refetch={refetchPrinters} canPrint={false} isAdmin={true} />
				{/each}
			</div>
		{/if}
	</Card.Content>
	<Card.Footer>
		<Button class="w-full" onclick={() => (open = true)}>
			<PlusIcon class="mr-2 size-4" />Add Printer
		</Button>
	</Card.Footer>
</Card.Root>

<AddPrinter refetch={refetchPrinters} bind:open />
