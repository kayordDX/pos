<script lang="ts">
	import type { PrinterPrinterStatus } from "$lib/api";
	import { stringToFDate } from "$lib/util";
	import { Badge, Button, Card, Switch, Table } from "@kayord/ui";
	import { PrinterIcon } from "lucide-svelte";

	interface Props {
		printer: PrinterPrinterStatus;
	}
	let { printer }: Props = $props();
	let showDetail = $state(false);

	const boolToText = (bool?: boolean | null) => {
		if (bool == undefined || bool == null) return "";
		return bool ? "Yes" : "No";
	};
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-start bg-muted/50 p-4">
		<div class="grid gap-0.5 w-full">
			<Card.Title>{printer.printerConfig.name}</Card.Title>
			<Card.Description>
				<Badge>Last Updated: {stringToFDate(printer.dateUpdated)}</Badge>
			</Card.Description>
		</div>
		<div><Switch bind:checked={showDetail} /></div>
	</Card.Header>
	<Card.Content>
		<div class="rounded-md border mt-4">
			<Table.Root>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Online</Table.Cell>
						<Table.Cell class="text-right">
							{boolToText(printer.printerStatusEventArgs?.isPrinterOnline)}
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Errors</Table.Cell>
						<Table.Cell class="text-right">
							{boolToText(printer.printerStatusEventArgs?.isInErrorState)}
						</Table.Cell>
					</Table.Row>
					{#if showDetail}
						<Table.Row>
							<Table.Cell>Printer Id</Table.Cell>
							<Table.Cell class="text-right">{printer.printerConfig.printerId}</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell>Cover Open</Table.Cell>
							<Table.Cell class="text-right">
								{boolToText(printer.printerStatusEventArgs?.isCoverOpen)}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Paper Low</Table.Cell>
							<Table.Cell class="text-right">
								{boolToText(printer.printerStatusEventArgs?.isPaperLow)}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Paper Out</Table.Cell>
							<Table.Cell class="text-right">
								{boolToText(printer.printerStatusEventArgs?.isPaperOut)}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Paper Currently Feeding</Table.Cell>
							<Table.Cell class="text-right">
								{boolToText(printer.printerStatusEventArgs?.isPaperCurrentlyFeeding)}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Paper Feed Button Pushed</Table.Cell>
							<Table.Cell class="text-right">
								{boolToText(printer.printerStatusEventArgs?.isPaperFeedButtonPushed)}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Waiting For Online Recovery</Table.Cell>
							<Table.Cell class="text-right">
								{boolToText(printer.printerStatusEventArgs?.isWaitingForOnlineRecovery)}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Cash Drawer Open</Table.Cell>
							<Table.Cell class="text-right">
								{boolToText(printer.printerStatusEventArgs?.isCashDrawerOpen)}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Did Recoverable Error Occur</Table.Cell>
							<Table.Cell class="text-right">
								{boolToText(printer.printerStatusEventArgs?.didRecoverableErrorOccur)}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Did Unrecoverable Error Occur</Table.Cell>
							<Table.Cell class="text-right">
								{boolToText(printer.printerStatusEventArgs?.didUnrecoverableErrorOccur)}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Did Auto Cutter Error Occur</Table.Cell>
							<Table.Cell class="text-right">
								{boolToText(printer.printerStatusEventArgs?.didAutocutterErrorOccur)}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Did Recoverable Non Auto Cutter Error Occur</Table.Cell>
							<Table.Cell class="text-right">
								{boolToText(printer.printerStatusEventArgs?.didRecoverableNonAutocutterErrorOccur)}
							</Table.Cell>
						</Table.Row>
					{/if}
				</Table.Body>
			</Table.Root>
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">
			<PrinterIcon class="size-4 mr-2" />
			Print
		</Button>
	</Card.Footer>
</Card.Root>
