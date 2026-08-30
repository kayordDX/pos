<script lang="ts">
	import type { Snippet } from "svelte";
	import { status } from "$lib/stores/status.svelte";
	import Unauthorized from "../Pages/Unauthorized.svelte";

	interface Props {
		roles: string[];
		children?: Snippet;
	}

	let { roles, children }: Props = $props();
</script>

{#if status.hasRoles(roles)}
	{@render children?.()}
{:else}
	<Unauthorized />
{/if}
