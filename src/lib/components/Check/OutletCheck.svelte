<script lang="ts">
	import { status } from "$lib/stores/status";
	import { Loader } from "@kayord/ui";
	import Setup from "../Setup.svelte";
</script>

{#if $status.isNotReady}
	<Loader />
{:else if $status.outletId > 0}
	<slot />
{:else}
	<Setup />
{/if}
