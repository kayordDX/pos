<script lang="ts">
	import { createPrintServiceKeyRevoke } from "$lib/api";
	import { AlertDialog } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { getError } from "$lib/types";

	interface Props {
		id: number;
		name: string;
		open: boolean;
		refetch: () => void | Promise<void>;
		onClose: () => void;
	}

	let { id, name, open = $bindable(false), refetch, onClose }: Props = $props();

	const mutation = createPrintServiceKeyRevoke();

	const revokeKey = async () => {
		try {
			open = false;
			await mutation.mutateAsync({ data: { id } });
			await refetch();
			onClose();
			toast.info("Revoked print service key");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
</script>

<AlertDialog.Root bind:open onOpenChange={(value) => !value && onClose()}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Revoke key?</AlertDialog.Title>
			<AlertDialog.Description>
				This will immediately revoke the key for {name}.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-destructive" onclick={revokeKey}>Revoke</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
