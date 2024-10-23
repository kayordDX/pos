<script lang="ts">
	import { status } from "$lib/stores/status.svelte";
	import Clocked from "../ClockIn.svelte";
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

{#if status.value.clockedIn}
	{@render children?.()}
{:else}
	<Clocked />
{/if}
