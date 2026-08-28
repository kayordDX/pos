<script lang="ts">
	import { fade, slide } from "svelte/transition";
	import { notification } from "$lib/stores/notify.svelte";
</script>

{#if notification.show}
	<div transition:slide class="fixed top-0 right-0 bottom-0 left-0 z-[-1] overflow-hidden">
		<div class="bg-foreground/20 h-full w-full"></div>
	</div>
{/if}

{#if notification.show}
	<div out:fade={{ delay: 800 }} class="relative flex h-5 w-5 items-center justify-center">
		<span class="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"> </span>
		<span class="bg-primary relative inline-flex h-4 w-4 rounded-full"></span>
	</div>
{/if}
