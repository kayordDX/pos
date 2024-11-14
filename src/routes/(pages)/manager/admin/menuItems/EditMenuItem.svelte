<script lang="ts">
	import { Dialog } from "@kayord/ui";

	interface Props {
		refetch: () => void;
		open: boolean;
	}
	let { refetch, open = $bindable(false) }: Props = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Menu Item</Dialog.Title>
			<Dialog.Description>Placeholder for edit screen</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
