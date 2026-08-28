<script lang="ts">
	import { CheckIcon, XIcon } from "@lucide/svelte";

	let { isEnabled }: { isEnabled: boolean } = $props();
</script>

{#if isEnabled}
	<div class="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
		<CheckIcon />
	</div>
{:else}
	<div class="bg-secondary text-secondary-foreground flex h-8 w-8 items-center justify-center rounded-full">
		<XIcon />
	</div>
{/if}
