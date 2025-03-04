<script lang="ts">
	import { LinkType } from "$lib/types";
	import { Dialog } from "@kayord/ui";

	interface Props {
		open: boolean;
		id: number;
		linkType: LinkType;
	}
	let { open = $bindable(false), id, linkType }: Props = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] max-w-3xl overflow-scroll">
		<div class="flex flex-col gap-4 p-0 mt-0">Linnk Stocck</div>
	</Dialog.Content>
</Dialog.Root>
