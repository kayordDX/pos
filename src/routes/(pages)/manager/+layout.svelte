<script lang="ts">
	import RoleCheck from "$lib/components/Check/RoleCheck.svelte";
	import { Header } from "$lib/components/Header";
	import type { Snippet } from "svelte";
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<RoleCheck roles={["manager"]}>
	<Header />
	{@render children?.()}
</RoleCheck>
