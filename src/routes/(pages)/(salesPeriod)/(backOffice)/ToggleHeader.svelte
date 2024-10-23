<script lang="ts">
	import { Badge } from "@kayord/ui";
	import { Maximize2Icon, Minimize2Icon } from "lucide-svelte";
	import { header } from "$lib/stores/header.svelte";
</script>

<button class="flex" onclick={header.toggleHeader}>
	<Badge variant="secondary" class="truncate">
		{#if header.value}
			<Maximize2Icon class="size-4" />
		{:else}
			<Minimize2Icon class="size-4" />
		{/if}
	</Badge>
</button>
