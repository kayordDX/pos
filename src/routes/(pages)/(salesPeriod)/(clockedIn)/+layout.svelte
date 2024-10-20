<script lang="ts">
	import ClockInCheck from "$lib/components/Check/ClockInCheck.svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<ClockInCheck>
	{@render children?.()}
</ClockInCheck>
