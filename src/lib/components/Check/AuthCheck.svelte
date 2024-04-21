<script lang="ts">
	import { session, isLoadingSession } from "$lib/firebase";
	import { Loader } from "@kayord/ui";
	import Login from "../Login.svelte";
</script>

{#if $isLoadingSession}
	<Loader />
{:else if $session}
	<slot />
{:else}
	<Login />
{/if}
