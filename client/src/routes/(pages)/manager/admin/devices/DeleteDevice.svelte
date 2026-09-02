<script lang="ts">
	import { createDeviceDelete } from "$lib/api";
	import { AlertDialog } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { getError } from "$lib/types";

	interface Props {
		deviceId: number;
		deviceName: string;
		printerCount: number;
		open: boolean;
		refetch: () => void | Promise<void>;
		onClose: () => void;
	}

	let { deviceId, deviceName, printerCount, open = $bindable(false), refetch, onClose }: Props = $props();

	const mutation = createDeviceDelete();

	const deleteDevice = async () => {
		try {
			open = false;
			await mutation.mutateAsync({ id: deviceId });
			await refetch();
			onClose();
			toast.info("Deleted print device");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
</script>

<AlertDialog.Root bind:open onOpenChange={(value) => !value && onClose()}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete device?</AlertDialog.Title>
			<AlertDialog.Description>
				This deletes "{deviceName}" and any printers assigned to it{printerCount > 0 ? ` (${printerCount} printer${printerCount > 1 ? "s" : ""})` : ""}, plus
				its key. The print service on the device stops working immediately.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-destructive" onclick={deleteDevice}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
