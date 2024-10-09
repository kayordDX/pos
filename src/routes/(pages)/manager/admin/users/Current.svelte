<script lang="ts">
	import { CheckIcon, XIcon } from "lucide-svelte";

	let { isCurrent }: { isCurrent: boolean } = $props();
</script>

<div>
	{#if isCurrent}
		<CheckIcon class="text-primary" />
	{:else}
		<XIcon class="text-destructive " />
	{/if}
</div>
