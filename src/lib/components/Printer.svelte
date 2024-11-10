<script lang="ts">
	import type { DTOPrinterDTO } from "$lib/api";
	import { createBillPrintBill, createPrinterTest } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Card, Switch, Table, toast, Avatar, DropdownMenu } from "@kayord/ui";
	import {
		PrinterIcon,
		CheckIcon,
		XIcon,
		EllipsisVerticalIcon,
		PencilIcon,
		TestTubeIcon,
		Trash,
	} from "lucide-svelte";
	import AddPrinter from "../../routes/(pages)/manager/admin/printers/AddPrinter.svelte";
	import DeletePrinter from "../../routes/(pages)/manager/admin/printers/DeletePrinter.svelte";
	import { page } from "$app/stores";

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

	const testPrinter = async () => {
		try {
			await $testMutation.mutateAsync({
				data: { printerId: printer.id },
			});
			toast.info("Printing Test");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const printBill = async () => {
		try {
			await $mutation.mutateAsync({
				data: { tableBookingId: Number($page.params.id), printerId: printer.id },
			});
			toast.info("Printing Bill");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	let open = $state(false);
	let deleteOpen = $state(false);
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-start bg-muted/50 p-4">
		<div class="flex items-center justify-between w-full">
			<div class="flex items-center gap-2">
				<Avatar.Root>
					<Avatar.Fallback>
						{#if printer.isEnabled}
							<CheckIcon class="text-primary" />
						{:else}
							<XIcon class="text-muted-foreground" />
						{/if}
					</Avatar.Fallback>
				</Avatar.Root>
				<Card.Title>{printer.printerName}</Card.Title>
			</div>
		</div>
		<div class="flex flex-row gap-2 items-center">
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
				<AddPrinter {refetch} bind:open {printer} />
				<DeletePrinter {refetch} bind:deleteOpen printerId={printer.id} />
			{/if}
		</div>
	</Card.Header>
	{#if showDetail}
		<Card.Content class="p-4 pt-0">
			<div class="rounded-md mt-4 border">
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
			<Button class="w-full mt-4" onclick={printBill}>
				<PrinterIcon class="size-4 mr-2" />
				Print
			</Button>
		</Card.Footer>
	{/if}
</Card.Root>
