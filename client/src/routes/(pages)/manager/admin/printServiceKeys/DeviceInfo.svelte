<script lang="ts">
	import { Alert, Badge, Button, Card, Dialog, ProgressLoading, Table } from "@kayord/ui";
	import { createPrinterDeviceInfo, createPrinterDeviceInfoResults } from "$lib/api";
	import { InfoIcon, RefreshCwIcon } from "@lucide/svelte";
	import { toast } from "@kayord/ui/sonner";
	import { getError } from "$lib/types";
	import { untrack } from "svelte";
	import { status } from "$lib/stores/status.svelte";

	interface Props {
		open: boolean;
		deviceId: number;
		deviceName?: string;
	}
	let { open = $bindable(), deviceId, deviceName }: Props = $props();

	let timedOut = $state(false);

	const infoResults = createPrinterDeviceInfoResults(
		() => ({ deviceId, outletId: status.value.outletId }),
		() => ({ query: { enabled: () => open, refetchInterval: 2000 } })
	);
	const deviceInfoMutation = createPrinterDeviceInfo();

	const info = $derived(infoResults.data);
	const hasInfo = $derived(!!info && (!!info.hostname || !!info.platform || (info.interfaces?.length ?? 0) > 0));

	// The device reports over the hub, so keep asking until something shows up
	// before telling the user it did not respond.
	const requestInfo = async () => {
		timedOut = false;
		setTimeout(() => {
			if (!hasInfo) {
				timedOut = true;
			}
		}, 15000);
		try {
			// Mutation result state is reactive; the effect that calls this must not
			// track it, or every state change would fire a new request (infinite loop).
			const started = await untrack(() =>
				deviceInfoMutation.mutateAsync({
					data: { deviceId },
				})
			);
			console.log(started);
			if (!started) {
				toast.error("No print device available to report its info");
			}
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	// Ask the device for a fresh report whenever the dialog opens.
	$effect(() => {
		if (open) {
			void requestInfo();
		}
	});

	const summary = $derived.by(() => {
		if (!info) return [];
		return [
			{ label: "Hostname", value: info.hostname },
			{ label: "Platform", value: info.platform },
			{ label: "OS", value: info.osVersion },
			{ label: "App version", value: info.appVersion },
			{ label: "Go version", value: info.goVersion },
			{ label: "CPUs", value: info.numCpu > 0 ? String(info.numCpu) : "" },
			{ label: "Uptime", value: formatUptime(info.uptimeSeconds) },
		].filter((row) => row.value != null && row.value !== "");
	});

	const rawJson = $derived(info ? JSON.stringify(info, null, 2) : "");

	function formatUptime(seconds: number) {
		const days = Math.floor(seconds / 86400);
		const hours = Math.floor((seconds % 86400) / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		if (days > 0) return `${days}d ${hours}h`;
		if (hours > 0) return `${hours}h ${minutes}m`;
		if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
		return `${seconds}s`;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto md:min-w-xl">
		<Dialog.Header>
			<Dialog.Title>Device info</Dialog.Title>
			<Dialog.Description>
				Ask print device {deviceName ? `"${deviceName}"` : `#${deviceId}`} to report its machine details.
			</Dialog.Description>
		</Dialog.Header>
		<div class="m-4 flex flex-col gap-4">
			{#if hasInfo && info}
				<Card.Root class="border-primary">
					<Card.Header class="flex flex-row items-start justify-between">
						<div class="flex flex-col gap-1">
							<Card.Title>{info.hostname || `Device #${deviceId}`}</Card.Title>
							<Card.Description>{info.platform}</Card.Description>
						</div>
						<Button variant="outline" size="sm" onclick={requestInfo} disabled={deviceInfoMutation.isPending}>
							<RefreshCwIcon class="size-4" />
							Refresh
						</Button>
					</Card.Header>
					<Card.Content class="flex flex-col gap-4 pb-4">
						<div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
							{#each summary as row (row.label)}
								<div class="text-muted-foreground">{row.label}</div>
								<div class="wrap-break-word">{row.value}</div>
							{/each}
						</div>

						{#if info.interfaces.length > 0}
							<div class="rounded-md border">
								<Table.Root>
									<Table.Header>
										<Table.Row>
											<Table.Head>Interface</Table.Head>
											<Table.Head>MAC</Table.Head>
											<Table.Head>Addresses</Table.Head>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										{#each info.interfaces as iface (iface.name + iface.mac)}
											<Table.Row>
												<Table.Cell class="font-mono">{iface.name}</Table.Cell>
												<Table.Cell class="font-mono">{iface.mac}</Table.Cell>
												<Table.Cell>
													<div class="flex flex-wrap gap-1">
														{#each iface.ipv4 as ip (ip)}
															<Badge variant="secondary" class="font-mono">{ip}</Badge>
														{/each}
														{#each iface.ipv6 as ip (ip)}
															<Badge variant="outline" class="font-mono">{ip}</Badge>
														{/each}
													</div>
												</Table.Cell>
											</Table.Row>
										{/each}
									</Table.Body>
								</Table.Root>
							</div>
						{/if}
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Raw report</Card.Title>
					</Card.Header>
					<Card.Content>
						<pre class="text-muted-foreground bg-muted/50 max-h-48 overflow-auto rounded-md p-3 font-mono text-xs whitespace-pre-wrap">{rawJson}</pre>
					</Card.Content>
				</Card.Root>
			{:else if timedOut}
				<Alert.Root>
					<InfoIcon class="size-4" />
					<Alert.Title>No info received</Alert.Title>
					<Alert.Description>
						{deviceName ? `"${deviceName}"` : `Device #${deviceId}`} did not report any info. It may be offline or running a print service version that does not support
						device info.
					</Alert.Description>
				</Alert.Root>
			{:else}
				<Card.Root>
					<Card.Header>
						<Card.Title>{deviceInfoMutation.isPending ? "Requesting device info..." : "Waiting for the device to report..."}</Card.Title>
						<Card.Description class="mb-2">This should only take a few seconds</Card.Description>
						<ProgressLoading class="h-1" />
					</Card.Header>
				</Card.Root>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
