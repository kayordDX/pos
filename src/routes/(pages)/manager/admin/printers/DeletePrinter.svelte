<script lang="ts">
	import { AlertDialog } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { createPrinterDelete } from "$lib/api";
	import { getError } from "$lib/types";

	interface Props {
		printerId: number;
		refetch: () => void;
		deleteOpen: boolean;
	}
	let { printerId, refetch, deleteOpen = $bindable(false) }: Props = $props();

	const mutation = createPrinterDelete();
	const deletePrinter = async () => {
		try {
			deleteOpen = false;
			await mutation.mutateAsync({ id: printerId });
			toast.info("Deleted Printer");
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
</script>

<AlertDialog.Root bind:open={deleteOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Printer?</AlertDialog.Title>
			<AlertDialog.Description>
				This will delete the printer configuration for this outlet.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-destructive" onclick={deletePrinter}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
