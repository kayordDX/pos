<script lang="ts">
	import RoleCheck from "$lib/components/Check/RoleCheck.svelte";
	import type { Snippet } from "svelte";
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<RoleCheck roles={["manager"]}>
	{@render children?.()}
</RoleCheck>
