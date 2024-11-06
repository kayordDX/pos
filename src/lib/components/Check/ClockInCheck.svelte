<script lang="ts">
	import { status } from "$lib/stores/status.svelte";
	import type { Snippet } from "svelte";
	import Clocked from "../ClockIn.svelte";
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

{#if status.value.clockedIn}
	{@render children?.()}
{:else}
	<Clocked />
{/if}
