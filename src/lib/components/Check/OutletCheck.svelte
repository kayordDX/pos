<script lang="ts">
	import { status } from "$lib/stores/status";
	import { Loader } from "@kayord/ui";
	import Setup from "../Setup.svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{#if $status.isNotReady}
	<Loader />
{:else if $status.outletId > 0}
	{@render children?.()}
{:else}
	<Setup />
{/if}
