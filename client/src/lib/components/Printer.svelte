<script lang="ts">
	import type { DTOPrinterDTO } from "$lib/api";
	import { createBillPrintBill, createPrinterProbe, createPrinterTest } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Card, Switch, Table, Avatar, DropdownMenu, Tooltip } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import {
		PrinterIcon,
		EllipsisVerticalIcon,
		PencilIcon,
		TestTubeIcon,
		Trash,
		CloudUploadIcon,
		CloudOffIcon,
		ActivityIcon,
		LoaderCircleIcon,
	} from "@lucide/svelte";
	import AddPrinter from "../../routes/(pages)/manager/admin/printers/AddPrinter.svelte";
	import DeletePrinter from "../../routes/(pages)/manager/admin/printers/DeletePrinter.svelte";
	import { page } from "$app/state";

	interface Props {
		printer: DTOPrinterDTO;
		canPrint: boolean;
		refetch: () => void;
		isAdmin?: boolean;
	}
	let { printer, canPrint, refetch, isAdmin = false }: Props = $props();
	let showDetail = $state(false);

	const mutation = createBillPrintBill();
	const testMutation = createPrinterTest();
	const probeMutation = createPrinterProbe();
	const printerReachableLabel = $derived(printer.printerReachable == null ? "Unknown" : printer.printerReachable ? "Reachable" : "Unreachable");
	const printerReachableClass = $derived(
		printer.printerReachable == null
			? "bg-muted text-muted-foreground"
			: printer.printerReachable
				? "bg-primary/10 text-primary"
				: "bg-destructive/10 text-destructive"
	);
	const deviceOnlineClass = $derived(printer.deviceOnline ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground");

	const testPrinter = async () => {
		try {
			await testMutation.mutateAsync({
				data: { printerId: printer.id },
			});
			toast.info("Printing Test");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const checkPrinter = async () => {
		try {
			const ok = await probeMutation.mutateAsync({
				data: { printerId: printer.id },
			});
			// The badge updates when the device reports back via PrinterStatusChanged.
			if (ok) {
				toast.info("Checking printer connection");
			} else {
				toast.warning("No print device online to check this printer");
			}
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const printBill = async () => {
		try {
			await mutation.mutateAsync({
				data: { tableBookingId: Number(page.params.id), printerId: printer.id },
			});
			toast.info("Printing Bill");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	let open = $state(false);
	let deleteOpen = $state(false);
</script>

<Card.Root class={`border-l-8 p-0 ${printer.isEnabled ? "border-l-primary" : "border-l-destructive"}`}>
	<Card.Header class="flex flex-row items-start p-4">
		<div class="flex w-full items-center justify-between">
			<div class="flex items-center gap-2">
				<Avatar.Root>
					<Avatar.Fallback>
						{#if printer.isConnected}
							<Tooltip.Provider>
								<Tooltip.Root>
									<Tooltip.Trigger><CloudUploadIcon class="text-primary" /></Tooltip.Trigger>
									<Tooltip.Content>
										<p>Printer is connected</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</Tooltip.Provider>
						{:else}
							<Tooltip.Provider>
								<Tooltip.Root>
									<Tooltip.Trigger><CloudOffIcon class="text-destructive" /></Tooltip.Trigger>
									<Tooltip.Content>
										<p>Printer currently not connected</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</Tooltip.Provider>
						{/if}
					</Avatar.Fallback>
				</Avatar.Root>
				<Card.Title>{printer.printerName}</Card.Title>
				<div class="flex flex-col gap-2">
					<div class="flex flex-wrap gap-2 text-xs">
						<span class={`rounded-full px-2 py-1 font-medium ${deviceOnlineClass}`}>
							Device {printer.deviceOnline ? "online" : "offline"}
						</span>
						<span class={`rounded-full px-2 py-1 font-medium ${printerReachableClass}`}>
							Printer {printerReachableLabel}
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-row items-center gap-2">
			{#if isAdmin}
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button {...props} size="icon" variant="secondary" class="h-8" onclick={checkPrinter} disabled={probeMutation.isPending}>
									{#if probeMutation.isPending}
										<LoaderCircleIcon class="animate-spin" />
									{:else}
										<ActivityIcon />
									{/if}
								</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Check connection now</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			{/if}
			<Switch bind:checked={showDetail} />
			{#if isAdmin}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button size="icon" variant="secondary" class="h-8"><EllipsisVerticalIcon /></Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item onclick={() => (open = true)}>
							<PencilIcon class="mr-2 h-4 w-4" />Edit
						</DropdownMenu.Item>
						<DropdownMenu.Item onclick={testPrinter}>
							<TestTubeIcon class="mr-2 h-4 w-4" />Test
						</DropdownMenu.Item>
						<DropdownMenu.Item onclick={() => (deleteOpen = true)}>
							<Trash class="mr-2 h-4 w-4" />
							Delete
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				{#if open}
					<AddPrinter {refetch} bind:open {printer} />
				{/if}
				{#if deleteOpen}
					<DeletePrinter {refetch} bind:deleteOpen printerId={printer.id} />
				{/if}
			{/if}
		</div>
	</Card.Header>
	{#if showDetail}
		<Card.Content class="p-4 pt-0">
			<div class="mt-4 rounded-md border">
				<Table.Root>
					<Table.Body>
						<Table.Row>
							<Table.Cell>IP Address</Table.Cell>
							<Table.Cell class="text-right">
								{printer.ipAddress}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Port</Table.Cell>
							<Table.Cell class="text-right">
								{printer.port}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Lines Characters</Table.Cell>
							<Table.Cell class="text-right">
								{printer.lineCharacters}
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</div>
		</Card.Content>
	{/if}
	{#if canPrint}
		<Card.Footer>
			<Button class="mt-4 w-full" onclick={printBill}>
				<PrinterIcon class="mr-2 size-4" />
				Print
			</Button>
		</Card.Footer>
	{/if}
</Card.Root>
