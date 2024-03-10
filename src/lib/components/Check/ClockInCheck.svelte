<script lang="ts">
	import { status } from "$lib/stores/status";
	import Clocked from "../ClockIn.svelte";
</script>

{#if $status.clockedIn}
	<slot />
{:else}
	<Clocked />
{/if}
