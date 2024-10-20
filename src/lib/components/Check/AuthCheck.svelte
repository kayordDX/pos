<script lang="ts">
	import { session, isLoadingSession } from "$lib/firebase";
	import { Loader } from "@kayord/ui";
	import Login from "../Login.svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{#if $isLoadingSession}
	<Loader />
{:else if $session}
	{@render children?.()}
{:else}
	<Login />
{/if}
