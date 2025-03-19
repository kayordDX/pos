<script lang="ts">
	import { createPrinterList } from "$lib/api";
	import { Alert, Card, Button } from "@kayord/ui";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
	import { status } from "$lib/stores/status.svelte";
	import Printer from "$lib/components/Printer.svelte";
	import AddPrinter from "./printers/AddPrinter.svelte";
	import { PlusIcon, RefreshCwIcon } from "@lucide/svelte";
	const query = createPrinterList(status.value.outletId);

	let open = $state(false);
</script>

<Card.Root class="m-2">
	<Card.Header class="flex flex-row items-center justify-between">
		<div class="flex flex-col gap-1">
			<Card.Title>Outlet Printers</Card.Title>
			<Card.Description>Printers that can be used in outlet</Card.Description>
		</div>
		<div>
			<Button variant="outline" disabled={$query.isPending} onclick={() => $query.refetch()}>
				Refresh <RefreshCwIcon />
			</Button>
		</div>
	</Card.Header>
	<Card.Content>
		{#if $query.data?.length === 0}
			<Alert.Root>
				<TriangleAlertIcon class="size-4" />
				<Alert.Title>No printers available</Alert.Title>
				<Alert.Description>Could not find any available printers for outlet</Alert.Description>
			</Alert.Root>
		{:else}
			<div class="flex flex-col gap-4">
				{#each $query.data ?? [] as printer}
					<Printer {printer} refetch={$query.refetch} canPrint={false} isAdmin={true} />
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

<AddPrinter refetch={$query.refetch} bind:open />
