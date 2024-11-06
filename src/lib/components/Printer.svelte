<script lang="ts">
	import type { DTOPrinterDTO } from "$lib/api";
	import { createBillPrintBill } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Card, Switch, Table, toast, Avatar } from "@kayord/ui";
	import { PrinterIcon, CheckIcon, XIcon } from "lucide-svelte";

	interface Props {
		printer: DTOPrinterDTO;
		canPrint: boolean;
		refetch: () => void;
	}
	let { printer, canPrint, refetch }: Props = $props();
	let showDetail = $state(false);

	const boolToText = (bool?: boolean | null) => {
		if (bool == undefined || bool == null) return "";
		return bool ? "Yes" : "No";
	};

	const mutation = createBillPrintBill();

	const printBill = async () => {
		try {
			// TODO: Fix print bill.
			// await $mutation.mutateAsync({
			// 	data: {
			// 		outletId: printer.outletId,
			// 		printerId: printer.printerId,
			// 		tableBookingId: Number($page.params.id),
			// 		lineCharacters: printer.lineCharacters,
			// 	},
			// });
			toast.info("Printing Bill");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-start bg-muted/50 p-4">
		<div class="grid gap-0.5 w-full">
			<div class="flex items-center gap-2">
				<Avatar.Root>
					<Avatar.Fallback>
						{#if printer.isEnabled}
							<CheckIcon />
						{:else}
							<XIcon />
						{/if}
					</Avatar.Fallback>
				</Avatar.Root>
				<Card.Title>{printer.printerName}</Card.Title>
			</div>
		</div>
		<div><Switch bind:checked={showDetail} /></div>
	</Card.Header>
	{#if showDetail}
		<Card.Content>
			<div class="rounded-md mt-4">
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
			<Button class="w-full" onclick={printBill}>
				<PrinterIcon class="size-4 mr-2" />
				Print
			</Button>
		</Card.Footer>
	{/if}
</Card.Root>
