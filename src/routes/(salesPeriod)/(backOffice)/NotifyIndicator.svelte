<script lang="ts">
	import { notification } from "$lib/stores/notify.svelte";
</script>

{#if notification.show}
	<div class="absolute top-0 right-0 bottom-0 left-0 z-[-1] overflow-hidden">
		<div class="animate-ping bg-muted-foreground w-full h-full"></div>
	</div>
{/if}

{#if notification.show}
	<span class="relative flex h-4 w-4">
		<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
		></span>
		<span class="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
	</span>
{/if}
