<script lang="ts">
	import ClockInCheck from "$lib/components/Check/ClockInCheck.svelte";
	import type { Snippet } from "svelte";
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<ClockInCheck>
	{@render children?.()}
</ClockInCheck>
