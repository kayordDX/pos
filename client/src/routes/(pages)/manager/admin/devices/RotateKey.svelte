<script lang="ts">
	import { createDeviceKeyRotate } from "$lib/api";
	import { Alert, Button, Dialog } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { getError } from "$lib/types";
	import { KeyRoundIcon } from "@lucide/svelte";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
	import DeviceKeyInstructions from "./DeviceKeyInstructions.svelte";

	interface Props {
		open: boolean;
		deviceId: number;
		deviceName: string;
		refetch: () => void | Promise<void>;
	}

	let { open = $bindable(false), deviceId, deviceName, refetch }: Props = $props();

	const mutation = createDeviceKeyRotate();

	let rotatedKey = $state<string | null>(null);

	const reset = () => {
		rotatedKey = null;
	};

	const rotateKey = async () => {
		try {
			const response = await mutation.mutateAsync({ id: deviceId });
			rotatedKey = response.fullKey ?? null;
			await refetch();
			toast.info("Rotated device key");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	$effect(() => {
		if (open) {
			reset();
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto md:min-w-3xl">
		{#if rotatedKey}
			<Dialog.Header>
				<Dialog.Title>Key rotated</Dialog.Title>
				<Dialog.Description>{deviceName} now uses a new key. Configure the print service with it.</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-2 p-0">
				<DeviceKeyInstructions fullKey={rotatedKey} />
			</div>
			<Dialog.Footer>
				<Button variant="outline" onclick={() => (open = false)}>Done</Button>
			</Dialog.Footer>
		{:else}
			<Dialog.Header>
				<Dialog.Title>Rotate key?</Dialog.Title>
				<Dialog.Description
					>This immediately stops the current key from authenticating. Update the print service on "{deviceName}" with the new key.</Dialog.Description
				>
			</Dialog.Header>
			<div class="flex flex-col gap-2 p-4">
				<Alert.Root>
					<TriangleAlertIcon class="size-4" />
					<Alert.Title>Connection drops on next reconnect</Alert.Title>
					<Alert.Description>The device keeps its current session until it reconnects, then needs the new key.</Alert.Description>
				</Alert.Root>
			</div>
			<Dialog.Footer class="gap-2">
				<Button disabled={mutation.isPending} onclick={rotateKey}><KeyRoundIcon /> Rotate key</Button>
				<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
			</Dialog.Footer>
		{/if}
	</Dialog.Content>
</Dialog.Root>
