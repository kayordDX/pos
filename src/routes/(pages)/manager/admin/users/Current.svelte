<script lang="ts">
	import { Badge } from "@kayord/ui";
	import { CheckIcon, XIcon } from "@lucide/svelte";

	let { isCurrent }: { isCurrent: boolean } = $props();
</script>

<div>
	{#if isCurrent}
		<Badge variant="secondary">
			<CheckIcon class="text-primary" />
		</Badge>
	{:else}
		<Badge variant="secondary">
			<XIcon class="text-destructive " />
		</Badge>
	{/if}
</div>
