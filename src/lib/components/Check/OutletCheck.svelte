<script lang="ts">
	import { status } from "$lib/stores/status.svelte";
	import { Loader } from "@kayord/ui";
	import Setup from "../Setup.svelte";
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

{#if status.value.isNotReady}
	<Loader />
{:else if status.value.outletId > 0}
	{@render children?.()}
{:else}
	<Setup />
{/if}
