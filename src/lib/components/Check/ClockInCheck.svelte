<script lang="ts">
	import { status } from "$lib/stores/status";
	import Clocked from "../ClockIn.svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{#if $status.clockedIn}
	{@render children?.()}
{:else}
	<Clocked />
{/if}
