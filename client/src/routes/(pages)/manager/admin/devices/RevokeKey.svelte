<script lang="ts">
	import { createDeviceKeyRevoke } from "$lib/api";
	import { AlertDialog } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { getError } from "$lib/types";

	interface Props {
		deviceId: number;
		deviceName: string;
		open: boolean;
		refetch: () => void | Promise<void>;
		onClose: () => void;
	}

	let { deviceId, deviceName, open = $bindable(false), refetch, onClose }: Props = $props();

	const mutation = createDeviceKeyRevoke();

	const revokeKey = async () => {
		try {
			open = false;
			await mutation.mutateAsync({ id: deviceId });
			await refetch();
			onClose();
			toast.info("Revoked device key");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
</script>

<AlertDialog.Root bind:open onOpenChange={(value) => !value && onClose()}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Revoke key?</AlertDialog.Title>
			<AlertDialog.Description
				>This immediately revokes the key for "{deviceName}". The device can no longer connect until you rotate or create a new key.</AlertDialog.Description
			>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-destructive" onclick={revokeKey}>Revoke</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
