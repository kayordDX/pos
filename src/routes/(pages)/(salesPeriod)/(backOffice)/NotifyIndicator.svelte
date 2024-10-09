<script lang="ts">
	import { fade, slide } from "svelte/transition";
	import { notification } from "$lib/stores/notify.svelte";
</script>

{#if notification.show}
	<div transition:slide class="fixed top-0 right-0 bottom-0 left-0 z-[-1] overflow-hidden">
		<div class="bg-foreground/20 w-full h-full"></div>
	</div>
{/if}

{#if notification.show}
	<div out:fade={{ delay: 800 }} class="relative flex h-5 w-5 items-center justify-center">
		<span
			class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
		>
		</span>
		<span class="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
	</div>
{/if}
