<script lang="ts">
	import ClockInCheck from "$lib/components/Check/ClockInCheck.svelte";
	import RoleCheck from "$lib/components/Check/RoleCheck.svelte";
	import type { Snippet } from "svelte";
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<RoleCheck roles={["manager", "front"]}>
	<ClockInCheck>
		{@render children?.()}
	</ClockInCheck>
</RoleCheck>
