<script lang="ts">
	import { Badge } from "@kayord/ui";
	import { Maximize2Icon, Minimize2Icon } from "lucide-svelte";
	import { header } from "$lib/stores/header";
</script>

<button class="flex" on:click={header.toggleHeader}>
	<Badge variant="secondary" class="truncate">
		{#if $header}
			<Maximize2Icon class="size-4" />
		{:else}
			<Minimize2Icon class="size-4" />
		{/if}
	</Badge>
</button>
