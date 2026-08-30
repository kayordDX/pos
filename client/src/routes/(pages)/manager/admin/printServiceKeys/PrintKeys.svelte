<script lang="ts">
	import { createPrintServiceKeyList, type DTOPrintServiceKeyDTO } from "$lib/api";
	import { Alert, Button } from "@kayord/ui";
	import { status } from "$lib/stores/status.svelte";
	import { PlusIcon } from "@lucide/svelte";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
	import AddPrintKey from "./AddPrintKey.svelte";
	import RevokePrintKey from "./RevokePrintKey.svelte";

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
</script>

<div class="flex flex-col gap-4">
	<div class="flex justify-end">
		<Button onclick={() => (open = true)}>
			<PlusIcon class="mr-2 size-4" />Add key
		</Button>
	</div>

	{#if items.length === 0}
		<Alert.Root>
			<TriangleAlertIcon class="size-4" />
			<Alert.Title>No print keys</Alert.Title>
			<Alert.Description>Create a key for outlet {status.value.outletId} to connect a print device.</Alert.Description>
		</Alert.Root>
	{:else}
		<div class="grid gap-3">
			{#each items as item (item.id)}
				<div class="border-border bg-card flex flex-col gap-3 rounded-lg border p-4">
					<div class="flex flex-wrap items-start justify-between gap-3">
						<div class="flex flex-col gap-1">
							<div class="font-medium">{item.name}</div>
							<div class="text-muted-foreground text-sm font-mono">{item.maskedKey}</div>
						</div>
						<div class="flex items-center gap-2">
							{#if item.revokedAt}
								<span class="bg-destructive/10 text-destructive rounded-full px-2 py-1 text-xs font-medium">Revoked</span>
							{:else}
								<span class="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">Active</span>
							{/if}
							{#if !item.revokedAt}
								<Button variant="outline" size="sm" onclick={() => (revokeOpenId = item.id)}>Revoke</Button>
							{/if}
						</div>
					</div>
					<div class="text-muted-foreground grid gap-1 text-sm">
						<div>Device ID: {item.deviceId}</div>
						<div>Created: {formatDate(item.created)}</div>
						<div>Last seen: {formatDate(item.lastSeenAt)}</div>
					</div>
				</div>
				<RevokePrintKey
					id={item.id}
					name={item.name}
					open={revokeOpenId === item.id}
					onClose={() => (revokeOpenId = null)}
					{refetch}
				/>
			{/each}
		</div>
	{/if}
</div>

<AddPrintKey bind:open {refetch} />
