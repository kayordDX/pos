<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	import { XIcon, InfoIcon, AlertTriangleIcon } from "@lucide/svelte";
	import { Button } from "@kayord/ui";
	interface Props {
		message: string;
		type: "success" | "error";
	}

	let { message, type }: Props = $props();

	const closeToast = () => {
		dispatch("closeToast");
	};
</script>

<div
	class="p-5 shadow-sm rounded-lg border-muted border-2 bg-background"
	style="width: var(--width); z-index: var(--z-index);"
>
	<div class="flex gap-3 items-center">
		{#if type == "error"}
			<AlertTriangleIcon class="text-destructive h-6 w-6" />
		{:else if type == "success"}
			<InfoIcon class="text-primary h-6 w-6" />
		{/if}
		{message}
	</div>
	<Button variant="outline" size="icon" onclick={closeToast} class="absolute top-1 right-1 h-6 w-6">
		<XIcon class="h-4 w-4" />
	</Button>
</div>
