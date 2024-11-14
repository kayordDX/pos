<script lang="ts">
	import { CheckIcon, XIcon } from "lucide-svelte";

	let { isEnabled }: { isEnabled: boolean } = $props();
</script>

{#if isEnabled}
	<div
		class="flex h-8 w-8 bg-primary justify-center items-center rounded-full text-primary-foreground"
	>
		<CheckIcon />
	</div>
{:else}
	<div
		class="flex h-8 w-8 bg-secondary justify-center items-center rounded-full text-secondary-foreground"
	>
		<XIcon />
	</div>
{/if}
